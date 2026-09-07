function CategoryCard({ category }) {
  const Icon = category.icon

  return (
    <div className="group cursor-pointer rounded-xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white">

          <Icon size={22} />

        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            {category.name}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Shop now
          </p>
        </div>

      </div>

    </div>
  );
}

export default CategoryCard