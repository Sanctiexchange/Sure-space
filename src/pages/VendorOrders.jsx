import { useEffect, useState } from "react";
import {
  getVendorProducts,
} from "../utility/ProductStorage";

function VendorOrders() {
  const [orders, setOrders] = useState([]);
  const [vendorProducts, setVendorProducts] = useState([]);

  useEffect(() => {
    loadVendorOrders();
  }, []);

  const loadVendorOrders = () => {
    try {
      const savedOrders =
        localStorage.getItem("naijaMarketOrders");

      const savedVendorProducts =
        getVendorProducts();

      const parsedOrders = savedOrders
        ? JSON.parse(savedOrders)
        : [];

      setVendorProducts(savedVendorProducts);

      /*
       * Get the IDs of products belonging
       * to this vendor.
       */
      const vendorProductIds =
        savedVendorProducts.map((product) =>
          Number(product.id)
        );

      /*
       * Find orders containing at least
       * one vendor product.
       */
      const matchingOrders =
        parsedOrders.filter((order) => {
          if (!Array.isArray(order.items)) {
            return false;
          }

          return order.items.some((item) =>
            vendorProductIds.includes(
              Number(item.id)
            )
          );
        });

      setOrders(matchingOrders);
    } catch (error) {
      console.error(
        "Error loading vendor orders:",
        error
      );

      setOrders([]);
    }
  };

  /*
   * Return only the products in an order
   * that belong to this vendor.
   */
  const getVendorItems = (order) => {
    if (!Array.isArray(order.items)) {
      return [];
    }

    const vendorProductIds =
      vendorProducts.map((product) =>
        Number(product.id)
      );

    return order.items.filter((item) =>
      vendorProductIds.includes(
        Number(item.id)
      )
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      case "Processing":
        return "bg-yellow-100 text-yellow-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Order Received":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Vendor Orders
          </h1>

          <p className="mt-1 text-gray-600">
            Manage orders containing your products
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total Orders */}
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Total Orders
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-800">
              {orders.length}
            </p>
          </div>

          {/* Products */}
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Your Products
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {vendorProducts.length}
            </p>
          </div>

          {/* Order Received */}
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              New Orders
            </p>

            <p className="mt-2 text-3xl font-bold text-purple-600">
              {
                orders.filter(
                  (order) =>
                    order.status ===
                    "Order Received"
                ).length
              }
            </p>
          </div>

        </div>

        {/* No Orders */}
        {orders.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">

            <div className="text-5xl">
              📦
            </div>

            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              No orders yet
            </h2>

            <p className="mt-2 text-gray-500">
              Orders containing your products
              will appear here.
            </p>

          </div>
        ) : (

          <div className="space-y-6">

            {orders.map((order) => {

              const vendorItems =
                getVendorItems(order);

              return (
                <div
                  key={order.orderNumber}
                  className="overflow-hidden rounded-xl bg-white shadow"
                >

                  {/* Order Header */}
                  <div className="border-b bg-gray-50 p-5">

                    <div className="grid gap-5 md:grid-cols-4">

                      {/* Order Number */}
                      <div>
                        <p className="text-sm text-gray-500">
                          Order Number
                        </p>

                        <p className="mt-1 font-bold text-gray-800">
                          {order.orderNumber}
                        </p>
                      </div>

                      {/* Customer */}
                      <div>
                        <p className="text-sm text-gray-500">
                          Customer
                        </p>

                        <p className="mt-1 font-semibold text-gray-800">
                          {order.customer?.fullName ||
                            "Customer"}
                        </p>
                      </div>

                      {/* Date */}
                      <div>
                        <p className="text-sm text-gray-500">
                          Order Date
                        </p>

                        <p className="mt-1 font-medium text-gray-700">
                          {order.createdAt
                            ? new Date(
                                order.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>

                      {/* Status */}
                      <div>
                        <p className="text-sm text-gray-500">
                          Status
                        </p>

                        <span
                          className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {order.status ||
                            "Order Received"}
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* Customer Contact */}
                  <div className="border-b p-5">

                    <h2 className="mb-4 text-lg font-bold text-gray-800">
                      Customer Information
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-3">

                      <div>
                        <p className="text-sm text-gray-500">
                          Full Name
                        </p>

                        <p className="font-medium text-gray-800">
                          {order.customer?.fullName ||
                            "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Phone
                        </p>

                        <p className="font-medium text-gray-800">
                          {order.customer?.phone ||
                            "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Email
                        </p>

                        <p className="break-all font-medium text-gray-800">
                          {order.customer?.email ||
                            "N/A"}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Vendor Products */}
                  <div className="p-5">

                    <h2 className="mb-4 text-lg font-bold text-gray-800">
                      Your Products
                    </h2>

                    <div className="space-y-4">

                      {vendorItems.map(
                        (item) => (

                          <div
                            key={item.id}
                            className="flex flex-col gap-4 rounded-xl bg-gray-50 p-4 sm:flex-row sm:items-center"
                          >

                            {/* Product Image */}
                            <div className="h-20 w-20 `shrink-0` overflow-hidden rounded-lg bg-gray-200">

                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xs text-gray-500">
                                  No Image
                                </div>
                              )}

                            </div>

                            {/* Product Details */}
                            <div className="flex-1">

                              <h3 className="font-semibold text-gray-800">
                                {item.name}
                              </h3>

                              <p className="mt-1 text-sm text-gray-500">
                                Quantity:{" "}
                                {item.quantity || 1}
                              </p>

                            </div>

                            {/* Price */}
                            <div className="sm:text-right">

                              <p className="text-sm text-gray-500">
                                Unit Price
                              </p>

                              <p className="font-bold text-blue-600">
                                ₦
                                {Number(
                                  item.price || 0
                                ).toLocaleString()}
                              </p>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 border-t pt-5">

                      <div className="ml-auto max-w-sm space-y-2">

                        <div className="flex justify-between text-gray-600">
                          <span>
                            Order Subtotal
                          </span>

                          <span>
                            ₦
                            {Number(
                              order.subtotal || 0
                            ).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between text-gray-600">
                          <span>
                            Delivery Fee
                          </span>

                          <span>
                            ₦
                            {Number(
                              order.deliveryFee || 0
                            ).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between border-t pt-2 text-lg font-bold text-gray-800">
                          <span>
                            Order Total
                          </span>

                          <span>
                            ₦
                            {Number(
                              order.total || 0
                            ).toLocaleString()}
                          </span>
                        </div>

                      </div>

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

export default VendorOrders;