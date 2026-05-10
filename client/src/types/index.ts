export interface PricingTier {
  range: string
  price: number
}

export interface SpecTableRow {
  label: string
  value: string
}

export interface Product {
  _id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  description: string
  category: string
  stock: number
  rating: number
  orders: number
  brand: string
  shipping: string
  featured: boolean
  seller: {
    name: string
    location: string
    verified: boolean
  }
  condition?: string
  createdAt: string,
  reviews?: number
  sold?: number
  specs?: Record<string, string>
  specTable?: SpecTableRow[]
  pricingTiers?: PricingTier[]
  features? : string[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  pages: number
}

export interface AuthResponse {
  token: string
  user: {
    _id: string
    name: string
    email: string
    role: string
  }
}