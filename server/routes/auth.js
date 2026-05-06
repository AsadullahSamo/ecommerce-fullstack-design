import 'dotenv/config'
import express from 'express'
import jwt from 'jsonwebtoken'
import { protect } from '../middleware/auth.js'
import { register, login, getMe } from '../controllers/authController.js'

const router = express.Router()

// POST /api/auth/register
router.post('/register', register)

// POST /api/auth/login
router.post('/login', login)

// GET /api/auth/me
router.get('/me', protect, getMe)

export default router