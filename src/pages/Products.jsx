import { useSearchParams } from "react-router-dom";
import { getMarketplaceProducts } from "../utils/marketplaceProducts";

function Products() {
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("q");

  const products = getMarketplaceProducts();

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
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
          <div
            key={product.id}
            className="overflow-hidden rounded-xl bg-white shadow-md"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="text-xl font-bold">
                {product.name}
              </h2>

              <p className="mt-2 text-lg font-semibold text-green-600">
                ₦{Number(product.price).toLocaleString()}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Vendor: {product.vendor || "NaijaMarket"}
              </p>

              {product.location && (
                <p className="text-sm text-gray-500">
                  Location: {product.location}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="mt-10 rounded-xl bg-white p-8 text-center shadow">
          <p className="text-gray-600">
            No products found.
          </p>
        </div>
      )}
    </div>
  );
}

export default Products;