import { useQuery } from '@tanstack/react-query'
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
  condition?: string
}

export function useProducts(params: UseProductsParams = {}) {
  const {data, isLoading: loading, error: rawError,} = useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const { data } = await api.get<ProductsResponse>('/products', { params })
      return data
    },
    placeholderData: (prev) => prev,  
    staleTime: 1000 * 30,
  })

  return {
    products: data?.products ?? [],
    total:    data?.total    ?? 0,
    pages:    data?.pages    ?? 1,
    loading,
    error:    rawError ? (rawError as any).response?.data?.message || 'Failed to load products' : null,
  }
}

export function useProduct(id: string | undefined) {
  const {data: product, isLoading: loading, error: rawError} = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await api.get<Product>(`/products/${id}`)
      return data
    },
    enabled: !!id,
    staleTime: 1000 * 60,
  })

  return {
    product:  product ?? null,
    loading,
    error: rawError ? (rawError as any).response?.data?.message || 'Product not found' : null,
  }
}