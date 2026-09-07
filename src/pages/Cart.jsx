import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // =========================================
  // CALCULATE SUBTOTAL
  // =========================================
  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  // =========================================
  // DELIVERY
  // =========================================
  const deliveryFee = cartItems.length > 0 ? 5000 : 0;

  // =========================================
  // TOTAL
  // =========================================
  const total = subtotal + deliveryFee;

  // =========================================
  // EMPTY CART
  // =========================================
  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Your cart is empty
          </h2>

          <p className="mt-2 text-gray-500">
            You have no products in your cart yet.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-3">

        {/* =====================================
            CART PRODUCTS
        ====================================== */}
        <div className="space-y-4 lg:col-span-2">
          {cartItems.map((item) => {
            const price = Number(item.price || 0);
            const quantity = Number(item.quantity || 1);
            const itemTotal = price * quantity;

            return (
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
                    ₦{price.toLocaleString("en-NG")}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="mt-5 flex items-center gap-3">

                  {/* DECREASE */}
                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                    disabled={quantity <= 1}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-xl font-semibold text-gray-700 transition hover:border-green-600 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    −
                  </button>

                  {/* QUANTITY */}
                  <span className="min-w-8.5 text-center text-lg font-semibold text-gray-900">
                    {quantity}
                  </span>

                  {/* INCREASE */}
                  <button
                    type="button"
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-xl font-semibold text-gray-700 transition hover:border-green-600 hover:text-green-600"
                  >
                    +
                  </button>
                </div>

                {/* Item Total */}
                <div className="mt-5">
                  <p className="text-sm text-gray-500">
                    Item total
                  </p>

                  <p className="mt-1 text-lg font-bold text-gray-900">
                    ₦{itemTotal.toLocaleString("en-NG")}
                  </p>
                </div>

                {/* REMOVE */}
                <button
                  type="button"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="mt-5 text-sm font-medium text-red-500 transition hover:text-red-700 hover:underline"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        {/* =====================================
            ORDER SUMMARY
        ====================================== */}
        <div className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-6">

          <h2 className="text-xl font-bold text-gray-900">
            Order Summary
          </h2>

          <div className="mt-6 space-y-5">

            {/* SUBTOTAL */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                Subtotal
              </span>

              <span className="font-semibold text-gray-900">
                ₦{subtotal.toLocaleString("en-NG")}
              </span>
            </div>

            {/* DELIVERY */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                Delivery
              </span>

              <span className="font-semibold text-gray-900">
                ₦{deliveryFee.toLocaleString("en-NG")}
              </span>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-200" />

            {/* TOTAL */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                Total
              </span>

              <span className="text-xl font-bold text-green-600">
                ₦{total.toLocaleString("en-NG")}
              </span>
            </div>

            {/* CHECKOUT */}
            <Link
              to="/checkout"
              className="mt-4 block w-full rounded-xl bg-green-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-green-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;