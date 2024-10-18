import React, { useEffect } from "react";
import Layout from "../../../Components/Layout/Layout";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import AddProductModal from "../../../Components/Model-All/AddProduct/AddProductModel";
import { handleError, handleSuccess } from "../../../Toastify/Toastify";
import { ToastContainer, toast } from "react-toastify";
import UpdateProductModel from "../../../Components/Model-All/UpdateProduct/UpdateProductModoel";
import Swal from "sweetalert2";

const AddProducts = () => {
  const [products1, setproducts1] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:3000/product/getall";
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

  const [modelShow, setmodelShow] = useState(false);
  console.log(modelShow);

  const handleAddProductOpen = () => setmodelShow(true);
  const handleAddProductClose = () => setmodelShow(false);

  const addProduct = async (values) => {
    console.log("add", values);
    console.log("err", values.productimage);
    const formData = new FormData();

    // Append sizes as an array
    if (Array.isArray(values.size)) {
      values.size.forEach((size) => formData.append("size[]", size));
    } else {
      formData.append("size[]", values.size);
    }
    formData.append("title", values.title);
    formData.append("price", values.price);
    formData.append("desc", values.desc);
    formData.append("category", values.category);
    if (values.productimage && values.productimage.length > 0) {
      Array.from(values.productimage).forEach((file) => {
        formData.append("productimage", file);
      });
    } else {
      console.log("No images selected");
    }
    // console.log(":asds", formData);
    // for (const value of formData.values()) {
    //   console.log(value);
    // }

    try {
      // console.log(decoded.id)
      const url = `http://localhost:3000/product/add`;
      const resposne = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("data Updated succesfully", resposne);
      if (resposne.data.success === true) {
        handleSuccess("Product Succesfully SuccessFully");
        setTimeout(() => {
          setmodelShow(false);
          fetchProducts();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      handleError(`Error Occur: ${error.response.data.message}`);
    }
  };

  const [updateModel, setUpdateModel] = useState(false);
  const [productData, setProductData] = useState(null);
  console.log("goingData", productData);

  const handleUpdateProductOpen = (product) => {
    setUpdateModel(true);
    setProductData(product);
  };
  const handleUpdateProductClose = () => {
    setUpdateModel(false);
    setProductData(null);
  };

  const UpdateProduct = async (values) => {
    console.log("Update", values);
    const formData = new FormData();

    // Append sizes as an array
    if (Array.isArray(values.size)) {
      values.size.forEach((size) => formData.append("size[]", size));
    } else {
      formData.append("size[]", values.size);
    }
    formData.append("title", values.title);
    formData.append("price", values.price);
    formData.append("desc", values.desc);
    formData.append("stock", values.stock);
    if (values.productimage && values.productimage.length > 0) {
      Array.from(values.productimage).forEach((file) => {
        formData.append("productimage", file);
      });
    } else {
      console.log("No images selected");
    }
    // console.log(":asds", formData);

    try {
      // console.log(decoded.id)
      const url = `http://localhost:3000/product/update/${values.userId}`;
      const resposne = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("data Updated succesfully", resposne);
      if (resposne.data.success === true) {
        handleSuccess("Product Updated Succesfully SuccessFully");
        setTimeout(() => {
          setUpdateModel(false);
          fetchProducts();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      handleError(`Error Occur: ${error.response.data.message}`);
    }
  };

  const [getDelProductID, setgetDelProduct] = useState();
  console.log(getDelProductID);
  const handleDelButton = (product) => {
    setgetDelProduct(product.userId);
    console.log(product);
  };

  const delProduct = async (product) => {
    const id = product.userId;
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this product",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete!",
      });

      // If the user confirmed, proceed with the delete request
      if (result.isConfirmed) {
        const url = `http://localhost:3000/product/delproduct/${id}`;
        const response = await axios.delete(url);

        // Check if the delete request was successful
        if (response) {
          Swal.fire({
            title: "Deleted",
            text: "Your product has been deleted",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          fetchProducts();
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to delete the product",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while deleting the product",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchProducts();
    delProduct();
  }, []);
  return (
    <>
      <Layout>
        <div className="p-24">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3">
              <div className="relative flex flex-col min-w-0 mb-6 bg-white rounded-2xl shadow-xl dark:bg-slate-850 dark:shadow-dark-xl">
                <div className="p-6 pb-0 mb-0 rounded-t-2xl flex justify-between items-center">
                  <h6 className="dark:text-black">Products Table</h6>
                  <button
                    onClick={handleAddProductOpen}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Add Product
                  </button>
                </div>
                <div className="flex-auto px-0 pt-0 pb-2">
                  <div className="overflow-y-auto">
                    <table className="w-full mb-0 text-slate-500">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xxs font-bold uppercase opacity-70 text-slate-400 dark:text-black">
                            Product
                          </th>
                          <th className="px-6 py-3 text-left text-xxs font-bold uppercase opacity-70 text-slate-400 dark:text-black">
                            Description
                          </th>
                          <th className="px-6 py-3 text-center text-xxs font-bold uppercase opacity-70 text-slate-400 dark:text-black">
                            Price
                          </th>
                          <th className="px-6 py-3 text-center text-xxs font-bold uppercase opacity-70 text-slate-400 dark:text-black">
                            Stock
                          </th>
                          <th className="px-6 py-3 text-center text-xxs font-bold uppercase opacity-70 text-slate-400 dark:text-black">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td colSpan="5" className="text-center p-4">
                              <div className="flex justify-center items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 mr-3"></div>
                                <span className="text-sm font-medium text-gray-500">
                                  Loading...
                                </span>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          products1.map((product, index) => (
                            <tr key={index}>
                              <td className="p-2 bg-transparent border-b dark:border-white/40">
                                <div className="flex px-2 py-1">
                                  <img
                                    src={product.imgPath[0]}
                                    className="h-9 w-9 mr-4 rounded-xl"
                                    alt={`product${index}`}
                                  />
                                  <div className="flex flex-col justify-center">
                                    <h6 className="text-sm dark:text-black">
                                      {product.title}
                                    </h6>
                                    <p className="text-xs text-slate-400 dark:text-black">
                                      {product.category}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-2 bg-transparent border-b dark:border-white/40">
                                <p className="text-xs font-semibold dark:text-black">
                                  {product.desc}
                                </p>
                              </td>
                              <td className="p-2 text-center bg-transparent border-b dark:border-white/40">
                                <span className="text-xs font-bold text-black">
                                  ₹{product.price}
                                </span>
                              </td>
                              <td className="p-2 text-center bg-transparent border-b dark:border-white/40">
                                <span
                                  className={`px-3 py-1.5 text-xs font-semibold rounded-full shadow-md ${
                                    product.status === "Available"
                                      ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                                      : "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
                                  } transition-all duration-300`}
                                >
                                  {product.stock}
                                </span>
                              </td>
                              <td className="p-2 bg-transparent border-b dark:border-white/40 text-center">
                                <div className="flex justify-center space-x-2">
                                  <button
                                    onClick={() =>
                                      handleUpdateProductOpen(product)
                                    }
                                  >
                                    <FaEdit
                                      size={20}
                                      className="cursor-pointer hover:text-blue-500"
                                    />
                                  </button>
                                  <button onClick={() => delProduct(product)}>
                                    <MdDelete
                                      size={20}
                                      className="cursor-pointer hover:text-red-500"
                                    />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {modelShow && (
          <AddProductModal
            onClose={handleAddProductClose}
            onSave={addProduct}
          />
        )}
        {updateModel && (
          <UpdateProductModel
            product={productData}
            onClose={handleUpdateProductClose}
            onSave={UpdateProduct}
          />
        )}

        <ToastContainer />
      </Layout>
    </>
  );
};

export default AddProducts;
