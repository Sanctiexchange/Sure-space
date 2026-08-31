import { useNavigate } from "react-router-dom";
function VendorDashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Vendor Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your products, orders and sales from one place.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Products
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              0
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Orders
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              0
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Products Sold
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              0
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Sales
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              ₦0
            </h2>
          </div>

        </div>

        {/* Dashboard Actions */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-900">
            Vendor Management
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <button
              className="rounded-lg bg-green-600 px-6 py-4 font-semibold text-white hover:bg-green-700"
              onClick={() => navigate("/vendor/add-product")}
            >
              Add Product
            </button>

            <button className="rounded-lg border border-gray-300 bg-white px-6 py-4 font-semibold text-gray-800 hover:bg-gray-50">
              Manage Products
            </button>

            <button className="rounded-lg border border-gray-300 bg-white px-6 py-4 font-semibold text-gray-800 hover:bg-gray-50">
              View Orders
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default VendorDashboard;