import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../apiCalls/userApi";

const AddCategoryForm = () => {
const navigate  = useNavigate();
  const { user } = isAuthenticated();
  useEffect(()=>{
    if(!user){
      navigate("/login");
    }
  },[])
  const [category, setCategory] = useState({
    category_name: "",
    category_image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategory({ ...category, category_image: file });

    // Create a preview URL for the selected image
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Category details submitted:", category);
    // Handle form submission logic (e.g., send data to the server)
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center bg-gray-100 px-6 py-12">
      <div className="text-center mb-6">
        <img src="/logo1.png" alt="Logo" className="w-80 mx-auto" />
      </div>

      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-5xl">
        {/* Left Image Section */}
        <div className="w-full md:w-[50%] p-0 flex items-center justify-center bg-gray-50">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Category Preview"
              className="h-full w-auto max-h-[300px] object-contain"
            />
          ) : (
            <img
              src="/placeholder-image.png"
              alt="Placeholder"
              className="h-full w-auto max-h-[300px] object-contain"
            />
          )}
        </div>

        {/* Right Form Section */}
        <div className="flex flex-col justify-center w-full md:w-[50%] p-8">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Add New Category
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Category Name */}
            <div>
              <label
                htmlFor="category_name"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                id="category_name"
                name="category_name"
                type="text"
                value={category.category_name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter category name"
              />
            </div>

            {/* Category Image Upload */}
            <div>
              <label
                htmlFor="category_image"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Category Image
              </label>
              <input
                id="category_image"
                name="category_image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                required
                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-full shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
