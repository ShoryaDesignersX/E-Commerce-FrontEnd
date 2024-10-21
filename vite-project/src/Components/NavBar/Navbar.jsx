import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaCartPlus, FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("jwttoken");
        Swal.fire({
          title: "Logged out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    });
  };

  return (
    <nav className="bg-purple-800 w-full shadow-lg">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3">
          
          <span className="text-3xl font-extrabold text-white">E-Commerce</span>
        </Link>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-10`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-5 mt-4 md:mt-0">
            {["Home", "About", "Products", "Contact"].map((text, idx) => (
              <li key={idx}>
                <NavLink
                  to={`/${text.toLowerCase()}`}
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded-lg ${
                      isActive ? "text-black font-bold" : "text-white"
                    } hover:text-black hover:bg-white hover:bg-opacity-20 transition-colors duration-300`
                  }
                >
                  {text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <Link to="/cart" className="text-white hover:text-black">
            <FaCartPlus className="w-6 h-6" />
          </Link>
          {/* Wishlist Icon */}
          <Link to="/wishlist" className="text-white hover:text-black">
            <FaHeart className="w-6 h-6" />
          </Link>
          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-white"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white cursor-pointer">
                <img
                  src="https://via.placeholder.com/150"
                  alt="User"
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="hidden md:inline">Profile</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                <ul className="py-2">
                  <li>
                    <Link
                      to="/user"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      User Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/addproducts"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Add Product
                    </Link>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
