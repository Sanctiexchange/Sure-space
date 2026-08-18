import { Link, useLocation } from "react-router-dom";

function OrderConfirmation() {
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">

          <h1 className="text-2xl font-bold text-gray-900">
            Order Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            We could not find the order information.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            Continue Shopping
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">

      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm">

        {/* SUCCESS ICON */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Order Successful!
        </h1>

        <p className="mt-3 text-gray-500">
          Thank you for shopping with NaijaMarket.
          Your order has been received successfully.
        </p>

        {/* ORDER NUMBER */}
        <div className="mt-8 rounded-xl bg-gray-50 p-5">

          <p className="text-sm text-gray-500">
            Order Number
          </p>

          <p className="mt-2 text-xl font-bold text-green-600">
            {order.orderNumber}
          </p>

        </div>

        {/* ORDER DETAILS */}
        <div className="mt-6 text-left">

          <div className="flex justify-between border-b border-gray-200 py-3">

            <span className="text-gray-500">
              Customer
            </span>

            <span className="font-medium text-gray-900">
              {order.customer.fullName}
            </span>

          </div>

          <div className="flex justify-between border-b border-gray-200 py-3">

            <span className="text-gray-500">
              Delivery
            </span>

            <span className="font-medium capitalize text-gray-900">
              {order.deliveryMethod}
            </span>

          </div>

          <div className="flex justify-between border-b border-gray-200 py-3">

            <span className="text-gray-500">
              Payment
            </span>

            <span className="font-medium text-gray-900">
              {order.paymentMethod === "online"
                ? "Pay Online"
                : "Pay on Delivery"}
            </span>

          </div>

          <div className="flex justify-between py-4">

            <span className="text-lg font-bold text-gray-900">
              Total
            </span>

            <span className="text-lg font-bold text-green-600">
              ₦{order.total.toLocaleString()}
            </span>

          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

          <Link
            to="/"
            className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            View My Orders
          </Link>

        </div>

      </div>

    </div>
  );
}

export default OrderConfirmation;