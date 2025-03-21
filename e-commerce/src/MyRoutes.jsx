import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import Layout from "./page/Layout";
import Register from "./page/Register";
import EmailVerification from "./page/EmailVerification";
import Profile from "./page/Profile";
import Home from "./page/Home";
import CartPage from "./page/Cart";
import AllProductsPage from "./page/Products";
import CategoryPage from "./page/Category";
import AddCategoryForm from "./page/AdminPage/AddCategoryForm";
import AddProductForm from "./page/AdminPage/AddProductForm";
import CheckoutPage from "./page/CheckoutPage";
import AdminDashboard from "./page/AdminPage/Dashboard";

const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/category/:id" element={<AllProductsPage />} />
          </Route>
          <Route path="/verifyuser/:token" element={<EmailVerification />} />
          <Route path="/admin/addcategory" element={<AddCategoryForm />} />
          <Route path="/admin/addproduct" element={<AddProductForm />} />
          <Route path="/admin/" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MyRoutes;
