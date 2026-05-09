import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import ProductListing from './components/ProductListing'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
// import AdminPanel from './pages/AdminPanel'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}