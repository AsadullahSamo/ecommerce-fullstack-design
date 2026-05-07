import 'dotenv/config'
import mongoose from 'mongoose'
import Product from '../models/Product.js'
import User from '../models/User.js'

const products = [
  {
    name: 'Apple MacBook Pro 16 M3 Max',
    price: 2899,
    originalPrice: 3199,
    image: '/assets/products/macbook-pro.png',
    description:
      'High-end professional laptop designed for developers, designers, and video editors with Apple M3 Max chip.',
    category: 'Computers',
    stock: 12,
    rating: 9.4,
    orders: 542,
    reviews: 188,
    sold: 497,
    featured: true,
    discount: 10,
    shipping: 'Free Express Shipping',
    specs: {
      Price: '$2899',
      Type: 'Laptop',
      Material: 'Aluminum',
      Design: 'Minimal',
      Protection: '30-day return',
      Warranty: '3 years',
    },
    specTable: [
      { label: 'Processor', value: 'Apple M3 Max' },
      { label: 'RAM', value: '36GB' },
      { label: 'Storage', value: '1TB SSD' },
      { label: 'Display', value: '16.2-inch Liquid Retina XDR' },
      { label: 'Battery', value: '22 hours' },
    ],
    pricingTiers: [
      { range: '1-5 pcs', price: 2899 },
      { range: '5-20 pcs', price: 2750 },
      { range: '20+ pcs', price: 2590 },
    ],
    features: [
      'M3 Max performance',
      'Mini-LED display',
      'Thunderbolt 4',
      'Studio-quality microphones',
    ],
    seller: {
      name: 'TechNova Inc',
      location: 'United States',
      verified: true,
    },
  },

  {
    name: 'Samsung Galaxy S25 Ultra',
    price: 1399,
    originalPrice: 1499,
    image: '/assets/products/galaxy-s25.png',
    description:
      'Premium Android smartphone with AI-powered camera system and titanium frame.',
    category: 'Smartphones',
    stock: 38,
    rating: 9.1,
    orders: 1240,
    reviews: 420,
    sold: 1150,
    featured: true,
    discount: 7,
    shipping: 'Free Shipping',
    specs: {
      Price: '$1399',
      Type: 'Smartphone',
      Material: 'Titanium',
      Design: 'Edge-to-edge',
      Protection: 'Samsung Care',
      Warranty: '2 years',
    },
    specTable: [
      { label: 'Processor', value: 'Snapdragon 8 Gen 4' },
      { label: 'Camera', value: '200MP' },
      { label: 'Battery', value: '5000mAh' },
      { label: 'Display', value: '6.9-inch AMOLED' },
      { label: 'Storage', value: '512GB' },
    ],
    pricingTiers: [
      { range: '1-10 pcs', price: 1399 },
      { range: '10-50 pcs', price: 1290 },
      { range: '50+ pcs', price: 1190 },
    ],
    features: [
      'AI Zoom',
      '120Hz display',
      'S-Pen support',
      'Fast wireless charging',
    ],
    seller: {
      name: 'K-Mobile Hub',
      location: 'South Korea',
      verified: true,
    },
  },

  {
    name: 'Sony WH-1000XM5 Wireless Headphones',
    price: 349,
    originalPrice: 420,
    image: '/assets/products/sony-headphones.png',
    description:
      'Industry-leading noise cancellation headphones with crystal clear audio.',
    category: 'Audio',
    stock: 85,
    rating: 8.9,
    orders: 780,
    reviews: 265,
    sold: 720,
    featured: true,
    discount: 17,
    shipping: 'Free Shipping',
    specs: {
      Price: '$349',
      Type: 'Wireless Headphones',
      Material: 'Plastic & Foam',
      Design: 'Over-ear',
      Protection: 'Refund available',
      Warranty: '1 year',
    },
    specTable: [
      { label: 'Battery', value: '30 hours' },
      { label: 'Connectivity', value: 'Bluetooth 5.3' },
      { label: 'Weight', value: '250g' },
      { label: 'Noise Cancellation', value: 'Adaptive ANC' },
    ],
    pricingTiers: [
      { range: '1-25 pcs', price: 349 },
      { range: '25-100 pcs', price: 315 },
      { range: '100+ pcs', price: 289 },
    ],
    features: [
      'Adaptive ANC',
      'LDAC audio',
      'Touch controls',
      'Multipoint pairing',
    ],
    seller: {
      name: 'Tokyo Sound Ltd',
      location: 'Japan',
      verified: true,
    },
  },

  {
    name: 'DJI Mini 4 Pro Drone',
    price: 899,
    originalPrice: 999,
    image: '/assets/products/dji-drone.png',
    description:
      'Compact cinematic drone with obstacle avoidance and 4K HDR recording.',
    category: 'Drones',
    stock: 21,
    rating: 8.7,
    orders: 310,
    reviews: 98,
    sold: 287,
    featured: false,
    discount: 10,
    shipping: 'Free Shipping',
    specs: {
      Price: '$899',
      Type: 'Drone',
      Material: 'Carbon Fiber',
      Design: 'Foldable',
      Protection: 'DJI Care',
      Warranty: '1 year',
    },
    specTable: [
      { label: 'Flight Time', value: '34 minutes' },
      { label: 'Camera', value: '4K HDR' },
      { label: 'Weight', value: '249g' },
      { label: 'Range', value: '20km' },
    ],
    pricingTiers: [
      { range: '1-10 pcs', price: 899 },
      { range: '10-30 pcs', price: 850 },
      { range: '30+ pcs', price: 790 },
    ],
    features: [
      'Obstacle sensing',
      'ActiveTrack',
      'Vertical shooting',
      '4K HDR',
    ],
    seller: {
      name: 'SkyVision Tech',
      location: 'China',
      verified: true,
    },
  },

  {
    name: 'Nike Air Zoom Pegasus 41',
    price: 159,
    originalPrice: 210,
    image: '/assets/products/nike-pegasus.png',
    description:
      'Lightweight running shoes with responsive cushioning for daily training.',
    category: 'Footwear',
    stock: 120,
    rating: 8.4,
    orders: 980,
    reviews: 320,
    sold: 890,
    featured: true,
    discount: 24,
    shipping: 'Free Shipping',
    specs: {
      Price: '$159',
      Type: 'Running Shoes',
      Material: 'Mesh & Rubber',
      Design: 'Sport',
      Protection: 'Return policy',
      Warranty: '6 months',
    },
    specTable: [
      { label: 'Size Range', value: 'EU 39-47' },
      { label: 'Weight', value: '290g' },
      { label: 'Midsole', value: 'ZoomX Foam' },
      { label: 'Gender', value: 'Unisex' },
    ],
    pricingTiers: [
      { range: '1-20 pcs', price: 159 },
      { range: '20-100 pcs', price: 145 },
      { range: '100+ pcs', price: 130 },
    ],
    features: [
      'Breathable mesh',
      'ZoomX cushioning',
      'Durable outsole',
      'Lightweight build',
    ],
    seller: {
      name: 'RunnerPoint',
      location: 'United Kingdom',
      verified: false,
    },
  },

  {
    name: 'LG OLED evo C4 65-inch TV',
    price: 2199,
    originalPrice: 2499,
    image: '/assets/products/lg-oled-tv.png',
    description:
      'Premium OLED smart television with Dolby Vision and gaming optimization.',
    category: 'Home Entertainment',
    stock: 14,
    rating: 9.3,
    orders: 265,
    reviews: 102,
    sold: 231,
    featured: true,
    discount: 12,
    shipping: 'White Glove Delivery',
    specs: {
      Price: '$2199',
      Type: 'Smart TV',
      Material: 'Metal & Glass',
      Design: 'Ultra Slim',
      Protection: 'Screen protection',
      Warranty: '2 years',
    },
    specTable: [
      { label: 'Display', value: '65-inch OLED' },
      { label: 'Refresh Rate', value: '144Hz' },
      { label: 'Resolution', value: '4K UHD' },
      { label: 'HDR', value: 'Dolby Vision' },
    ],
    pricingTiers: [
      { range: '1-5 pcs', price: 2199 },
      { range: '5-20 pcs', price: 2050 },
      { range: '20+ pcs', price: 1900 },
    ],
    features: [
      'OLED evo panel',
      'Dolby Atmos',
      'HDMI 2.1',
      'NVIDIA G-Sync',
    ],
    seller: {
      name: 'Vision Electronics',
      location: 'Canada',
      verified: true,
    },
  },
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