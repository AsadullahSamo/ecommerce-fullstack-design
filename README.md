# ecommerce-fullstack-design

Full-stack eCommerce application built with React, Node.js, Express, and MongoDB.

## Tech Stack
- **Frontend**: React 18, React Router, TailwindCSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT
- **Deployment**: Render (server) + Vercel (client)

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB running locally or a MongoDB Atlas URI

### Setup

```bash
# Clone and install
git clone https://github.com/AsadullahSamo/ecommerce-fullstack-design.git
cd ecommerce-fullstack-design

# Environment variables setup
cp .env      
# Configure PORT, JWT_SECRET, MONGODB_URI, NODE_ENV, VITE_API_URL

# Install the dependencies
npm install               

# Run both client and server in dev mode
npm run dev
```



### Ports
| Service | URL |
|---------|-----|
| Client  | http://localhost:5173 |
| Server  | http://localhost:5000 |