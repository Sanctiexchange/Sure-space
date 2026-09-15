import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { addVendorProduct } from "../utility/ProductStorage";

import { getVendorId } from "../utility/VendorIdentity";

function VendorAddProduct() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    location: "",
    image: "",
    stock: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProduct((currentProduct) => ({
      ...currentProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const vendorId = getVendorId(user);

    if (!vendorId) {
      alert("You must be logged in as a vendor.");
      return;
    }

    const newProduct = {
      ...product,
      id: Date.now(),
      price: Number(product.price),
      stock: Number(product.stock),
      vendorId,
    };

    addVendorProduct(newProduct);

    alert("Product added successfully!");

    navigate("/vendor/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Add Product
          </h1>

          <p className="mt-2 text-gray-600">
            Add a new product to your NaijaMarket store.
          </p>
        </div>

        {/* Product Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-6 shadow-sm"
        >
          {/* Product Name */}
          <div className="mb-5">
            <label className="mb-2 block font-semibold text-gray-800">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          {/* Price */}
          <div className="mb-5">
            <label className="mb-2 block font-semibold text-gray-800">
              Price (₦)
            </label>

            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter product price"
              min="0"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          {/* Category */}
          <div className="mb-5">
            <label className="mb-2 block font-semibold text-gray-800">
              Category
            </label>

            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
            >
              <option value="">
                Select a category
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Fashion">
                Fashion
              </option>

              <option value="Phones">
                Phones
              </option>

              <option value="Home & Living">
                Home & Living
              </option>

              <option value="Beauty">
                Beauty
              </option>

              <option value="Computers">
                Computers
              </option>

              <option value="Food">
                Food
              </option>

              <option value="Sports">
                Sports
              </option>

              <option value="Automobiles">
                Automobiles
              </option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="mb-2 block font-semibold text-gray-800">
              Product Description
            </label>

            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Describe your product"
              rows="5"
              required
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          {/* Location */}
          <div className="mb-5">
            <label className="mb-2 block font-semibold text-gray-800">
              Vendor Location
            </label>

            <input
              type="text"
              name="location"
              value={product.location}
              onChange={handleChange}
              placeholder="e.g. Lagos"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          {/* Image URL */}
          <div className="mb-5">
            <label className="mb-2 block font-semibold text-gray-800">
              Product Image URL
            </label>

            <input
              type="url"
              name="image"
              value={product.image}
              onChange={handleChange}
              placeholder="Paste product image URL"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          {/* Stock */}
          <div className="mb-8">
            <label className="mb-2 block font-semibold text-gray-800">
              Stock Quantity
            </label>

            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Enter available quantity"
              min="0"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Save Product
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/vendor/dashboard")
              }
              className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VendorAddProduct;