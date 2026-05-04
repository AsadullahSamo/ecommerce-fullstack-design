import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import MobileNav from './MobileNav'
import Footer from './Footer'

export default function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F7]">
      {/* Desktop navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Mobile navbar */}
      <header className="md:hidden bg-white border-b border-[#DEE2E7]">
        <div className="px-4 h-[56px] flex items-center gap-3">
          <button onClick={() => setMobileNavOpen(true)} className="text-[#1C1C1C]">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect width="22" height="2" rx="1" fill="currentColor" />
              <rect y="9" width="22" height="2" rx="1" fill="currentColor" />
              <rect y="18" width="22" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>
          <Link to="/" className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-[#0D6EFD] rounded flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L7 3L12 11H2Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-[#1C1C1C]">Brand</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Link to="/cart" className="text-[#1C1C1C]">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M2 2h2.5l2.7 11h9.8l2.2-8H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9.5" cy="18.5" r="1.5" fill="currentColor" />
                <circle cx="16.5" cy="18.5" r="1.5" fill="currentColor" />
              </svg>
            </Link>
            <Link to="/profile" className="text-[#1C1C1C]">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>
          </div>
        </div>
        {/* Mobile search */}
        <div className="px-4 pb-3">
          <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden bg-white">
            <svg className="ml-3 self-center shrink-0 text-[#8B96A5]" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-3 py-2 text-sm outline-none placeholder:text-[#8B96A5]"
            />
          </div>
        </div>
      </header>

      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}