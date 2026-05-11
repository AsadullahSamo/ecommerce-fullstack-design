import { Link } from 'react-router-dom'
import type { Product } from '../../types'

type Props = {
  product: Product
  viewMode: 'grid' | 'list'
  addToCart: (product: Product, qty?: number) => void
  isAdded: boolean
}

function StarRating({value,small = false}: {value: number, small?: boolean}) {
  const size = small ? 'text-[14px]' : 'text-[16px]'

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className={`material-icons ${size} ${
            i <= Math.round(value / 2)
              ? 'text-[#FF9017]'
              : 'text-[#DEE2E7]'
          }`}
        >
          star
        </span>
      ))}
    </div>
  )
}

export default function ProductCard({
  product: p,
  viewMode,
  addToCart,
  isAdded,
}: Props) {

  /* GRID CARD */
  if (viewMode === 'grid') {
    return (
      <Link
        to={`/products/${p._id}`}
        className="bg-white rounded-md border border-[#DEE2E7] p-4 hover:shadow-md transition-shadow group"
      >
        <div className="flex items-center justify-center h-[180px] mb-3 relative">
          <img
            src={p.image}
            alt={p.name}
            className="max-h-full object-contain group-hover:scale-105 transition-transform"
          />
        </div>

        <p className="text-sm font-medium text-[#1C1C1C] line-clamp-2 mb-1">
          {p.name}
        </p>

        <div className="flex items-center gap-2 mb-1">
          <p className="text-base font-bold text-[#1C1C1C]">
            ${p.price.toFixed(2)}
          </p>

          {p.originalPrice && (
            <span className="text-sm text-[#8B96A5] line-through">
              ${p.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <StarRating value={p.rating} small />
          <span className={`text-xs ${p.rating >= 8 ? 'text-[#FF9017]': 'text-[#DEE2E7]'}`}>
            {p.rating}
          </span>
        </div>

        {p.shipping && (
          <p className={`text-xs ${p.shipping === "Free Shipping" ? 'text-[#00B517]' : p.shipping === "Standard Shipping" ? 'text-[#8B96A5]' : 'text-[#1C1C1C]'} mt-1 font-medium`}>
            {p.shipping}
          </p>
        )}

        <div className="flex items-center gap-2 flex-wrap mt-1">
          {p.category && (
            <span className="text-xs bg-[#EEF3FD] text-[#0D6EFD] px-2 py-0.5 rounded-full">
              {p.category}
            </span>
          )}

          {p.condition && p.condition !== 'Any' && (
            <span className="text-xs bg-[#F7F7F7] border border-[#DEE2E7] text-[#8B96A5] px-2 py-0.5 rounded-full">
              {p.condition}
            </span>
          )}
        </div>

        <button
          onClick={e => {
            e.preventDefault()
            addToCart(p)
          }}
          className={`mt-2 w-full ${isAdded ? 'bg-green-500 hover:bg-green-600 text-white': 'bg-[#0D6EFD] hover:bg-blue-700 text-white'} text-xs font-medium py-1.5 rounded transition-colors`}
        >
          {isAdded ? 'Added ✓' : 'Add to cart'}
        </button>
      </Link>
    )
  }

  /* LIST CARD */
  return (
    <div className="bg-white rounded-md border border-[#DEE2E7] p-4 flex gap-3 hover:shadow-md transition-shadow group">

      <div className="w-[100px] md:w-[180px] shrink-0 flex items-center justify-center bg-[#F7F7F7] rounded-md overflow-hidden self-stretch">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1 min-w-0">

        <p className="text-sm font-semibold text-[#1C1C1C] mb-1">
          {p.name}
        </p>

        <div className="flex items-center gap-1.5 mb-1">
          <p className="text-base font-bold text-[#1C1C1C]">
            ${p.price.toFixed(2)}
          </p>

          {p.originalPrice && (
            <span className="text-xs text-[#8B96A5] line-through">
              ${p.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          <StarRating value={p.rating} small />

          <span className="text-xs text-[#8B96A5]">
            {p.rating}
          </span>

          <span className="text-xs text-[#8B96A5]">•</span>

          {p.shipping && (
            <p className={`text-xs ${p.shipping === "Free Shipping" ? 'text-[#00B517]' : p.shipping === "Standard Shipping" ? 'text-[#8B96A5]' : 'text-[#1C1C1C]'} mt-1 font-medium`}>
              {p.shipping}
            </p>
          )}
        </div>

        <p className="text-xs text-[#8B96A5] line-clamp-2 mb-2 hidden md:block">
          {p.description}
        </p>

        <div className="flex items-center gap-2 flex-wrap mt-1 mb-3">

          {p.category && (
            <span className="text-xs bg-[#EEF3FD] text-[#0D6EFD] px-2 py-0.5 rounded-full">
              {p.category}
            </span>
          )}

          {p.condition && p.condition !== 'Any' && (
            <span className="text-xs bg-[#F7F7F7] border border-[#DEE2E7] text-[#8B96A5] px-2 py-0.5 rounded-full">
              {p.condition}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/products/${p._id}`}
            className="text-xs text-[#0D6EFD] hover:underline font-medium"
          >
            View details
          </Link>

          <button
            onClick={() => addToCart(p)}
            className={`text-xs ${isAdded ? 'bg-green-500 hover:bg-green-600 text-white': 'bg-[#0D6EFD] hover:bg-blue-700 text-white'} px-3 py-1.5 rounded transition-colors`}
          >
            {isAdded ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  )
}