import Product from '../models/Product.js'

export const getProducts = async (req, res) => {
  try {
    const { q, category, page = 1, limit = 10, featured, minPrice, maxPrice, brand, minRating, verified } = req.query
    const filter = {}

    if (q) filter.$text = { $search: q }
    if (category) filter.category = { $regex: category, $options: 'i' }
    if (featured === 'true') filter.featured = true
    if (minPrice) filter.price = { ...filter.price, $gte: Number(req.query.minPrice) }
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(req.query.maxPrice) }
    if (brand) filter.brand = { $in: brand.split(',') }
    if (minRating) filter.rating = { $gte: Number(req.query.minRating) }
    if (verified === 'true') filter['seller.verified'] = true

    const skip = (Number(page) - 1) * Number(limit)
    const [products, total] = await Promise.all([
      Product.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Product.countDocuments(filter),
    ])

    res.json({ products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const updateProduct = async (req, res) => {
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
}

export const deleteProduct =  async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}