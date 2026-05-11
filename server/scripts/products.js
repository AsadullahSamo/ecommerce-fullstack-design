const products = [
  {
    _id: {
      $oid: "69fc5ebfbe4b0334ca9c464b"
    },
    name: "Apple MacBook Pro 16 M3 Max",
    __v: 0,
    category: "Electronics",
    createdAt: {
      $date: "2026-05-07T09:43:27.107Z"
    },
    description: "High-end professional laptop designed for developers, designers, and video editors with Apple M3 Max chip.",
    featured: true,
    features: [
      "High Performance",
      "Premium Build",
      "Portable Design",
      "Warranty Included"
    ],
    image: "/assets/apple-macbook-pro-16.jpg",
    originalPrice: 3199,
    price: 2899,
    pricingTiers: [
      {
        range: "1-5 pcs",
        price: 2899,
        _id: {
          $oid: "69fc5ebf5e824a4e166f1145"
        }
      },
      {
        range: "5-20 pcs",
        price: 2750,
        _id: {
          $oid: "69fc5ebf5e824a4e166f1146"
        }
      },
      {
        range: "20+ pcs",
        price: 2590,
        _id: {
          $oid: "69fc5ebf5e824a4e166f1147"
        }
      }
    ],
    rating: 9.4,
    reviews: 188,
    seller: {
      name: "TechNova Inc",
      location: "United States",
      verified: true
    },
    shipping: "Standard shipping",
    sold: 497,
    specTable: [
      {
        label: "Processor",
        value: "Apple M3 Max",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1148"
        }
      },
      {
        label: "RAM",
        value: "36GB",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1149"
        }
      },
      {
        label: "Storage",
        value: "1TB SSD",
        _id: {
          $oid: "69fc5ebf5e824a4e166f114a"
        }
      },
      {
        label: "Display",
        value: "16.2-inch Liquid Retina XDR",
        _id: {
          $oid: "69fc5ebf5e824a4e166f114b"
        }
      },
      {
        label: "Battery",
        value: "22 hours",
        _id: {
          $oid: "69fc5ebf5e824a4e166f114c"
        }
      }
    ],
    specs: {
      Price: "$2899",
      Type: "Laptop",
      Material: "Aluminum",
      Design: "Minimal",
      Protection: "30-day return",
      Warranty: "3 years"
    },
    stock: 12,
    updatedAt: {
      $date: "2026-05-07T16:56:42.172Z"
    },
    brand: "Apple",
    condition: "Brand new"
  },
  {
    _id: {
      $oid: "69fc5ebfbe4b0334ca9c464c"
    },
    name: "Samsung Galaxy S25 Ultra",
    __v: 0,
    category: "Smartphones",
    createdAt: {
      $date: "2026-05-07T09:43:27.118Z"
    },
    description: "Premium Android smartphone with AI-powered camera system and titanium frame.",
    featured: true,
    features: [
      "Smart Features",
      "Wireless Connectivity",
      "Portable Design",
      "High Performance"
    ],
    image: "/assets/5.png",
    originalPrice: 1499,
    price: 1399,
    pricingTiers: [
      {
        range: "1-10 pcs",
        price: 1399,
        _id: {
          $oid: "69fc5ebf5e824a4e166f114d"
        }
      },
      {
        range: "10-50 pcs",
        price: 1290,
        _id: {
          $oid: "69fc5ebf5e824a4e166f114e"
        }
      },
      {
        range: "50+ pcs",
        price: 1190,
        _id: {
          $oid: "69fc5ebf5e824a4e166f114f"
        }
      }
    ],
    rating: 9.1,
    reviews: 420,
    seller: {
      name: "K-Mobile Hub",
      location: "South Korea",
      verified: true
    },
    shipping: "Standard shipping",
    sold: 1150,
    specTable: [
      {
        label: "Processor",
        value: "Snapdragon 8 Gen 4",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1150"
        }
      },
      {
        label: "Camera",
        value: "200MP",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1151"
        }
      },
      {
        label: "Battery",
        value: "5000mAh",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1152"
        }
      },
      {
        label: "Display",
        value: "6.9-inch AMOLED",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1153"
        }
      },
      {
        label: "Storage",
        value: "512GB",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1154"
        }
      }
    ],
    specs: {
      Price: "$1399",
      Type: "Smartphone",
      Material: "Titanium",
      Design: "Edge-to-edge",
      Protection: "Samsung Care",
      Warranty: "2 years"
    },
    stock: 38,
    updatedAt: {
      $date: "2026-05-07T16:56:42.188Z"
    },
    brand: "Samsung",
    condition: "Brand new"
  },
  {
    _id: {
      $oid: "69fc5ebfbe4b0334ca9c464d"
    },
    name: "Sony WH-1000XM5 Wireless Headphones",
    __v: 0,
    category: "Headphones",
    createdAt: {
      $date: "2026-05-07T09:43:27.126Z"
    },
    description: "Industry-leading noise cancellation headphones with crystal clear audio.",
    featured: true,
    features: [
      "Wireless Connectivity",
      "Portable Design",
      "Premium Build"
    ],
    image: "/assets/4.png",
    originalPrice: 420,
    price: 349,
    pricingTiers: [
      {
        range: "1-25 pcs",
        price: 349,
        _id: {
          $oid: "69fc5ebf5e824a4e166f1155"
        }
      },
      {
        range: "25-100 pcs",
        price: 315,
        _id: {
          $oid: "69fc5ebf5e824a4e166f1156"
        }
      },
      {
        range: "100+ pcs",
        price: 289,
        _id: {
          $oid: "69fc5ebf5e824a4e166f1157"
        }
      }
    ],
    rating: 8.9,
    reviews: 265,
    seller: {
      name: "Tokyo Sound Ltd",
      location: "Japan",
      verified: true
    },
    shipping: "Free Shipping",
    sold: 720,
    specTable: [
      {
        label: "Battery",
        value: "30 hours",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1158"
        }
      },
      {
        label: "Connectivity",
        value: "Bluetooth 5.3",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1159"
        }
      },
      {
        label: "Weight",
        value: "250g",
        _id: {
          $oid: "69fc5ebf5e824a4e166f115a"
        }
      },
      {
        label: "Noise Cancellation",
        value: "Adaptive ANC",
        _id: {
          $oid: "69fc5ebf5e824a4e166f115b"
        }
      }
    ],
    specs: {
      Price: "$349",
      Type: "Wireless Headphones",
      Material: "Plastic & Foam",
      Design: "Over-ear",
      Protection: "Refund available",
      Warranty: "1 year"
    },
    stock: 85,
    updatedAt: {
      $date: "2026-05-07T16:56:42.191Z"
    },
    brand: "Sony",
    condition: "Refurbished"
  },
  {
    _id: {
      $oid: "69fc5ebfbe4b0334ca9c464e"
    },
    name: "DJI Mini 4 Pro Drone",
    __v: 0,
    category: "Modern tech",
    createdAt: {
      $date: "2026-05-07T09:43:27.129Z"
    },
    description: "Compact cinematic drone with obstacle avoidance and 4K HDR recording.",
    featured: false,
    features: [
      "High Performance",
      "Portable Design",
      "Smart Features"
    ],
    image: "/assets/drone.jpg",
    originalPrice: 999,
    price: 899,
    pricingTiers: [
      {
        range: "1-10 pcs",
        price: 899,
        _id: {
          $oid: "69fc5ebf5e824a4e166f115c"
        }
      },
      {
        range: "10-30 pcs",
        price: 850,
        _id: {
          $oid: "69fc5ebf5e824a4e166f115d"
        }
      },
      {
        range: "30+ pcs",
        price: 790,
        _id: {
          $oid: "69fc5ebf5e824a4e166f115e"
        }
      }
    ],
    rating: 8.7,
    reviews: 98,
    seller: {
      name: "SkyVision Tech",
      location: "China",
      verified: true
    },
    shipping: "Free Shipping",
    sold: 287,
    specTable: [
      {
        label: "Flight Time",
        value: "34 minutes",
        _id: {
          $oid: "69fc5ebf5e824a4e166f115f"
        }
      },
      {
        label: "Camera",
        value: "4K HDR",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1160"
        }
      },
      {
        label: "Weight",
        value: "249g",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1161"
        }
      },
      {
        label: "Range",
        value: "20km",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1162"
        }
      }
    ],
    specs: {
      Price: "$899",
      Type: "Drone",
      Material: "Carbon Fiber",
      Design: "Foldable",
      Protection: "DJI Care",
      Warranty: "1 year"
    },
    stock: 21,
    updatedAt: {
      $date: "2026-05-07T16:56:42.194Z"
    },
    brand: "DJI",
    condition: "Brand new"
  },
  {
    _id: {
      $oid: "69fc5ebfbe4b0334ca9c464f"
    },
    name: "JLab Go Pop",
    __v: 0,
    category: "Electronics",
    createdAt: {
      $date: "2026-05-07T09:43:27.132Z"
    },
    description: "Lightweight running shoes with responsive cushioning for daily training.",
    featured: true,
    features: [
      "Modern Design",
      "Portable Design",
      "Premium Build"
    ],
    image: "/assets/jlab-earbuds.jpg",
    originalPrice: 210,
    price: 159,
    pricingTiers: [
      {
        range: "1-20 pcs",
        price: 159,
        _id: {
          $oid: "69fc5ebf5e824a4e166f1163"
        }
      },
      {
        range: "20-100 pcs",
        price: 145,
        _id: {
          $oid: "69fc5ebf5e824a4e166f1164"
        }
      },
      {
        range: "100+ pcs",
        price: 130,
        _id: {
          $oid: "69fc5ebf5e824a4e166f1165"
        }
      }
    ],
    rating: 8.4,
    reviews: 320,
    seller: {
      name: "RunnerPoint",
      location: "United Kingdom",
      verified: false
    },
    shipping: "Standard shipping",
    sold: 890,
    specTable: [
      {
        label: "Size Range",
        value: "EU 39-47",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1166"
        }
      },
      {
        label: "Weight",
        value: "290g",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1167"
        }
      },
      {
        label: "Midsole",
        value: "ZoomX Foam",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1168"
        }
      },
      {
        label: "Gender",
        value: "Unisex",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1169"
        }
      }
    ],
    specs: {
      Price: "$159",
      Type: "Running Shoes",
      Material: "Mesh & Rubber",
      Design: "Sport",
      Protection: "Return policy",
      Warranty: "6 months"
    },
    stock: 120,
    updatedAt: {
      $date: "2026-05-07T16:56:42.197Z"
    },
    brand: "JLab",
    condition: "Brand new"
  },
  {
    _id: {
      $oid: "69fc5ebfbe4b0334ca9c4650"
    },
    name: "LG OLED evo C4 65-inch TV",
    __v: 0,
    category: "Electronics",
    createdAt: {
      $date: "2026-05-07T09:43:27.139Z"
    },
    description: "Premium OLED smart television with Dolby Vision and gaming optimization.",
    featured: true,
    features: [
      "Smart Features",
      "High Performance",
      "Premium Build"
    ],
    image: "/assets/lg-oled-tv.jpg",
    originalPrice: 2499,
    price: 2199,
    pricingTiers: [
      {
        range: "1-5 pcs",
        price: 2199,
        _id: {
          $oid: "69fc5ebf5e824a4e166f116a"
        }
      },
      {
        range: "5-20 pcs",
        price: 2050,
        _id: {
          $oid: "69fc5ebf5e824a4e166f116b"
        }
      },
      {
        range: "20+ pcs",
        price: 1900,
        _id: {
          $oid: "69fc5ebf5e824a4e166f116c"
        }
      }
    ],
    rating: 9.3,
    reviews: 102,
    seller: {
      name: "Vision Electronics",
      location: "Canada",
      verified: true
    },
    shipping: "Standard shipping",
    sold: 231,
    specTable: [
      {
        label: "Display",
        value: "65-inch OLED",
        _id: {
          $oid: "69fc5ebf5e824a4e166f116d"
        }
      },
      {
        label: "Refresh Rate",
        value: "144Hz",
        _id: {
          $oid: "69fc5ebf5e824a4e166f116e"
        }
      },
      {
        label: "Resolution",
        value: "4K UHD",
        _id: {
          $oid: "69fc5ebf5e824a4e166f116f"
        }
      },
      {
        label: "HDR",
        value: "Dolby Vision",
        _id: {
          $oid: "69fc5ebf5e824a4e166f1170"
        }
      }
    ],
    specs: {
      Price: "$2199",
      Type: "Smart TV",
      Material: "Metal & Glass",
      Design: "Ultra Slim",
      Protection: "Screen protection",
      Warranty: "2 years"
    },
    stock: 14,
    updatedAt: {
      $date: "2026-05-07T16:56:42.200Z"
    },
    brand: "LG",
    condition: "Refurbished"
  },
  {
    _id: {
      $oid: "69fcc34ebe4b0334ca9c4651"
    },
    name: "Soft chairs",
    __v: 0,
    category: "Home & Outdoor",
    createdAt: {
      $date: "2026-05-07T16:52:30.558Z"
    },
    description: "Comfortable soft chairs perfect for living rooms, lounges, and office spaces.",
    featured: false,
    features: [
      "Modern Design",
      "Premium Build",
      "Easy Maintenance"
    ],
    image: "/assets/soft-chairs.png",
    originalPrice: 29,
    price: 19,
    pricingTiers: [
      {
        range: "1-10 pcs",
        price: 19,
        _id: {
          $oid: "69fcc34eb473cbe77e7dc54e"
        }
      },
      {
        range: "10-50 pcs",
        price: 17,
        _id: {
          $oid: "69fcc34eb473cbe77e7dc54f"
        }
      }
    ],
    rating: 8.2,
    reviews: 48,
    seller: {
      name: "Home Comfort",
      location: "Turkey",
      verified: true
    },
    shipping: "Free Shipping",
    sold: 98,
    specTable: [
      {
        label: "Material",
        value: "Soft Fabric",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc550"
        }
      },
      {
        label: "Frame",
        value: "Solid Wood",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc551"
        }
      },
      {
        label: "Weight Capacity",
        value: "120kg",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc552"
        }
      }
    ],
    specs: {
      Price: "$19",
      Type: "Chair",
      Material: "Fabric & Wood",
      Design: "Modern",
      Protection: "7-day return",
      Warranty: "1 year"
    },
    stock: 45,
    updatedAt: {
      $date: "2026-05-07T16:56:42.205Z"
    },
    brand: "Local Brand",
    condition: "Old items"
  },
  {
    _id: {
      $oid: "69fcc34ebe4b0334ca9c4652"
    },
    name: "Lamp",
    __v: 0,
    category: "Home & Outdoor",
    createdAt: {
      $date: "2026-05-07T16:52:30.566Z"
    },
    description: "Stylish sofa and chair combo designed for modern interiors.",
    featured: true,
    features: [
      "Modern Design",
      "Premium Build",
      "Easy Maintenance"
    ],
    image: "/assets/lamp.png",
    originalPrice: 35,
    price: 19,
    pricingTiers: [
      {
        range: "1-5 pcs",
        price: 19,
        _id: {
          $oid: "69fcc34eb473cbe77e7dc553"
        }
      },
      {
        range: "5+ pcs",
        price: 17,
        _id: {
          $oid: "69fcc34eb473cbe77e7dc554"
        }
      }
    ],
    rating: 8.5,
    reviews: 37,
    seller: {
      name: "Urban Living",
      location: "Italy",
      verified: true
    },
    shipping: "Free Shipping",
    sold: 72,
    specTable: [
      {
        label: "Seats",
        value: "3 + 1",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc555"
        }
      },
      {
        label: "Material",
        value: "Premium Leather",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc556"
        }
      },
      {
        label: "Color",
        value: "Brown",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc557"
        }
      }
    ],
    specs: {
      Price: "$19",
      Type: "Furniture Set",
      Material: "Leather",
      Design: "Luxury",
      Protection: "30-day return",
      Warranty: "2 years"
    },
    stock: 30,
    updatedAt: {
      $date: "2026-05-07T16:56:42.209Z"
    },
    brand: "Local Brand",
    condition: "Old items"
  },
  {
    _id: {
      $oid: "69fcc34ebe4b0334ca9c4653"
    },
    name: "Kitchen dishes",
    __v: 0,
    category: "Home & Outdoor",
    createdAt: {
      $date: "2026-05-07T16:52:30.569Z"
    },
    description: "Durable kitchen dish set suitable for daily family use.",
    featured: false,
    features: [
      "Easy Maintenance",
      "Modern Design",
      "Premium Build"
    ],
    image: "/assets/kitchen-dishes.png",
    originalPrice: 25,
    price: 19,
    pricingTiers: [
      {
        range: "1-20 pcs",
        price: 19,
        _id: {
          $oid: "69fcc34eb473cbe77e7dc558"
        }
      },
      {
        range: "20+ pcs",
        price: 16,
        _id: {
          $oid: "69fcc34eb473cbe77e7dc559"
        }
      }
    ],
    rating: 8,
    reviews: 81,
    seller: {
      name: "Kitchen World",
      location: "China",
      verified: true
    },
    shipping: "Free Shipping",
    sold: 190,
    specTable: [
      {
        label: "Pieces",
        value: "12",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc55a"
        }
      },
      {
        label: "Dishwasher Safe",
        value: "Yes",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc55b"
        }
      },
      {
        label: "Microwave Safe",
        value: "Yes",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc55c"
        }
      }
    ],
    specs: {
      Price: "$19",
      Type: "Kitchenware",
      Material: "Ceramic",
      Design: "Classic",
      Protection: "Refund available",
      Warranty: "6 months"
    },
    stock: 100,
    updatedAt: {
      $date: "2026-05-07T16:56:42.212Z"
    },
    brand: "Local Brand",
    condition: "Old items"
  },
  {
    _id: {
      $oid: "69fcc34ebe4b0334ca9c4654"
    },
    name: "Kitchen mixer",
    __v: 0,
    category: "Home & Outdoor",
    createdAt: {
      $date: "2026-05-07T16:52:30.572Z"
    },
    description: "Powerful kitchen mixer ideal for baking and food preparation.",
    featured: true,
    features: [
      "High Performance",
      "Energy Efficient",
      "Easy Maintenance"
    ],
    image: "/assets/kitchen-mixer.png",
    originalPrice: 129,
    price: 100,
    pricingTiers: [
      {
        range: "1-10 pcs",
        price: 100,
        _id: {
          $oid: "69fcc34eb473cbe77e7dc55d"
        }
      },
      {
        range: "10+ pcs",
        price: 92,
        _id: {
          $oid: "69fcc34eb473cbe77e7dc55e"
        }
      }
    ],
    rating: 8.8,
    reviews: 59,
    seller: {
      name: "Chef Equip",
      location: "Germany",
      verified: true
    },
    shipping: "Free Express Shipping",
    sold: 121,
    specTable: [
      {
        label: "Power",
        value: "1000W",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc55f"
        }
      },
      {
        label: "Speed Levels",
        value: "6",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc560"
        }
      },
      {
        label: "Bowl Capacity",
        value: "5L",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc561"
        }
      }
    ],
    specs: {
      Price: "$100",
      Type: "Mixer",
      Material: "Stainless Steel",
      Design: "Compact",
      Protection: "30-day return",
      Warranty: "2 years"
    },
    stock: 18,
    updatedAt: {
      $date: "2026-05-07T16:56:42.215Z"
    },
    brand: "Local Brand",
    condition: "Refurbished"
  },
  {
    _id: {
      $oid: "69fcc34ebe4b0334ca9c4655"
    },
    name: "Blenders",
    __v: 0,
    category: "Home & Outdoor",
    createdAt: {
      $date: "2026-05-07T16:52:30.575Z"
    },
    description: "High-speed blender suitable for smoothies, juices, and food prep.",
    featured: false,
    features: [
      "Energy Efficient",
      "High Performance",
      "Easy Maintenance"
    ],
    image: "/assets/blenders.png",
    originalPrice: 55,
    price: 39,
    pricingTiers: [
      {
        range: "1-15 pcs",
        price: 39,
        _id: {
          $oid: "69fcc34eb473cbe77e7dc562"
        }
      },
      {
        range: "15+ pcs",
        price: 34,
        _id: {
          $oid: "69fcc34eb473cbe77e7dc563"
        }
      }
    ],
    rating: 8.4,
    reviews: 62,
    seller: {
      name: "Blend Master",
      location: "Malaysia",
      verified: false
    },
    shipping: "Free Shipping",
    sold: 150,
    specTable: [
      {
        label: "Power",
        value: "700W",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc564"
        }
      },
      {
        label: "Jar Capacity",
        value: "1.5L",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc565"
        }
      },
      {
        label: "Blades",
        value: "Stainless Steel",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc566"
        }
      }
    ],
    specs: {
      Price: "$39",
      Type: "Blender",
      Material: "Plastic & Steel",
      Design: "Portable",
      Protection: "7-day return",
      Warranty: "1 year"
    },
    stock: 40,
    updatedAt: {
      $date: "2026-05-07T16:56:42.216Z"
    },
    brand: "Local Brand",
    condition: "Refurbished"
  },
  {
    _id: {
      $oid: "69fcc34ebe4b0334ca9c4656"
    },
    name: "PEL",
    __v: 0,
    category: "Home & Outdoor",
    createdAt: {
      $date: "2026-05-07T16:52:30.578Z"
    },
    description: "Multi-purpose home appliance designed for everyday convenience.",
    featured: false,
    features: [
      "Energy Efficient",
      "Warranty Included",
      "Modern Design"
    ],
    image: "/assets/pel.jpg",
    originalPrice: 30,
    price: 19,
    pricingTiers: [
      {
        range: "1-20 pcs",
        price: 19,
        _id: {
          $oid: "69fcc34eb473cbe77e7dc567"
        }
      },
      {
        range: "20+ pcs",
        price: 15,
        _id: {
          $oid: "69fcc34eb473cbe77e7dc568"
        }
      }
    ],
    rating: 7.9,
    reviews: 39,
    seller: {
      name: "Smart Home Ltd",
      location: "Singapore",
      verified: true
    },
    shipping: "Free Shipping",
    sold: 90,
    specTable: [
      {
        label: "Voltage",
        value: "220V",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc569"
        }
      },
      {
        label: "Usage",
        value: "Home",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc56a"
        }
      },
      {
        label: "Energy Saving",
        value: "Yes",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc56b"
        }
      }
    ],
    specs: {
      Price: "$19",
      Type: "Appliance",
      Material: "ABS Plastic",
      Design: "Compact",
      Protection: "Refund available",
      Warranty: "1 year"
    },
    stock: 50,
    updatedAt: {
      $date: "2026-05-07T16:56:42.218Z"
    },
    brand: "PEL",
    condition: "Refurbished"
  },
  {
    _id: {
      $oid: "69fcc34ebe4b0334ca9c4657"
    },
    name: "Coffee maker",
    __v: 0,
    category: "Home & Outdoor",
    createdAt: {
      $date: "2026-05-07T16:52:30.581Z"
    },
    description: "Compact coffee maker for brewing fresh coffee quickly at home.",
    featured: true,
    features: [
      "Energy Efficient",
      "Easy Maintenance",
      "Modern Design"
    ],
    image: "/assets/coffee-maker.png",
    originalPrice: 18,
    price: 10,
    pricingTiers: [
      {
        range: "1-25 pcs",
        price: 10,
        _id: {
          $oid: "69fcc34eb473cbe77e7dc56c"
        }
      },
      {
        range: "25+ pcs",
        price: 8,
        _id: {
          $oid: "69fcc34eb473cbe77e7dc56d"
        }
      }
    ],
    rating: 8.1,
    reviews: 70,
    seller: {
      name: "CafeTech",
      location: "France",
      verified: true
    },
    shipping: "Free Shipping",
    sold: 180,
    specTable: [
      {
        label: "Capacity",
        value: "1L",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc56e"
        }
      },
      {
        label: "Brewing Time",
        value: "5 min",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc56f"
        }
      },
      {
        label: "Power",
        value: "600W",
        _id: {
          $oid: "69fcc34eb473cbe77e7dc570"
        }
      }
    ],
    specs: {
      Price: "$10",
      Type: "Coffee Maker",
      Material: "Plastic & Steel",
      Design: "Minimal",
      Protection: "7-day return",
      Warranty: "1 year"
    },
    stock: 60,
    updatedAt: {
      $date: "2026-05-07T16:56:42.220Z"
    },
    brand: "Local Brand",
    condition: "Brand new"
  },
  {
    _id: {
      $oid: "69fcc3ccbe4b0334ca9c4658"
    },
    name: "Google Pixel",
    __v: 0,
    category: "Modern tech",
    createdAt: {
      $date: "2026-05-07T16:54:36.907Z"
    },
    description: "Modern smartwatch with fitness tracking and smart notifications.",
    featured: true,
    features: [
      "Smart Features",
      "Wireless Connectivity",
      "Portable Design"
    ],
    image: "/assets/google-pixel.jpg",
    originalPrice: 30,
    price: 19,
    pricingTiers: [
      {
        range: "1-20 pcs",
        price: 19,
        _id: {
          $oid: "69fcc3cc070b8be0da17df15"
        }
      },
      {
        range: "20+ pcs",
        price: 16,
        _id: {
          $oid: "69fcc3cc070b8be0da17df16"
        }
      }
    ],
    rating: 8.3,
    reviews: 102,
    seller: {
      name: "WearTech",
      location: "China",
      verified: true
    },
    shipping: "Free Shipping",
    sold: 280,
    specTable: [
      {
        label: "Battery",
        value: "7 days",
        _id: {
          $oid: "69fcc3cc070b8be0da17df17"
        }
      },
      {
        label: "Display",
        value: "AMOLED",
        _id: {
          $oid: "69fcc3cc070b8be0da17df18"
        }
      },
      {
        label: "Connectivity",
        value: "Bluetooth 5.2",
        _id: {
          $oid: "69fcc3cc070b8be0da17df19"
        }
      }
    ],
    specs: {
      Price: "$19",
      Type: "Smart Watch",
      Material: "Aluminum",
      Design: "Sport",
      Protection: "Water resistant",
      Warranty: "1 year"
    },
    stock: 70,
    updatedAt: {
      $date: "2026-05-07T16:56:42.223Z"
    },
    brand: "Google",
    condition: "Brand new"
  },
  {
    _id: {
      $oid: "69fcc44abe4b0334ca9c4659"
    },
    name: "Sony A7",
    __v: 0,
    category: "Electronics",
    createdAt: {
      $date: "2026-05-07T16:56:42.225Z"
    },
    description: "Professional digital camera suitable for photography and travel.",
    featured: true,
    features: [
      "High Performance",
      "Portable Design",
      "Smart Features"
    ],
    image: "/assets/sony.png",
    originalPrice: 120,
    price: 89,
    pricingTiers: [
      {
        range: "1-10 pcs",
        price: 89,
        _id: {
          $oid: "69fcc44ad3943644ca587d25"
        }
      },
      {
        range: "10+ pcs",
        price: 82,
        _id: {
          $oid: "69fcc44ad3943644ca587d26"
        }
      }
    ],
    rating: 8.7,
    reviews: 56,
    seller: {
      name: "Photo Gear",
      location: "Japan",
      verified: true
    },
    shipping: "Standard shipping",
    sold: 121,
    specTable: [
      {
        label: "Resolution",
        value: "24MP",
        _id: {
          $oid: "69fcc44ad3943644ca587d27"
        }
      },
      {
        label: "Video",
        value: "4K",
        _id: {
          $oid: "69fcc44ad3943644ca587d28"
        }
      },
      {
        label: "Zoom",
        value: "10x Optical",
        _id: {
          $oid: "69fcc44ad3943644ca587d29"
        }
      }
    ],
    specs: {
      Price: "$89",
      Type: "Camera",
      Material: "Metal",
      Design: "Compact",
      Protection: "Refund available",
      Warranty: "2 years"
    },
    stock: 22,
    updatedAt: {
      $date: "2026-05-07T16:56:42.225Z"
    },
    brand: "Sony",
    condition: "Refurbished"
  },
  {
    _id: {
      $oid: "69fcc44abe4b0334ca9c465a"
    },
    name: "Headphones",
    __v: 0,
    category: "Headphones",
    createdAt: {
      $date: "2026-05-07T16:56:42.228Z"
    },
    description: "Comfortable headphones with immersive sound and deep bass.",
    featured: false,
    features: [
      "Wireless Connectivity",
      "Portable Design",
      "Premium Build"
    ],
    image: "/assets/headphones.png",
    originalPrice: 20,
    price: 10,
    pricingTiers: [
      {
        range: "1-30 pcs",
        price: 10,
        _id: {
          $oid: "69fcc44ad3943644ca587d2a"
        }
      },
      {
        range: "30+ pcs",
        price: 8,
        _id: {
          $oid: "69fcc44ad3943644ca587d2b"
        }
      }
    ],
    rating: 8,
    reviews: 120,
    seller: {
      name: "Audio Hub",
      location: "Germany",
      verified: false
    },
    shipping: "Free Shipping",
    sold: 350,
    specTable: [
      {
        label: "Connectivity",
        value: "Wireless",
        _id: {
          $oid: "69fcc44ad3943644ca587d2c"
        }
      },
      {
        label: "Battery",
        value: "20 hours",
        _id: {
          $oid: "69fcc44ad3943644ca587d2d"
        }
      },
      {
        label: "Noise Cancellation",
        value: "Passive",
        _id: {
          $oid: "69fcc44ad3943644ca587d2e"
        }
      }
    ],
    specs: {
      Price: "$10",
      Type: "Headphones",
      Material: "Plastic",
      Design: "Over-ear",
      Protection: "7-day return",
      Warranty: "6 months"
    },
    stock: 90,
    updatedAt: {
      $date: "2026-05-07T16:56:42.228Z"
    },
    brand: "Local Brand",
    condition: "Refurbished"
  },
  {
    _id: {
      $oid: "69fcc44abe4b0334ca9c465b"
    },
    name: "Smart Glasses",
    __v: 0,
    category: "Modern tech",
    createdAt: {
      $date: "2026-05-07T16:56:42.230Z"
    },
    description: "Complete gaming accessories set for PC and console gamers.",
    featured: true,
    features: [
      "High Performance",
      "Premium Build",
      "Modern Design"
    ],
    image: "/assets/smart-glasses.jpg",
    originalPrice: 50,
    price: 35,
    pricingTiers: [
      {
        range: "1-15 pcs",
        price: 35,
        _id: {
          $oid: "69fcc44ad3943644ca587d2f"
        }
      },
      {
        range: "15+ pcs",
        price: 30,
        _id: {
          $oid: "69fcc44ad3943644ca587d30"
        }
      }
    ],
    rating: 8.6,
    reviews: 77,
    seller: {
      name: "GamePro",
      location: "USA",
      verified: true
    },
    shipping: "Free Express Shipping",
    sold: 160,
    specTable: [
      {
        label: "Keyboard",
        value: "Mechanical",
        _id: {
          $oid: "69fcc44ad3943644ca587d31"
        }
      },
      {
        label: "Mouse DPI",
        value: "12000 DPI",
        _id: {
          $oid: "69fcc44ad3943644ca587d32"
        }
      },
      {
        label: "Lighting",
        value: "RGB",
        _id: {
          $oid: "69fcc44ad3943644ca587d33"
        }
      }
    ],
    specs: {
      Price: "$35",
      Type: "Gaming Accessories",
      Material: "Plastic & RGB",
      Design: "Gaming",
      Protection: "30-day return",
      Warranty: "1 year"
    },
    stock: 35,
    updatedAt: {
      $date: "2026-05-07T16:56:42.230Z"
    },
    brand: "Local Brand",
    condition: "Brand new"
  },
  {
    _id: {
      $oid: "69fcc44abe4b0334ca9c465c"
    },
    name: "Apple Macbook",
    __v: 0,
    category: "Electronics",
    createdAt: {
      $date: "2026-05-07T16:56:42.231Z"
    },
    description: "Reliable laptops and desktop PCs for work, study, and gaming.",
    featured: true,
    features: [
      "High Performance",
      "Premium Build",
      "Warranty Included"
    ],
    image: "/assets/apple-macbook.png",
    originalPrice: 420,
    price: 340,
    pricingTiers: [
      {
        range: "1-5 pcs",
        price: 340,
        _id: {
          $oid: "69fcc44ad3943644ca587d34"
        }
      },
      {
        range: "5+ pcs",
        price: 320,
        _id: {
          $oid: "69fcc44ad3943644ca587d35"
        }
      }
    ],
    rating: 9,
    reviews: 98,
    seller: {
      name: "Compute World",
      location: "United States",
      verified: true
    },
    shipping: "Standard shipping",
    sold: 210,
    specTable: [
      {
        label: "Processor",
        value: "Intel Core i7",
        _id: {
          $oid: "69fcc44ad3943644ca587d36"
        }
      },
      {
        label: "RAM",
        value: "16GB",
        _id: {
          $oid: "69fcc44ad3943644ca587d37"
        }
      },
      {
        label: "Storage",
        value: "512GB SSD",
        _id: {
          $oid: "69fcc44ad3943644ca587d38"
        }
      }
    ],
    specs: {
      Price: "$340",
      Type: "Computer",
      Material: "Aluminum",
      Design: "Modern",
      Protection: "Refund available",
      Warranty: "2 years"
    },
    stock: 15,
    updatedAt: {
      $date: "2026-05-07T16:56:42.231Z"
    },
    brand: "Apple",
    condition: "Brand new"
  },
  {
    _id: {
      $oid: "69fcc44abe4b0334ca9c465d"
    },
    name: "Vivo Y21",
    __v: 0,
    category: "Smartphones",
    createdAt: {
      $date: "2026-05-07T16:56:42.233Z"
    },
    description: "Affordable smartphone with modern features and long battery life.",
    featured: true,
    features: [
      "Smart Features",
      "Wireless Connectivity",
      "Portable Design"
    ],
    image: "/assets/vivo-y21.jpg",
    originalPrice: 35,
    price: 19,
    pricingTiers: [
      {
        range: "1-20 pcs",
        price: 19,
        _id: {
          $oid: "69fcc44ad3943644ca587d39"
        }
      },
      {
        range: "20+ pcs",
        price: 16,
        _id: {
          $oid: "69fcc44ad3943644ca587d3a"
        }
      }
    ],
    rating: 8.2,
    reviews: 165,
    seller: {
      name: "Mobile Store",
      location: "South Korea",
      verified: true
    },
    shipping: "Standard shipping",
    sold: 430,
    specTable: [
      {
        label: "Display",
        value: "6.5-inch HD",
        _id: {
          $oid: "69fcc44ad3943644ca587d3b"
        }
      },
      {
        label: "Battery",
        value: "5000mAh",
        _id: {
          $oid: "69fcc44ad3943644ca587d3c"
        }
      },
      {
        label: "Storage",
        value: "128GB",
        _id: {
          $oid: "69fcc44ad3943644ca587d3d"
        }
      }
    ],
    specs: {
      Price: "$19",
      Type: "Smartphone",
      Material: "Glass & Aluminum",
      Design: "Slim",
      Protection: "Screen protection",
      Warranty: "1 year"
    },
    stock: 80,
    updatedAt: {
      $date: "2026-05-07T16:56:42.233Z"
    },
    brand: "Vivo",
    condition: "Brand new"
  },
  {
    _id: {
      $oid: "69fcc44abe4b0334ca9c465e"
    },
    name: "Electric kettle",
    __v: 0,
    category: "Home & Outdoor",
    createdAt: {
      $date: "2026-05-07T16:56:42.236Z"
    },
    description: "Premium electric kettle with fast boiling and temperature control.",
    featured: false,
    features: [
      "Energy Efficient",
      "Easy Maintenance",
      "Warranty Included"
    ],
    image: "/assets/electric-kettle.png",
    originalPrice: 290,
    price: 240,
    pricingTiers: [
      {
        range: "1-10 pcs",
        price: 240,
        _id: {
          $oid: "69fcc44ad3943644ca587d3e"
        }
      },
      {
        range: "10+ pcs",
        price: 225,
        _id: {
          $oid: "69fcc44ad3943644ca587d3f"
        }
      }
    ],
    rating: 8.5,
    reviews: 54,
    seller: {
      name: "Kitchen Tech",
      location: "Germany",
      verified: true
    },
    shipping: "Free Shipping",
    sold: 112,
    specTable: [
      {
        label: "Capacity",
        value: "1.8L",
        _id: {
          $oid: "69fcc44ad3943644ca587d40"
        }
      },
      {
        label: "Power",
        value: "1800W",
        _id: {
          $oid: "69fcc44ad3943644ca587d41"
        }
      },
      {
        label: "Temperature Control",
        value: "Yes",
        _id: {
          $oid: "69fcc44ad3943644ca587d42"
        }
      }
    ],
    specs: {
      Price: "$240",
      Type: "Electric Kettle",
      Material: "Stainless Steel",
      Design: "Minimal",
      Protection: "Refund available",
      Warranty: "2 years"
    },
    stock: 0,
    updatedAt: {
      $date: "2026-05-10T06:31:57.883Z"
    },
    brand: "Local Brand",
    condition: "Old items"
  }
]

console.log(products.length)

export default products