import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home"
import AdminHome from "./pages/AdminHome"
import UserHome from "./pages/UserHome"
import AddProduct from "./pages/AddProduct";
import Profile from "./pages/Profile"
import Product from "./pages/Product";
import CartProduct from "./pages/CartProduct";
import OrderProduct from "./pages/OrderProduct";
import AdminProduct from "./pages/AdminProduct";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminhome" element={<AdminHome/>} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/productdetails/:productId" element={<Product />} />
        <Route path="/user/cart" element={<CartProduct />} />
        <Route path="/user/orders" element={<OrderProduct />} />
        <Route path="/admin/myproduct" element={<AdminProduct />} />
        <Route path="/" exact element={<Home />} />

       
      </Routes>
    </BrowserRouter>
  );
}
