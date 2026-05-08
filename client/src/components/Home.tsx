import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AE, AU, CN, DK, FR, GB, IT, RU, US } from 'country-flag-icons/react/3x2'
import Newsletter from './Newsletter'
import { useProducts } from '../hooks/useProducts'

const sidebarCategories = [
  'Automobiles', 'Clothes and wear', 'Home interiors',
  'Computer and tech', 'Tools, equipments', 'Sports and outdoor',
  'Animal and pets', 'Machinery tools', 'More category',
]

// const dealsProducts = [
//   { id: '1', name: 'Smart watches',  image: '/assets/1.png', price: 99,  discount: 25 },
//   { id: '2', name: 'Laptops',        image: '/assets/2.png', price: 899, discount: 15 },
//   { id: '3', name: 'GoPro cameras',  image: '/assets/3.png', price: 399, discount: 40 },
//   { id: '4', name: 'Headphones',     image: '/assets/4.png', price: 149, discount: 25 },
//   { id: '5', name: 'Canon cameras',  image: '/assets/5.png', price: 599, discount: 25 },
// ]

// const homeOutdoorProducts = [
//   { id: '6',  name: 'Soft chairs',    image: '/assets/soft-chairs.png',    price: 19  },
//   { id: '7',  name: 'Sofa & chair',   image: '/assets/sofa-and-chairs.png',price: 19  },
//   { id: '8',  name: 'Kitchen dishes', image: '/assets/kitchen-dishes.png', price: 19  },
//   { id: '9',  name: 'Smart watches',  image: '/assets/smart-watches.png',  price: 19  },
//   { id: '10', name: 'Kitchen mixer',  image: '/assets/kitchen-mixer.png',  price: 100 },
//   { id: '11', name: 'Blenders',       image: '/assets/blenders.png',       price: 39  },
//   { id: '12', name: 'Home appliance', image: '/assets/home-appliance.jpg', price: 19  },
//   { id: '13', name: 'Coffee maker',   image: '/assets/coffee-maker.png',   price: 10  },
// ]

// const electronicsProducts = [
//   { id: '14', name: 'Smart watches',   image: '/assets/smart-watches-2.png',               price: 19  },
//   { id: '15', name: 'Cameras',         image: '/assets/cameras.png',                       price: 89  },
//   { id: '16', name: 'Headphones',      image: '/assets/headphones.png',                    price: 10  },
//   { id: '17', name: 'Smart watches',   image: '/assets/smart-watches.png',                 price: 90  },
//   { id: '18', name: 'Gaming set',      image: '/assets/gaming-set.png',                    price: 35  },
//   { id: '19', name: 'Laptops & PC',    image: '/assets/laptops-and-pc.png',                price: 340 },
//   { id: '20', name: 'Smartphones',     image: '/assets/smartphones.png',                   price: 19  },
//   { id: '21', name: 'Electric kettle', image: '/assets/electric-kettle.png',               price: 240 },
// ]

// const recommendedItems = [
//   { id: '22', name: 'T-shirts with multiple colors, for men', image: '/assets/recom-1.png',  price: 10.30 },
//   { id: '23', name: 'Jeans shorts for men blue color',        image: '/assets/recom-2.jpg',  price: 10.30 },
//   { id: '24', name: 'Brown winter coat medium size',          image: '/assets/recom-3.png',  price: 12.50 },
//   { id: '25', name: 'Jeans bag for travel for men',           image: '/assets/recom-4.png',  price: 34.00 },
//   { id: '26', name: 'Leather wallet',                         image: '/assets/recom-5.png',  price: 99.00 },
//   { id: '27', name: 'Canon camera black, 100x zoom',          image: '/assets/recom-6.png',  price: 9.99  },
//   { id: '28', name: 'Headset for gaming with mic',            image: '/assets/recom-7.png',  price: 8.99  },
//   { id: '29', name: 'Smartwatch silver color modern',         image: '/assets/recom-8.png',  price: 10.30 },
//   { id: '30', name: 'Blue wallet for men leather metarfial',  image: '/assets/recom-9.png',  price: 10.30 },
//   { id: '31', name: 'Jeans bag for travel for men',           image: '/assets/recom-10.png', price: 80.95 },
// ]

const extraServices = [
  { id: 1, label: 'Source from\nIndustry Hubs',               image: '/assets/extra-1.png', icon: 'search'      },
  { id: 2, label: 'Customize Your\nProducts',                  image: '/assets/extra-2.png', icon: 'inventory_2' },
  { id: 3, label: 'Fast, reliable shipping\nby ocean or air',  image: '/assets/extra-3.png', icon: 'send'        },
  { id: 4, label: 'Product monitoring\nand inspection',        image: '/assets/extra-4.png', icon: 'security'    },
]

const supplierRegions = [
  { country: 'Arabic Emirates', domain: 'shopname.ae',     Flag: AE },
  { country: 'Australia',       domain: 'shopname.ae',     Flag: AU },
  { country: 'United States',   domain: 'shopname.ae',     Flag: US },
  { country: 'Russia',          domain: 'shopname.ru',     Flag: RU },
  { country: 'Italy',           domain: 'shopname.it',     Flag: IT },
  { country: 'Denmark',         domain: 'denmark.com.dk',  Flag: DK },
  { country: 'France',          domain: 'shopname.com.fr', Flag: FR },
  { country: 'Arabic Emirates', domain: 'shopname.ae',     Flag: AE },
  { country: 'China',           domain: 'shopname.ae',     Flag: CN },
  { country: 'Great Britain',   domain: 'shopname.co.uk',  Flag: GB },
]

function useCountdown(initialSeconds: number) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(prev => Math.max(0, prev - 1)), 1000)
    return () => clearInterval(interval)
  }, [])

  return {
    days:  Math.floor(timeLeft / 86400),
    hours: Math.floor((timeLeft % 86400) / 3600),
    mins:  Math.floor((timeLeft % 3600) / 60),
    secs:  timeLeft % 60,
  }
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-[#606060] rounded px-3 py-1.5 text-center min-w-[52px]">
      <p className="text-base font-bold text-white leading-none">{String(value).padStart(2, '0')}</p>
      <p className="text-[10px] text-gray-300 mt-0.5">{label}</p>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-semibold text-base text-[#1C1C1C] mb-4">{children}</h2>
}

export default function Home() {
  const { days, hours, mins, secs } = useCountdown(4 * 86400 + 13 * 3600 + 34 * 60 + 56)
  const [inquiryItem, setInquiryItem]   = useState('')
  const [inquiryDetails, setInquiryDetails] = useState('')
  const [inquiryQty, setInquiryQty]     = useState('')

  const { products: featuredProducts, loading: featuredLoading } = useProducts({ featured: true, limit: 5 })
  const { products: recommendedProducts, loading: recommendedLoading } = useProducts({ limit: 10 })
  const { products: homeAndOutdoorProducts,} = useProducts({  category: 'Home & Outdoor',  limit: 8,})
  const { products: electronicsProducts,} = useProducts({  category: 'Electronics',  limit: 8,})

  return (
    <div className="bg-[#F7F7F7]">
      <div className="max-w-[1200px] mx-auto px-4 py-4 space-y-4">

        {/* ── Hero ── */}
        <div className="flex gap-3">

          {/* Sidebar */}
          <aside className="hidden lg:block w-[200px] shrink-0 bg-white rounded-md border border-[#DEE2E7] py-2">
            <ul>
              {sidebarCategories.map((cat, i) => (
                <li key={cat}>
                  <Link
                    to="/products"
                    className={`block px-4 py-2 text-sm transition-colors hover:bg-[#EEF3FD] hover:text-[#0D6EFD] ${
                      i === 0 ? 'bg-[#EEF3FD] text-[#0D6EFD] font-medium' : 'text-[#1C1C1C]'
                    }`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Banner */}
          <div className="flex-1 rounded-md overflow-hidden bg-[#5BC4C0] relative min-h-[240px] flex items-center px-10">
            <div className="flex-1 rounded-md overflow-hidden bg-[#5BC4C0] relative min-h-[180px] md:min-h-[240px] flex items-center px-6 md:px-10">
              <div className="text-[#1C1C1C] z-10 relative">
                <p className="text-xs md:text-sm mb-1">Latest trending</p>
                <h1 className="text-[22px] md:text-[32px] font-bold leading-tight mb-4 md:mb-5">
                  Electronic<br />items
                </h1>
                <Link
                  to="/products"
                  className="inline-block bg-white text-[#1C1C1C] text-xs md:text-sm font-medium px-4 md:px-5 py-2 rounded hover:bg-gray-100 transition-colors"
                >
                  Learn more
                </Link>
              </div>
              <img
                src="/assets/banner-hero.png"
                alt="Trending electronics"
                className="absolute right-0 top-0 h-full object-cover w-[55%] md:w-[65%]"
              />
            </div>
            <img
              src="/assets/banner-hero.png"
              alt="Trending electronics"
              className="absolute right-0 top-0 h-full object-cover w-[65%]"
            />
          </div>

          {/* Auth + promo cards */}
          <div className="hidden xl:flex w-[180px] shrink-0 flex-col gap-2">
            <div className="bg-[#EEF3FD] rounded-md p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#BECDE9] flex items-center justify-center shrink-0">
                  <span className="material-icons text-[#6A8EBF] text-[24px]">person</span>
                </div>
                <div>
                  <p className="text-xs text-[#1C1C1C]">Hi, user</p>
                  <p className="text-xs text-[#1C1C1C]">let's get stated</p>
                </div>
              </div>
              <Link
                to="/register"
                className="block w-full text-center bg-[#0D6EFD] hover:bg-blue-700 text-white text-sm font-medium py-2 rounded transition-colors"
              >
                Join now
              </Link>
              <Link
                to="/login"
                className="block w-full text-center text-[#0D6EFD] text-sm font-medium py-1 hover:underline"
              >
                Log in
              </Link>
            </div>
            <div className="bg-[#FF9017] rounded-md p-4">
              <p className="text-white text-xs font-medium leading-snug">
                Get US $10 off<br />with a new<br />supplier
              </p>
            </div>
            <div className="bg-[#55BBC8] rounded-md p-4">
              <p className="text-white text-xs font-medium leading-snug">
                Send quotes with<br />supplier<br />preferences
              </p>
            </div>
          </div>
        </div>

        {/* ── Deals and offers ── */}
        <div className="bg-white rounded-md border border-[#DEE2E7] p-4">
          <div className="flex items-center gap-6 mb-4">
            <div>
              <h2 className="font-semibold text-[#1C1C1C]">Deals and offers</h2>
              <p className="text-xs text-[#8B96A5]">Hygiene equipments</p>
            </div>
            <div className="flex items-center gap-2">
              <CountdownUnit value={days} label="Days" />
              <CountdownUnit value={hours} label="Hour" />
              <CountdownUnit value={mins} label="Min" />
              <CountdownUnit value={secs} label="Sec" />
            </div>
          </div>
          {featuredLoading ? (
            <div className="grid grid-cols-5 gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-[160px] bg-[#F7F7F7] rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 md:grid md:grid-cols-5 md:overflow-visible">
              {featuredProducts.map(p => (
                <div key={p._id} className="shrink-0 w-[140px] md:w-auto border-r border-[#DEE2E7] last:border-r-0 pr-3 last:pr-0">
                  <Link to={`/products/${p._id}`} className="block text-center group">
                    <div className="flex items-center justify-center h-[100px] md:h-[120px] mb-2 md:mb-3">
                      <img src={p.image} alt={p.name} className="max-h-full object-contain group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-xs md:text-sm text-[#1C1C1C] mb-2">{p.name}</p>
                      <span className="inline-block bg-[#FFE3E3] text-[#E53935] text-xs font-medium px-3 py-1 rounded-full">
                        ((p.price * 20) / 100)
                      </span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Home and outdoor ── */}
        <div className="bg-white rounded-md border border-[#DEE2E7] overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div
              className="md:w-[200px] shrink-0 p-6 flex md:flex-col justify-between items-start gap-4 md:gap-0"
              style={{ background: 'linear-gradient(160deg, #fdf6e3 0%, #f0e6c8 100%)' }}
            >
              <div>
                <h2 className="font-bold text-lg text-[#1C1C1C] leading-snug mb-3">Home and outdoor</h2>
                <Link
                  to="/products"
                  className="inline-block bg-white text-[#1C1C1C] text-xs font-medium px-4 py-2 rounded-full shadow-sm hover:shadow transition-shadow"
                >
                  Source now
                </Link>
              </div>
              <img src="/assets/home-and-outdoor.jpg" alt="Home and outdoor" className="h-[80px] md:w-full md:h-auto object-contain mt-0 md:mt-4" />
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-[#DEE2E7]">
              {homeAndOutdoorProducts.map(p => (
                <Link
                  key={p._id}
                  to={`/products/${p._id}`}
                  className="flex items-center justify-between p-3 hover:bg-[#F7F7F7] transition-colors group"
                >
                  <div>
                    <p className="text-xs font-medium text-[#1C1C1C] mb-1">{p.name}</p>
                    <p className="text-xs text-[#8B96A5]">From</p>
                    <p className="text-xs text-[#8B96A5]">USD {p.price}</p>
                  </div>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] object-contain group-hover:scale-105 transition-transform"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Consumer electronics ── */}
        <div className="bg-white rounded-md border border-[#DEE2E7] overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
              <div
              className="md:w-[200px] shrink-0 p-6 flex md:flex-col justify-between items-start gap-4 md:gap-0"
            style={{ background: 'linear-gradient(160deg, #e8f0fe 0%, #c5d8f8 100%)' }}
            >
              <div>
                <h2 className="font-bold text-lg text-[#1C1C1C] leading-snug mb-3">Consumer electronics and gadgets </h2>
                <Link
                  to="/products"
                  className="inline-block bg-white text-[#1C1C1C] text-xs font-medium px-4 py-2 rounded-full shadow-sm hover:shadow transition-shadow"
                >
                  Source now
                </Link>
              </div>
              <img src="/assets/consumer-elctronics-and-gadgets.png" alt="consumer and electronics" className="h-[80px] md:w-full md:h-auto object-contain mt-0 md:mt-4" />
            </div>

            <div className="flex-1 grid grid-cols-2 md:grid-cols-4. divide-x divide-y divide-[#DEE2E7]">
              {electronicsProducts.map(p => (
                <Link
                  key={p._id}
                  to={`/products/${p._id}`}
                  className="flex items-center justify-between p-4 hover:bg-[#F7F7F7] transition-colors group"
                >
                  <div>
                    <p className="text-sm font-medium text-[#1C1C1C] mb-1">{p.name}</p>
                    <p className="text-xs text-[#8B96A5]">From</p>
                    <p className="text-xs text-[#8B96A5]">USD {p.price}</p>
                  </div>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-[70px] h-[70px] object-contain group-hover:scale-105 transition-transform"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Send quote banner ── */}
        <div
          className="rounded-md overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)' }}
        >
          <img src="/assets/banner-quote.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-10 py-8 gap-6">
            <div className="text-white max-w-full md:max-w-[400px]">
              <h2 className="text-xl md:text-2xl font-bold leading-snug mb-3">
                An easy way to send requests to all suppliers
              </h2>
              <p className="text-sm opacity-80 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
              </p>
            </div>
            <div className="bg-white rounded-md p-4 md:p-6 w-full md:w-[400px] shrink-0">
              <h3 className="font-semibold text-[#1C1C1C] mb-4">Send quote to suppliers</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="What item you need?"
                  value={inquiryItem}
                  onChange={e => setInquiryItem(e.target.value)}
                  className="w-full border border-[#DEE2E7] rounded px-3 py-2.5 text-sm outline-none focus:border-[#0D6EFD] transition-colors"
                />
                <textarea
                  placeholder="Type more details"
                  value={inquiryDetails}
                  onChange={e => setInquiryDetails(e.target.value)}
                  rows={3}
                  className="w-full border border-[#DEE2E7] rounded px-3 py-2.5 text-sm outline-none focus:border-[#0D6EFD] transition-colors resize-none"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={inquiryQty}
                    onChange={e => setInquiryQty(e.target.value)}
                    className="flex-1 border min-w-5 border-[#DEE2E7] rounded px-3 py-2.5 text-sm outline-none focus:border-[#0D6EFD] transition-colors"
                  />
                  <select className="border w-[80px] border-[#DEE2E7] rounded px-3 py-2.5 text-sm outline-none focus:border-[#0D6EFD] bg-white text-[#1C1C1C]">
                    <option>Pcs</option>
                    <option>Kg</option>
                    <option>Box</option>
                  </select>
                </div>
                <button className="w-full bg-[#0D6EFD] hover:bg-blue-700 text-white font-medium py-2.5 rounded transition-colors text-sm">
                  Send inquiry
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Recommended items ── */}
        <div>
          <SectionHeading>Recommended items</SectionHeading>
          {recommendedLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-[220px] bg-white rounded-xl border border-[#DEE2E7] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {recommendedProducts.map(p => (
                <Link
                  key={p._id}
                  to={`/products/${p._id}`}
                  className="bg-white rounded-xl border border-[#DEE2E7] p-4 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center justify-center h-[160px] mb-3">
                    <img src={p.image} alt={p.name} className="max-h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <p className="text-sm font-semibold text-[#1C1C1C]">${p.price.toFixed(2)}</p>
                  <p className="text-xs text-[#8B96A5] mt-1 line-clamp-2">{p.name}</p>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── Our extra services ── */}
        <div>
          <SectionHeading>Our extra services</SectionHeading>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {extraServices.map(({ id, label, image, icon }) => (
              <div key={id} className="relative rounded-xl overflow-hidden bg-gray-200 aspect-[4/3] cursor-pointer group">
                <img
                  src={image}
                  alt={label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
                  <div className="absolute -top-5 right-4 w-10 h-10 bg-[#D1E7FF] rounded-full flex items-center justify-center shadow">
                    <span className="material-icons text-[20px] text-[#1C1C1C]">{icon}</span>
                  </div>
                  <p className="text-sm font-medium text-[#1C1C1C] whitespace-pre-line">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Suppliers by region ── */}
        <div>
          <SectionHeading>Suppliers by region</SectionHeading>
          <div className="bg-white rounded-md border border-[#DEE2E7] px-6 py-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {supplierRegions.map(({ country, domain, Flag }, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Flag className="w-6 h-4 rounded-sm" />
                  <div>
                    <p className="text-sm text-[#8B96A5]">{country}</p>
                    <p className="text-xs text-[#8B96A5]">{domain}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Newsletter ── */}
        <Newsletter />

      </div>
    </div>
  )
}