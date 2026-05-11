# ecommerce-fullstack-design

Full-stack eCommerce application built with React, Node.js, Express, and MongoDB.

## Tech Stack
- **Frontend**: React 18, Typescript, React Router, TailwindCSS, Vite, TanStack Query
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcrypt
- **State**: React Context (Auth, Cart) + TanStack Query (server state)
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
cp client/.env      
# Configure PORT, JWT_SECRET, MONGODB_URI, NODE_ENV, CLIENT_URL
cp server/.env
# Configure VITE_API_URL

# Install the dependencies
npm install               

# Run client and server in dev mode
cd client
npm run dev

# Run server
cd server
npm run dev
```



### Ports
| Service | URL |
|---------|-----|
| Client  | http://localhost:5173 |
| Server  | http://localhost:5000 |