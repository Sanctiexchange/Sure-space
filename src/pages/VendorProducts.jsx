import { useEffect, useState } from "react";


function VendorProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts =
      JSON.parse(
        localStorage.getItem("naijaMarketVendorProducts")
      ) || [];

    setProducts(savedProducts);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Products
          </h1>

          <p className="mt-2 text-gray-600">
            View and manage the products in your store.
          </p>
        </div>

        {/* Product Count */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Products
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900">
            {products.length}
          </h2>
        </div>

        {/* Empty State */}
        {products.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              No products yet
            </h2>

            <p className="mt-2 text-gray-600">
              You have not added any products to your store.
            </p>
          </div>
        ) : (
          /* Product List */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {products.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-xl bg-white shadow-sm"
              >

                {/* Product Image */}
                <div className="h-56 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Product Information */}
                <div className="p-5">

                  <h2 className="text-xl font-bold text-gray-900">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-lg font-semibold text-green-600">
                    ₦{product.price.toLocaleString()}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Category: {product.category}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Location: {product.location}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Stock: {product.stock}
                  </p>

                  <p className="mt-3 line-clamp-3 text-sm text-gray-600">
                    {product.description}
                  </p>

                  {/* Actions */}
                  <div className="mt-5 flex gap-3">

                    <button
                      type="button"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-50"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default VendorProducts;