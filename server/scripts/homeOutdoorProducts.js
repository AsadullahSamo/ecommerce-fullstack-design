const homeOutdoorProducts = [
  {
    name: 'Electric kettle',
    price: 240,
    originalPrice: 290,
    image: '/assets/electric-kettle.png',
    description: 'Premium electric kettle with fast boiling and temperature control.',
    category: 'Home & Outdoor',
    stock: 25,
    rating: 8.5,
    orders: 130,
    reviews: 54,
    sold: 112,
    featured: false,
    shipping: 'Free Shipping',
    specs: {
      Price: '$240',
      Type: 'Electric Kettle',
      Material: 'Stainless Steel',
      Design: 'Minimal',
      Protection: 'Refund available',
      Warranty: '2 years',
    },
    specTable: [
      { label: 'Capacity', value: '1.8L' },
      { label: 'Power', value: '1800W' },
      { label: 'Temperature Control', value: 'Yes' },
    ],
    pricingTiers: [
      { range: '1-10 pcs', price: 240 },
      { range: '10+ pcs', price: 225 },
    ],
    features: ['Fast boil', 'Auto shut-off', 'Premium steel body'],
    seller: {
      name: 'Kitchen Tech',
      location: 'Germany',
      verified: true,
    },
  },

  {
    name: 'Coffee maker',
    price: 10,
    originalPrice: 18,
    image: '/assets/coffee-maker.png',
    description: 'Compact coffee maker for brewing fresh coffee quickly at home.',
    category: 'Home & Outdoor',
    stock: 60,
    rating: 8.1,
    orders: 210,
    reviews: 70,
    sold: 180,
    featured: true,
    shipping: 'Free Shipping',
    specs: {
      Price: '$10',
      Type: 'Coffee Maker',
      Material: 'Plastic & Steel',
      Design: 'Minimal',
      Protection: '7-day return',
      Warranty: '1 year',
    },
    specTable: [
      { label: 'Capacity', value: '1L' },
      { label: 'Brewing Time', value: '5 min' },
      { label: 'Power', value: '600W' },
    ],
    pricingTiers: [
      { range: '1-25 pcs', price: 10 },
      { range: '25+ pcs', price: 8 },
    ],
    features: ['Easy Maintenance', 'Modern Design', 'Energy Efficient'],
    seller: {
      name: 'CafeTech',
      location: 'France',
      verified: true,
    },
  }
]

export default homeOutdoorProducts