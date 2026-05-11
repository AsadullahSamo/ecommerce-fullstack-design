import { DE } from 'country-flag-icons/react/3x2'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProduct, useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import Breadcrumb from '../components/Breadcrumb'


type Tab = 'description' | 'reviews' | 'shipping' | 'about'

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className={`material-icons text-[16px] ${i <= Math.round(value / 2) ? 'text-[#FF9017]' : 'text-[#DEE2E7]'}`}
        >
          star
        </span>
      ))}
    </div>
  )
}

export default function ProductDetails() {
  const { id } = useParams()
  const {product, loading, error} = useProduct(id)
  const [activeTab, setActiveTab] = useState<Tab>('description')

  const { addToCart, items } = useCart()
  const inCart = items.some(i => i.product._id === product?._id)

  const { products: relatedProducts } = useProducts({
    category: product?.category,
    limit: 6,
  })



  const tabs: { key: Tab; label: string }[] = [
    { key: 'description',  label: 'Description'  },
    { key: 'reviews',      label: 'Reviews'      },
    { key: 'shipping',     label: 'Shipping'      },
    { key: 'about',        label: 'About seller'  },
  ]

   if (loading) return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <div className="bg-white rounded-md border border-[#DEE2E7] p-6 animate-pulse">
          <div className="flex gap-6">
            <div className="w-[280px] h-[280px] bg-[#F7F7F7] rounded-md" />
            <div className="flex-1 space-y-4">
              <div className="h-4 bg-[#F7F7F7] rounded w-3/4" />
              <div className="h-4 bg-[#F7F7F7] rounded w-1/2" />
              <div className="h-8 bg-[#F7F7F7] rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (error || !product) return (
    <div className="bg-[#F7F7F7] min-h-screen flex items-center justify-center">
      <div className="text-center">
        <span className="material-icons text-[48px] text-[#DEE2E7]">inventory_2</span>
        <p className="text-[#8B96A5] mt-2">{error || 'Product not found'}</p>
        <Link to="/products" className="inline-block mt-4 bg-[#0D6EFD] text-white text-sm font-medium px-6 py-2 rounded hover:bg-blue-700 transition-colors">
          Browse products
        </Link>
      </div>
    </div>
  )

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-4">

        <Breadcrumb />

        {/* ── Main product section ── */}
          <div className="bg-white rounded-md border border-[#DEE2E7] p-4 md:p-6 mb-4">
            <div className="flex flex-col md:flex-row gap-6">

              {/* Image gallery */}
              <div className="w-full md:w-[280px] shrink-0">
                <div className="border border-[#DEE2E7] rounded-md flex items-center justify-center h-[240px] md:h-[280px] mb-3 overflow-hidden">
                  <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                </div>
              </div>

              {/* Product info + Supplier — stack on mobile */}
              <div className="flex flex-col md:flex-row gap-4 flex-1 min-w-0">

                {/* Product info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`material-icons ${product.stock > 0 ? 'text-[#00B517]' : 'text-[#E53935]'} text-[16px]`}>{product.stock > 0 ? 'check_circle' : 'highlight_off'}</span>
                    <span className={`text-sm ${product.stock > 0 ? 'text-[#00B517]' : 'text-[#E53935]'} font-medium`}>{product.stock > 0 ? 'In stock' : 'Out of stock'}</span>
                  </div>
                  <h1 className="text-lg md:text-xl font-semibold text-[#1C1C1C] mb-3 leading-snug">{product.name}</h1>
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <StarRating value={product.rating} />
                    <span className="text-sm font-semibold text-[#FF9017]">{product.rating}</span>
                    <span className="hidden sm:inline text-[#DEE2E7]">|</span>
                    <div className="w-full sm:hidden" />
                    <span className="material-icons text-[#8B96A5] text-[16px]">chat_bubble_outline</span>
                    <span className="text-sm text-[#8B96A5]">{product.reviews} reviews</span>
                    <span className="text-[#DEE2E7]">|</span>
                    <span className="material-icons text-[#8B96A5] text-[16px]">shopping_basket</span>
                    <span className="text-sm text-[#8B96A5]">{product.sold} sold</span>
                  </div>

                  {/* Pricing tiers */}
                  <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden mb-4 w-full md:w-fit">
                    {product.pricingTiers?.map((tier, i) => (
                      <div
                        key={i}
                        className={`flex-1 md:flex-none px-3 md:px-5 py-3 text-center ${i === 0 ? 'bg-[#FFF3E8]' : ''} ${i < (product.pricingTiers?.length ?? 0) - 1 ? 'border-r border-[#DEE2E7]' : ''}`}
                      >
                        <p className={`text-sm md:text-base font-bold ${i === 0 ? 'text-[#E53935]' : 'text-[#1C1C1C]'}`}>
                          ${tier.price?.toFixed(2)}
                        </p>
                        <p className="text-xs text-[#8B96A5]">{tier.range}</p>
                      </div>
                    ))}
                  </div>

                  {/* Specs */}
                  {product.specs && Object.keys(product.specs).length > 0 && (
                    <table className="w-full text-sm mb-2">
                      <tbody>
                        {Object.entries(product.specs).map(([key, value]) => (
                          <tr key={key} className="border-b border-[#F7F7F7] last:border-0">
                            <td className="py-1.5 text-[#8B96A5] w-[120px] md:w-[140px] align-top shrink-0">{key}:</td>
                            <td className="py-1.5 text-[#1C1C1C]">{value as string}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Supplier card */}
                <div className="w-full md:w-[220px] shrink-0 space-y-3">
                  <div className="border border-[#DEE2E7] rounded-md p-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-[#DEE2E7] mb-4">
                      <div className="w-12 h-12 rounded-md bg-[#C5EEE6] flex items-center justify-center shrink-0">
                        <span className="text-lg font-bold text-[#1A9882]">R</span>
                      </div>
                      <div>
                        <p className="text-xs text-[#8B96A5]">Supplier</p>
                        <p className="text-sm font-semibold text-[#1C1C1C]">Guanjoi Trading LLC</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <DE className="w-5 h-3.5 rounded-sm shrink-0" />
                        <span className="text-sm text-[#8B96A5]">Germany, Berlin</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-icons text-[#8B96A5] text-[18px]">verified_user</span>
                        <span className="text-sm text-[#8B96A5]">Verified Seller</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-icons text-[#8B96A5] text-[18px]">language</span>
                        <span className="text-sm text-[#8B96A5]">Worldwide shipping</span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className={`w-full text-sm font-medium py-2.5 rounded mb-2 transition-colors ${
                        inCart
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-[#0D6EFD] hover:bg-blue-700 text-white'
                      }`}
                    >
                      {inCart ? 'Added to cart ✓' : 'Add to cart'}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── Tabs + You may like ── */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Tabs content */}
            <div className="flex-1 min-w-0 bg-white rounded-md border border-[#DEE2E7]">
              <div className="flex border-b border-[#DEE2E7] overflow-x-auto scrollbar-hide">
                {tabs.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`shrink-0 px-4 md:px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                      activeTab === key
                        ? 'border-[#0D6EFD] text-[#0D6EFD]'
                        : 'border-transparent text-[#8B96A5] hover:text-[#1C1C1C]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="p-4 md:p-6">
                {activeTab === 'description' && (
                  <div>
                    <p className="text-sm text-[#505050] leading-relaxed mb-6 whitespace-pre-line">{product.description}</p>
                    <div className="overflow-x-auto mb-6">
                      <table className="border border-[#DEE2E7] text-sm w-full">
                        <tbody>
                          {product.specTable?.map(({ label, value }) => (
                            <tr key={label} className="border-b border-[#DEE2E7] last:border-0">
                              <td className="px-3 md:px-4 py-2 text-[#8B96A5] bg-[#F7F7F7] w-[120px] md:w-[160px] border-r border-[#DEE2E7] shrink-0">{label}</td>
                              <td className="px-3 md:px-4 py-2 text-[#1C1C1C]">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <ul className="space-y-2">
                      {product.features?.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#505050]">
                          <span className="material-icons text-[#1C1C1C] text-[16px] mt-0.5">check</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'reviews' && <p className="text-sm text-[#8B96A5]">No reviews yet.</p>}
                {activeTab === 'shipping' && <p className="text-sm text-[#8B96A5]">Worldwide shipping available. Delivery in 7-14 business days.</p>}
                {activeTab === 'about' && <p className="text-sm text-[#8B96A5]">{product.seller.name} — {product.seller.verified} seller based in {product.seller.location}.</p>}
              </div>
            </div>

            {/* You may like */}
            <div className="w-full md:w-[200px] shrink-0 bg-white rounded-md border border-[#DEE2E7] p-4">
              <h3 className="text-sm font-semibold text-[#1C1C1C] mb-3">You may like</h3>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                {relatedProducts.slice(0, 5).map(item => (
                  <Link key={item._id} to={`/products/${item._id}`} className="flex items-center gap-3 group">
                    <div className="w-12 h-12 shrink-0 border border-[#DEE2E7] rounded flex items-center justify-center overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                    </div>
                    <div>
                      <p className="text-xs text-[#1C1C1C] line-clamp-2 group-hover:text-[#0D6EFD] transition-colors">{item.name}</p>
                      <p className="text-xs text-[#8B96A5] mt-0.5">{item.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        {/* ── Related products ── */}
        <div className="mb-4">
          <h2 className="font-semibold text-base text-[#1C1C1C] mb-3">Related products</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {relatedProducts.map(p => (
              <Link
                key={p._id}
                to={`/products/${p._id}`}
                className="bg-white rounded-md border border-[#DEE2E7] p-3 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-center h-[100px] mb-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-xs text-[#1C1C1C] line-clamp-2 mb-1">{p.name}</p>
                <p className="text-xs text-[#8B96A5]">{p.price}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Promo banner ── */}
        <div
          className="rounded-md overflow-hidden flex items-center justify-between px-10 py-6"
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