import express from 'express'
import { protect, adminOnly } from '../middleware/auth.js'
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'

const router = express.Router()

// GET /api/products
router.get('/', getProducts)

// GET /api/products/:id
router.get('/:id', getProductById)

// POST /api/products — admin only
router.post('/', protect, adminOnly, createProduct)

// PUT /api/products/:id — admin only
router.put('/:id', protect, adminOnly, updateProduct)

// DELETE /api/products/:id — admin only
router.delete('/:id', protect, adminOnly, deleteProduct)

export default router