import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaCcApplePay } from 'react-icons/fa'
import { useState } from 'react'
import Breadcrumb from '../components/Breadcrumb'



export default function Cart() {
  const {
    items, savedItems,
    removeFromCart, updateQty,
    saveForLater, moveToCart, clearCart,
  } = useCart()


  const [coupon, setCoupon]               = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const TAX = items.reduce((sum, i) => sum + i.product.price * i.qty, 0) * 0.05


  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const discount = couponApplied ? subtotal * 0.2 : 0
  const total    = subtotal - discount + TAX

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-6">

        <Breadcrumb />

        <h1 className="text-xl font-semibold text-[#1C1C1C] mb-4">
          My cart ({items.length})
        </h1>

        <div className="flex flex-col lg:flex-row gap-4 items-start">

          {/* ── Cart items ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-md border border-[#DEE2E7] divide-y divide-[#DEE2E7]">
              {items.length === 0 ? (
                <div className="p-10 text-center">
                  <span className="material-icons text-[48px] text-[#DEE2E7]">shopping_cart</span>
                  <p className="text-[#8B96A5] mt-2">Your cart is empty</p>
                  <Link to="/products" className="inline-block mt-4 bg-[#0D6EFD] text-white text-sm font-medium px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                    Browse products
                  </Link>
                </div>
              ) : (
                <>
                  {items.map(({ product, qty }) => (
                    <div key={product._id} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-[70px] h-[70px] shrink-0 border border-[#DEE2E7] rounded flex items-center justify-center bg-white overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-[#1C1C1C] leading-snug">{product.name}</p>
                            <button className="lg:hidden text-[#8B96A5] shrink-0">
                              <span className="material-icons text-[20px]">more_vert</span>
                            </button>
                            <p className="hidden lg:block text-base font-bold text-[#1C1C1C] shrink-0">${(product.price * qty).toFixed(2)}</p>
                          </div>
                          <p className="text-xs text-[#8B96A5] mt-0.5">Category: {product.category}</p>
                          <p className="text-xs text-[#8B96A5]">Seller: {product.seller.name}</p>
                        </div>
                      </div>

                      {/* Mobile: price + qty */}
                      <div className="flex items-center justify-between mt-3 lg:hidden">
                        <div className="flex items-center border border-[#DEE2E7] rounded overflow-hidden">
                          <button
                            onClick={() => updateQty(product._id, Math.max(1, qty - 1))}
                            className="w-8 h-8 flex items-center justify-center hover:bg-[#F7F7F7]"
                          >
                            <span className="material-icons text-[16px]">remove</span>
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{qty}</span>
                          <button
                            onClick={() => updateQty(product._id, qty + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-[#F7F7F7]"
                          >
                            <span className="material-icons text-[16px]">add</span>
                          </button>
                        </div>
                        <p className="text-base font-bold text-[#1C1C1C]">${(product.price * qty).toFixed(2)}</p>
                      </div>

                      {/* Desktop: qty dropdown */}
                      <div className="hidden lg:flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(product._id)}
                            className="text-xs border border-[#DEE2E7] text-[#E53935] px-3 py-1.5 rounded hover:bg-red-50 transition-colors"
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => saveForLater(product._id)}
                            className="text-xs border border-[#DEE2E7] text-[#0D6EFD] px-3 py-1.5 rounded hover:bg-blue-50 transition-colors"
                          >
                            Save for later
                          </button>
                        </div>
                        <select
                          value={qty}
                          onChange={e => updateQty(product._id, Number(e.target.value))}
                          className="border border-[#DEE2E7] rounded px-3 py-1.5 text-sm outline-none focus:border-[#0D6EFD] bg-white min-w-[100px]"
                        >
                          {[1,2,3,4,5,6,7,8,9,10].map(n => (
                            <option key={n} value={n}>Qty: {n}</option>
                          ))}
                        </select>
                      </div>

                      {/* Mobile remove/save */}
                      <div className="flex items-center gap-2 mt-3 lg:hidden">
                        <button
                          onClick={() => removeFromCart(product._id)}
                          className="text-xs border border-[#DEE2E7] text-[#E53935] px-3 py-1.5 rounded hover:bg-red-50 transition-colors"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => saveForLater(product._id)}
                          className="text-xs border border-[#DEE2E7] text-[#0D6EFD] px-3 py-1.5 rounded hover:bg-blue-50 transition-colors"
                        >
                          Save for later
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Back to shop + Remove all */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <Link
                      to="/products"
                      className="flex items-center gap-2 bg-[#0D6EFD] hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded transition-colors"
                    >
                      <span className="material-icons text-[18px]">arrow_back</span>
                      Back to shop
                    </Link>
                    <button
                      onClick={clearCart}
                      className="text-sm text-[#0D6EFD] hover:underline"
                    >
                      Remove all
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Trust badges */}
            <div className="bg-white rounded-md border border-[#DEE2E7] mt-4 px-6 py-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: 'lock',           label: 'Secure payment',   sub: 'Have you ever finally just' },
                  { icon: 'headset_mic',    label: 'Customer support', sub: 'Have you ever finally just' },
                  { icon: 'local_shipping', label: 'Fast delivery',    sub: 'Have you ever finally just' },
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
                  <span className="font-medium text-green-500">+ ${TAX.toFixed(2)}</span>
                </div>
                <div className="border-t border-[#DEE2E7] pt-3 flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#1C1C1C]">Total:</span>
                  <span className="text-xl font-bold text-[#1C1C1C]">${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-[#00B517] hover:bg-green-600 text-white font-medium py-3 rounded transition-colors text-sm mb-3">
                Checkout ({items.length} items)
              </button>
              <div className="flex items-center justify-center gap-3">
                <FaCcAmex       size={32} />
                <FaCcMastercard size={32} />
                <FaCcPaypal     size={32} />
                <FaCcVisa       size={32} />
                <FaCcApplePay   size={32} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Saved for later ── */}
        {savedItems.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold text-base text-[#1C1C1C] mb-3">Saved for later</h2>

            {/* Mobile */}
            <div className="flex flex-col gap-3 md:hidden">
              {savedItems.map(({ product }) => (
                <div key={product._id} className="bg-white rounded-md border border-[#DEE2E7] p-4 flex gap-3">
                  <div className="w-[80px] h-[80px] shrink-0 bg-[#F7F7F7] rounded flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1C1C1C] mb-1">{product.name}</p>
                    <p className="text-sm font-bold text-[#1C1C1C] mb-3">${product.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveToCart(product._id)}
                        className="text-xs border border-[#0D6EFD] text-[#0D6EFD] px-3 py-1.5 rounded hover:bg-blue-50 transition-colors"
                      >
                        Move to cart
                      </button>
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="text-xs border border-[#DEE2E7] text-[#E53935] px-3 py-1.5 rounded hover:bg-red-50 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop */}
            <div className="hidden md:grid grid-cols-4 gap-4">
              {savedItems.map(({ product }) => (
                <div key={product._id} className="bg-white rounded-md border border-[#DEE2E7] p-4">
                  <div className="flex items-center justify-center h-[140px] mb-3 bg-[#F7F7F7] rounded">
                    <img src={product.image} alt={product.name} className="max-h-full object-contain" />
                  </div>
                  <p className="text-sm font-bold text-[#1C1C1C] mb-1">${product.price.toFixed(2)}</p>
                  <p className="text-xs text-[#8B96A5] line-clamp-2 mb-3">{product.name}</p>
                  <button
                    onClick={() => moveToCart(product._id)}
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
          <div className="text-white">
            <h3 className="text-base md:text-xl font-bold mb-1">Super discount on more than 100 USD</h3>
            <p className="text-sm opacity-80">Have you ever finally just write dummy info</p>
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