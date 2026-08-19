import { Link, useParams } from "react-router-dom";
import { useOrders } from "../context/OrderContext";

function OrderDetails() {
  const { orderNumber } = useParams();

  const { orders } = useOrders();

  const order = orders.find(
    (item) => item.orderNumber === orderNumber
  );

  // Order not found
  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-center shadow-sm">

          <h1 className="text-2xl font-bold text-gray-900">
            Order Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            We could not find this order.
          </p>

        <Link
            to="/orders"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100"
            >
            ← Back to My Orders
        </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">

          <Link
            to="/orders"
            className="text-sm font-medium text-green-600 hover:text-green-700"
          >
            ← Back to My Orders
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Order Details
          </h1>

          <p className="mt-2 text-gray-600">
            Order #{order.orderNumber}
          </p>

        </div>

        {/* Order Status */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Order Status
              </p>

              <span className="mt-2 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                {order.status}
              </span>
            </div>

            <div className="text-left sm:text-right">

              <p className="text-sm text-gray-500">
                Order Date
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

          </div>

        </div>

        {/* Customer Information */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-900">
            Delivery Information
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <div>
              <p className="text-sm text-gray-500">
                Customer
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {order.customer.fullName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Phone
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {order.customer.phone}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                City
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {order.customer.city}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {order.customer.email || "Not provided"}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">
                Delivery Address
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {order.customer.address}
              </p>
            </div>

          </div>

        </div>

        {/* Products */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-900">
            Products
          </h2>

          <div className="mt-6 space-y-5">

            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 pb-5 last:border-b-0 last:pb-0"
              >

                <div>

                  <h3 className="font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                </div>

                <p className="font-semibold text-gray-900">
                  ₦
                  {(
                    Number(item.price) *
                    Number(item.quantity)
                  ).toLocaleString()}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* Order Summary */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-900">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-600">
                Subtotal
              </span>

              <span className="font-medium">
                ₦{order.subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                Delivery
              </span>

              <span className="font-medium">
                ₦{order.deliveryFee.toLocaleString()}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4">

              <div className="flex justify-between">

                <span className="text-lg font-bold">
                  Total
                </span>

                <span className="text-2xl font-bold text-green-600">
                  ₦{order.total.toLocaleString()}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default OrderDetails;