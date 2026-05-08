import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa'
import { MdMessage } from 'react-icons/md'

const categories = [
  'All category', 'Hot offers', 'Gift boxes', 'Products', 'Menu item',
]

const topCategories = [
  'Automobiles', 'Clothes and wear', 'Home interiors', 'Computer and tech',
  'Tools, equipments', 'Sports and outdoor', 'Animal and pets',
  'Machinery tools', 'More category',
]

export default function Navbar() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All category')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/products?q=${encodeURIComponent(search.trim())}`)
    } else {
      navigate('/products')
    }
  }

  return (
    <header className="bg-white border-b border-[#DEE2E7]">
      {/* Top row */}
      <div className="max-w-[1200px] mx-auto px-4 h-[60px] flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-[#0D6EFD] rounded flex items-center justify-center">
            <span className='material-icons-outlined text-gray-300'>shopping_bag</span>
          </div>
          <span className="text-xl font-bold text-[#1C1C1C]">Brand</span>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex flex-1 max-w-[600px] border border-[#DEE2E7] rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 text-sm outline-none text-[#1C1C1C] placeholder:text-[#8B96A5]"
          />
          <select
            value={selectedCategory}
            onChange={e => { setSelectedCategory(e.target.value); navigate(`/products`) }}
            className="border-l border-[#DEE2E7] px-3 text-sm text-[#1C1C1C] outline-none bg-white"
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <button
            type="submit"
            className="bg-[#0D6EFD] hover:bg-blue-700 text-white px-5 text-sm font-medium transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-5 ml-auto shrink-0">
          {[
            { icon: <FaUser />, label: 'Profile', to: '/profile' },
            { icon: <MdMessage />, label: 'Message', to: '/messages' },
            { icon: <FaHeart />, label: 'Orders', to: '/orders' },
            { icon: <FaShoppingCart  />, label: 'My cart', to: '/cart' },
          ].map(({ icon, label, to }) => (
            <Link key={label} to={to} className="flex flex-col items-center gap-0.5 text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors">
              <span className="text-[#8B96A5]">{icon}</span>
              <span className="text-[11px] text-[#8B96A5]">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="border-t border-[#DEE2E7]">
        <div className="max-w-[1200px] mx-auto px-4 h-[48px] flex items-center justify-between">
          <nav className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm font-medium text-[#1C1C1C] hover:text-[#0D6EFD]">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <rect width="18" height="2" rx="1" fill="currentColor" />
                <rect y="6" width="18" height="2" rx="1" fill="currentColor" />
                <rect y="12" width="18" height="2" rx="1" fill="currentColor" />
              </svg>
              All category
            </button>
            {['Hot offers', 'Gift boxes', 'Products', 'Menu item'].map(item => (
              <Link key={item} to="/products" className="text-sm text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors">
                {item}
              </Link>
            ))}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm text-[#1C1C1C] hover:text-[#0D6EFD]">
                Help
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </nav>

          <div className="flex items-center gap-4 text-sm text-[#1C1C1C]">
            <button className="flex items-center gap-1 hover:text-[#0D6EFD]">
              English, USD
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <div className="flex items-center gap-1">
              <span>Ship to</span>
              <span>🇩🇪</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
