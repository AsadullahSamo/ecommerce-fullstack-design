import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Newsletter from './Newsletter'
import { useProducts } from '../hooks/useProducts'
import type { Product } from '../types'

type ViewMode = 'grid' | 'list'

// interface Product {
//   id: string
//   name: string
//   price: number
//   originalPrice: number
//   rating: number
//   orders: number
//   image: string
//   shipping: string
//   description: string
//   verified: boolean
// }

// const PRODUCTS: Product[] = [
//   { id: '1', name: 'Canon Cmera EOS 2000, Black 10x zoom',       price: 998.00, originalPrice: 1128.00, rating: 7.5, orders: 154, image: '/assets/products/product-1.png', shipping: 'Free Shipping', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', verified: true  },
//   { id: '2', name: 'GoPro HERO6 4K Action Camera - Black',        price: 998.00, originalPrice: 1128.00, rating: 7.5, orders: 154, image: '/assets/products/product-2.png', shipping: 'Free Shipping', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit', verified: false },
//   { id: '3', name: 'GoPro HERO6 4K Action Camera - Black',        price: 998.00, originalPrice: 1128.00, rating: 7.5, orders: 154, image: '/assets/products/product-3.png', shipping: 'Free Shipping', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit', verified: true  },
//   { id: '4', name: 'GoPro HERO6 4K Action Camera - Black',        price: 998.00, originalPrice: 1128.00, rating: 7.5, orders: 154, image: '/assets/products/product-4.png', shipping: 'Free Shipping', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit', verified: false },
//   { id: '5', name: 'GoPro HERO6 4K Action Camera - Black',        price: 998.00, originalPrice: 1128.00, rating: 7.5, orders: 154, image: '/assets/products/product-5.png', shipping: 'Free Shipping', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit', verified: true  },
//   { id: '6', name: 'GoPro HERO6 4K Action Camera - Black',        price: 998.00, originalPrice: 1128.00, rating: 7.5, orders: 154, image: '/assets/products/product-6.png', shipping: 'Free Shipping', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit', verified: false },
// ]

const CATEGORIES   = ['Mobile accessory', 'Electronics', 'Smartphones', 'Modern tech']
const BRANDS       = ['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo']
const FEATURES     = ['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory']
const CONDITIONS   = ['Any', 'Refurbished', 'Brand new', 'Old items']
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
  const [selectedBrands, setSelectedBrands]     = useState<string[]>(['Samsung', 'Apple', 'Pocco'])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['Metallic'])
  const [activeFilters, setActiveFilters]       = useState<string[]>([])
  const [condition, setCondition]         = useState('Any')
  const [priceMin, setPriceMin]           = useState('')
  const [priceMax, setPriceMax]           = useState('')
  const [currentPage, setCurrentPage]     = useState(1)
  const [showPerPage, setShowPerPage]     = useState(10)

  const searchQuery = searchParams.get('q') || ''
  const categoryParam = searchParams.get('category') || ''

  const { products, total, pages, loading, error } = useProducts({
    q: searchQuery,
    category: categoryParam,
    page: currentPage,
    limit: showPerPage,
  })

  const filteredProducts = verifiedOnly ? products.filter(p => p.stock > 0) : products

  const toggleBrand = (brand: string) =>
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])

  const toggleFeature = (feature: string) =>
    setSelectedFeatures(prev => prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature])

  const removeFilter = (filter: string) =>
    setActiveFilters(prev => prev.filter(f => f !== filter))

  // const filteredProducts = verifiedOnly ? PRODUCTS.filter(p => p.verified) : PRODUCTS

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
                  {CATEGORIES.map((cat, i) => (
                    <li key={cat}>
                      <Link
                        to={`/products?category=${cat}`}
                        className={`block text-sm py-0.5 transition-colors hover:text-[#0D6EFD] ${i === 0 ? 'text-[#0D6EFD] font-medium' : 'text-[#1C1C1C]'}`}
                      >
                        {cat}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button className="text-xs text-[#0D6EFD] hover:underline mt-1">See all</button>
                  </li>
                </ul>
              </FilterSection>

              <FilterSection title="Brands">
                {BRANDS.map(brand => (
                  <CheckItem
                    key={brand}
                    label={brand}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                ))}
                <button className="text-xs text-[#0D6EFD] hover:underline">See all</button>
              </FilterSection>

              <FilterSection title="Features">
                {FEATURES.map(feature => (
                  <CheckItem
                    key={feature}
                    label={feature}
                    checked={selectedFeatures.includes(feature)}
                    onChange={() => toggleFeature(feature)}
                  />
                ))}
                <button className="text-xs text-[#0D6EFD] hover:underline">See all</button>
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
                <button className="w-full mt-2 border border-[#0D6EFD] text-[#0D6EFD] text-xs font-medium py-1.5 rounded hover:bg-blue-50 transition-colors">
                  Apply
                </button>
              </FilterSection>

              <FilterSection title="Condition" defaultOpen={false}>
                {CONDITIONS.map(cond => (
                  <label key={cond} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="condition"
                      checked={condition === cond}
                      onChange={() => setCondition(cond)}
                      className="accent-[#0D6EFD]"
                    />
                    <span className="text-sm text-[#1C1C1C]">{cond}</span>
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Ratings" defaultOpen={false}>
                {RATINGS.map(r => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-[#0D6EFD]" />
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
                  <span className="font-semibold">12,911</span> items in{' '}
                  <span className="font-semibold">{searchQuery || 'Mobile accessory'}</span>
                </p>
                <div className="flex items-center gap-3 sm:ml-auto flex-wrap">
                  <label className="flex items-center gap-1.5 text-sm text-[#1C1C1C] cursor-pointer">
                    <input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)} className="accent-[#0D6EFD]" />
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
              {activeFilters.length > 0 && (
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {activeFilters.map(filter => (
                    <span
                      key={filter}
                      className="flex items-center gap-1 border border-[#DEE2E7] rounded-md px-2 py-1 text-xs text-[#1C1C1C]"
                    >
                      {filter}
                      <button onClick={() => removeFilter(filter)} className="text-[#8B96A5] hover:text-[#E53935]">
                        <span className="material-icons text-[14px]">close</span>
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={() => setActiveFilters([])}
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
                    <Link to={`/products/${p._id}`} className="text-xs text-[#0D6EFD] hover:underline font-medium">
                      View details
                    </Link>
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