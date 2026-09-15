     {/* Desktop Navigation */}

          <div className="hidden lg:flex items-center gap-6">

            {/* Account */}
            {user ? (
  <>
    <Link
      to="/account"
      className="font-medium text-gray-700 hover:text-green-600"
    >
      My Account
    </Link>

    <button
      onClick={logout}
      className="font-medium text-red-600 hover:text-red-700"
    >
      Logout
    </button>
  </>
) : (
  <>
    <Link
      to="/login"
      className="font-medium text-gray-700 hover:text-green-600"
    >
      Login
    </Link>

    <Link
      to="/register"
      className="font-medium text-gray-700 hover:text-green-600"
    >
      Register
    </Link>
  </>
)}
