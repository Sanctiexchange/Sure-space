import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const subtotal = cartItems.reduce(
  (total, item) => total + Number(item.price) * item.quantity,
  0
);

const deliveryFee = cartItems.length > 0 ? 5000 : 0;

const total = subtotal + deliveryFee;

  return (
    <div className="grid gap-6 lg:grid-cols-3">

  {/* Cart Products */}
  <div className="space-y-4 lg:col-span-2">

    {cartItems.map((item) => (
      <div
        key={item.id}
        className="rounded-2xl bg-white p-6 shadow-sm"
      >

        {/* Product Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {item.name}
          </h2>

          <p className="mt-2 text-lg font-semibold text-green-600">
            ₦{Number(item.price).toLocaleString()}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="mt-5 flex items-center gap-3">

          <button
            onClick={() => decreaseQuantity(item.id)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-xl font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            −
          </button>

          <span className="min-w-8.5 text-center text-lg font-semibold text-gray-900">
            {item.quantity}
          </span>

          <button
            onClick={() => increaseQuantity(item.id)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-xl font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            +
          </button>

        </div>

        {/* Remove */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="mt-5 text-sm font-medium text-red-500 transition hover:text-red-700"
        >
          Remove
        </button>

      </div>
    ))}

  </div>


  {/* Order Summary */}
  <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

    <h2 className="text-xl font-bold text-gray-900">
      Order Summary
    </h2>

    <div className="mt-6 space-y-4">

      {/* Subtotal */}
      <div className="flex items-center justify-between">
        <span className="text-gray-600">
          Subtotal
        </span>

        <span className="font-semibold text-gray-900">
          ₦{subtotal.toLocaleString()}
        </span>
      </div>


      {/* Delivery */}
      <div className="flex items-center justify-between">
        <span className="text-gray-600">
          Delivery
        </span>

        <span className="font-semibold text-gray-900">
          ₦{deliveryFee.toLocaleString()}
        </span>
      </div>


      {/* Divider */}
      <div className="border-t border-gray-200" />


      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">
          Total
        </span>

        <span className="text-xl font-bold text-green-600">
          ₦{total.toLocaleString()}
        </span>
      </div>


      {/* Checkout Button */}
    <Link
      to="/checkout"
      className="mt-4 block w-full rounded-xl bg-green-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-green-700"
    >
        Proceed to Checkout
    </Link>

    </div>

  </div>

</div>
  )}

export default Cart;