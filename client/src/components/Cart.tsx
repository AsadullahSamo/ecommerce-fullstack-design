import { useState } from 'react'
import { Link } from 'react-router-dom'


interface CartItem {
  id: string
  name: string
  size: string
  color: string
  material: string
  seller: string
  price: number
  qty: number
  image: string
}

interface SavedItem {
  id: string
  name: string
  price: number
  image: string
}

const INITIAL_CART: CartItem[] = [
  { id: '1', name: 'T-shirts with multiple colors, for men and lady', size: 'medium', color: 'blue', material: 'Plastic', seller: 'Artel Market',    price: 78.99,  qty: 9, image: '/assets/products/product-1.png' },
  { id: '2', name: 'T-shirts with multiple colors, for men and lady', size: 'medium', color: 'blue', material: 'Plastic', seller: 'Best factory LLC', price: 39.00,  qty: 3, image: '/assets/products/product-2.png' },
  { id: '3', name: 'T-shirts with multiple colors, for men and lady', size: 'medium', color: 'blue', material: 'Plastic', seller: 'Artel Market',    price: 170.50, qty: 1, image: '/assets/products/product-3.png' },
]

const INITIAL_SAVED: SavedItem[] = [
  { id: '4', name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, image: '/assets/products/product-4.png' },
  { id: '5', name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, image: '/assets/products/product-5.png' },
  { id: '6', name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, image: '/assets/products/product-6.png' },
  { id: '7', name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, image: '/assets/products/product-1.png' },
]

export default function Cart() {
  const [cartItems, setCartItems]         = useState<CartItem[]>(INITIAL_CART)
  const [savedItems, setSavedItems]       = useState<SavedItem[]>(INITIAL_SAVED)
  const [coupon, setCoupon]               = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const updateQty = (id: string, qty: number) =>
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty } : item))

  const removeItem = (id: string) =>
    setCartItems(prev => prev.filter(item => item.id !== id))

  const saveForLater = (id: string) => {
    const item = cartItems.find(i => i.id === id)
    if (!item) return
    setCartItems(prev => prev.filter(i => i.id !== id))
    setSavedItems(prev => [...prev, { id: item.id, name: item.name, price: item.price, image: item.image }])
  }

  const moveToCart = (id: string) => {
    const item = savedItems.find(i => i.id === id)
    if (!item) return
    setSavedItems(prev => prev.filter(i => i.id !== id))
    setCartItems(prev => [...prev, { ...item, size: 'medium', color: 'blue', material: 'Plastic', seller: 'Artel Market', qty: 1 }])
  }

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)
  const discount = couponApplied ? 60 : 0
  const tax      = 14
  const total    = subtotal - discount + tax

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-6">

        <h1 className="text-xl font-semibold text-[#1C1C1C] mb-4">
          My cart ({cartItems.length})
        </h1>

        <div className="flex flex-col lg:flex-row gap-4 items-start">

           {/* ── Cart items ── */}
        <div className="flex-1 min-w-0">

          <div className="bg-white rounded-md border border-[#DEE2E7] divide-y divide-[#DEE2E7] mb-4">
            {cartItems.length === 0 ? (
              <div className="p-10 text-center">
                <span className="material-icons text-[48px] text-[#DEE2E7]">shopping_cart</span>
                <p className="text-[#8B96A5] mt-2">Your cart is empty</p>
                <Link
                  to="/products"
                  className="inline-block mt-4 bg-[#0D6EFD] text-white text-sm font-medium px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Browse products
                </Link>
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-[70px] h-[70px] shrink-0 border border-[#DEE2E7] rounded flex items-center justify-center bg-white overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-[#1C1C1C] leading-snug">{item.name}</p>
                        <button className="lg:hidden text-[#8B96A5] shrink-0">
                          <span className="material-icons text-[20px]">more_vert</span>
                        </button>
                        <p className="hidden lg:block text-base font-bold text-[#1C1C1C] shrink-0">${item.price.toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-[#8B96A5] mt-0.5">Size: {item.size}, Color: {item.color}, Material: {item.material}</p>
                      <p className="text-xs text-[#8B96A5]">Seller: {item.seller}</p>
                    </div>
                  </div>

                  {/* Mobile: price + qty on same row */}
                  <div className="flex items-center justify-between mt-3 lg:hidden">
                    <div className="flex items-center border border-[#DEE2E7] rounded overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[#F7F7F7]"
                      >
                        <span className="material-icons text-[16px]">remove</span>
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[#F7F7F7]"
                      >
                        <span className="material-icons text-[16px]">add</span>
                      </button>
                    </div>
                    <p className="text-base font-bold text-[#1C1C1C]">${item.price.toFixed(2)}</p>
                  </div>

                  {/* Desktop: qty dropdown — hidden on mobile */}
                  <div className="hidden lg:flex items-center justify-between mt-0">
                    <div className="flex items-center gap-2 mt-3">
                      <button onClick={() => removeItem(item.id)} className="text-xs border border-[#DEE2E7] text-[#E53935] px-3 py-1.5 rounded hover:bg-red-50 transition-colors">Remove</button>
                      <button onClick={() => saveForLater(item.id)} className="text-xs border border-[#DEE2E7] text-[#0D6EFD] px-3 py-1.5 rounded hover:bg-blue-50 transition-colors">Save for later</button>
                    </div>
                    <select
                      value={item.qty}
                      onChange={e => updateQty(item.id, Number(e.target.value))}
                      className="border border-[#DEE2E7] rounded px-3 py-1.5 text-sm outline-none focus:border-[#0D6EFD] bg-white min-w-[100px]"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={n}>Qty: {n}</option>
                      ))}
                    </select>
                  </div>

                  {/* Mobile remove/save buttons */}
                  <div className="flex items-center gap-2 mt-3 lg:hidden">
                    <button onClick={() => removeItem(item.id)} className="text-xs border border-[#DEE2E7] text-[#E53935] px-3 py-1.5 rounded hover:bg-red-50 transition-colors">Remove</button>
                    <button onClick={() => saveForLater(item.id)} className="text-xs border border-[#DEE2E7] text-[#0D6EFD] px-3 py-1.5 rounded hover:bg-blue-50 transition-colors">Save for later</button>
                  </div>
                </div>
              ))
            )}

             <div className="flex items-center justify-between px-4 py-3">
              <Link
                to="/products"
                className="flex items-center gap-2 bg-[#0D6EFD] hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded transition-colors"
              >
                <span className="material-icons text-[18px]">arrow_back</span>
                Back to shop
              </Link>
              <button
                onClick={() => setCartItems([])}
                className="text-sm border border-[#DEE2E7] text-[#0D6EFD] px-5 py-2.5 rounded hover:bg-blue-50 transition-colors"
              >
                Remove all
              </button>
            </div>
          </div>

            {/* Trust badges */}
            <div className="bg-white rounded-md border border-[#DEE2E7] mt-4 px-6 py-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: 'lock',           label: 'Secure payment',   sub: 'Have you ever finally just' },
                  { icon: 'headset_mic',    label: 'Customer support', sub: 'Have you ever finally just' },
                  { icon: 'local_shipping', label: 'Free delivery',    sub: 'Have you ever finally just' },
                ].map(({ icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EEF3FD] flex items-center justify-center shrink-0">
                      <span className="material-icons text-[#8B96A5] text-[20px]">{icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1C1C1C]">{label}</p>
                      <p className="text-xs text-[#8B96A5]">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Order summary ── */}
          <div className="w-full lg:w-[300px] shrink-0 space-y-3">

            {/* Coupon */}
            <div className="bg-white rounded-md border border-[#DEE2E7] p-4">
              <p className="text-sm font-medium text-[#1C1C1C] mb-3">Have a coupon?</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add coupon"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  className="flex-1 min-w-0 border border-[#DEE2E7] rounded px-3 py-2 text-sm outline-none focus:border-[#0D6EFD]"
                />
                <button
                  onClick={() => coupon.trim() && setCouponApplied(true)}
                  className="shrink-0 border border-[#0D6EFD] text-[#0D6EFD] text-sm font-medium px-4 py-2 rounded hover:bg-blue-50 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Totals */}
            <div className="bg-white rounded-md border border-[#DEE2E7] p-4">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B96A5]">Subtotal:</span>
                  <span className="font-medium text-[#1C1C1C]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B96A5]">Discount:</span>
                  <span className="font-medium text-[#E53935]">- ${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B96A5]">Tax:</span>
                  <span className="font-medium text-green-500">+ ${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-[#DEE2E7] pt-3 flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#1C1C1C]">Total:</span>
                  <span className="text-xl font-bold text-[#1C1C1C]">${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-[#00B517] hover:bg-green-600 text-white font-medium py-3 rounded transition-colors text-sm mb-3">
                Checkout
              </button>
              <div className="flex items-center justify-center gap-3 mt-3">
                {['amex', 'mastercard', 'paypal', 'visa', 'applepay'].map(name => (
                  <img
                    key={name}
                    src={`/assets/payment/${name}.png`}
                    alt={name}
                    className="h-6 object-contain"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Saved for later ── */}
        {savedItems.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold text-base text-[#1C1C1C] mb-3">Saved for later</h2>

            {/* Mobile: list layout */}
            <div className="flex flex-col gap-3 md:hidden">
              {savedItems.map((item, i) => (
                <div key={`${item.id}-${i}`} className="bg-white rounded-md border border-[#DEE2E7] p-4 flex gap-3">
                  <div className="w-[80px] h-[80px] shrink-0 bg-[#F7F7F7] rounded flex items-center justify-center overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1C1C1C] mb-1">{item.name}</p>
                    <p className="text-sm font-bold text-[#1C1C1C] mb-3">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveToCart(item.id)}
                        className="text-xs border border-[#0D6EFD] text-[#0D6EFD] px-3 py-1.5 rounded hover:bg-blue-50 transition-colors font-medium"
                      >
                        Move to cart
                      </button>
                      <button
                        onClick={() => setSavedItems(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-xs border border-[#DEE2E7] text-[#E53935] px-3 py-1.5 rounded hover:bg-red-50 transition-colors font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: grid layout */}
            <div className="hidden md:grid grid-cols-4 gap-4">
              {savedItems.map((item, i) => (
                <div key={`${item.id}-${i}`} className="bg-white rounded-md border border-[#DEE2E7] p-4">
                  <div className="flex items-center justify-center h-[140px] mb-3 bg-[#F7F7F7] rounded">
                    <img src={item.image} alt={item.name} className="max-h-full object-contain" />
                  </div>
                  <p className="text-sm font-bold text-[#1C1C1C] mb-1">${item.price.toFixed(2)}</p>
                  <p className="text-xs text-[#8B96A5] line-clamp-2 mb-3">{item.name}</p>
                  <button
                    onClick={() => moveToCart(item.id)}
                    className="flex items-center gap-1 text-xs text-[#0D6EFD] hover:underline font-medium"
                  >
                    <span className="material-icons text-[16px]">shopping_cart</span>
                    Move to cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Promo banner ── */}
        <div
          className="rounded-md overflow-hidden flex items-center justify-between px-10 py-6 mt-6"
          style={{ background: 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)' }}
        >
          <div className="text-white mr-4">
            <h3 className="text-base md:text-xl font-bold mb-1">Super discount on more than 100 USD</h3>
            <p className="text-sm opacity-80 md:text-xl font-bold mb-1">Have you ever finally just write dummy info</p>
          </div>
          <Link
            to="/products"
            className="bg-[#FF9017] hover:bg-orange-500 text-white font-medium px-6 py-2.5 rounded transition-colors text-sm shrink-0"
          >
            Shop now
          </Link>
        </div>

      </div>
    </div>
  )
}