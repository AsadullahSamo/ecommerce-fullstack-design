import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import productRoutes from './routes/products.js'
import authRoutes from './routes/auth.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server on port ${process.env.PORT || 5000}`)
    )
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })