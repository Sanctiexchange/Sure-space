import {
  Search,
  ArrowRight,
  ShoppingBag,
} from "lucide-react"

function HeroSection() {
  return (
    <section className="bg-linear-to-br from-green-700 via-green-600 to-emerald-500">

      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-20">

        <div className="grid items-center gap-10 lg:grid-cols-2">

          {/* Hero Text */}

          <div className="text-white">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">

              <ShoppingBag size={17} />

              Shop from trusted Nigerian vendors

            </div>


            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">

              Everything you need.
              <span className="block text-green-100">
                All in one place.
              </span>

            </h1>


            <p className="mt-6 max-w-xl text-lg leading-8 text-green-50">

              Discover products, services and great deals
              from vendors across Nigeria.

            </p>


            {/* Search */}

            <div className="mt-8 flex max-w-xl overflow-hidden rounded-xl bg-white shadow-xl">

              <input
                type="text"
                placeholder="What are you looking for?"
                className="min-w-0 flex-1 px-5 py-4 text-gray-800 outline-none"
              />

              <button className="flex items-center gap-2 bg-gray-900 px-5 text-white transition hover:bg-gray-800">

                <Search size={20} />

                <span className="hidden sm:inline">
                  Search
                </span>

              </button>

            </div>


            {/* CTA */}

            <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50">

              Start Shopping

              <ArrowRight size={18} />

            </button>

          </div>


          {/* Hero Visual */}

          <div className="hidden lg:block">

            <div className="relative mx-auto max-w-md">

              <div className="rounded-3xl bg-white/10 p-4 backdrop-blur-sm">

                <div className="rounded-2xl bg-white p-8 shadow-2xl">

                  <div className="text-center">

                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">

                      <ShoppingBag
                        size={46}
                        className="text-green-600"
                      />

                    </div>

                    <h3 className="mt-6 text-2xl font-bold text-gray-900">
                      Shop Nigerian
                    </h3>

                    <p className="mt-2 text-gray-500">
                      Discover amazing products from
                      trusted sellers.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default HeroSection