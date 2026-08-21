import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Package
} from "lucide-react"

import { Link } from "react-router-dom";
import { useState } from "react"
import { useCart } from "../../context/useCart"
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cartItems } = useCart()
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

      {/* Top Navigation */}

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}

          <div className="flex items-center">

            <div className="text-2xl font-bold text-green-600">
              NaijaMarket
            </div>

          </div>


          {/* Desktop Search */}

          <div className="hidden md:flex flex-1 max-w-xl mx-8">

            <div className="relative w-full">

              <input
                type="text"
                placeholder="Search products, vendors and services..."
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-4 pr-12 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />

              <button
                className="absolute right-0 top-0 h-full px-4 bg-green-600 text-white rounded-r-lg hover:bg-green-700"
              >
                <Search size={20} />
              </button>

            </div>

          </div>


          {/* Desktop Navigation */}

          <div className="hidden lg:flex items-center gap-6">

            {/* Account */}
            {user ? (
  <>
    <Link
      to="/account"
      className="font-medium text-gray-700 hover:text-green-600"
    >
      My Account
    </Link>

    <button
      onClick={logout}
      className="font-medium text-red-600 hover:text-red-700"
    >
      Logout
    </button>
  </>
) : (
  <>
    <Link
      to="/login"
      className="font-medium text-gray-700 hover:text-green-600"
    >
      Login
    </Link>

    <Link
      to="/register"
      className="font-medium text-gray-700 hover:text-green-600"
    >
      Register
    </Link>
  </>
)}

            <button className="flex items-center gap-2 text-gray-700 hover:text-green-600">

              <User size={21} />

              <div className="text-left">
                <p className="text-xs text-gray-500">
                  Hello
                </p>

                <p className="text-sm font-medium">
                  Account
                </p>
              </div>

            </button>


            {/* Orders */}

            <button className="flex items-center gap-2 text-gray-700 hover:text-green-600">

              <Package size={21} />

              <div className="text-left">
                <p className="text-xs text-gray-500">
                  Track
                </p>

                <p className="text-sm font-medium">
                  Orders
                </p>
              </div>

            </button>


            {/* Cart */}

        <Link
                to="/cart"
                className="relative flex items-center"
            >
             <ShoppingCart size={28} />
             {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {cartCount}
             </span>
           )}
        </Link>

          </div>


          {/* Mobile Menu Button */}

          <button
            className="lg:hidden text-gray-700"
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
          >

            {mobileMenuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}

          </button>

        </div>


        {/* Category Navigation */}

        <div className="hidden lg:flex items-center border-t border-gray-100 h-12">

          <button className="flex items-center gap-2 font-medium text-gray-700 hover:text-green-600">

            <Menu size={19} />

            Categories

            <ChevronDown size={16} />

          </button>


          <div className="flex items-center gap-8 ml-8 text-sm text-gray-600">

            <a
              href="#"
              className="hover:text-green-600"
            >
              Electronics
            </a>

            <a
              href="#"
              className="hover:text-green-600"
            >
              Fashion
            </a>

            <a
              href="#"
              className="hover:text-green-600"
            >
              Phones
            </a>

            <a
              href="#"
              className="hover:text-green-600"
            >
              Home & Living
            </a>

            <a
              href="#"
              className="hover:text-green-600"
            >
              Beauty
            </a>

            <a
              href="#"
              className="hover:text-green-600"
            >
              Bookings
            </a>

            <a
              href="#"
              className="hover:text-green-600"
            >
              Blog
            </a>

          </div>

        </div>


        {/* Mobile Menu */}

        {mobileMenuOpen && (

          <div className="lg:hidden border-t border-gray-200 py-4">

            {/* Mobile Search */}

            <div className="relative mb-4">

              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-lg border border-gray-300 py-3 pl-4 pr-12 outline-none focus:border-green-500"
              />

              <button className="absolute right-0 top-0 h-full px-4 bg-green-600 text-white rounded-r-lg">

                <Search size={20} />

              </button>

            </div>


            {/* Mobile Links */}

            <div className="flex flex-col gap-4">

              <a href="#" className="text-gray-700">
                Categories
              </a>

              <a href="#" className="text-gray-700">
                Electronics
              </a>

              <a href="#" className="text-gray-700">
                Fashion
              </a>

              <a href="#" className="text-gray-700">
                Phones
              </a>

              <a href="#" className="text-gray-700">
                Home & Living
              </a>

              <a href="#" className="text-gray-700">
                Bookings
              </a>

              <a href="#" className="text-gray-700">
                Blog
              </a>

              <hr />

              <a href="#" className="text-gray-700">
                My Account
              </a>

              <a href="#" className="text-gray-700">
                My Orders
              </a>

              <a href="#" className="text-gray-700">
                Shopping Cart
              </a>

            </div>

          </div>

        )}

      </nav>

    </header>
  )
}

export default Navbar