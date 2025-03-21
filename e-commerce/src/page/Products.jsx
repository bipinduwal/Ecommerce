import React, { useEffect, useState } from "react";
import { products } from "../data";
import { useParams } from "react-router-dom";

const AllProductsPage = () => {
  // Filter state variables
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(id);
  const [selectedColor, setSelectedColor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    setSelectedCategory(id);
  }, [id]);

  // Filter the products based on the selected criteria
  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchColor = selectedColor ? product.color === selectedColor : true;
    const matchMinPrice = minPrice
      ? product.price >= parseFloat(minPrice)
      : true;
    const matchMaxPrice = maxPrice
      ? product.price <= parseFloat(maxPrice)
      : true;
    return matchCategory && matchColor && matchMinPrice && matchMaxPrice;
  });

  return (
    <div className="relative max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
      {/* Filters Sidebar */}
      <aside className="w-full lg:w-1/4 sticky top-4 bg-white p-4 rounded-lg shadow-md max-h-screen">
        <h2 className="text-2xl font-semibold mb-4">Filters</h2>

        {/* Category Filter */}
        <div className="mb-4">
          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Sports">Sports</option>
            <option value="Books">Books</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Beauty & Personal Care">
              Beauty & Personal Care
            </option>
            <option value="Automotive">Automotive</option>
            <option value="Grocery">Grocery</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>

        {/* Color Filter */}
        <div className="mb-4">
          <label htmlFor="color" className="block font-medium mb-1">
            Color
          </label>
          <select
            id="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">All Colors</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Gray">Gray</option>
            <option value="Silver">Silver</option>
            <option value="Brown">Brown</option>
            <option value="Orange">Orange</option>
            <option value="Pink">Pink</option>
            <option value="Purple">Purple</option>
            <option value="Multicolor">Multicolor</option>
            <option value="Clear">Clear</option>
            <option value="Wood">Wood</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Price Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 border rounded p-2"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 border rounded p-2"
            />
          </div>
        </div>
      </aside>

      {/* Products Grid */}
      <section className="w-full lg:w-3/4">
        {filteredProducts.length === 0 ? (
          <p>No products found matching your criteria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-xl">{product.name}</h3>
                  <p className="text-gray-600 mt-2">
                    Rs. {product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 capitalize mt-1">
                    Color: {product.color}
                  </p>
                </div>
                {/* <button className="bg-sky-500 rounded-md border border-black w-full text-white mx-auto">Add to Cart</button> */}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AllProductsPage;
