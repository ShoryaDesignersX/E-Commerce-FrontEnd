import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Navbar from "./Components/NavBar/Navbar";
import Layout from "./Components/Layout/Layout";
import UserProfile from "./Pages/User/UserProfile";
import PublicRoute from "./Routes/PublicRoutes";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import AddProducts from "./Pages/Products/AddProducts/AddProducts";
import Products from "./Pages/Products/Products";
import ProductPage from "./Pages/Products/ProductPage/ProductPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Login />} />
          </Route>
          {/* Protected route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<UserProfile />} />
            <Route path="/addproducts" element={<AddProducts />} />
            <Route path="/products" element={<Products />} />
            <Route path="/item" element={<ProductPage />} />
            <Route path="*" element={<UserProfile />} />
            {/* Fallback route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
