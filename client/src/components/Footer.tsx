import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const footerColumns = [
  {
    heading: 'About',
    links: ['About Us', 'Find store', 'Categories', 'Blogs'],
  },
  {
    heading: 'Partnership',
    links: ['About Us', 'Find store', 'Categories', 'Blogs'],
  },
  {
    heading: 'Information',
    links: ['Help Center', 'Money Refund', 'Shipping', 'Contact us'],
  },
  {
    heading: 'For users',
    links: ['Login', 'Register', 'Settings', 'My Orders'],
  },
]

const socialIcons = [
  { icon: <FaFacebook />, label: 'Facebook', hover: 'hover:bg-[#3b5998]' },
  { icon: <FaTwitter />, label: 'Twitter', hover: 'hover:bg-[#1DA1F2]' },
  { icon: <FaLinkedin />, label: 'LinkedIn', hover: 'hover:bg-[#0077B5]' },
  { icon: <FaInstagram />, label: 'Instagram', hover: 'hover:bg-[#E1306C]' },
  { icon: <FaYoutube />, label: 'YouTube', hover: 'hover:bg-[#FF0000]' },
]

export default function Footer() {
  return (
    <footer className="bg-white text-white mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 py-14">
        <div className="flex flex-wrap lg:flex-nowrap gap-4 lg:gap-3">

          {/* Brand column */}
          <div className="w-full lg:w-[280px]">
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 bg-[#0D6EFD] rounded flex items-center justify-center">
                <span className='material-icons-outlined text-gray-300'>shopping_bag</span>
              </div>
              <span className="text-xl font-bold text-black">Brand</span>
            </Link>
           <p className="text-sm text-[#8B96A5] leading-relaxed mt-4 mb-6 max-w-[260px]">
              Best information about the company goes here but now lorem ipsum is
            </p>
            <div className="flex items-center gap-3" >
              {socialIcons.map(({ icon, label, hover }) => (
                <a
                  key={label}
                  href="#"
                  className={`size-6 rounded-full bg-[#8B96A5] flex items-center justify-center text-sm text-white transition-colors ${hover}`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerColumns.map(({ heading, links }) => (
            <div key={heading} className="w-[150px]">
              <h4 className="font-semibold text-sm mb-4 text-black">{heading}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <Link
                      to="#"
                      className={`text-sm text-[#8B96A5] hover:text-gray-500 transition-colors`}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get app column */}
          <div className="w-full lg:w-[150px]">
            <h4 className="font-semibold text-sm mb-4">Get app</h4>
            <div className="flex flex-col gap-3 w-fit">
              <a href="#" className="flex items-center gap-2 bg-black rounded-lg px-3 py-2 hover:opacity-90 transition-opacity w-[145px]">
                <span className="material-icons text-[28px]">apple</span>
                <div>
                  <p className="text-[9px] text-[#8B96A5] leading-none">Download on the</p>
                  <p className="text-sm font-semibold leading-tight">App Store</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-2 bg-black rounded-lg px-3 py-2 hover:opacity-90 transition-opacity w-[145px]">
                <span className="material-icons text-[28px]">android</span>
                <div>
                  <p className="text-[9px] text-[#8B96A5] leading-none">GET IT ON</p>
                  <p className="text-sm font-semibold leading-tight">Google Play</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#8B96A5]/30">
        <div className="max-w-[1200px] mx-auto px-4 h-12 flex items-center justify-between">
          <p className="text-sm text-[#8B96A5]">© {new Date().getFullYear()} E-commerce.</p>
          <button className="flex items-center gap-1 text-sm text-[#8B96A5] hover:text-white transition-colors">
            <span>🇺🇸</span>
            <span>English</span>
            <span className="material-icons text-[16px]">keyboard_arrow_down</span>
          </button>
        </div>
      </div>
    </footer>
  )
}