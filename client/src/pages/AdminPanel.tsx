import { useState } from 'react'
import { useAdminProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../hooks/useAdminProducts'
import type { Product } from '../types'

type ModalMode = 'add' | 'edit' | null

interface Toast {
  id: number
  type: 'success' | 'error'
  msg: string
}

const FEATURES_OPTIONS = [
  'Premium Build', 'Portable Design', 'Wireless Connectivity',
  'High Performance', 'Energy Efficient', 'Smart Features',
  'Easy Maintenance', 'Warranty Included', 'Modern Design',
]

const EMPTY_FORM = {
  name: '', price: '', originalPrice: '', image: '',
  description: '', category: '', stock: '', brand: '',
  shipping: 'Free Shipping', featured: false, condition: 'Brand new',
  rating: '', reviews: '', sold: '',
  sellerName: '', sellerLocation: '', sellerVerified: true,
  features: [] as string[],
  pricingTiers: [{ range: '', price: '' }] as { range: string; price: string }[],
  specTable: [{ label: '', value: '' }] as { label: string; value: string }[],
  specs: {} as Record<string, string>,
}

let toastId = 0

export default function AdminPanel() {
  const { data: products = [], isLoading, error } = useAdminProducts()
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()
  const deleteProduct = useDeleteProduct()

  const [modalMode, setModalMode]     = useState<ModalMode>(null)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [form, setForm]               = useState(EMPTY_FORM)
  const [deleteId, setDeleteId]       = useState<string | null>(null)
  const [toasts, setToasts]           = useState<Toast[]>([])
  const [specKey, setSpecKey]         = useState('')
  const [specVal, setSpecVal]         = useState('')

  const addToast = (type: 'success' | 'error', msg: string) => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, type, msg }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }

  const field = <K extends keyof typeof EMPTY_FORM>(key: K, value: (typeof EMPTY_FORM)[K]) =>
    setForm(f => ({ ...f, [key]: value }))

  const openAdd = () => {
    setForm(EMPTY_FORM)
    setEditProduct(null)
    setModalMode('add')
  }

  const openEdit = (p: Product) => {
    setEditProduct(p)
    setForm({
      name:            p.name,
      price:           String(p.price),
      originalPrice:   String(p.originalPrice ?? ''),
      image:           p.image,
      description:     p.description,
      category:        p.category,
      stock:           String(p.stock),
      brand:           p.brand ?? '',
      shipping:        p.shipping,
      featured:        p.featured,
      condition:       p.condition ?? 'Brand new',
      rating:          String(p.rating ?? ''),
      reviews:         String(p.reviews ?? ''),
      sold:            String(p.sold ?? ''),
      sellerName:      p.seller?.name ?? '',
      sellerLocation:  p.seller?.location ?? '',
      sellerVerified:  p.seller?.verified ?? true,
      features:        p.features ?? [],
      pricingTiers:    p.pricingTiers?.map(t => ({ range: t.range, price: String(t.price) })) ?? [{ range: '', price: '' }],
      specTable:       p.specTable?.map(r => ({ label: r.label, value: r.value })) ?? [{ label: '', value: '' }],
      specs:           p.specs ?? {},
    })
    setModalMode('edit')
  }

  const closeModal = () => { setModalMode(null); setEditProduct(null); setForm(EMPTY_FORM) }

  const buildPayload = () => ({
    name:          form.name,
    price:         Number(form.price),
    originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
    image:         form.image,
    description:   form.description,
    category:      form.category,
    stock:         Number(form.stock),
    brand:         form.brand || undefined,
    shipping:      form.shipping,
    featured:      form.featured,
    condition:     form.condition,
    rating:        form.rating ? Number(form.rating) : undefined,
    reviews:       form.reviews ? Number(form.reviews) : undefined,
    sold:          form.sold ? Number(form.sold) : undefined,
    seller: {
      name:     form.sellerName,
      location: form.sellerLocation,
      verified: form.sellerVerified,
    },
    features:     form.features.filter(Boolean),
    pricingTiers: form.pricingTiers.filter(t => t.range && t.price).map(t => ({ range: t.range, price: Number(t.price) })),
    specTable:    form.specTable.filter(r => r.label && r.value),
    specs:        form.specs,
  })

  const handleSave = async () => {
    if (!form.name || !form.price || !form.image || !form.category) {
      addToast('error', 'Name, price, image and category are required')
      return
    }
    try {
      const payload = buildPayload()
      if (modalMode === 'add') {
        await createProduct.mutateAsync(payload as any)
        addToast('success', 'Product added successfully')
      } else if (editProduct) {
        await updateProduct.mutateAsync({ id: editProduct._id, payload: payload as any })
        addToast('success', 'Product updated successfully')
      }
      closeModal()
    } catch (err: any) {
      addToast('error', err.response?.data?.message || 'Save failed')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id)
      addToast('success', 'Product deleted')
      setDeleteId(null)
    } catch (err: any) {
      addToast('error', err.response?.data?.message || 'Delete failed')
    }
  }

  const saving = createProduct.isPending || updateProduct.isPending

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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total products', value: products.length,                          icon: 'inventory_2'  },
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
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-4 border-[#0D6EFD] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : error ? (
            <div className="p-8 text-center text-[#E53935] text-sm">{String(error)}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F7F7F7] border-b border-[#DEE2E7]">
                  <tr>
                    <th className="text-left px-4 py-3 text-[#8B96A5] font-medium">Product</th>
                    <th className="text-left px-4 py-3 text-[#8B96A5] font-medium">Category</th>
                    <th className="text-left px-4 py-3 text-[#8B96A5] font-medium">Condition</th>
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
                          <p className="font-medium text-[#1C1C1C] line-clamp-1 max-w-[180px]">{p.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#8B96A5]">{p.category}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-[#F7F7F7] border border-[#DEE2E7] text-[#8B96A5] px-2 py-0.5 rounded-full">
                          {p.condition ?? 'Brand new'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#1C1C1C]">${p.price.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-medium ${p.stock > 0 ? 'text-[#00B517]' : 'text-[#E53935]'}`}>
                          {p.stock > 0 ? p.stock : 'Out'}
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
          <div className="bg-white rounded-xl w-full max-w-[620px] max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#DEE2E7] sticky top-0 bg-white z-10">
              <h2 className="font-semibold text-[#1C1C1C]">
                {modalMode === 'add' ? 'Add product' : 'Edit product'}
              </h2>
              <button onClick={closeModal} className="text-[#8B96A5] hover:text-[#1C1C1C]">
                <span className="material-icons">close</span>
              </button>
            </div>

            <div className="p-6 space-y-6">

              {/* Basic info */}
              <section>
                <h3 className="text-xs font-semibold text-[#8B96A5] uppercase tracking-wide mb-3">Basic info</h3>
                <div className="space-y-3">
                  {([
                    { label: 'Product name *', key: 'name',         type: 'text'   },
                    { label: 'Image URL *',    key: 'image',        type: 'text'   },
                    { label: 'Category *',     key: 'category',     type: 'text'   },
                    { label: 'Brand',          key: 'brand',        type: 'text'   },
                  ] as const).map(({ label, key, type }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-[#1C1C1C] mb-1">{label}</label>
                      <input
                        type={type}
                        value={form[key] as string}
                        onChange={e => field(key, e.target.value)}
                        className="w-full border border-[#DEE2E7] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6EFD] transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Description</label>
                    <textarea
                      value={form.description}
                      onChange={e => field('description', e.target.value)}
                      rows={3}
                      className="w-full border border-[#DEE2E7] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6EFD] resize-none"
                    />
                  </div>
                </div>
              </section>

              {/* Pricing & inventory */}
              <section>
                <h3 className="text-xs font-semibold text-[#8B96A5] uppercase tracking-wide mb-3">Pricing & inventory</h3>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { label: 'Price *',        key: 'price'         },
                    { label: 'Original price', key: 'originalPrice' },
                    { label: 'Stock *',        key: 'stock'         },
                    { label: 'Rating (0-10)',  key: 'rating'        },
                    { label: 'Reviews count',  key: 'reviews'       },
                    { label: 'Sold count',     key: 'sold'          },
                  ] as const).map(({ label, key }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-[#1C1C1C] mb-1">{label}</label>
                      <input
                        type="number"
                        value={form[key] as string}
                        onChange={e => field(key, e.target.value)}
                        className="w-full border border-[#DEE2E7] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6EFD]"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Pricing tiers */}
              <section>
                <h3 className="text-xs font-semibold text-[#8B96A5] uppercase tracking-wide mb-3">Pricing tiers</h3>
                <div className="space-y-2">
                  {form.pricingTiers.map((tier, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Range (e.g. 50-100 pcs)"
                        value={tier.range}
                        onChange={e => {
                          const next = [...form.pricingTiers]
                          next[i] = { ...next[i], range: e.target.value }
                          field('pricingTiers', next)
                        }}
                        className="flex-1 border border-[#DEE2E7] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6EFD]"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={tier.price}
                        onChange={e => {
                          const next = [...form.pricingTiers]
                          next[i] = { ...next[i], price: e.target.value }
                          field('pricingTiers', next)
                        }}
                        className="w-[100px] border border-[#DEE2E7] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6EFD]"
                      />
                      <button
                        onClick={() => field('pricingTiers', form.pricingTiers.filter((_, j) => j !== i))}
                        className="text-[#E53935] hover:text-red-700"
                      >
                        <span className="material-icons text-[18px]">remove_circle_outline</span>
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => field('pricingTiers', [...form.pricingTiers, { range: '', price: '' }])}
                    className="text-xs text-[#0D6EFD] hover:underline flex items-center gap-1"
                  >
                    <span className="material-icons text-[14px]">add</span>
                    Add tier
                  </button>
                </div>
              </section>

              {/* Seller */}
              <section>
                <h3 className="text-xs font-semibold text-[#8B96A5] uppercase tracking-wide mb-3">Seller details</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Seller name</label>
                      <input
                        type="text"
                        value={form.sellerName}
                        onChange={e => field('sellerName', e.target.value)}
                        className="w-full border border-[#DEE2E7] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6EFD]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Location</label>
                      <input
                        type="text"
                        value={form.sellerLocation}
                        onChange={e => field('sellerLocation', e.target.value)}
                        className="w-full border border-[#DEE2E7] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6EFD]"
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.sellerVerified}
                      onChange={e => field('sellerVerified', e.target.checked)}
                      className="w-4 h-4 accent-[#0D6EFD]"
                    />
                    <span className="text-sm text-[#1C1C1C]">Verified seller</span>
                  </label>
                </div>
              </section>

              {/* Features */}
              <section>
                <h3 className="text-xs font-semibold text-[#8B96A5] uppercase tracking-wide mb-3">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {FEATURES_OPTIONS.map(f => (
                    <label key={f} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.features.includes(f)}
                        onChange={() => {
                          const next = form.features.includes(f)
                            ? form.features.filter(x => x !== f)
                            : [...form.features, f]
                          field('features', next)
                        }}
                        className="w-4 h-4 accent-[#0D6EFD]"
                      />
                      <span className="text-sm text-[#1C1C1C]">{f}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Spec table */}
              <section>
                <h3 className="text-xs font-semibold text-[#8B96A5] uppercase tracking-wide mb-3">Spec table rows</h3>
                <div className="space-y-2">
                  {form.specTable.map((row, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Label (e.g. Model)"
                        value={row.label}
                        onChange={e => {
                          const next = [...form.specTable]
                          next[i] = { ...next[i], label: e.target.value }
                          field('specTable', next)
                        }}
                        className="flex-1 border border-[#DEE2E7] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6EFD]"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={row.value}
                        onChange={e => {
                          const next = [...form.specTable]
                          next[i] = { ...next[i], value: e.target.value }
                          field('specTable', next)
                        }}
                        className="flex-1 border border-[#DEE2E7] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6EFD]"
                      />
                      <button
                        onClick={() => field('specTable', form.specTable.filter((_, j) => j !== i))}
                        className="text-[#E53935] hover:text-red-700"
                      >
                        <span className="material-icons text-[18px]">remove_circle_outline</span>
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => field('specTable', [...form.specTable, { label: '', value: '' }])}
                    className="text-xs text-[#0D6EFD] hover:underline flex items-center gap-1"
                  >
                    <span className="material-icons text-[14px]">add</span>
                    Add row
                  </button>
                </div>
              </section>

              {/* Specs (key-value map) */}
              <section>
                <h3 className="text-xs font-semibold text-[#8B96A5] uppercase tracking-wide mb-3">Specs</h3>
                <div className="space-y-2 mb-2">
                  {Object.entries(form.specs).map(([k, v]) => (
                    <div key={k} className="flex gap-2 items-center">
                      <span className="flex-1 text-sm text-[#1C1C1C] bg-[#F7F7F7] border border-[#DEE2E7] rounded-lg px-3 py-2">{k}</span>
                      <span className="flex-1 text-sm text-[#8B96A5] bg-[#F7F7F7] border border-[#DEE2E7] rounded-lg px-3 py-2">{v}</span>
                      <button
                        onClick={() => {
                          const next = { ...form.specs }
                          delete next[k]
                          field('specs', next)
                        }}
                        className="text-[#E53935] hover:text-red-700"
                      >
                        <span className="material-icons text-[18px]">remove_circle_outline</span>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Key (e.g. Material)"
                    value={specKey}
                    onChange={e => setSpecKey(e.target.value)}
                    className="flex-1 border border-[#DEE2E7] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6EFD]"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={specVal}
                    onChange={e => setSpecVal(e.target.value)}
                    className="flex-1 border border-[#DEE2E7] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6EFD]"
                  />
                  <button
                    onClick={() => {
                      if (!specKey.trim() || !specVal.trim()) return
                      field('specs', { ...form.specs, [specKey.trim()]: specVal.trim() })
                      setSpecKey('')
                      setSpecVal('')
                    }}
                    className="bg-[#0D6EFD] text-white text-xs font-medium px-3 rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </section>

              {/* Settings */}
              <section>
                <h3 className="text-xs font-semibold text-[#8B96A5] uppercase tracking-wide mb-3">Settings</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Shipping</label>
                    <select
                      value={form.shipping}
                      onChange={e => field('shipping', e.target.value)}
                      className="w-full border border-[#DEE2E7] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6EFD] bg-white"
                    >
                      <option>Free Shipping</option>
                      <option>Standard Shipping</option>
                      <option>Express Shipping</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Condition</label>
                    <select
                      value={form.condition}
                      onChange={e => field('condition', e.target.value)}
                      className="w-full border border-[#DEE2E7] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6EFD] bg-white"
                    >
                      <option>Brand new</option>
                      <option>Refurbished</option>
                      <option>Old items</option>
                    </select>
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer mt-3">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={e => field('featured', e.target.checked)}
                    className="w-4 h-4 accent-[#0D6EFD]"
                  />
                  <span className="text-sm font-medium text-[#1C1C1C]">Featured product</span>
                </label>
              </section>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#DEE2E7] sticky bottom-0 bg-white">
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
            <h3 className="font-semibold text-[#1C1C1C] mb-2">
              Delete "{products.find(p => p._id === deleteId)?.name}"?
            </h3>
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
                disabled={deleteProduct.isPending}
                className="bg-[#E53935] hover:bg-red-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {deleteProduct.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast notifications ── */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium min-w-[260px] ${
              toast.type === 'success'
                ? 'bg-[#00B517] text-white'
                : 'bg-[#E53935] text-white'
            }`}
          >
            <span className="material-icons text-[18px]">
              {toast.type === 'success' ? 'check_circle' : 'error'}
            </span>
            {toast.msg}
          </div>
        ))}
      </div>
    </div>
  )
}