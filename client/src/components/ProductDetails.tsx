import { DE } from 'country-flag-icons/react/3x2'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

type Tab = 'description' | 'reviews' | 'shipping' | 'about'

const PRODUCT = {
  id: '1',
  name: 'Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle',
  inStock: true,
  rating: 9.3,
  reviews: 32,
  sold: 154,
  specs: {
    Price: 'Negotiable',
    Type: 'Classic shoes',
    Material: 'Plastic material',
    Design: 'Modern nice',
    Customization: 'Customized logo and design custom packages',
    Protection: 'Refund Policy',
    Warranty: '2 years full warranty',
  },
  pricingTiers: [
    { range: '50-100 pcs',  price: 98.00  },
    { range: '100-700 pcs', price: 90.00  },
    { range: '700+ pcs',    price: 78.00  },
  ],
  images: [
    '/assets/products/product-1.png',
    '/assets/products/product-2.png',
    '/assets/products/product-3.png',
    '/assets/products/product-4.png',
    '/assets/products/product-5.png',
    '/assets/products/product-6.png',
  ],
  description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,

Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
  specTable: [
    { label: 'Model', value: 'Model 2024' },
    { label: 'Model',       value: '#8786867'           },
    { label: 'Style',       value: 'Classic style'       },
    { label: 'Certificate', value: 'ISO-898921212'       },
    { label: 'Size',        value: '34mm x 450mm x 19mm' },
    { label: 'Memory',      value: '36GB RAM'            },
  ],
  features: [
    'Some great feature name here',
    'Lorem ipsum dolor sit amet, consectetur',
    'Duis aute irure dolor in reprehenderit',
    'Some great feature name here',
  ],
}

const YOU_MAY_LIKE = [
  { id: '1', name: 'Men Blazers Sets Elegant Formal',    price: '$7.00 - $99.50', image: '/assets/products/product-1.png' },
  { id: '2', name: 'Men Shirt Sleeve Polo Contrast',     price: '$7.00 - $99.50', image: '/assets/products/product-2.png' },
  { id: '3', name: 'Apple Watch Series Space Gray',      price: '$7.00 - $99.50', image: '/assets/products/product-3.png' },
  { id: '4', name: 'Basketball Crew Socks Long Stuff',   price: '$7.00 - $99.50', image: '/assets/products/product-4.png' },
  { id: '5', name: "New Summer Men's castrol T-Shirts",  price: '$7.00 - $99.50', image: '/assets/products/product-5.png' },
]

const RELATED_PRODUCTS = [
  { id: '1', name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: '/assets/products/product-1.png' },
  { id: '2', name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: '/assets/products/product-2.png' },
  { id: '3', name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: '/assets/products/product-3.png' },
  { id: '4', name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: '/assets/products/product-4.png' },
  { id: '5', name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: '/assets/products/product-5.png' },
  { id: '6', name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: '/assets/products/product-6.png' },
]

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
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<Tab>('description')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'description',  label: 'Description'  },
    { key: 'reviews',      label: 'Reviews'      },
    { key: 'shipping',     label: 'Shipping'      },
    { key: 'about',        label: 'About seller'  },
  ]

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

        {/* ── Main product section ── */}
        <div className="bg-white rounded-md border border-[#DEE2E7] p-6 mb-4">
          <div className="flex gap-6">

            {/* Image gallery */}
            <div className="w-[280px] shrink-0">
              <div className="border border-[#DEE2E7] rounded-md flex items-center justify-center h-[280px] mb-3 overflow-hidden">
                <img
                  src={PRODUCT.images[selectedImage]}
                  alt={PRODUCT.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {PRODUCT.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`border rounded aspect-square flex items-center justify-center overflow-hidden transition-colors ${
                      selectedImage === i ? 'border-[#0D6EFD]' : 'border-[#DEE2E7] hover:border-[#0D6EFD]'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-icons text-[#00B517] text-[16px]">check_circle</span>
                <span className="text-sm text-[#00B517] font-medium">In stock</span>
              </div>
              <h1 className="text-xl font-semibold text-[#1C1C1C] mb-3 leading-snug">
                {PRODUCT.name}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <StarRating value={PRODUCT.rating} />
                <span className="text-sm font-semibold text-[#FF9017]">{PRODUCT.rating}</span>
                <span className="text-[#DEE2E7]">|</span>
                <span className="material-icons text-[#8B96A5] text-[16px]">chat_bubble_outline</span>
                <span className="text-sm text-[#8B96A5]">{PRODUCT.reviews} reviews</span>
                <span className="text-[#DEE2E7]">|</span>
                <span className="material-icons text-[#8B96A5] text-[16px]">shopping_basket</span>
                <span className="text-sm text-[#8B96A5]">{PRODUCT.sold} sold</span>
              </div>

              {/* Pricing tiers */}
              <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden mb-4 w-fit">
                {PRODUCT.pricingTiers.map((tier, i) => (
                  <div
                    key={i}
                    className={`px-5 py-3 text-center ${i === 0 ? 'bg-[#FFF3E8]' : ''} ${i < PRODUCT.pricingTiers.length - 1 ? 'border-r border-[#DEE2E7]' : ''}`}
                  >
                    <p className={`text-base font-bold ${i === 0 ? 'text-[#E53935]' : 'text-[#1C1C1C]'}`}>
                      ${tier.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-[#8B96A5]">{tier.range}</p>
                  </div>
                ))}
              </div>

              {/* Specs */}
              <table className="w-full text-sm mb-2">
                <tbody>
                  {Object.entries(PRODUCT.specs).map(([key, value]) => (
                    <tr key={key} className="border-b border-[#F7F7F7] last:border-0">
                      <td className="py-1.5 text-[#8B96A5] w-[140px] align-top">{key}:</td>
                      <td className="py-1.5 text-[#1C1C1C]">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Supplier card */}
          <div className="w-[220px] shrink-0 space-y-3">
            <div className="border border-[#DEE2E7] rounded-md p-4">

              {/* Supplier header */}
              <div className="flex items-center gap-3 pb-4 border-b border-[#DEE2E7] mb-4">
                <div className="w-12 h-12 rounded-md bg-[#C5EEE6] flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-[#1A9882]">R</span>
                </div>
                <div>
                  <p className="text-xs text-[#8B96A5]">Supplier</p>
                  <p className="text-sm font-semibold text-[#1C1C1C]">Guanjoi Trading LLC</p>
                </div>
              </div>

              {/* Supplier details */}
              <div className="space-y-3 mb-5">
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

              <button className="w-full bg-[#0D6EFD] hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded mb-2 transition-colors">
                Send inquiry
              </button>
              <button className="w-full border border-[#DEE2E7] text-[#0D6EFD] text-sm font-medium py-2.5 rounded hover:bg-blue-50 transition-colors">
                Seller's profile
              </button>
            </div>

            {/* Save for later — outside the card */}
            <button className="flex items-center gap-2 text-sm text-[#0D6EFD] hover:text-blue-700 transition-colors px-1">
              <span className="material-icons text-[18px]">favorite_border</span>
              Save for later
            </button>
          </div>

          </div>
        </div>

        {/* ── Tabs + You may like ── */}
        <div className="flex gap-4 mb-4">

          {/* Tabs content */}
          <div className="flex-1 min-w-0 bg-white rounded-md border border-[#DEE2E7]">
            <div className="flex border-b border-[#DEE2E7]">
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === key
                      ? 'border-[#0D6EFD] text-[#0D6EFD]'
                      : 'border-transparent text-[#8B96A5] hover:text-[#1C1C1C]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div>
                  <p className="text-sm text-[#505050] leading-relaxed mb-6 whitespace-pre-line">
                    {PRODUCT.description}
                  </p>
                  <table className="border border-[#DEE2E7] text-sm mb-6">
                    <tbody>
                      {PRODUCT.specTable.map(({ label, value }) => (
                        <tr key={label} className="border-b border-[#DEE2E7] last:border-0">
                          <td className="px-4 py-2 text-[#8B96A5] bg-[#F7F7F7] w-[160px] border-r border-[#DEE2E7]">{label}</td>
                          <td className="px-4 py-2 text-[#1C1C1C]">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <ul className="space-y-2">
                    {PRODUCT.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#505050]">
                        <span className="material-icons text-[#1C1C1C] text-[16px] mt-0.5">check</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === 'reviews' && (
                <p className="text-sm text-[#8B96A5]">No reviews yet.</p>
              )}
              {activeTab === 'shipping' && (
                <p className="text-sm text-[#8B96A5]">Worldwide shipping available. Delivery in 7-14 business days.</p>
              )}
              {activeTab === 'about' && (
                <p className="text-sm text-[#8B96A5]">Guanjoi Trading LLC — Verified seller based in Germany, Berlin.</p>
              )}
            </div>
          </div>

          {/* You may like */}
          <div className="w-[200px] shrink-0 bg-white rounded-md border border-[#DEE2E7] p-4">
            <h3 className="text-sm font-semibold text-[#1C1C1C] mb-3">You may like</h3>
            <div className="space-y-3">
              {YOU_MAY_LIKE.map(item => (
                <Link
                  key={item.id}
                  to={`/products/${item.id}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-12 h-12 shrink-0 border border-[#DEE2E7] rounded flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-[#1C1C1C] line-clamp-2 group-hover:text-[#0D6EFD] transition-colors">
                      {item.name}
                    </p>
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
            {RELATED_PRODUCTS.map(p => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
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
          <div className="text-white">
            <h3 className="text-xl font-bold mb-1">Super discount on more than 100 USD</h3>
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