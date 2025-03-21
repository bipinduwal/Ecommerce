import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../data";
import { isAuthenticated } from "../apiCalls/userApi";


const CategoryPage = () => {
  const navigate = useNavigate();
  // const { user } = isAuthenticated();
  // useEffect(()=>{
  //   if(!user){
  //     navigate("/login");
  //   }
  // },[])
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            to={`/category/${category.name}`}
            key={category.id}
            className="bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition duration-300 p-4"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold text-center mt-3">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
