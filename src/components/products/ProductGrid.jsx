import { useEffect, useState } from "react"

import { getMarketplaceProducts } from "../../utility/marketplaceProducts"

import ProductCard from "./ProductCard"


function ProductGrid() {

  const [products, setProducts] = useState([])


  useEffect(() => {

    const marketplaceProducts = getMarketplaceProducts()

    setProducts(marketplaceProducts)

  }, [])


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