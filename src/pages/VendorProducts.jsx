import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getVendorProducts,
  deleteVendorProduct,
  saveVendorProducts,
} from "../utility/productStorage";

function VendorProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = getVendorProducts();

    setProducts(savedProducts);
  }, []);

  const handleDelete = (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    const updatedProducts = deleteVendorProduct(productId);

    setProducts(updatedProducts);
  };

  const handleStockChange = (productId, change) => {
    const updatedProducts = products.map((product) => {
      if (product.id !== productId) {
        return product;
      }

      const currentStock = Number(product.stock) || 0;

      const newStock = Math.max(
        0,
        currentStock + change
      );

      return {
        ...product,
        stock: newStock,
      };
    });

    setProducts(updatedProducts);

    saveVendorProducts(updatedProducts);
  };

  const getStockStatus = (stock) => {
    const quantity = Number(stock) || 0;

    if (quantity === 0) {
      return {
        text: "Out of Stock",
        className:
          "bg-red-100 text-red-700",
      };
    }

    if (quantity <= 5) {
      return {
        text: "Low Stock",
        className:
          "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      text: "In Stock",
      className:
        "bg-green-100 text-green-700",
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              My Products
            </h1>

            <p className="mt-1 text-gray-600">
              Manage your products and inventory
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/vendor/add-product")
            }
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + Add Product
          </button>

        </div>

        {/* Product count */}
        <div className="mb-6 rounded-lg bg-white p-5 shadow">
          <p className="text-sm text-gray-500">
            Total Products
          </p>

          <p className="mt-1 text-3xl font-bold text-gray-800">
            {products.length}
          </p>
        </div>

        {/* Empty state */}
        {products.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">

            <h2 className="text-xl font-semibold text-gray-800">
              No products yet
            </h2>

            <p className="mt-2 text-gray-500">
              Add your first product to start selling.
            </p>

            <button
              onClick={() =>
                navigate("/vendor/add-product")
              }
              className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Add Product
            </button>

          </div>
        ) : (

          /* Products */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {products.map((product) => {

              const stockStatus =
                getStockStatus(product.stock);

              return (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-xl bg-white shadow"
                >

                  {/* Image */}
                  <div className="h-48 bg-gray-200">

                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}

                  </div>

                  {/* Product information */}
                  <div className="p-5">

                    <h2 className="text-lg font-bold text-gray-800">
                      {product.name}
                    </h2>

                    <p className="mt-2 text-xl font-bold text-blue-600">
                      ₦{Number(product.price).toLocaleString()}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      Category: {product.category}
                    </p>

                    {/* Stock status */}
                    <div className="mt-4 flex items-center justify-between">

                      <div>
                        <p className="text-sm text-gray-500">
                          Stock
                        </p>

                        <p className="text-xl font-bold text-gray-800">
                          {product.stock}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${stockStatus.className}`}
                      >
                        {stockStatus.text}
                      </span>

                    </div>

                    {/* Stock controls */}
                    <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-100 p-3">

                      <span className="text-sm font-medium text-gray-600">
                        Update Stock
                      </span>

                      <div className="flex items-center gap-2">

                        <button
                          onClick={() =>
                            handleStockChange(
                              product.id,
                              -1
                            )
                          }
                          className="h-9 w-9 rounded-lg bg-white text-lg font-bold text-gray-700 shadow hover:bg-gray-200"
                        >
                          −
                        </button>

                        <span className="w-8 text-center font-bold">
                          {product.stock}
                        </span>

                        <button
                          onClick={() =>
                            handleStockChange(
                              product.id,
                              1
                            )
                          }
                          className="h-9 w-9 rounded-lg bg-blue-600 text-lg font-bold text-white shadow hover:bg-blue-700"
                        >
                          +
                        </button>

                      </div>

                    </div>

                    {/* Action buttons */}
                    <div className="mt-5 flex gap-3">

                      <button
                        onClick={() =>
                          navigate(
                            `/vendor/edit-product/${product.id}`
                          )
                        }
                        className="flex-1 rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-300"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(product.id)
                        }
                        className="flex-1 rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-700 hover:bg-red-200"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}

export default VendorProducts;