import React, { useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { apiUrl } from "../../url/apiUrl";
import { FaTh, FaList } from "react-icons/fa"; // Importing List and Grid icons
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Products = () => {
  const [products1, setproducts1] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]); // Initial range values

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const [view, setView] = useState("grid"); // Default view is 'grid'
  console.log(view);

  const toggleView = () => {
    setView((prevView) => (prevView === "grid" ? "list" : "grid"));
  };

  // Categories
  const uniqueCategories = [
    ...new Set(products1.map((product) => product.category)),
  ];

  const [filtered, setfiltered] = useState([]);
  console.log("filtered", filtered);
  const handleCheck = (value) => {
    console.log(value);
    setfiltered((prev) => {
      if (prev.includes(value)) {
        return prev.filter((category) => category !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log("final", filteredProducts);

  const currentProducts = filteredProducts.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  console.log("current", currentProducts);

  useEffect(() => {
    const newFilteredProducts = products1.filter((product) => {
      const matchesCategory =
        filtered.length === 0 || filtered.includes(product.category);
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });
    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1);
  }, [filtered, priceRange, products1]);

  const handleReset = () => {
    setfiltered([]);
    setPriceRange([0, 100000]);
  };

  const fetchProducts = async () => {
    try {
      const url = `${apiUrl}/product/getall`;
      const response = await axios.get(url);
      // console.log(response);
      if (response.data) {
        setIsLoading(false);
        setproducts1(response.data.Products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [singleProduct, setsingleProduct] = useState(null);

  const handleProduct = (product) => {
    setsingleProduct(product);
  };

  useEffect(() => {
    setIsLoading(true);

    fetchProducts();
  }, []);

  return (
    <>
      <Layout>
        <div className="flex">
          <div className=" mx-10 mr-0 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="mb-6">
              <h1 className="text-lg font-bold mb-2">Category</h1>
              <div className="flex flex-col">
                {uniqueCategories.map((value, index) => (
                  <label key={index} className="flex items-center mb-2">
                    <input
                      onChange={() => handleCheck(value)}
                      name="category"
                      checked={filtered.includes(value)}
                      // value={filtered}
                      type="checkbox"
                      className="mr-2"
                    />{" "}
                    {value}
                  </label>
                ))}
              </div>
            </div>
            {/* Size  */}

            {/* Price  */}
            <div className="mb-6">
              <h1 className="text-lg font-bold mb-2">Price</h1>
              <RangeSlider
                min={0}
                max={100000} // Adjust according to your data
                step={1000}
                value={priceRange}
                onInput={(value) => setPriceRange(value)}
                className="w-48 " // Adjust the width as needed
              />
              <p className="mt-2 text-sm text-gray-500">
                Price: ₹{priceRange[0]} - ₹{priceRange[1]}
              </p>
            </div>

            <button onClick={handleReset}>Reset</button>

            {/* List Grid Button */}
          </div>

          {/* Products Section */}
          <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="flex justify-between">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Our Products
                </h2>
                <div>
                  <button
                    className="flex items-center bg-purple-800 text-white px-3 py-2 rounded-md hover:bg-purple-600 transition duration-200"
                    onClick={toggleView}
                  >
                    {view === "list" ? <FaList /> : <FaTh />}
                  </button>
                </div>
              </div>
              <div>
                <Pagination
                  count={Math.ceil(filteredProducts.length / recordsPerPage)} // Total pages based on filtered products
                  page={currentPage}
                  onChange={(event, value) => setCurrentPage(value)} // Update currentPage on change
                  shape="rounded"
                  sx={{
                    "& .Mui-selected": {
                      backgroundColor: "#6B21A8", // purple-800 color hex code
                      color: "#fff",
                    },
                    "& .MuiPaginationItem-root:hover": {
                      backgroundColor: "#6B21A8", // Apply hover color
                      color: "white",
                    },
                  }}
                />
              </div>
            </div>

            {/* Conditional rendering based on the view */}
            {view === "grid" ? (
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {isLoading ? (
                  <div className="col-span-full flex justify-center items-center">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
                      <p className="text-sm font-medium text-gray-500">
                        Loading...
                      </p>
                    </div>
                  </div>
                ) : (
                  currentProducts.map((product, index) => {
                    const isUnavailable = product.stock === "Unavailable"; // Check if stock is unavailable

                    return (
                      <div
                        key={index}
                        className={`group relative shadow-2xl transition-transform duration-300 ${
                          isUnavailable
                            ? "opacity-50 cursor-not-allowed "
                            : "hover:scale-105"
                        }`}
                      >
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none">
                          <img
                            src={product.imgPath[0]}
                            alt={`Front of ${product.title}`}
                            className="h-64 w-64 object-cover object-center transition-transform duration-300 group-hover:scale-110"
                          />
                          {isUnavailable && (
                            <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-tr-md rounded-bl-md">
                              Out of Stock
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex flex-col p-4">
                          <h3
                            onClick={() => handleProduct(product)}
                            className={`text-sm text-gray-700 mb-1 transition-colors duration-300 ${
                              isUnavailable
                                ? "cursor-not-allowed"
                                : "hover:text-blue-600"
                            }`}
                          >
                            <Link
                              to={{
                                pathname: "/item",
                              }}
                              state={{ product }}
                              className={
                                isUnavailable ? "cursor-not-allowed" : ""
                              }
                            >
                              <span
                                aria-hidden="true"
                                className="inset-0"
                              ></span>
                              {product.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Category: {product.category}
                          </p>
                          <div className="mt-2 flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-900">
                              ₹{product.price}
                            </p>
                            <button
                              className={`bg-purple-800 text-white px-2 py-1 rounded-md hover:bg-purple-600 transition-colors duration-300 ${
                                isUnavailable
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              disabled={isUnavailable} // Disable button if stock is unavailable
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              // List view
              <div className="mt-6">
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
                      <p className="text-sm font-medium text-gray-500">
                        Loading...
                      </p>
                    </div>
                  </div>
                ) : (
                  currentProducts.map((product, index) => {
                    const isUnavailable = product.stock === "Unavailable"; // Check if stock is unavailable

                    return (
                      <div className="w-full">
                        <div
                          className={`flex items-start border bg-white border-gray-300 p-4 rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105 ${
                            isUnavailable
                              ? "opacity-50 pointer-events-none cursor-not-allowed"
                              : "hover:scale-105"
                          }`}
                        >
                          <img
                            src={product.imgPath}
                            alt={product.title}
                            className="w-32 h-32 object-cover rounded-lg mr-4"
                          />
                          {isUnavailable && (
                            <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-tr-md rounded-bl-md">
                              Out of Stock
                            </div>
                          )}
                          <div className="flex-1">
                            <h2
                              className={`text-xl font-semibold ${
                                isUnavailable
                                  ? "cursor-not-allowed"
                                  : "hover:text-blue-600"
                              }`}
                            >
                              <Link
                                to={{
                                  pathname: "/item",
                                }}
                                state={{ product }}
                                className={
                                  isUnavailable ? "cursor-not-allowed" : ""
                                }
                              >
                                {product.title}
                              </Link>
                            </h2>
                            <p className="text-gray-600 my-2">{product.desc}</p>
                            <p className="text-lg font-bold text-green-500">
                              {product.price}
                            </p>
                            <div className="flex justify-end mt-4">
                              <button
                                disabled={isUnavailable}
                                className="px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-600 transition duration-200"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;
