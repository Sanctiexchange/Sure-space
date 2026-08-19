import { Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";

function Orders() {
  const { orders } = useOrders();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Orders
          </h1>

          <p className="mt-2 text-gray-600">
            View your previous orders and track their status.
          </p>
        </div>

        {/* No Orders */}
        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

            <h2 className="text-2xl font-bold text-gray-900">
              No Orders Yet
            </h2>

            <p className="mt-3 text-gray-600">
              You have not placed any orders yet.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Start Shopping
            </Link>

          </div>
        ) : (

          /* Orders */
          <div className="space-y-5">

            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  {/* Order Information */}
                  <div>

                    <p className="text-sm text-gray-500">
                      Order Number
                    </p>

                    <h2 className="text-lg font-bold text-gray-900">
                      {order.orderNumber}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  {/* Status */}
                  <div>
                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                      {order.status}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="text-left md:text-right">

                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <p className="text-xl font-bold text-gray-900">
                      ₦{order.total.toLocaleString()}
                    </p>

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

export default Orders;