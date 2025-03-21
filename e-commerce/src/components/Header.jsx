import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, FaTimes, FaBell } from "react-icons/fa";
import { isAuthenticated, signout } from "../apiCalls/userApi";
import { API } from "../config";
import { categories, notificationData } from "../data";

const Header = () => {
  const navigate = useNavigate();
  const [userPopup, setUserPopup] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [profileImg, setProfileImg] = useState("/default-avatar.png");

  const userPopupRef = useRef(null);
  const notificationRef = useRef(null);
  const { user } = isAuthenticated();

  useEffect(() => {
    if (user?.profileImage) {
      const img = new Image();
      img.src = `${API}/profileImages/${user.profileImage}`;
      img.onload = () => setProfileImg(img.src);
    }
  }, [user]);

  const handleLogout = () => {
    signout(() => {
      navigate("/login");
    });
  };

  // Close User Popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userPopupRef.current && !userPopupRef.current.contains(e.target)) {
        setUserPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close Notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="min-h-[10vh] bg-gray-900 text-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Section */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-8" src="/logo1.png" alt="Logo" />
            </Link>

            <div className="hidden md:flex space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                Home
              </Link>

              {/* Category Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowCategoryDropdown(true)}
                onMouseLeave={() => setShowCategoryDropdown(false)}
              >
                <button onClick={() => navigate("/category")} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  Category <i className="fa fa-chevron-down ms-1"></i>
                </button>

                {showCategoryDropdown && (
                  <div className="absolute left-0 min-w-fit text-nowrap bg-gray-800 shadow-md rounded-md">
                    {categories.map((category) => (
                      <Link to={`/category/${category.name}`} key={category.id} className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/products" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                Products
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Mobile Menu */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-400 hover:text-white">
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Search Bar */}
            <div className="relative hidden md:block text-gray-400 focus-within:text-white">
              <FaSearch className="absolute inset-y-0 top-2.5 left-3 pointer-events-none" />
              <input type="text" placeholder="Search" className="block w-full bg-gray-800 rounded-full pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-gray-700" />
            </div>

            {user && <>
            {/* Cart */}
            <Link to="/cart" className="text-gray-400 hover:text-white">
              <FaShoppingCart size={20} />
            </Link>

            {/* Notifications */}
            <button onClick={() => setShowNotifications(!showNotifications)} className="text-gray-400 hover:text-white relative">
              <FaBell size={20} />
              <span className="absolute -top-3 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {notificationData.length}
              </span>
            </button>
            </>
}

            {/* Profile Section */}
            {user ? (
              <div className="relative">
                <img
                  className="h-8 w-8 ms-8 rounded-full cursor-pointer"
                  src={`${API}/profileImages/${user.profileImage}`}
                  alt="User"
                  // onError={(e) => (e.target.src = "/default-avatar.png")}
                  onClick={() => setUserPopup(!userPopup)}
                />
                {userPopup && (
                  <div ref={userPopupRef} className="absolute top-14 right-0 bg-gray-900 p-4 shadow-md rounded flex flex-col items-center">
                    <img
                      src={`${API}/profileImages/${user.profileImage}`}
                      alt="User"
                      className="h-12 rounded-full cursor-pointer"
                      onClick={() => navigate("/profile")}
                    />
                    <h2 className="text-lg font-bold mb-2">{user.username}</h2>
                    <p className="text-gray-600 mb-4">{user.email}</p>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-full rounded-full" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
               ) : (
                <>
                  <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                    Login
                  </Link>
                  <Link to="/register" className="px-3 py-2 rounded-full text-sm font-medium hover:bg-gray-700 bg-pink-400">
                    Sign Up
                  </Link>
                </>
            )}
          </div>
        </div>
      </div>

      {/* Notification Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          showNotifications ? "translate-x-0" : "translate-x-full"
        }`}
        ref={notificationRef}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-black">Notifications</h2>
          <button onClick={() => setShowNotifications(false)} className="text-gray-600 hover:text-black">
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          {notificationData.map((notification) => (
            <div key={notification.id} className="p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-700">{notification.title}</p>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
