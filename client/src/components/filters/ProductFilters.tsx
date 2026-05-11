import { useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  categoryParam: string
  setCondition: (val: string) => void
  condition: string
  selectedBrands: string[]
  toggleBrand: (brand: string) => void
  selectedFeatures: string[]
  toggleFeature: (feature: string) => void
  selectedRatings: number[]
  toggleRating: (rating: number) => void
  priceMin: string
  priceMax: string
  setPriceMin: (val: string) => void
  setPriceMax: (val: string) => void
  applyPrice: () => void
  CATEGORIES: string[]
  BRANDS: string[]
  FEATURES: string[]
  CONDITIONS: string[]
}

type OpenState = {
  category: boolean
  brands: boolean
  features: boolean
  price: boolean
  condition: boolean
  rating: boolean
  manufacturer: boolean
}

function useExpandable(list: string[], limit = 4) {
  const [expanded, setExpanded] = useState(false)

  return {
    visible: expanded ? list : list.slice(0, limit),
    expanded,
    toggle: () => setExpanded(e => !e),
    hasMore: list.length > limit,
  }
}

function Section({title, keyName, open, setOpen, children,}: 
  {
    title: string, keyName: keyof OpenState, open: OpenState, 
    setOpen: React.Dispatch<React.SetStateAction<OpenState>>, children: React.ReactNode
  }
) {
  return (
    <div className="border-b border-[#DEE2E7] py-3">

      <button
        type="button"
        onClick={() =>
          setOpen(prev => ({ ...prev, [keyName]: !prev[keyName] }))
        }
        className="flex items-center justify-between w-full text-[13px] font-semibold text-[#1C1C1C]"
      >
        {title}

        <span className="material-icons text-[18px] text-[#8B96A5]">
          {open[keyName] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
        </span>
      </button>

      {open[keyName] && (
        <div className="mt-2 space-y-2">
          {children}
        </div>
      )}
    </div>
  )
}

export default function ProductFilters({
  categoryParam,
  setCondition,
  condition,
  selectedBrands,
  toggleBrand,
  selectedFeatures,
  toggleFeature,
  selectedRatings,
  toggleRating,
  priceMin,
  priceMax,
  setPriceMin,
  setPriceMax,
  applyPrice,
  CATEGORIES,
  BRANDS,
  FEATURES,
  CONDITIONS,
}: Props) {

  const categories = useExpandable(CATEGORIES)
  const brands = useExpandable(BRANDS)
  const features = useExpandable(FEATURES)

  const [open, setOpen] = useState<OpenState>({
    category: true,
    brands: true,
    features: true,
    price: false,
    condition: false,
    rating: false,
    manufacturer: false,
  })

  function Star({ filled }: { filled: boolean }) {
    return (
      <span className={`material-icons text-[15px] ${filled ? 'text-[#FF9017]' : 'text-[#DEE2E7]'}`}>
        star
      </span>
    )
  }

  return (
    <div className="text-[#1C1C1C]">

      {/* CATEGORY */}
      <Section title="Category" keyName="category" open={open} setOpen={setOpen}>
        <ul className="space-y-1">
          {categories.visible.map(cat => (
            <li key={cat}>
              <Link
                to={`/products?category=${cat}`}
                className={`text-[13px] leading-5 hover:text-[#0D6EFD] transition-colors ${
                  categoryParam === cat
                    ? 'text-[#0D6EFD] font-medium'
                    : 'text-[#1C1C1C]'
                }`}
              >
                {cat}
              </Link>
            </li>
          ))}
        </ul>

        {categories.hasMore && (
          <button
            type="button"
            onClick={categories.toggle}
            className="text-[11px] text-[#0D6EFD] mt-1 hover:underline"
          >
            {categories.expanded ? 'Show less' : 'See all'}
          </button>
        )}
      </Section>

      {/* BRANDS */}
      <Section title="Brands" keyName="brands" open={open} setOpen={setOpen}>
        {brands.visible.map(brand => (
          <label
            key={brand}
            className="flex items-center gap-2 text-[13px] leading-5 cursor-pointer hover:text-[#0D6EFD] transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleBrand(brand)}
              className="w-3.5 h-3.5 accent-[#0D6EFD]"
            />
            <span>{brand}</span>
          </label>
        ))}

        {brands.hasMore && (
          <button
            type="button"
            onClick={brands.toggle}
            className="text-[11px] text-[#0D6EFD] mt-1 hover:underline"
          >
            {brands.expanded ? 'Show less' : 'See all'}
          </button>
        )}
      </Section>

      {/* FEATURES */}
      <Section title="Features" keyName="features" open={open} setOpen={setOpen}>
        {features.visible.map(feature => (
          <label
            key={feature}
            className="flex items-center gap-2 text-[13px] leading-5 cursor-pointer hover:text-[#0D6EFD] transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedFeatures.includes(feature)}
              onChange={() => toggleFeature(feature)}
              className="w-3.5 h-3.5 accent-[#0D6EFD]"
            />
            <span>{feature}</span>
          </label>
        ))}

        {features.hasMore && (
          <button
            type="button"
            onClick={features.toggle}
            className="text-[11px] text-[#0D6EFD] mt-1 hover:underline"
          >
            {features.expanded ? 'Show less' : 'See all'}
          </button>
        )}
      </Section>

      {/* PRICE */}
      <Section title="Price range" keyName="price" open={open} setOpen={setOpen}>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={e => setPriceMin(e.target.value)}
            className="w-full border border-[#DEE2E7] rounded px-2 py-1 text-[12px] outline-none focus:border-[#0D6EFD]"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={e => setPriceMax(e.target.value)}
            className="w-full border border-[#DEE2E7] rounded px-2 py-1 text-[12px] outline-none focus:border-[#0D6EFD]"
          />
        </div>

        <button
          type="button"
          onClick={applyPrice}
          className="w-full mt-2 border border-[#0D6EFD] text-[#0D6EFD] text-[12px] py-1.5 rounded hover:bg-blue-50 transition"
        >
          Apply
        </button>
      </Section>

      {/* CONDITION */}
      <Section title="Condition" keyName="condition" open={open} setOpen={setOpen}>
        {CONDITIONS.map(c => (
          <label
            key={c}
            className="flex items-center gap-2 text-[13px] cursor-pointer hover:text-[#0D6EFD] transition-colors"
          >
            <input
              type="radio"
              checked={condition === c}
              onChange={() => setCondition(c)}
              className="w-3.5 h-3.5 accent-[#0D6EFD]"
            />
            <span>{c}</span>
          </label>
        ))}
      </Section>

      {/* RATINGS */}
      <Section title="Ratings" keyName="rating" open={open} setOpen={setOpen}>
        {[5, 4, 3, 2].map(r => (
          <label key={r} className="flex items-center gap-2 cursor-pointer">

            <input
              type="checkbox"
              checked={selectedRatings.includes(r)}
              onChange={() => toggleRating(r)}
              className="w-3.5 h-3.5 accent-[#0D6EFD]"
            />

            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} filled={i <= r} />
              ))}
            </div>
          </label>
        ))}
      </Section>

      {/* MANUFACTURER */}
      <Section title="Manufacturer" keyName="manufacturer" open={open} setOpen={setOpen}>
        <p className="text-[11px] text-[#8B96A5]">Coming soon</p>
      </Section>

    </div>
  )
}