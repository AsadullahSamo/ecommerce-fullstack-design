import { createContext, useContext, useEffect, useReducer } from 'react'
import type { Product } from '../types'

interface CartItem {
  product: Product
  qty: number
}

type CartAction =
  | { type: 'ADD'; product: Product; qty?: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE_QTY'; id: string; qty: number }
  | { type: 'SAVE_FOR_LATER'; id: string }
  | { type: 'MOVE_TO_CART'; id: string }
  | { type: 'CLEAR' }

interface CartContextValue {
  items: CartItem[]
  savedItems: CartItem[]
  addToCart: (product: Product, qty?: number) => void
  removeFromCart: (id: string) => void
  updateQty: (id: string, qty: number) => void
  saveForLater: (id: string) => void
  moveToCart: (id: string) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'cart'
const SAVED_KEY   = 'cart_saved'

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems]           = useReducer(cartReducer, [], () => loadFromStorage<CartItem[]>(STORAGE_KEY, []))
  const [savedItems, setSavedItems] = useReducer(cartReducer, [], () => loadFromStorage<CartItem[]>(SAVED_KEY, []))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedItems))
  }, [savedItems])

  const addToCart = (product: Product, qty = 1) =>
    setItems({ type: 'ADD', product, qty })

  const removeFromCart = (id: string) =>
    setItems({ type: 'REMOVE', id })

  const updateQty = (id: string, qty: number) =>
    setItems({ type: 'UPDATE_QTY', id, qty })

  const saveForLater = (id: string) => {
    const item = items.find(i => i.product._id === id)
    if (!item) return
    setItems({ type: 'REMOVE', id })
    setSavedItems({ type: 'ADD', product: item.product, qty: item.qty })
  }

  const moveToCart = (id: string) => {
    const item = savedItems.find(i => i.product._id === id)
    if (!item) return
    setSavedItems({ type: 'REMOVE', id })
    setItems({ type: 'ADD', product: item.product, qty: item.qty })
  }

  const clearCart = () => setItems({ type: 'CLEAR' })

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal   = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  return (
    <CartContext.Provider value={{
      items, savedItems,
      addToCart, removeFromCart, updateQty,
      saveForLater, moveToCart, clearCart,
      totalItems, subtotal,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.product._id === action.product._id)
      if (existing) {
        return state.map(i =>
          i.product._id === action.product._id
            ? { ...i, qty: i.qty + (action.qty ?? 1) }
            : i
        )
      }
      return [...state, { product: action.product, qty: action.qty ?? 1 }]
    }
    case 'REMOVE':
      return state.filter(i => i.product._id !== action.id)
    case 'UPDATE_QTY':
      return state.map(i =>
        i.product._id === action.id ? { ...i, qty: action.qty } : i
      )
    case 'CLEAR':
      return []
    default:
      return state
  }
}