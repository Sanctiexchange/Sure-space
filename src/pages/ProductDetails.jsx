import { useMemo } from "react"

import {
  ArrowLeft,
  ShoppingCart,
  Star,
  MapPin,
} from "lucide-react"

import { useNavigate, useParams } from "react-router-dom"

import products from "../data/products"

import { getVendorProducts } from "../utility/ProductStorage"

import { useCart } from "../context/useCart.js"


function ProductDetails() {

  const { productId } = useParams()

  const navigate = useNavigate()

  const { addToCart } = useCart()


  const product = useMemo(() => {

    const staticProduct = products.find(
      (item) =>
        String(item.id) === String(productId)
    )

    if (staticProduct) {
      return staticProduct
    }


    const vendorProducts = getVendorProducts()

    const vendorProduct = vendorProducts.find(
      (item) =>
        String(item.id) === String(productId) &&
        item.approvalStatus === "approved"
    )

    return vendorProduct

  }, [productId])


  const formatPrice = (price) => {

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price)

  }


  if (!product) {

    return (

      <div className="min-h-screen bg-gray-100 p-8">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 font-semibold text-green-600"
        >

          <ArrowLeft size={18} />

          Back

        </button>


        <div className="rounded-xl bg-white p-10 text-center shadow">

          <h1 className="text-2xl font-bold text-gray-800">
            Product Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            This product may have been removed or is
            not available on the marketplace.
          </p>

        </div>

      </div>

    )

  }


  return (

    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 font-semibold text-green-600 hover:text-green-700"
      >

        <ArrowLeft size={20} />

        Back to Products

      </button>


      {/* Product Details */}

      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg">

        <div className="grid md:grid-cols-2">


          {/* Product Image */}

          <div className="flex items-center justify-center bg-gray-100 p-6">

            <img
              src={product.image}
              alt={product.name}
              className="max-h-`1375` w-full rounded-xl object-contain"
            />

          </div>


          {/* Product Information */}

          <div className="p-6 md:p-10">

            {/* Category */}

            <p className="text-sm font-medium text-gray-500">
              {product.category}
            </p>


            {/* Product Name */}

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              {product.name}
            </h1>


            {/* Rating */}

            <div className="mt-4 flex items-center gap-2">

              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="font-medium">
                {product.rating || "New"}
              </span>

              {product.reviews !== undefined && (

                <span className="text-gray-400">
                  ({product.reviews} reviews)
                </span>

              )}

            </div>


            {/* Price */}

            <div className="mt-6">

              <p className="text-3xl font-bold text-green-600">
                {formatPrice(product.price)}
              </p>

              {product.oldPrice && (

                <p className="mt-1 text-lg text-gray-400 line-through">
                  {formatPrice(product.oldPrice)}
                </p>

              )}

              {product.discount > 0 && (

                <span className="mt-2 inline-block rounded-md bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
                  {product.discount}% OFF
                </span>

              )}

            </div>


            {/* Vendor */}

            <div className="mt-6 border-t border-gray-200 pt-6">

              <h2 className="font-semibold text-gray-800">
                Sold by
              </h2>

              <p className="mt-2 text-gray-700">
                {product.vendor || "NaijaMarket Vendor"}
              </p>

              {product.location && (

                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">

                  <MapPin size={16} />

                  {product.location}

                </div>

              )}

            </div>


            {/* Stock */}

            <div className="mt-6">

              <p className="text-sm text-gray-600">

                Availability:

                <span className="ml-2 font-semibold text-green-600">

                  {product.stock > 0
                    ? `${product.stock} available`
                    : "Out of stock"}

                </span>

              </p>

            </div>


            {/* Add To Cart */}

            <button
              onClick={() => addToCart(product)}
              disabled={!product.stock || product.stock <= 0}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-4 text-lg font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >

              <ShoppingCart size={22} />

              {product.stock > 0
                ? "Add to Cart"
                : "Out of Stock"}

            </button>


          </div>

        </div>

      </div>

    </div>

  )

}

export default ProductDetails