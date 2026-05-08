import { useState, useEffect } from 'react'
import api from '../lib/api'
import type { Product, ProductsResponse } from '../types'

interface UseProductsParams {
  q?: string
  category?: string
  featured?: boolean
  verified?: boolean
  brand? : string
  page?: number
  limit?: number
  minPrice?: number
  maxPrice?: number
  minRating?: number
  features?: string
}

export function useProducts(params: UseProductsParams = {}) {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal]       = useState(0)
  const [pages, setPages]       = useState(1)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    api.get<ProductsResponse>('/products', { params })
      .then(res => {
        if (cancelled) return
        setProducts(res.data.products)
        setTotal(res.data.total)
        setPages(res.data.pages)
      })
      .catch(err => {
        if (cancelled) return
        setError(err.response?.data?.message || 'Failed to load products')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [JSON.stringify(params)])

  return { products, total, pages, loading, error }
}

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    setError(null)

    api.get<Product>(`/products/${id}`)
      .then(res => { if (!cancelled) setProduct(res.data) })
      .catch(err => { if (!cancelled) setError(err.response?.data?.message || 'Product not found') })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [id])

  return { product, loading, error }
}