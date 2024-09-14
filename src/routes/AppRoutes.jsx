import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import ProductPage from "../pages/ProductPage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import AdminPage from "../pages/AdminPage.jsx";

const AppRoutes = () => {
  <Router>
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/shop" Component={ProductPage} />
      <Route path="/checkout" Component={CheckoutPage} />
      <Route path="/profile" Component={ProfilePage} />
      <Route path="/admin" Component={AdminPage} />
    </Routes>
  </Router>;
};

export default AppRoutes;
