import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useOrders } from "../context/OrderContext";


function Checkout() {
  const { cartItems } = useCart();

  const { createOrder } = useOrders();

  const navigate = useNavigate();
  

  const [customer, setCustomer] = useState({
    fullName: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    address: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState("standard");

  const [paymentMethod, setPaymentMethod] = useState("online");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = deliveryMethod === "express" ? 10000 : 5000;

  const total = subtotal + deliveryFee;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCustomer((previousCustomer) => ({
      ...previousCustomer,
      [name]: value,
    }));
  };

const handlePlaceOrder = (event) => {
  event.preventDefault();

  if (cartItems.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const orderData = {
    customer: {
      ...customer,
    },

    items: cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
    })),

    deliveryMethod,

    paymentMethod,

    subtotal,

    deliveryFee,

    total,
  };

  const createdOrder = createOrder(orderData);

  navigate("/order-confirmation", {
    state: {
      order: createdOrder,
    },
  });
};
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Checkout
        </h1>

        <form onSubmit={handlePlaceOrder}>

          <div className="grid gap-8 lg:grid-cols-3">

            {/* LEFT SIDE */}
            <div className="space-y-6 lg:col-span-2">

              {/* CONTACT INFORMATION */}
              <section className="rounded-2xl bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Contact Information
                </h2>

                <div className="grid gap-5 md:grid-cols-2">

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
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                    />
                  </div>

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
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                    />
                  </div>

                  <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={customer.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                    />

                  </div>

                </div>

              </section>

              {/* DELIVERY ADDRESS */}
              <section className="rounded-2xl bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Delivery Address
                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      State
                    </label>

                    <select
                      name="state"
                      value={customer.state}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
                    >
                      <option value="">Select state</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja</option>
                      <option value="Rivers">Rivers</option>
                      <option value="Anambra">Anambra</option>
                      <option value="Enugu">Enugu</option>
                      <option value="Kano">Kano</option>
                      <option value="Oyo">Oyo</option>
                      <option value="Delta">Delta</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={customer.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                    />
                  </div>

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
                      required
                      className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                    />

                  </div>

                </div>

              </section>

              {/* DELIVERY METHOD */}
              <section className="rounded-2xl bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Delivery Method
                </h2>

                <div className="space-y-4">

                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4 hover:border-green-500">

                    <div className="flex items-center gap-3">

                      <input
                        type="radio"
                        name="delivery"
                        value="standard"
                        checked={deliveryMethod === "standard"}
                        onChange={(event) =>
                          setDeliveryMethod(event.target.value)
                        }
                      />

                      <div>
                        <p className="font-semibold text-gray-900">
                          Standard Delivery
                        </p>

                        <p className="text-sm text-gray-500">
                          Delivery within 3–5 business days
                        </p>
                      </div>

                    </div>

                    <span className="font-semibold text-green-600">
                      ₦5,000
                    </span>

                  </label>

                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4 hover:border-green-500">

                    <div className="flex items-center gap-3">

                      <input
                        type="radio"
                        name="delivery"
                        value="express"
                        checked={deliveryMethod === "express"}
                        onChange={(event) =>
                          setDeliveryMethod(event.target.value)
                        }
                      />

                      <div>
                        <p className="font-semibold text-gray-900">
                          Express Delivery
                        </p>

                        <p className="text-sm text-gray-500">
                          Faster delivery within 1–2 business days
                        </p>
                      </div>

                    </div>

                    <span className="font-semibold text-green-600">
                      ₦10,000
                    </span>

                  </label>

                </div>

              </section>

              {/* PAYMENT METHOD */}
              <section className="rounded-2xl bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Payment Method
                </h2>

                <div className="space-y-4">

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4">

                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(event) =>
                        setPaymentMethod(event.target.value)
                      }
                    />

                    <div>
                      <p className="font-semibold text-gray-900">
                        Pay Online
                      </p>

                      <p className="text-sm text-gray-500">
                        Pay securely online
                      </p>
                    </div>

                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4">

                    <input
                      type="radio"
                      name="payment"
                      value="delivery"
                      checked={paymentMethod === "delivery"}
                      onChange={(event) =>
                        setPaymentMethod(event.target.value)
                      }
                    />

                    <div>
                      <p className="font-semibold text-gray-900">
                        Pay on Delivery
                      </p>

                      <p className="text-sm text-gray-500">
                        Pay when your order arrives
                      </p>
                    </div>

                  </label>

                </div>

              </section>

            </div>

            {/* RIGHT SIDE */}
            <div>

              <section className="sticky top-6 rounded-2xl bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="space-y-5">

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between gap-4"
                    >

                      <div>
                        <p className="font-medium text-gray-900">
                          {item.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>

                    </div>
                  ))}

                </div>

                <div className="my-6 border-t border-gray-200" />

                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal
                    </span>

                    <span className="font-semibold">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Delivery
                    </span>

                    <span className="font-semibold">
                      ₦{deliveryFee.toLocaleString()}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">

                    <div className="flex justify-between">

                      <span className="text-lg font-bold">
                        Total
                      </span>

                      <span className="text-xl font-bold text-green-600">
                        ₦{total.toLocaleString()}
                      </span>

                    </div>

                  </div>

                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-xl bg-green-600 px-6 py-4 text-lg font-bold text-white transition hover:bg-green-700"
                >
                  Place Order
                </button>

              </section>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
}

export default Checkout;