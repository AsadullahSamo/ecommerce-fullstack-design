import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Newsletter from '../components/Newsletter'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import MobileFilters from '../components/filters/MobileFilters'
import ProductFilters from '../components/filters/ProductFilters'
import ProductCard from '../components/products/ProductCard'
import Breadcrumb from '../components/Breadcrumb'

type ViewMode = 'grid' | 'list'


const CATEGORIES   = ['Headphones', 'Electronics', 'Smartphones', 'Modern tech', 'Home & Outdoor']
const BRANDS       = ['Samsung', 'Apple', 'Sony', 'Google', 'DJI', 'JLab', 'LG', 'PEL', "Vivo", "Local Brand"]
const FEATURES     = ['Premium Build',  'Portable Design',  'Wireless Connectivity',  'High Performance',  'Energy Efficient',  'Smart Features',  'Easy Maintenance',  'Warranty Included',  'Modern Design',]
const CONDITIONS   = ['Refurbished', 'Brand new', 'Old items']
const RATINGS      = [5, 4, 3, 2]

function StarRating({ value, small = false }: { value: number; small?: boolean }) {
  const size = small ? 'text-[14px]' : 'text-[16px]'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`material-icons ${size} ${i <= Math.round(value / 2) ? 'text-[#FF9017]' : 'text-[#DEE2E7]'}`}>
          star
        </span>
      ))}
    </div>
  )
}

function FilterSection({ title, children, defaultOpen = true }: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[#DEE2E7] py-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full text-sm font-semibold text-[#1C1C1C] mb-2"
      >
        {title}
        <span className="material-icons text-[18px] text-[#8B96A5]">
          {open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
        </span>
      </button>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  )
}

function CheckItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-[#DEE2E7] accent-[#0D6EFD]"
      />
      <span className="text-sm text-[#1C1C1C] group-hover:text-[#0D6EFD] transition-colors">{label}</span>
    </label>
  )
}

export default function ProductListing() {
  const [searchParams] = useSearchParams()
  const [viewMode, setViewMode]           = useState<ViewMode>('grid')
  const [verifiedOnly, setVerifiedOnly]   = useState(false)
  const [sortBy, setSortBy]               = useState('Featured')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [condition, setCondition]         = useState('Any')
  const [priceMin, setPriceMin]           = useState('')
  const [priceMax, setPriceMax]           = useState('')
  const [currentPage, setCurrentPage]     = useState(1)
  const [showPerPage, setShowPerPage]     = useState(10)
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [appliedPriceMin, setAppliedPriceMin] = useState<number | undefined>()
  const [appliedPriceMax, setAppliedPriceMax] = useState<number | undefined>()
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [showAllBrands, setShowAllBrands]         = useState(false)
  const [showAllFeatures, setShowAllFeatures]     = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const { addToCart, items } = useCart()


  const INITIAL_SHOW = 4

  const searchQuery = searchParams.get('q') || ''
  const categoryParam = searchParams.get('category') || ''

  const navigate = useNavigate()

  const { products, total, pages, loading, error } = useProducts({
    q: searchQuery,
    category: categoryParam,
    page: currentPage,
    limit: showPerPage,
    minPrice: appliedPriceMin,
    maxPrice: appliedPriceMax,
    verified: verifiedOnly || undefined,
    brand: selectedBrands.length > 0 ? selectedBrands.join(',') : undefined,
    features: selectedFeatures.length > 0 ? selectedFeatures.join(',') : undefined,
    minRating: selectedRatings.length > 0 ? (Math.min(...selectedRatings) * 2 - 1) : undefined,
    condition: condition !== 'Any' ? condition : undefined,
  })

  const filteredProducts = products

  const hasFilters =  !!categoryParam ||  selectedBrands.length > 0 ||  selectedFeatures.length > 0 ||  selectedRatings.length > 0 ||  appliedPriceMin !== undefined ||  appliedPriceMax !== undefined || condition !== 'Any'

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
      setCurrentPage(1)
  }

  const toggleFeature = (feature: string) =>
    setSelectedFeatures(prev => prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature])

  const toggleRating = (rating: number) =>
    setSelectedRatings(prev => prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating])

  const applyPrice = () => {
    setAppliedPriceMin(priceMin ? Number(priceMin) : undefined)
    setAppliedPriceMax(priceMax ? Number(priceMax) : undefined)
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedFeatures([])
    setSelectedRatings([])
    setCondition('Any')

    setPriceMax('')
    setPriceMin('')
    setAppliedPriceMin(undefined)
    setAppliedPriceMax(undefined)
    setCurrentPage(1)

    navigate('/products', { replace: true })
    
  }

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-4">

        {/* Breadcrumb */}
        <Breadcrumb />

        <div className="flex gap-4">

          {/* ── Filter Sidebar ── */}
          <aside className="hidden md:block w-[220px] shrink-0">
            <div className="bg-white rounded-md border border-[#DEE2E7] px-4 py-4">
              <ProductFilters
                categoryParam={categoryParam}
                setCondition={setCondition}
                condition={condition}
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                selectedFeatures={selectedFeatures}
                toggleFeature={toggleFeature}
                selectedRatings={selectedRatings}
                toggleRating={toggleRating}
                priceMin={priceMin}
                priceMax={priceMax}
                setPriceMin={setPriceMin}
                setPriceMax={setPriceMax}
                applyPrice={applyPrice}
                CATEGORIES={CATEGORIES}
                BRANDS={BRANDS}
                FEATURES={FEATURES}
                CONDITIONS={CONDITIONS}
              />
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">

            {/* Top bar */}
            <div className="bg-white rounded-md border border-[#DEE2E7] px-4 py-3 mb-3">
               <div className="flex items-center justify-between gap-2">
                {/* Item count — hidden on mobile, shown on sm+ */}
                <p className="hidden sm:block text-sm text-[#1C1C1C]">
                  <span className="font-semibold">{total}</span> items in{' '}
                  <span className="font-semibold">{searchQuery || categoryParam || 'All products'}</span>
                </p>

                {/* Mobile: just category label on left */}
                <p className="sm:hidden text-sm font-semibold text-[#1C1C1C] truncate max-w-[140px]">
                  {searchQuery || categoryParam || 'All products'}
                </p>

                <div className="flex items-center gap-2 ml-auto">
                  <label className="flex items-center gap-1.5 text-xs text-[#1C1C1C] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={verifiedOnly}
                      onChange={e => setVerifiedOnly(e.target.checked)}
                      className="accent-[#0D6EFD]"
                    />
                    <span className="hidden sm:inline">Verified only</span>
                    <span className="sm:hidden">Verified</span>
                  </label>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="border border-[#DEE2E7] rounded px-2 py-1.5 text-xs outline-none focus:border-[#0D6EFD] bg-white"
                  >
                    {['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  {/* Grid/List toggle — desktop only */}
                  <div className="hidden md:flex items-center border border-[#DEE2E7] rounded overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-2 py-1.5 transition-colors ${viewMode === 'grid' ? 'bg-[#0D6EFD] text-white' : 'text-[#8B96A5]'}`}
                    >
                      <span className="material-icons text-[18px]">grid_view</span>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-2 py-1.5 transition-colors ${viewMode === 'list' ? 'bg-[#0D6EFD] text-white' : 'text-[#8B96A5]'}`}
                    >
                      <span className="material-icons text-[18px]">list</span>
                    </button>
                  </div>
                  {/* Mobile filter button */}
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="md:hidden flex items-center gap-1 border border-[#DEE2E7] rounded px-2 py-1.5 text-xs text-[#1C1C1C]"
                  >
                    <span className="material-icons text-[16px]">filter_list</span>
                    Filter
                  </button>
                </div>
                
              </div>
                  {hasFilters && (
                    <div className="flex items-center gap-2 mt-3 flex-wrap">

                      {/* Category tag */}
                      {categoryParam && (
                        <span className="flex items-center gap-1 border border-[#DEE2E7] rounded-md px-2 py-1 text-xs text-[#1C1C1C]">
                          {categoryParam}
                          <button
                            onClick={() => navigate('/products')}
                            className="text-[#8B96A5] hover:text-[#E53935]"
                          >
                            <span className="material-icons text-[14px]">close</span>
                          </button>
                        </span>
                      )}

                      {/* Brand tags */}
                      {selectedBrands.map(brand => (
                        <span
                          key={brand}
                          className="flex items-center gap-1 border border-[#DEE2E7] rounded-md px-2 py-1 text-xs text-[#1C1C1C]"
                        >
                          {brand}
                          <button
                            onClick={() =>
                              setSelectedBrands(prev =>
                                prev.filter(b => b !== brand)
                              )
                            }
                            className="text-[#8B96A5] hover:text-[#E53935]"
                          >
                            <span className="material-icons text-[14px]">close</span>
                          </button>
                        </span>
                      ))}

                      {selectedFeatures.map(feature => (
                        <span
                          key={feature}
                          className="flex items-center gap-1 border border-[#DEE2E7] rounded-md px-2 py-1 text-xs text-[#1C1C1C]"
                        >
                          {feature}
                          <button
                            onClick={() =>
                              setSelectedFeatures(prev => prev.filter(f => f !== feature))
                            }
                            className="text-[#8B96A5] hover:text-[#E53935]"
                          >
                            <span className="material-icons text-[14px]">close</span>
                          </button>
                        </span>
                      ))}

                      {condition !== 'Any' && (
                        <span className="flex items-center gap-1 border border-[#DEE2E7] rounded-md px-2 py-1 text-xs text-[#1C1C1C]">
                          {condition}
                          <button
                            onClick={() => setCondition('Any')}
                            className="text-[#8B96A5] hover:text-[#E53935]"
                          >
                            <span className="material-icons text-[14px]">close</span>
                          </button>
                        </span>
                      )}

                      {/* Clear all */}
                      <button
                        onClick={clearAllFilters}
                        className="text-xs text-[#0D6EFD] hover:underline ml-1"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>

            {/* Product grid */}
              {loading ? (
                <div className="flex flex-col gap-3 mb-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-[120px] bg-white rounded-md border border-[#DEE2E7] animate-pulse" />
                  ))}
                </div>
              ) : error ? (
                <div className="bg-white rounded-md border border-[#DEE2E7] p-8 text-center">
                  <p className="text-[#E53935] text-sm">{error}</p>
                </div>
              ) : (
                <>
                  <div className={`${viewMode === 'grid' ? 'hidden md:grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4' : 'hidden'}`}>
                    {filteredProducts.map(p => (
                      <ProductCard
                        key={p._id}
                        product={p}
                        viewMode="grid"
                        addToCart={addToCart}
                        isAdded={items.some(i => i.product._id === p._id)}
                      />
                    ))}
                  </div>
                </>
              )}

           <div className={`${viewMode === 'list' ? 'flex flex-col gap-3 mb-4' : 'flex md:hidden flex-col gap-3 mb-4'}`}>
              {filteredProducts.map(p => (
                <ProductCard
                  key={p._id}
                  product={p}
                  viewMode="list"
                  addToCart={addToCart}
                  isAdded={items.some(i => i.product._id === p._id)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="bg-white rounded-md border border-[#DEE2E7] px-4 py-3 flex items-center justify-end gap-2">
              <div className="flex items-center gap-2 mr-auto">
                <span className="text-sm text-[#8B96A5]"> {total} items • Show</span>
                <select
                  value={showPerPage}
                  onChange={e => { setShowPerPage(Number(e.target.value)); setCurrentPage(1) }}
                  className="border border-[#DEE2E7] rounded px-2 py-1 text-sm outline-none focus:border-[#0D6EFD] bg-white"
                >
                  {[10, 20, 30, 50].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center border border-[#DEE2E7] rounded text-[#8B96A5] hover:border-[#0D6EFD] hover:text-[#0D6EFD] disabled:opacity-40 transition-colors"
              >
                <span className="material-icons text-[18px]">chevron_left</span>
              </button>
              {[...Array(Math.min(pages, 3))].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center border rounded text-sm font-medium transition-colors ${
                    currentPage === i + 1
                      ? 'bg-[#0D6EFD] border-[#0D6EFD] text-white'
                      : 'border-[#DEE2E7] text-[#1C1C1C] hover:border-[#0D6EFD] hover:text-[#0D6EFD]'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(pages, p + 1))}
                className="w-8 h-8 flex items-center justify-center border border-[#DEE2E7] rounded text-[#8B96A5] hover:border-[#0D6EFD] hover:text-[#0D6EFD] transition-colors"
              >
                <span className="material-icons text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>          
        </div>
          
        {/* Newsletter subscription */}
        <Newsletter />

        {/* Mobile Filters Drawer */}
        <MobileFilters
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
        >
          <ProductFilters
            categoryParam={categoryParam}
            setCondition={setCondition}
            condition={condition}
            selectedBrands={selectedBrands}
            toggleBrand={toggleBrand}
            selectedFeatures={selectedFeatures}
            toggleFeature={toggleFeature}
            selectedRatings={selectedRatings}
            toggleRating={toggleRating}
            priceMin={priceMin}
            priceMax={priceMax}
            setPriceMin={setPriceMin}
            setPriceMax={setPriceMax}
            applyPrice={applyPrice}
            CATEGORIES={CATEGORIES}
            BRANDS={BRANDS}
            FEATURES={FEATURES}
            CONDITIONS={CONDITIONS}
          />
        </MobileFilters>
          
      </div>
    </div>
  )
}