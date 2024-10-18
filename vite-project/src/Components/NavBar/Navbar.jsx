import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
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
    <nav className="bg-purple-700  w-full z-20 top-0 shadow-lg">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <a href="/" className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-12 w-12 rounded-full shadow-lg"
            alt="Logo"
          />
          <span className="text-3xl font-extrabold text-white">MyShop</span>
        </a>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-10`}
          id="navbar-menu"
        >
          <ul className="flex flex-col md:flex-row md:space-x-10 mt-4 md:mt-0">
            {["Home", "About", "Products", "Add Products"].map((text, idx) => (
              <li key={idx}>
                <NavLink
                  to={`/${text.toLowerCase().replace(" ", "")}`}
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded-lg ${
                      isActive ? "text-black font-bold" : "text-white"
                    } hover:text-yellow-300 hover:bg-white hover:bg-opacity-20 transition-colors duration-300`
                  }
                >
                  {text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* User Actions */}
        <div className="flex space-x-4 items-center">
          {/* User Icon / Image */}
          <div
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-white cursor-pointer"
            onClick={() => navigate("/user")}
          >
            <img
              src="https://via.placeholder.com/150"
              alt="User"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Log-Out Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="hidden md:inline-block text-white bg-red-500 hover:bg-red-600 shadow-lg rounded-lg text-sm px-5 py-2.5 transition-all duration-300"
          >
            Log Out
          </button>

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
