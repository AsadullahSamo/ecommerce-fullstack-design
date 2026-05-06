import express from 'express'
import Product from '../models/Product.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// GET /api/products — with search, category filter, pagination
router.get('/', async (req, res) => {
  try {
    const { q, category, page = 1, limit = 10, featured } = req.query
    const filter = {}

    if (q) filter.$text = { $search: q }
    if (category) filter.category = { $regex: category, $options: 'i' }
    if (featured === 'true') filter.featured = true

    const skip = (Number(page) - 1) * Number(limit)
    const [products, total] = await Promise.all([
      Product.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Product.countDocuments(filter),
    ])

    res.json({ products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/products — admin only
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// PUT /api/products/:id — admin only
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE /api/products/:id — admin only
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router