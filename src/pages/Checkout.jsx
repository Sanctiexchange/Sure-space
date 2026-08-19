import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // Customer information
  const [customer, setCustomer] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  // Delivery fee
  const deliveryFee = 5000;

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  // Calculate final total
  const total = subtotal + deliveryFee;

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Place order
  const handlePlaceOrder = (event) => {
    event.preventDefault();

    // Make sure the cart is not empty
    if (cartItems.length === 0) {
      return;
    }

    // Make sure required information is provided
    if (
      !customer.fullName ||
      !customer.phone ||
      !customer.address ||
      !customer.city
    ) {
      alert("Please complete your delivery information.");
      return;
    }

    // Create a simple order number
    const orderNumber = `NM-${Date.now()
      .toString()
      .slice(-8)}`;

    // Send order information to Order Confirmation
    navigate("/order-confirmation", {
      state: {
        order: {
          orderNumber,
          customer,
          items: cartItems,
          subtotal,
          deliveryFee,
          total,
        },
      },
    });
  };

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Cart Is Empty
          </h1>

          <p className="mt-3 text-gray-600">
            You need to add products to your cart before
            proceeding to checkout.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="mt-2 text-gray-600">
            Complete your delivery information and place
            your order.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid gap-8 lg:grid-cols-3">

            {/* LEFT SIDE */}
            <div className="space-y-6 lg:col-span-2">

              {/* Delivery Information */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">
                  Delivery Information
                </h2>

                <div className="mt-6 grid gap-5 md:grid-cols-2">

                  {/* Full Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={customer.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={customer.phone}
                      onChange={handleChange}
                      placeholder="08012345678"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={customer.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={customer.city}
                      onChange={handleChange}
                      placeholder="Lagos"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Delivery Address
                    </label>

                    <textarea
                      name="address"
                      value={customer.address}
                      onChange={handleChange}
                      placeholder="Enter your complete delivery address"
                      rows="4"
                      className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">
                  Your Products
                </h2>

                <div className="mt-6 space-y-5">

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 border-b border-gray-200 pb-5 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >

                      {/* Product information */}
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-green-600">
                          ₦
                          {Number(item.price).toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-lg hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="min-w-8 text-center font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-lg hover:bg-gray-100"
                        >
                          +
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="ml-3 text-sm font-medium text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>

                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>

            {/* RIGHT SIDE - ORDER SUMMARY */}
            <div>
              <div className="sticky top-6 rounded-2xl bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">

                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      Subtotal
                    </span>

                    <span className="font-medium text-gray-900">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>

                  {/* Delivery */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      Delivery
                    </span>

                    <span className="font-medium text-gray-900">
                      ₦{deliveryFee.toLocaleString()}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">

                    {/* Total */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>

                      <span className="text-2xl font-bold text-green-600">
                        ₦{total.toLocaleString()}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Payment information */}
                <div className="mt-6 rounded-xl bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-800">
                    Payment Method
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    Payment integration will be connected
                    in the next phase.
                  </p>
                </div>

                {/* Place Order */}
                <button
                  type="submit"
                  className="mt-6 w-full rounded-lg bg-green-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
                >
                  Place Order
                </button>

                <Link
                  to="/cart"
                  className="mt-3 block text-center text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  ← Back to Cart
                </Link>

              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;