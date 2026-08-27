import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Account() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">

          <h1 className="text-2xl font-bold text-gray-900">
            You are not logged in
          </h1>

          <Link
            to="/login"
            className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white"
          >
            Login
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-3xl font-bold text-gray-900">
          My Account
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your NaijaMarket account.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          {/* Profile */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-gray-900">
              Profile
            </h2>

            <div className="mt-5 space-y-3">

              <p>
                <span className="font-semibold">
                  Name:
                </span>{" "}
                {user.name}
              </p>

              <p>
                <span className="font-semibold">
                  Email:
                </span>{" "}
                {user.email}
              </p>

              <p>
                <span className="font-semibold">
                  Phone:
                </span>{" "}
                {user.phone}
              </p>

              <p>
                <span className="font-semibold" bg-red>
                  Billing Address: <input type="text" />
               </span>
              </p>

            </div>

          </div>

          {/* Orders */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-gray-900">
              Orders
            </h2>

            <p className="mt-2 text-gray-600">
              View your previous purchases.
            </p>

            

            <Link
              to="/orders"
              className="mt-5 inline-block font-semibold text-green-600 hover:text-green-700"
            >
              View My Orders →
            </Link>

          </div>

        </div>


        {/* Logout */}
        <div className="text-center flex items-center justify-end gap-4">
        <button
          onClick={logout}
          className="mt-8 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          Logout
        </button>

          {/* home page*/}
         
          <Link
           to={`/`}
           className="mt-8 rounded-lg bg-green-400 px-6 py-3 font-semibold text-white  hover:bg-blue-300"
           >
          Home
          </Link>

      </div>
      </div>
    </div>
  );
}

export default Account;