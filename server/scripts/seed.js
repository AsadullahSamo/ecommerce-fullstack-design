import 'dotenv/config'
import mongoose from 'mongoose'
import Product from '../models/Product.js'
import User from '../models/User.js'
import products from './products.js'
import bcrypt from 'bcryptjs'

const productsArray = [
  ...products,
]

const hashedPassword = await bcrypt.hash('admin123456', 12)

const adminUser = {
  name: 'Admin',
  email: 'admin@ecommerce.com',
  password: hashedPassword,
  role: 'admin',
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    await User.updateOne(
      { email: adminUser.email },
      {
        $setOnInsert: adminUser,
      },
      { upsert: true }
    )

    const cleanProduct = (p) => {
      const { createdAt, updatedAt, ...rest } = p
      return rest
    }

    for (const product of productsArray) {
      await Product.updateOne(
        { name: product.name },
        { $setOnInsert: cleanProduct(product) },
        { upsert: true }
      )
    }

    console.log(`Seed completed safely with ${productsArray.length} products and 1 admin user.`)
  } catch (err) {
    console.error('Seed error:', err)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
  }
}

seed()