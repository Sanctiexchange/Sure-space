import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getVendorProducts,
  saveVendorProducts,
} from "../utility/ProductStorage";

function VendorEditProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const products = getVendorProducts();

    const selectedProduct = products.find(
      (item) => item.id === Number(productId)
    );

    setProduct(selectedProduct || null);
  }, [productId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProduct((currentProduct) => ({
      ...currentProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const products = getVendorProducts();

    const updatedProducts = products.map((item) => {
      if (item.id === Number(productId)) {
        return {
          ...product,
          price: Number(product.price),
          stock: Number(product.stock),
        };
      }

      return item;
    });

    saveVendorProducts(updatedProducts);

    alert("Product updated successfully!");

    navigate("/vendor/products");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 text-center shadow-sm">

          <h1 className="text-2xl font-bold text-gray-900">
            Product Not Found
          </h1>

          <p className="mt-2 text-gray-600">
            The product you are trying to edit could not be found.
          </p>

          <button
            type="button"
            onClick={() => navigate("/vendor/products")}
            className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            Back to My Products
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Product
          </h1>

          <p className="mt-2 text-gray-600">
            Update the information for this product.
          </p>
        </div>

        {/* Form */}
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
              rows="5"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
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
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          {/* Image */}
          <div className="mb-5">
            <label className="mb-2 block font-semibold text-gray-800">
              Product Image URL
            </label>

            <input
              type="url"
              name="image"
              value={product.image}
              onChange={handleChange}
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
              min="0"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">

            <button
              type="submit"
              className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate("/vendor/products")}
              className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-50"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default VendorEditProduct;