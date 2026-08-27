import { useSearchParams } from "react-router-dom";
import products from "../data/products";

function Products() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q");

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold">
        Products
      </h1>

      <p className="mt-4 text-gray-600">
        Browse products from Nigerian vendors.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow-md">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products