import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface Props {
  open: boolean
  onClose: () => void
}

const homeIcon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M7 18v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
const categoriesIcon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="2" rx="1" fill="currentColor"/><rect x="2" y="9" width="16" height="2" rx="1" fill="currentColor"/><rect x="2" y="14" width="16" height="2" rx="1" fill="currentColor"/></svg>
const favoritesIcon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 16s-7-4.5-7-9a4 4 0 018 0 4 4 0 018 0c0 4.5-7 9-7 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
const ordersIcon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 7h6M7 11h6M7 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
const globeIcon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M10 2c0 0-4 3-4 8s4 8 4 8M10 2c0 0 4 3 4 8s-4 8-4 8M2 10h16" stroke="currentColor" strokeWidth="1.5"/></svg>
const contactIcon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5"/><path d="M2 6l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
const aboutIcon = <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 7h2v6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="5.5" r="1" fill="currentColor"/></svg>

const navItems = [
  { label: 'Home',       to: '/',         icon: homeIcon       },
  { label: 'Categories', to: '/products', icon: categoriesIcon },
  { label: 'Favorites',  to: '/favorites', icon: favoritesIcon },
  { label: 'My orders',  to: '/orders',   icon: ordersIcon     },
]

const secondaryItems = [
  { label: 'English | USD', icon: globeIcon   },
  { label: 'Contact us',    icon: contactIcon },
  { label: 'About',         icon: aboutIcon   },
]

export default function MobileNav({ open, onClose }: Props) {
  const { user, logout, isAdmin } = useAuth()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="w-[75vw] max-w-[320px] bg-white h-full flex flex-col shadow-xl">

        {/* Header */}
        <div className="bg-[#F7F7F7] px-5 py-6 flex items-start justify-between">
          <div>
            <div className="w-12 h-12 rounded-full bg-gray-300 mb-3 overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                <circle cx="24" cy="20" r="10" fill="#9CA3AF" />
                <ellipse cx="24" cy="42" rx="16" ry="10" fill="#9CA3AF" />
              </svg>
            </div>
            {user ? (
              <div>
                <p className="text-sm font-semibold text-[#1C1C1C]">{user.name}</p>
                <p className="text-xs text-[#8B96A5]">{user.email}</p>
              </div>
            ) : (
              <p className="text-sm text-[#1C1C1C]">
                <Link to="/login" className="hover:underline" onClick={onClose}>Sign in</Link>
                {' | '}
                <Link to="/register" className="hover:underline" onClick={onClose}>Register</Link>
              </p>
            )}
          </div>
          <button onClick={onClose} className="text-[#8B96A5] hover:text-[#1C1C1C] mt-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Primary nav */}
        <nav className="flex-1 overflow-y-auto">
          <ul>
            {navItems.map(({ label, to, icon }) => (
              <li key={label}>
                <Link
                  to={to}
                  onClick={onClose}
                  className="flex items-center gap-4 px-5 py-4 text-[#1C1C1C] hover:bg-[#F7F7F7] transition-colors text-sm"
                >
                  <span className="text-[#8B96A5]">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link
                  to="/admin"
                  onClick={onClose}
                  className="flex items-center gap-4 px-5 py-4 text-[#1C1C1C] hover:bg-[#F7F7F7] transition-colors text-sm"
                >
                  <span className="material-icons text-[#8B96A5] text-[20px]">admin_panel_settings</span>
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>

          <div className="border-t border-[#DEE2E7]" />

          <ul>
            {secondaryItems.map(({ label, icon }) => (
              <li key={label}>
                <button className="flex items-center gap-4 px-5 py-4 text-[#1C1C1C] hover:bg-[#F7F7F7] w-full text-sm">
                  <span className="text-[#8B96A5]">{icon}</span>
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t border-[#DEE2E7]" />

          <ul>
            {['User agreement', 'Partnership', 'Privacy policy'].map(label => (
              <li key={label}>
                <button className="flex items-center px-5 py-4 text-[#8B96A5] text-sm hover:text-[#1C1C1C] w-full">
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {user && (
            <>
              <div className="border-t border-[#DEE2E7]" />
              <button
                onClick={() => { logout(); onClose() }}
                className="flex items-center gap-4 px-5 py-4 text-[#E53935] hover:bg-[#F7F7F7] w-full text-sm"
              >
                <span className="material-icons text-[20px]">logout</span>
                Sign out
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Backdrop */}
      <div className="flex-1 bg-black/50" onClick={onClose} />
    </div>
  )
}