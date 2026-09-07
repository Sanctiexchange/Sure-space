import { Routes, Route } from "react-router-dom"
import Footer from "./components/footer/Footer"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import OrderConfirmation from "./pages/OrderConfirmation"
import Products from "./pages/products"
import ProductDetails from "./pages/ProductDetails"
import Orders from "./pages/Orders"
import OrderDetails from "./pages/OrderDetail"
import Register from "./pages/Register"
import Account from "./pages/Account"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import VendorDashboard from "./pages/VendorDashboard"
import VendorAddProduct from "./pages/VendorAddProduct"
import VendorProducts from "./pages/VendorProducts"
import VendorEditProduct from "./pages/VendorEditProduct"
import VendorOrders from "./pages/VendorOrders"
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
      <Route path="/products" element={<MainLayout><Products /></MainLayout>} />  
      <Route path="/product-details" element={<MainLayout><ProductDetails /></MainLayout>} />
      <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />
      <Route
            path="/register"
            element={<Register />}
      />
      <Route
          path="/order-confirmation"
          element={<OrderConfirmation />}
      />
      <Route
          path="/orders"
          element={<Orders />}
      />
      <Route
         path="/vendor/dashboard"
         element={<VendorDashboard />}
      />
      <Route
          path="/vendor/products"
          element={<VendorProducts />}
      />

      <Route
          path="/vendor/orders"
          element={<VendorOrders />}
      />

      <Route
           path="/vendor/edit-product/:productId"
          element={<VendorEditProduct />}
      />
      <Route
          path="/order-details/:orderNumber"
          element={<OrderDetails />}
      />
      <Route
          path="/vendor/add-product"
          element={<VendorAddProduct />}
      />
      <Route
          path="/account"
          element={
       <ProtectedRoute>
        <Account />
      </ProtectedRoute>
       }
      />
      
      <Route path="/login" element={<Login />} />
      <Route path="/footer" element={<MainLayout><Footer /></MainLayout >} />
    </Routes>
  )
};

export default App