import { useEffect, useState } from "react";

import {
  getVendorProducts,
  approveVendorProduct,
  rejectVendorProduct,
} from "../utility/ProductStorage";

function AdminProductApprovals() {
  const [products, setProducts] = useState([]);

  const [rejectingProductId, setRejectingProductId] =
    useState(null);

  const [rejectionReason, setRejectionReason] =
    useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const vendorProducts = getVendorProducts();

    setProducts(vendorProducts);
  };


  const handleApprove = (productId) => {
    approveVendorProduct(
      productId,
      "Admin"
    );

    loadProducts();
  };

  const handleReject = (productId) => {
    if (!rejectionReason.trim()) {
      alert(
        "Please provide a reason for rejecting this product."
      );

      return;
    }

    rejectVendorProduct(
      productId,
      rejectionReason
    );

    setRejectingProductId(null);

    setRejectionReason("");

    loadProducts();
  };

  const pendingProducts = products.filter(
    (product) =>
      product.approvalStatus === "pending"
  );

  const approvedProducts = products.filter(
    (product) =>
      product.approvalStatus === "approved"
  );

  const rejectedProducts = products.filter(
    (product) =>
      product.approvalStatus === "rejected"
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Product Approvals
        </h1>

        <p className="mt-2 text-gray-600">
          Review vendor products before they are
          published on the marketplace.
        </p>

      </div>

      {/* Statistics */}

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">

        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm font-medium text-gray-500">
            Pending Review
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {pendingProducts.length}
          </p>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm font-medium text-gray-500">
            Approved
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {approvedProducts.length}
          </p>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-sm font-medium text-gray-500">
            Rejected
          </p>

          <p className="mt-2 text-3xl font-bold text-red-600">
            {rejectedProducts.length}
          </p>

        </div>

      </div>

      {/* Pending Products */}

      <div className="rounded-xl bg-white shadow">

        <div className="border-b p-6">

          <h2 className="text-xl font-bold text-gray-800">
            Products Awaiting Approval
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            These products are not yet visible
            to marketplace buyers.
          </p>

        </div>

        {pendingProducts.length === 0 ? (

          <div className="p-10 text-center">

            <p className="text-lg font-medium text-gray-600">
              No products awaiting approval.
            </p>

            <p className="mt-2 text-sm text-gray-400">
              New vendor submissions will appear here.
            </p>

          </div>

        ) : (

          <div className="divide-y">

            {pendingProducts.map((product) => (

              <div
                key={product.id}
                className="p-6"
              >

                <div className="flex flex-col gap-6 lg:flex-row">

                  {/* Product Image */}

                  <div className="shrink-0">

                    {product.image ? (

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-40 w-full rounded-lg object-cover lg:w-40"
                      />

                    ) : (

                      <div className="flex h-40 w-full items-center justify-center rounded-lg bg-gray-200 text-sm text-gray-500 lg:w-40">
                        No Image
                      </div>

                    )}

                  </div>

                  {/* Product Information */}

                  <div className="flex-1">

                    <div className="flex flex-col justify-between gap-3 md:flex-row">

                      <div>

                        <h3 className="text-xl font-bold text-gray-800">
                          {product.name}
                        </h3>

                        <p className="mt-2 text-lg font-semibold text-green-600">
                          ₦
                          {Number(
                            product.price
                          ).toLocaleString()}
                        </p>

                      </div>

                      <span className="h-fit w-fit rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                        Pending
                      </span>

                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-600 md:grid-cols-2">

                      <p>
                        <span className="font-semibold">
                          Vendor:
                        </span>{" "}
                        {product.vendor ||
                          "Unknown Vendor"}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Category:
                        </span>{" "}
                        {product.category ||
                          "Uncategorized"}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Stock:
                        </span>{" "}
                        {product.stock}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Location:
                        </span>{" "}
                        {product.location ||
                          "Not specified"}
                      </p>

                    </div>

                    {/* Actions */}

                    {rejectingProductId ===
                    product.id ? (

                      <div className="mt-6 rounded-lg bg-red-50 p-4">

                        <label className="block text-sm font-semibold text-gray-700">
                          Reason for rejection
                        </label>

                        <textarea
                          value={
                            rejectionReason
                          }
                          onChange={(event) =>
                            setRejectionReason(
                              event.target.value
                            )
                          }
                          placeholder="Explain why this product cannot be approved..."
                          rows="3"
                          className="mt-2 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-red-500"
                        />

                        <div className="mt-3 flex gap-3">

                          <button
                            onClick={() =>
                              handleReject(
                                product.id
                              )
                            }
                            className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
                          >
                            Confirm Rejection
                          </button>

                          <button
                            onClick={() => {
                              setRejectingProductId(
                                null
                              );

                              setRejectionReason("");
                            }}
                            className="rounded-lg border border-gray-300 bg-white px-5 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>

                        </div>

                      </div>

                    ) : (

                      <div className="mt-6 flex flex-wrap gap-3">

                        <button
                          onClick={() =>
                            handleApprove(
                              product.id
                            )
                          }
                          className="rounded-lg bg-green-600 px-6 py-2.5 font-semibold text-white transition hover:bg-green-700"
                        >
                          ✓ Approve Product
                        </button>

                        <button
                          onClick={() =>
                            setRejectingProductId(
                              product.id
                            )
                          }
                          className="rounded-lg bg-red-600 px-6 py-2.5 font-semibold text-white transition hover:bg-red-700"
                        >
                          ✕ Reject Product
                        </button>

                      </div>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Approved Products */}

      {approvedProducts.length > 0 && (

        <div className="mt-8 rounded-xl bg-white shadow">

          <div className="border-b p-6">

            <h2 className="text-xl font-bold text-gray-800">
              Approved Products
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              These vendor products are currently
              available on the marketplace.
            </p>

          </div>

          <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">

            {approvedProducts.map((product) => (

              <div
                key={product.id}
                className="rounded-lg border bg-gray-50 p-4"
              >

                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 w-full rounded-lg object-cover"
                  />
                )}

                <h3 className="mt-4 font-bold text-gray-800">
                  {product.name}
                </h3>

                <p className="mt-1 font-semibold text-green-600">
                  ₦
                  {Number(
                    product.price
                  ).toLocaleString()}
                </p>

                <span className="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Approved
                </span>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* Rejected Products */}

      {rejectedProducts.length > 0 && (

        <div className="mt-8 rounded-xl bg-white shadow">

          <div className="border-b p-6">

            <h2 className="text-xl font-bold text-gray-800">
              Rejected Products
            </h2>

          </div>

          <div className="divide-y">

            {rejectedProducts.map((product) => (

              <div
                key={product.id}
                className="flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between"
              >

                <div>

                  <h3 className="font-bold text-gray-800">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Vendor:{" "}
                    {product.vendor ||
                      "Unknown Vendor"}
                  </p>

                  <p className="mt-1 text-sm text-red-600">
                    Reason:{" "}
                    {product.rejectionReason ||
                      "No reason provided"}
                  </p>

                </div>

                <span className="w-fit rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                  Rejected
                </span>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminProductApprovals;