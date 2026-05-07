import 'dotenv/config'
import mongoose from 'mongoose'
import Product from '../models/Product.js'
import User from '../models/User.js'
import products from './products.js'
import homeAndOutdoorProducts from './homeOutdoorProducts.js'
import electronicProducts from './electronicProducts.js'

const productsArray = [
  ...products,
  ...homeAndOutdoorProducts,
  ...electronicProducts,
]

const adminUser = {
  name: 'Admin',
  email: 'admin@ecommerce.com',
  password: 'admin123456',
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

    for (const product of productsArray) {
      await Product.updateOne(
        { name: product.name },
        { $setOnInsert: product },
        { upsert: true }
      )
    }

    console.log(`Seed completed safely`)
  } catch (err) {
    console.error('Seed error:', err)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
  }
}

seed()