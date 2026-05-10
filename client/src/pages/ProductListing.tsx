import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Newsletter from '../components/Newsletter'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'

type ViewMode = 'grid' | 'list'


const CATEGORIES   = ['Mobile accessory', 'Electronics', 'Smartphones', 'Modern tech', 'Home & Outdoor']
const BRANDS       = ['Samsung', 'Apple', 'Huawei', 'Lenovo', 'IKEA', 'KitchenAid', 'Philips']
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

  const hasFilters =  !!categoryParam ||  selectedBrands.length > 0 ||  selectedFeatures.length > 0 ||  selectedRatings.length > 0 ||  appliedPriceMin !== undefined ||  appliedPriceMax !== undefined

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

  // const removeFilter = (filter: string) =>
  //   setActiveFilters(prev => prev.filter(f => f !== filter))


  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-4">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-[#8B96A5] mb-4">
          <Link to="/" className="hover:text-[#0D6EFD]">Home</Link>
          <span className="material-icons text-[14px]">chevron_right</span>
          <Link to="/products" className="hover:text-[#0D6EFD]">Clothings</Link>
          <span className="material-icons text-[14px]">chevron_right</span>
          <Link to="/products" className="hover:text-[#0D6EFD]">Men's wear</Link>
          <span className="material-icons text-[14px]">chevron_right</span>
          <span className="text-[#1C1C1C]">Summer clothing</span>
        </nav>

        <div className="flex gap-4">

          {/* ── Filter Sidebar ── */}
          <aside className="hidden md:block w-[220px] shrink-0">
            <div className="bg-white rounded-md border border-[#DEE2E7] px-4">

              <FilterSection title="Category">
                <ul className="space-y-1">
                  {(showAllCategories ? CATEGORIES : CATEGORIES.slice(0, INITIAL_SHOW)).map((cat) => (
                    <li key={cat}>
                      <Link
                        to={`/products?category=${cat}`}
                        className={`block text-sm py-0.5 transition-colors hover:text-[#0D6EFD] ${categoryParam === cat? 'text-[#0D6EFD] font-medium' : 'text-[#1C1C1C]'} `}
                      >
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
                {CATEGORIES.length > INITIAL_SHOW && (
                  <button
                    onClick={() => setShowAllCategories(p => !p)}
                    className="text-xs text-[#0D6EFD] hover:underline mt-1"
                  >
                    {showAllCategories ? 'Show less' : 'See all'}
                  </button>
                )}
              </FilterSection>

              <FilterSection title="Brands">
                {(showAllBrands ? BRANDS : BRANDS.slice(0, INITIAL_SHOW)).map(brand => (
                  <CheckItem key={brand} label={brand} checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} />
                ))}
                {BRANDS.length > INITIAL_SHOW && (
                  <button onClick={() => setShowAllBrands(p => !p)} className="text-xs text-[#0D6EFD] hover:underline">
                    {showAllBrands ? 'Show less' : 'See all'}
                  </button>
                )}
              </FilterSection>

              <FilterSection title="Features">
                {(showAllFeatures ? FEATURES : FEATURES.slice(0, INITIAL_SHOW)).map(feature => (
                  <CheckItem key={feature} label={feature} checked={selectedFeatures.includes(feature)} onChange={() => toggleFeature(feature)} />
                ))}
                {FEATURES.length > INITIAL_SHOW && (
                  <button onClick={() => setShowAllFeatures(p => !p)} className="text-xs text-[#0D6EFD] hover:underline">
                    {showAllFeatures ? 'Show less' : 'See all'}
                  </button>
                )}
              </FilterSection>

              <FilterSection title="Price range" defaultOpen={false}>
                <input
                  type="range"
                  min={0}
                  max={999999}
                  className="w-full accent-[#0D6EFD]"
                />
                <div className="flex gap-2 mt-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceMin}
                    onChange={e => setPriceMin(e.target.value)}
                    className="w-full border border-[#DEE2E7] rounded px-2 py-1.5 text-xs outline-none focus:border-[#0D6EFD]"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceMax}
                    onChange={e => setPriceMax(e.target.value)}
                    className="w-full border border-[#DEE2E7] rounded px-2 py-1.5 text-xs outline-none focus:border-[#0D6EFD]"
                  />
                </div>
                <button 
                  className="w-full mt-2 border border-[#0D6EFD] text-[#0D6EFD] text-xs font-medium py-1.5 rounded hover:bg-blue-50 transition-colors"
                  onClick={() => {
                    setAppliedPriceMin(priceMin ? Number(priceMin) : undefined)
                    setAppliedPriceMax(priceMax ? Number(priceMax) : undefined)
                    setCurrentPage(1)
                  }}
                >
                  Apply
                </button>
              </FilterSection>

              <FilterSection title="Condition" defaultOpen={false}>
                
                {CONDITIONS.map(c => (
                  <label key={c} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="condition" value={c} checked={condition === c} onChange={() => { setCondition(c); setCurrentPage(1) }} className="w-4 h-4 accent-[#0D6EFD]" />
                    <span className="text-sm text-[#1C1C1C]">{c}</span>
                  </label>
                ))}
                
              </FilterSection>

              <FilterSection title="Ratings" defaultOpen={false}>
                {RATINGS.map(r => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(r)}
                      onChange={() => {
                        const next = selectedRatings.includes(r)
                          ? selectedRatings.filter(x => x !== r)
                          : [...selectedRatings, r]
                        setSelectedRatings(next)
                        setCurrentPage(1)
                      }}
                      className="w-4 h-4 accent-[#0D6EFD]"
                    />
                    <StarRating value={r * 2} small />
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Manufacturer" defaultOpen={false}>
                <p className="text-xs text-[#8B96A5]">Coming soon</p>
              </FilterSection>

            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">

            {/* Top bar */}
            <div className="bg-white rounded-md border border-[#DEE2E7] px-4 py-3 mb-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-wrap">
                <p className="text-sm text-[#1C1C1C]">
                  <span className="font-semibold">{total}</span> items found
                </p>

                <p className="text-xs text-[#8B96A5]">
                  {searchQuery || categoryParam || 'All products'}
                </p>
                <div className="flex items-center gap-3 sm:ml-auto flex-wrap">
                  <label className="flex items-center gap-1.5 text-sm text-[#1C1C1C] cursor-pointer">
                    <input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)} className="accent-[#0D6EFD] hover:cursor-pointer" />
                    Verified only
                  </label>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="border border-[#DEE2E7] rounded px-2 py-1.5 text-sm outline-none focus:border-[#0D6EFD] bg-white"
                  >
                    {['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <div className="flex items-center border border-[#DEE2E7] rounded overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-2 py-1.5 transition-colors ${viewMode === 'grid' ? 'bg-[#0D6EFD] text-white' : 'text-[#8B96A5] hover:bg-[#F7F7F7]'}`}
                    >
                      <span className="material-icons text-[18px]">grid_view</span>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-2 py-1.5 transition-colors ${viewMode === 'list' ? 'bg-[#0D6EFD] text-white' : 'text-[#8B96A5] hover:bg-[#F7F7F7]'}`}
                    >
                      <span className="material-icons text-[18px]">list</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Active filter tags */}
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

                  {/* Clear all */}
                  <button
                    onClick={() => {
                      setSelectedBrands([])
                      setSelectedFeatures([])
                      setSelectedRatings([])
                      setAppliedPriceMin(undefined)
                      setAppliedPriceMax(undefined)
                      setPriceMin('')
                      setPriceMax('')
                      setCurrentPage(1)
                      navigate('/products')
                    }}
                    className="text-xs text-[#0D6EFD] hover:underline ml-1"
                  >
                    Clear all filter
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
                      <Link
                        key={p._id}
                        to={`/products/${p._id}`}
                        className="bg-white rounded-md border border-[#DEE2E7] p-4 hover:shadow-md transition-shadow group"
                      >
                        <div className="flex items-center justify-center h-[180px] mb-3 relative">
                          <img src={p.image} alt={p.name} className="max-h-full object-contain group-hover:scale-105 transition-transform" />
                          <button onClick={e => e.preventDefault()} className="absolute top-0 right-0 text-[#8B96A5] hover:text-[#E53935] transition-colors">
                            <span className="material-icons text-[20px]">favorite_border</span>
                          </button>
                        </div>
                        <p className="text-sm font-medium text-[#1C1C1C] line-clamp-2 mb-1">{p.name}</p>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-base font-bold text-[#1C1C1C]">${p.price.toFixed(2)}</p>
                          <span className="text-sm text-[#8B96A5] line-through">${p.originalPrice?.toFixed(2)}</span>
                          <button onClick={e => e.preventDefault()} className="ml-auto text-[#8B96A5] hover:text-[#E53935]">
                            <span className="material-icons text-[20px]">favorite_border</span>
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <StarRating value={p.rating} small />
                          <span className="text-xs text-[#8B96A5]">{p.rating}</span>
                        </div>
                        {p.shipping && <p className="text-xs text-[#00B517] mt-1 font-medium">{p.shipping}</p>}
                        <div className="flex items-center gap-2 flex-wrap mt-1">
                          {p.category && (
                            <span className="text-xs bg-[#EEF3FD] text-[#0D6EFD] px-2 py-0.5 rounded-full">{p.category}</span>
                          )}
                          {p.condition && p.condition !== 'Brand new' && (
                            <span className="text-xs bg-[#F7F7F7] border border-[#DEE2E7] text-[#8B96A5] px-2 py-0.5 rounded-full">{p.condition}</span>
                          )}
                        </div>
                        <button
                          onClick={e => { e.preventDefault(); addToCart(p) }}
                          className="mt-2 w-full bg-[#0D6EFD] hover:bg-blue-700 text-white text-xs font-medium py-1.5 rounded transition-colors"
                        >
                          {items.some(i => i.product._id === p._id) ? 'Added ✓' : 'Add to cart'}
                        </button>
                      </Link>
                    ))}
                  </div>
                </>
              )}

           <div className={`${viewMode === 'list' ? 'flex flex-col gap-3 mb-4' : 'flex md:hidden flex-col gap-3 mb-4'}`}>
              {filteredProducts.map(p => (
                <div key={p._id} className="bg-white rounded-md border border-[#DEE2E7] p-4 flex gap-3 hover:shadow-md transition-shadow group">
                  <div className="w-[100px] md:w-[180px] shrink-0 flex items-center justify-center bg-[#F7F7F7] rounded-md overflow-hidden self-stretch">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1C1C1C] mb-1">{p.name}</p>
                    <div className="flex items-center gap-1.5 mb-1">
                      <p className="text-base font-bold text-[#1C1C1C]">${p.price.toFixed(2)}</p>
                      {p.originalPrice && <span className="text-xs text-[#8B96A5] line-through">${p.originalPrice.toFixed(2)}</span>}
                    </div>
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <StarRating value={p.rating} small />
                      <span className="text-xs text-[#8B96A5]">{p.rating}</span>
                      <span className="text-xs text-[#8B96A5]">•</span>
                      <span className="text-xs text-[#8B96A5]">{p.orders} orders</span>
                      <span className="text-xs text-[#8B96A5]">•</span>
                      <span className="text-xs text-[#00B517] font-medium">{p.shipping}</span>
                    </div>
                    <p className="text-xs text-[#8B96A5] line-clamp-2 mb-2 hidden md:block">{p.description}</p>
                    <div className="flex items-center gap-2 flex-wrap mt-1 mb-3">
                      {p.category && (
                        <span className="text-xs bg-[#EEF3FD] text-[#0D6EFD] px-2 py-0.5 rounded-full">{p.category}</span>
                      )}
                      {p.condition && p.condition !== 'Brand new' && (
                        <span className="text-xs bg-[#F7F7F7] border border-[#DEE2E7] text-[#8B96A5] px-2 py-0.5 rounded-full">{p.condition}</span>
                      )}
                    </div>
                    <Link to={`/products/${p._id}`} className="text-xs text-[#0D6EFD] hover:underline font-medium">
                      View details
                    </Link>
                    <button
                      onClick={() => addToCart(p)}
                      className="mt-1 ml-5 text-xs bg-[#0D6EFD] hover:bg-blue-700 text-white px-3 py-1.5 rounded transition-colors"
                    >
                      {items.some(i => i.product._id === p._id) ? 'Added ✓' : 'Add to cart'}
                    </button>
                  </div>
                  <button className="shrink-0 self-start text-[#8B96A5] hover:text-[#E53935] transition-colors">
                    <span className="material-icons text-[22px]">favorite_border</span>
                  </button>
                </div>
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

      </div>
    </div>
  )
}