import { Routes, Route } from "react-router-dom"

import Footer from "./components/footer/Footer"
import MainLayout from "./layouts/MainLayout"

import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import OrderConfirmation from "./pages/OrderConfirmation"
import Products from "./pages/Products"
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

import AdminProductApprovals from "./pages/AdminProductApprovals"


function App() {
  return (
    <Routes>

      {/* =========================
          BUYER ROUTES
      ========================== */}

      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/products"
        element={
          <MainLayout>
            <Products />
          </MainLayout>
        }
      />

      <Route
        path="/product-details"
        element={
          <MainLayout>
            <ProductDetails />
          </MainLayout>
        }
      />

      <Route
        path="/cart"
        element={
          <MainLayout>
            <Cart />
          </MainLayout>
        }
      />

      <Route
        path="/checkout"
        element={
          <MainLayout>
            <Checkout />
          </MainLayout>
        }
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
        path="/order-details/:orderNumber"
        element={<OrderDetails />}
      />


      {/* =========================
          AUTH ROUTES
      ========================== */}

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />


      {/* =========================
          VENDOR ROUTES
      ========================== */}

      <Route
        path="/vendor/dashboard"
        element={<VendorDashboard />}
      />

      <Route
        path="/vendor/add-product"
        element={<VendorAddProduct />}
      />

      <Route
        path="/vendor/products"
        element={<VendorProducts />}
      />

      <Route
        path="/vendor/edit-product/:productId"
        element={<VendorEditProduct />}
      />

      <Route
        path="/vendor/orders"
        element={<VendorOrders />}
      />


      {/* =========================
          ADMIN ROUTES
      ========================== */}

      <Route
        path="/admin/products"
        element={<AdminProductApprovals />}
      />


      {/* =========================
          OTHER
      ========================== */}

      <Route
        path="/footer"
        element={
          <MainLayout>
            <Footer />
          </MainLayout>
        }
      />

    </Routes>
  )
}

export default App