import {
  Heart,
  ShoppingCart,
  Star,
  MapPin,
} from "lucide-react"

import { useCart } from "../../context/useCart.js"


function ProductCard({ product }) {

  const { addToCart } = useCart()
 
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      {/* Product Image */}

      <div className="relative aspect-square overflow-hidden bg-gray-100">

        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Discount */}

        {product.discount > 0 && (
          <span className="absolute left-3 top-3 rounded-md bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{product.discount}%
          </span>
        )}

        {/* Wishlist */}

        <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-green-50">

          <Heart
            size={18}
            className="text-gray-600"
          />

        </button>

      </div>


      {/* Product Information */}

      <div className="p-4">

        {/* Category */}

        <p className="text-xs text-gray-500">
          {product.category}
        </p>


        {/* Product Name */}

        <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold text-gray-900">
          {product.name}
        </h3>


        {/* Rating */}

        <div className="mt-2 flex items-center gap-1">

          <Star
            size={15}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm font-medium">
            {product.rating}
          </span>

          <span className="text-xs text-gray-400">
            ({product.reviews})
          </span>

        </div>


        {/* Price */}

        <div className="mt-3">

          <p className="text-lg font-bold text-green-600">
            {formatPrice(product.price)}
          </p>

          {product.oldPrice && (
            <p className="text-xs text-gray-400 line-through">
              {formatPrice(product.oldPrice)}
            </p>
          )}

        </div>


        {/* Vendor */}

        <div className="mt-3 border-t border-gray-100 pt-3">

          <p className="truncate text-xs font-medium text-gray-700">
            {product.vendor}
          </p>

          <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">

            <MapPin size={12} />

            {product.location}

          </div>

        </div>


        {/* Add To Cart */}

      <button
        onClick={() => addToCart(product)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
      >
        <ShoppingCart size={17} />
           Add to Cart
      </button>

      </div>

    </div>
  )
}

export default ProductCard