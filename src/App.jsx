import { Routes, Route } from "react-router-dom"
import Footer from "./components/footer/Footer"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import OrderConfirmation from "./pages/OrderConfirmation"
import Products from "./pages/products"
import ProductDetails from "./pages/ProductDetails"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product-details" element={<ProductDetails />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
      <Route path="/footer" element={<Footer />} />
    </Routes>
  )
};

export default App