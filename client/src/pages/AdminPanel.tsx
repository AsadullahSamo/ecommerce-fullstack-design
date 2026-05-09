import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import api from '../lib/api'
import type { Product } from '../types'

type ModalMode = 'add' | 'edit' | null

const EMPTY_FORM = {
  name: '',
  price: '',
  originalPrice: '',
  image: '',
  description: '',
  category: '',
  stock: '',
  brand: '',
  shipping: 'Free Shipping',
  featured: false,
  condition: 'Brand new',
}

export default function AdminPanel() {
  const { products, loading, error } = useProducts({ limit: 50 })
  const [modalMode, setModalMode]   = useState<ModalMode>(null)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [form, setForm]             = useState(EMPTY_FORM)
  const [saving, setSaving]         = useState(false)
  const [deleteId, setDeleteId]     = useState<string | null>(null)
  const [feedback, setFeedback]     = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  const showFeedback = (type: 'success' | 'error', msg: string) => {
    setFeedback({ type, msg })
    setTimeout(() => setFeedback(null), 3000)
  }

  const openAdd = () => {
    setForm(EMPTY_FORM)
    setEditProduct(null)
    setModalMode('add')
  }

  const openEdit = (p: Product) => {
    setEditProduct(p)
    setForm({
      name:          p.name,
      price:         String(p.price),
      originalPrice: String(p.originalPrice ?? ''),
      image:         p.image,
      description:   p.description,
      category:      p.category,
      stock:         String(p.stock),
      brand:         p.brand ?? '',
      shipping:      p.shipping,
      featured:      p.featured,
      condition:     p.condition ?? 'Brand new',
    })
    setModalMode('edit')
  }

  const closeModal = () => {
    setModalMode(null)
    setEditProduct(null)
    setForm(EMPTY_FORM)
  }

  const handleSave = async () => {
    if (!form.name || !form.price || !form.image || !form.category) {
      showFeedback('error', 'Name, price, image and category are required')
      return
    }
    setSaving(true)
    try {
      const payload = {
        ...form,
        price:         Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        stock:         Number(form.stock),
      }
      if (modalMode === 'add') {
        await api.post('/products', payload)
        showFeedback('success', 'Product added successfully')
      } else if (editProduct) {
        await api.put(`/products/${editProduct._id}`, payload)
        showFeedback('success', 'Product updated successfully')
      }
      closeModal()
      window.location.reload()
    } catch (err: any) {
      showFeedback('error', err.response?.data?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/products/${id}`)
      showFeedback('success', 'Product deleted')
      setDeleteId(null)
      window.location.reload()
    } catch (err: any) {
      showFeedback('error', err.response?.data?.message || 'Delete failed')
    }
  }

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1C1C1C]">Admin Panel</h1>
            <p className="text-sm text-[#8B96A5] mt-0.5">Manage your product catalogue</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-[#0D6EFD] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <span className="material-icons text-[18px]">add</span>
            Add product
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${
            feedback.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {feedback.msg}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total products', value: products.length, icon: 'inventory_2'       },
            { label: 'In stock',       value: products.filter(p => p.stock > 0).length, icon: 'check_circle' },
            { label: 'Featured',       value: products.filter(p => p.featured).length,  icon: 'star'         },
            { label: 'Out of stock',   value: products.filter(p => p.stock === 0).length, icon: 'cancel'     },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-xl border border-[#DEE2E7] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EEF3FD] flex items-center justify-center shrink-0">
                <span className="material-icons text-[#0D6EFD] text-[20px]">{icon}</span>
              </div>
              <div>
                <p className="text-xl font-bold text-[#1C1C1C]">{value}</p>
                <p className="text-xs text-[#8B96A5]">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Products table */}
        <div className="bg-white rounded-xl border border-[#DEE2E7] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#DEE2E7]">
            <h2 className="font-semibold text-[#1C1C1C]">Products</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-4 border-[#0D6EFD] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : error ? (
            <div className="p-8 text-center text-[#E53935] text-sm">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F7F7F7] border-b border-[#DEE2E7]">
                  <tr>
                    <th className="text-left px-4 py-3 text-[#8B96A5] font-medium">Product</th>
                    <th className="text-left px-4 py-3 text-[#8B96A5] font-medium">Category</th>
                    <th className="text-left px-4 py-3 text-[#8B96A5] font-medium">Price</th>
                    <th className="text-left px-4 py-3 text-[#8B96A5] font-medium">Stock</th>
                    <th className="text-left px-4 py-3 text-[#8B96A5] font-medium">Status</th>
                    <th className="text-right px-4 py-3 text-[#8B96A5] font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DEE2E7]">
                  {products.map(p => (
                    <tr key={p._id} className="hover:bg-[#F7F7F7] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg border border-[#DEE2E7] bg-[#F7F7F7] flex items-center justify-center overflow-hidden shrink-0">
                            <img src={p.image} alt={p.name} className="w-full h-full object-contain p-1" />
                          </div>
                          <p className="font-medium text-[#1C1C1C] line-clamp-1 max-w-[200px]">{p.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#8B96A5]">{p.category}</td>
                      <td className="px-4 py-3 font-semibold text-[#1C1C1C]">${p.price.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-medium ${p.stock > 0 ? 'text-[#00B517]' : 'text-[#E53935]'}`}>
                          {p.stock > 0 ? p.stock : 'Out of stock'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {p.featured && (
                          <span className="inline-flex items-center gap-1 bg-[#FFF3E8] text-[#FF9017] text-xs font-medium px-2 py-0.5 rounded-full">
                            <span className="material-icons text-[12px]">star</span>
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(p)}
                            className="flex items-center gap-1 border border-[#DEE2E7] text-[#0D6EFD] text-xs px-3 py-1.5 rounded hover:bg-blue-50 transition-colors"
                          >
                            <span className="material-icons text-[14px]">edit</span>
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteId(p._id)}
                            className="flex items-center gap-1 border border-[#DEE2E7] text-[#E53935] text-xs px-3 py-1.5 rounded hover:bg-red-50 transition-colors"
                          >
                            <span className="material-icons text-[14px]">delete</span>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* ── Add/Edit Modal ── */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-[560px] max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#DEE2E7]">
              <h2 className="font-semibold text-[#1C1C1C]">
                {modalMode === 'add' ? 'Add product' : 'Edit product'}
              </h2>
              <button onClick={closeModal} className="text-[#8B96A5] hover:text-[#1C1C1C]">
                <span className="material-icons">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              {[
                { label: 'Product name *', key: 'name',         type: 'text'   },
                { label: 'Image URL *',    key: 'image',        type: 'text'   },
                { label: 'Category *',     key: 'category',     type: 'text'   },
                { label: 'Brand',          key: 'brand',        type: 'text'   },
                { label: 'Price *',        key: 'price',        type: 'number' },
                { label: 'Original price', key: 'originalPrice', type: 'number' },
                { label: 'Stock *',        key: 'stock',        type: 'number' },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-[#1C1C1C] mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={(form as any)[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full border border-[#DEE2E7] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#0D6EFD] transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-[#1C1C1C] mb-1.5">Description *</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full border border-[#DEE2E7] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#0D6EFD] transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1C1C] mb-1.5">Shipping</label>
                <select
                  value={form.shipping}
                  onChange={e => setForm(f => ({ ...f, shipping: e.target.value }))}
                  className="w-full border border-[#DEE2E7] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#0D6EFD] bg-white"
                >
                  <option>Free Shipping</option>
                  <option>Standard Shipping</option>
                  <option>Express Shipping</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1C1C] mb-1.5">Condition</label>
                <select
                  value={form.condition}
                  onChange={e => setForm(f => ({ ...f, condition: e.target.value }))}
                  className="w-full border border-[#DEE2E7] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#0D6EFD] bg-white"
                >
                  <option>Brand new</option>
                  <option>Refurbished</option>
                  <option>Old items</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                  className="w-4 h-4 accent-[#0D6EFD]"
                />
                <span className="text-sm font-medium text-[#1C1C1C]">Featured product</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#DEE2E7]">
              <button
                onClick={closeModal}
                className="border border-[#DEE2E7] text-[#1C1C1C] text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#F7F7F7] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#0D6EFD] hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : modalMode === 'add' ? 'Add product' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirm ── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-[400px] p-6 shadow-xl">
            <h3 className="font-semibold text-[#1C1C1C] mb-2">Delete product?</h3>
            <p className="text-sm text-[#8B96A5] mb-6">This action cannot be undone.</p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="border border-[#DEE2E7] text-[#1C1C1C] text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#F7F7F7] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="bg-[#E53935] hover:bg-red-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}