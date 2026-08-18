import products from "../../data/products"
import ProductCard from "./ProductCard"

function ProductGrid() {

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}

    </div>
  )
}

export default ProductGrid