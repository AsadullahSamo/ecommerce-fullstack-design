import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { MdHome, MdInventory2 } from 'react-icons/md'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const categories = [
  'All category', 'Hot offers', 'Gift boxes', 'Products', 'Menu item',
]

export default function Navbar() {
  const [search, setSearch]                   = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All category')
  const [profileOpen, setProfileOpen]         = useState(false)

  const { totalItems }          = useCart()
  const { user, logout, isAdmin } = useAuth()
  const navigate                = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(search.trim() ? `/products?q=${encodeURIComponent(search.trim())}` : '/products')
  }

  return (
    <header className="bg-white border-b border-[#DEE2E7]">
      {/* Top row */}
      <div className="max-w-[1200px] mx-auto px-4 h-[60px] flex items-center gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-[#0D6EFD] rounded flex items-center justify-center">
            <span className="material-icons-outlined text-white text-[18px]">shopping_bag</span>
          </div>
          <span className="text-xl font-bold text-[#1C1C1C]">Brand</span>
        </Link>

        {/* Search */}
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
            onChange={e => setSelectedCategory(e.target.value)}
            className="border-l border-[#DEE2E7] px-3 text-sm text-[#1C1C1C] outline-none bg-white"
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <button type="submit" className="bg-[#0D6EFD] hover:bg-blue-700 text-white px-5 text-sm font-medium transition-colors">
            Search
          </button>
        </form>

        {/* Right icons */}
        <div className="flex items-center gap-5 ml-auto shrink-0">

          {/* Profile — auth-aware */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setProfileOpen(o => !o)}
                className="flex flex-col items-center gap-0.5 text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors"
              >
                <FaUser className="text-[#8B96A5] text-[18px]" />
                <span className="text-[11px] text-[#8B96A5]">{user.name.split(' ')[0]}</span>
              </button>
            ) : (
              <Link to="/login" className="flex flex-col items-center gap-0.5 text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors">
                <FaUser className="text-[#8B96A5] text-[18px]" />
                <span className="text-[11px] text-[#8B96A5]">Profile</span>
              </Link>
            )}

            {/* Dropdown */}
            {user && profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-[180px] bg-white border border-[#DEE2E7] rounded-lg shadow-lg z-50">
                  <div className="px-4 py-3 border-b border-[#DEE2E7]">
                    <p className="text-sm font-semibold text-[#1C1C1C]">{user.name}</p>
                    <p className="text-xs text-[#8B96A5] truncate">{user.email}</p>
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1C1C1C] hover:bg-[#F7F7F7]"
                    >
                      <span className="material-icons text-[16px]">admin_panel_settings</span>
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to="/orders"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1C1C1C] hover:bg-[#F7F7F7]"
                  >
                    <span className="material-icons text-[16px]">list_alt</span>
                    My Orders
                  </Link>
                  <button
                    onClick={() => { logout(); setProfileOpen(false); navigate("/login") }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-[#E53935] hover:bg-[#F7F7F7] border-t border-[#DEE2E7]"
                  >
                    <span className="material-icons text-[16px]">logout</span>
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Message */}
          {/* Home  */}
          <Link to="/" className="flex flex-col items-center gap-0.5 text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors">
            <MdHome className="text-[#8B96A5] text-[20px]" />
            <span className="text-[11px] text-[#8B96A5]">Home</span>
          </Link>

          <Link to="/products" className="flex flex-col items-center gap-0.5 text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors">
            <MdInventory2  className="text-[#8B96A5] text-[20px]" />
            <span className="text-[11px] text-[#8B96A5]">Products</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="flex flex-col items-center gap-0.5 text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors relative">
            <FaShoppingCart className="text-[#8B96A5] text-[20px]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E53935] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
            <span className="text-[11px] text-[#8B96A5]">My cart</span>
          </Link>

        </div>
      </div>

      {/* Bottom row — unchanged from your version */}
      <div className="border-t border-[#DEE2E7]">
        <div className="max-w-[1200px] mx-auto px-4 h-[48px] flex items-center justify-between">
          <nav className="flex items-center gap-6">
            <Link to="/products" className="flex items-center gap-2 text-sm font-medium text-[#1C1C1C] hover:text-[#0D6EFD]">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <rect width="18" height="2" rx="1" fill="currentColor" />
                <rect y="6" width="18" height="2" rx="1" fill="currentColor" />
                <rect y="12" width="18" height="2" rx="1" fill="currentColor" />
              </svg>
              All category
            </Link>
            {['Hot offers', 'Gift boxes', 'Products', 'Menu item'].map(item => (
              <Link key={item} to="/products" className="text-sm text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors hidden lg:block">
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