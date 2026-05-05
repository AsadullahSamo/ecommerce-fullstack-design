import { Link } from 'react-router-dom'

interface Props {
  id: string
  image: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  fromPrice?: boolean
}

export default function ProductCard({ id, image, name, price, originalPrice, discount, fromPrice }: Props) {
  return (
    <Link to={`/products/${id}`} className="group block bg-white rounded-md border border-[#DEE2E7] overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative bg-[#F7F7F7] aspect-square flex items-center justify-center p-4">
        <img src={image} alt={name} className="w-full h-full object-contain mix-blend-multiply" />
        {discount && (
          <span className="absolute top-2 left-2 bg-[#FF6B6B] text-white text-xs font-medium px-2 py-0.5 rounded">
            -{discount}%
          </span>
        )}
      </div>
      <div className="p-3">
        {fromPrice && <p className="text-[11px] text-[#8B96A5] mb-0.5">From USD {price}</p>}
        {!fromPrice && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#1C1C1C]">${price}</span>
            {originalPrice && (
              <span className="text-xs text-[#8B96A5] line-through">${originalPrice}</span>
            )}
          </div>
        )}
        <p className="text-xs text-[#8B96A5] mt-1 line-clamp-2">{name}</p>
      </div>
    </Link>
  )
}