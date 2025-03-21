import { useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../../apiCalls/userApi";
import { useEffect } from "react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = isAuthenticated();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Handle Logout
  const handleLogout = () => {
    // logout(() => {
        signout();
      navigate("/login");
    
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
          <ul className="space-y-4">
            <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">Dashboard</li>
            <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">Products</li>
            <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">Categories</li>
            <li className="p-2 rounded hover:bg-gray-200 cursor-pointer">Orders</li>
          </ul>
        </div>

        {/* Logout Button */}
        <button 
          className="mt-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

        {/* Buttons */}
        <div className="flex space-x-4 mb-6">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => navigate("/admin/addproduct")}
          >
            Add Product
          </button>
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={() => navigate("/admin/addcategory")}
          >
            Add Category
          </button>
        </div>

        {/* Products & Categories Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Products Section */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Products</h2>
            <p>List of products will be displayed here.</p>
          </div>

          {/* Categories Section */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Categories</h2>
            <p>List of categories will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
