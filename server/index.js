import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import productRoutes from './routes/product.js'
import authRoutes from './routes/auth.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);

  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch(err => {
      console.error("MongoDB connection failed:", err.message);
    });
});