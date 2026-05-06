import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    price:       { type: Number, required: true, min: 0 },
    image:       { type: String, required: true },
    description: { type: String, required: true },
    category:    { type: String, required: true },
    stock:       { type: Number, required: true, default: 0 },
    rating:      { type: Number, default: 0, min: 0, max: 10 },
    orders:      { type: Number, default: 0 },
    originalPrice: { type: Number },
    discount:    { type: Number, default: 0 },
    shipping:    { type: String, default: 'Free Shipping' },
    featured:    { type: Boolean, default: false },
    seller: {
      name:     { type: String, default: 'Artel Market' },
      location: { type: String, default: 'Germany, Berlin' },
      verified: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
)

productSchema.index({ name: 'text', category: 'text' })

export default mongoose.model('Product', productSchema)