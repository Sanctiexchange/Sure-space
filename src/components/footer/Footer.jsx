function Footer() {
  return (
    <footer className="border-t bg-gray-900 text-gray-300">

      <div className="mx-auto max-w-7xl px-4 py-12">

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Company */}

          <div>
            <h2 className="text-xl font-bold text-white">
              NaijaMarket
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              A Nigerian marketplace connecting buyers with
              trusted vendors and service providers.
            </p>
          </div>


          {/* Shopping */}

          <div>

            <h3 className="font-semibold text-white">
              Shopping
            </h3>

            <ul className="mt-4 space-y-3 text-sm">

              <li>
                Products
              </li>

              <li>
                Categories
              </li>

              <li>
                Deals
              </li>

              <li>
                Cart
              </li>

            </ul>

          </div>


          {/* Customer Service */}

          <div>

            <h3 className="font-semibold text-white">
              Customer Service
            </h3>

            <ul className="mt-4 space-y-3 text-sm">

              <li>
                Help Center
              </li>

              <li>
                Track Order
              </li>

              <li>
                Returns
              </li>

              <li>
                Contact Us
              </li>

            </ul>

          </div>


          {/* Vendors */}

          <div>

            <h3 className="font-semibold text-white">
              For Vendors
            </h3>

            <ul className="mt-4 space-y-3 text-sm">

              <li>
                Sell on NaijaMarket
              </li>

              <li>
                Vendor Dashboard
              </li>

              <li>
                Vendor Guidelines
              </li>

              <li>
                Partner With Us
              </li>

            </ul>

          </div>

        </div>


        <div className="mt-10 border-t border-gray-800 pt-6">

          <p className="text-center text-sm text-gray-500">
            © 2026 NaijaMarket. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  )
}

export default Footer