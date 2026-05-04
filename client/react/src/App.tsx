import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from "./components/Layout"
import Home from './components/Home'
import ProductListing from './components/ProductListing'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}