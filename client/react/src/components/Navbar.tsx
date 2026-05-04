import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-[1170px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">E-commerce Website </Link>
        <nav className="flex gap-8 text-sm">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </div>
    </header>
  )
}