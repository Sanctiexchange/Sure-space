import categories from "../../data/categories"
import CategoryCard from "./CategoryCard"

function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">

      <div className="mb-6 flex items-end justify-between">

        <div>
          <p className="text-sm font-medium text-green-600">
            Explore
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            Shop by Category
          </h2>
        </div>

        <button className="text-sm font-semibold text-green-600 hover:text-green-700">
          View all
        </button>

      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}

      </div>

    </section>
  )
}

export default CategorySection