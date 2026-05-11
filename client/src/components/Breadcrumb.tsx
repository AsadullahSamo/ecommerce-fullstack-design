import { Link, useLocation,} from 'react-router-dom'
import { useProduct } from '../hooks/useProducts'

const ROUTE_LABELS: Record<string, string> = {
  '':        'Home',
  products:  'Products',
  cart:      'Cart',
  login:     'Login',
  register:  'Register',
  admin:     'Admin Panel',
  orders:    'Orders',
  favorites: 'Favorites',
}

function ProductCrumb({ id }: { id: string }) {
  const { product } = useProduct(id)
  return <span className="text-[#1C1C1C] truncate max-w-[160px]">{product?.name ?? 'Product'}</span>
}

export default function Breadcrumb() {
  const location = useLocation()

  const segments = location.pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  const crumbs = [
    { label: 'Home', to: '/' },
    ...segments.map((seg, i) => ({
      label: seg,
      to:    '/' + segments.slice(0, i + 1).join('/'),
    })),
  ]

return (
    <nav className="flex items-center gap-1 text-xs text-[#8B96A5] mb-4 flex-wrap">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1
        const isId   = crumb.label.length === 24 && /^[a-f0-9]+$/i.test(crumb.label)
        const label  = ROUTE_LABELS[crumb.label] ?? crumb.label

        return (
          <span key={crumb.to} className="flex items-center gap-1">
            {i > 0 && <span className="material-icons text-[14px]">chevron_right</span>}
            {isLast ? (
              isId ? <ProductCrumb id={crumb.label} /> : (
                <span className="text-[#1C1C1C] capitalize">{label}</span>
              )
            ) : (
              <Link to={crumb.to} className="hover:text-[#0D6EFD] capitalize transition-colors">
                {label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
)}