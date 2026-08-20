import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    const savedUser = localStorage.getItem(
      "naijaMarketUser"
    );

    if (!savedUser) {
      alert("No account found. Please register first.");
      return;
    }

    const user = JSON.parse(savedUser);

    if (user.email !== email) {
      alert("Incorrect email or password.");
      return;
    }

    login(user);

    navigate("/account");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-md">

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <div className="text-center">

            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-gray-600">
              Login to your NaijaMarket account.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
            </div>

            {/* Login */}
            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Login
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-gray-600">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-green-600 hover:text-green-700"
            >
              Create Account
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;