import 'dotenv/config'
import mongoose from 'mongoose'
import Product from '../models/Product.js'
import User from '../models/User.js'

const products = [
    { name: 'Canon EOS 2000 DSLR Camera (Black Edition)', price: 998.0, originalPrice: 1128.0, image: '/assets/products/product-1.png', description: 'High-quality DSLR camera with 10x optical zoom.', category: 'Electronics', stock: 50, rating: 7.5, orders: 154, featured: true, discount: 0, shipping: 'Free Shipping' },
    { name: 'GoPro HERO6 4K Action Camera', price: 499.0, originalPrice: 599.0, image: '/assets/products/product-2.png', description: 'Rugged waterproof action camera for extreme sports.', category: 'Electronics', stock: 30, rating: 8.2, orders: 220, featured: true, discount: 15, shipping: 'Free Shipping' },
    { name: 'GoPro HERO7 Black Adventure Kit', price: 549.0, originalPrice: 649.0, image: '/assets/products/product-3.png', description: 'Advanced stabilization with bundled accessories.', category: 'Electronics', stock: 20, rating: 8.6, orders: 180, featured: false, discount: 10, shipping: 'Free Shipping' },
    { name: 'GoPro HERO8 Waterproof Bundle Pack', price: 599.0, originalPrice: 699.0, image: '/assets/products/product-4.png', description: 'Next-gen stabilization and improved low-light performance.', category: 'Electronics', stock: 15, rating: 8.9, orders: 140, featured: false, discount: 5, shipping: 'Free Shipping' },
    { name: 'GoPro MAX 360 Action Camera', price: 699.0, originalPrice: 799.0, image: '/assets/products/product-5.png', description: '360-degree immersive video capture camera.', category: 'Electronics', stock: 25, rating: 8.4, orders: 110, featured: true, discount: 12, shipping: 'Free Shipping' },
    { name: 'GoPro Fusion 360 Pro Edition', price: 749.0, originalPrice: 849.0, image: '/assets/products/product-6.png', description: 'Professional-grade 360 VR capture device.', category: 'Electronics', stock: 10, rating: 8.7, orders: 95, featured: false, discount: 8, shipping: 'Free Shipping' },
    { name: 'Smart Watch Series 5 Pro', price: 99.0, originalPrice: 130.0, image: '/assets/1.png', description: 'Health tracking smartwatch with AMOLED display.', category: 'Gadgets', stock: 100, rating: 8.0, orders: 200, featured: true, discount: 25, shipping: 'Free Shipping' },
    { name: 'Laptop Pro 15 Ultra Performance', price: 899.0, originalPrice: 1050.0, image: '/assets/2.png', description: 'High-performance laptop for developers and creators.', category: 'Electronics', stock: 40, rating: 9.0, orders: 89, featured: true, discount: 15, shipping: 'Free Shipping' },
    { name: 'GoPro Action Camera 4K Ultra', price: 399.0, originalPrice: 650.0, image: '/assets/3.png', description: 'Compact waterproof 4K action camera.', category: 'Electronics', stock: 60, rating: 8.5, orders: 312, featured: true, discount: 40, shipping: 'Free Shipping' },
    { name: 'Gaming Headphones Pro Surround 7.1', price: 149.0, originalPrice: 200.0, image: '/assets/4.png', description: 'Immersive gaming audio with surround sound.', category: 'Gadgets', stock: 75, rating: 7.8, orders: 178, featured: true, discount: 25, shipping: 'Free Shipping' },
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

    for (const product of products) {
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