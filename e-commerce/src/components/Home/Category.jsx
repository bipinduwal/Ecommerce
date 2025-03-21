import React from "react";
import { categories } from "../../data";

const CategoryPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative group bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <h2 className="text-white text-lg font-semibold">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
