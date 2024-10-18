import React, { useEffect, useState } from "react";
import Layout from "../../../Components/Layout/Layout";
import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const { product } = location.state || {}; // Access the passed product data
  // console.log(product);

  const [currentImage, setCurrentImage] = useState(product.imgPath[0]);

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity(quantity + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Layout>
        <div className="container mx-auto  p-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Side: Image Section */}
            <div className="flex flex-col">
              {/* Main Product Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={currentImage} // Use the current image from state
                  alt="Product"
                  className="w-64 h-64 rounded-lg"
                />
              </div>

              {/* Additional Images Section */}
              <div className="flex space-x-2">
                {product.imgPath.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product Thumbnail ${index + 1}`}
                    className="w-20 h-20 rounded-lg cursor-pointer"
                    onClick={() => setCurrentImage(image)} // Update the current image on click
                  />
                ))}
              </div>
            </div>

            {/* Right Side: Details Section */}
            <div>
              {/* Breadcrumbs */}
              <div className="text-sm text-gray-500 mb-2">
                <a href="#" className="hover:underline">
                  Products
                </a>{" "}
                /{" "}
                <a href="#" className="hover:underline">
                  {product.category}
                </a>
              </div>

              {/* Title and Price */}
              <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
              <div className="flex items-center mb-2">
                <span className="text-2xl font-semibold">₹{product.price}</span>
                <div className="ml-4 text-yellow-500">
                  ⭐⭐⭐⭐☆
                  <span className="ml-2 text-gray-500 text-sm">
                    (1624 reviews)
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4">{product.desc}</p>

              {/*  Size */}
              {["T-Shirt", "Jeans", "Shoes", "Jacket"].includes(
                product.category
              ) && (
                <div className="mb-4">
                  <span className="font-semibold">Size</span>
                  <div className="flex space-x-4 mt-2">
                    {product.size.map((value, index) => (
                      <button
                        key={index}
                        className="border rounded-lg px-3 py-1"
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Quantity Selector */}
              <div className="mb-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleQuantityChange("decrement")}
                    className="border rounded-l-lg px-3 py-1"
                  >
                    -
                  </button>
                  <span className="border-t border-b px-4 py-1">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increment")}
                    className="border rounded-r-lg px-3 py-1"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
                  Add to Cart
                </button>
                <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductDetails;
