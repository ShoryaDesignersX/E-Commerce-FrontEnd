import React from "react";
import Layout from "../../Components/Layout/Layout";
import { FaApple, FaGooglePlay } from "react-icons/fa"; // Importing icons for app download buttons
import { motion } from "framer-motion"; // For animations

const Home = () => {
  return (
    <>
      <Layout>
        <div className=" container max-w-screen-xl">
          {/* Hero Section */}
          <div className="bg-gray-100 py-16">
            <div className="container mx-auto flex flex-col lg:flex-row items-center">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Welcome to Our Store
                </h1>
                <p className="text-lg mb-8">
                  Discover the latest products and amazing deals on our
                  platform.
                </p>
                <div className="flex justify-center lg:justify-start space-x-4">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center">
                    <FaApple className="mr-2" /> App Store
                  </button>
                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center">
                    <FaGooglePlay className="mr-2" /> Google Play
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                <img
                  src="https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Hero Banner"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Featured Products Section */}
          <div className="py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Example Product Card */}
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <img
                    src="https://via.placeholder.com/200"
                    alt="Product"
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <h3 className="text-xl font-semibold mb-2">Product Title</h3>
                  <p className="text-gray-600 mb-2">$29.99</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add to Cart
                  </button>
                </div>
                {/* Repeat Product Cards as needed */}
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="bg-gray-50 py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Shop by Categories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold">Electronics</h3>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold">Clothing</h3>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold">Furniture</h3>
                </div>
                {/* Add more categories as needed */}
              </div>
            </div>
          </div>

          {/* Promotional Section */}
          <div className="bg-blue-600 text-white py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Special Offer!</h2>
              <p className="mb-8">Get 20% off on your first purchase.</p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
