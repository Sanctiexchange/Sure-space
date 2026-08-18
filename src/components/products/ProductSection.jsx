import { ArrowRight } from "lucide-react"
import ProductGrid from "./ProductGrid"

function ProductSection() {

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">

      <div className="mb-6 flex items-end justify-between">

        <div>

          <p className="text-sm font-medium text-green-600">
            Trending now
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            Popular Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Discover products shoppers are loving right now.
          </p>

        </div>


        <button className="hidden items-center gap-1 text-sm font-semibold text-green-600 sm:flex">

          View all

          <ArrowRight size={16} />

        </button>

      </div>


      <ProductGrid />

    </section>
  )
}

export default ProductSection