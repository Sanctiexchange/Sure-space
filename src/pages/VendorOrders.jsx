import { useEffect, useState } from "react";

import { getVendorProducts } from "../utility/productStorage";

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
       * Find products that belong to this vendor.
       */
      const vendorProductIds =
        savedVendorProducts.map(
          (product) => Number(product.id)
        );

      /*
       * Find orders containing this vendor's products.
       */
      const vendorOrders = parsedOrders.filter(
        (order) => {
          if (!order.items) {
            return false;
          }

          return order.items.some((item) =>
            vendorProductIds.includes(
              Number(item.id)
            )
          );
        }
      );

      setOrders(vendorOrders);
    } catch (error) {
      console.error(
        "Error loading vendor orders:",
        error
      );

      setOrders([]);
    }
  };

  const getVendorItems = (order) => {
    if (!order.items) {
      return [];
    }

    const vendorProductIds =
      vendorProducts.map(
        (product) => Number(product.id)
      );

    return order.items.filter((item) =>
      vendorProductIds.includes(
        Number(item.id)
      )
    );
  };

  const getOrderStatus = (order) => {
    return order.status || "Pending";
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
            View orders containing your products
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Total Orders
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-800">
              {orders.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Your Products
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {vendorProducts.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">
              Pending Orders
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {
                orders.filter(
                  (order) =>
                    getOrderStatus(order) ===
                    "Pending"
                ).length
              }
            </p>
          </div>

        </div>

        {/* Orders */}
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

            {orders.map((order, index) => {

              const vendorItems =
                getVendorItems(order);

              return (
                <div
                  key={
                    order.id ||
                    order.orderId ||
                    index
                  }
                  className="overflow-hidden rounded-xl bg-white shadow"
                >

                  {/* Order Header */}
                  <div className="flex flex-col gap-4 border-b p-5 md:flex-row md:items-center md:justify-between">

                    <div>
                      <p className="text-sm text-gray-500">
                        Order ID
                      </p>

                      <p className="font-bold text-gray-800">
                        {order.id ||
                          order.orderId ||
                          `ORDER-${index + 1}`}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Customer
                      </p>

                      <p className="font-semibold text-gray-800">
                        {order.user?.name ||
                          order.customerName ||
                          "Customer"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Status
                      </p>

                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(
                          getOrderStatus(order)
                        )}`}
                      >
                        {getOrderStatus(order)}
                      </span>
                    </div>

                  </div>

                  {/* Products */}
                  <div className="p-5">

                    <h2 className="mb-4 text-lg font-bold text-gray-800">
                      Your Products in This Order
                    </h2>

                    <div className="space-y-4">

                      {vendorItems.map(
                        (item, itemIndex) => (

                          <div
                            key={
                              item.id ||
                              itemIndex
                            }
                            className="flex flex-col gap-4 rounded-lg bg-gray-50 p-4 sm:flex-row sm:items-center"
                          >

                            {/* Image */}
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">

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

                            {/* Details */}
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
                            <div className="text-left sm:text-right">

                              <p className="text-sm text-gray-500">
                                Price
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

                    {/* Order date */}
                    {order.createdAt && (
                      <div className="mt-5 border-t pt-4">

                        <p className="text-sm text-gray-500">
                          Order Date
                        </p>

                        <p className="font-medium text-gray-700">
                          {new Date(
                            order.createdAt
                          ).toLocaleString()}
                        </p>

                      </div>
                    )}

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