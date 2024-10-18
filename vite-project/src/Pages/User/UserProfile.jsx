import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import UpdateModel from "../../Components/Model-All/UpdateModel/UpdateModel";
import { handleError, handleSuccess } from "../../Toastify/Toastify";
import { ToastContainer, toast } from "react-toastify";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    gender: "",
    email: "",
    mobile: "",
    imgPath: "",
  });
  // console.log(userData.imgPath);
  const token = localStorage.getItem("jwttoken");
  const decoded = jwtDecode(token);

  const fetchUserData = async (req, res) => {
    try {
      const url = `http://localhost:3000/user/DashBoard/${decoded.id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });
      //   console.log(response)
      if (response) {
      }
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const [modelShow, setmodelShow] = useState(false);
  // console.log(modelShow);

  const handleModalShow = () => setmodelShow(true);
  const handleModalClose = () => setmodelShow(false);

  const handleSave = async (values) => {
    // console.log("add", values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("gender", values.gender);
    formData.append("mobile", parseInt(values.mobile));
    formData.append("email", values.email);
    formData.append("image", values.image);
    // console.log(":asds", formData);

    try {
      // console.log(decoded.id)
      const url = `http://localhost:3000/user/updateuser/${decoded.id}`;
      const resposne = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("data Updated succesfully", resposne);
      if (resposne.data.success === true) {
        handleSuccess("Updated Succesfully SuccessFully");
        setTimeout(() => {
          setmodelShow(false);
          fetchUserData();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      handleError(`Error Occur: ${error.response.data.message}`);
    }
  };

  useEffect(() => {
    if (!modelShow) {
      fetchUserData(); // Re-fetch user data when the modal is closed
    }
  }, [modelShow]);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl relative">
          {/* Edit Button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={handleModalShow}
              className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-200 flex items-center"
            >
              <FaUserEdit className="mr-1" />
              Edit
            </button>
          </div>

          <div className="flex items-center">
            {/* User Image */}
            <div className="flex-shrink-0 mr-6">
              <img
                src={userData.imgPath}
                alt={userData.name}
                className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
              />
            </div>

            {/* User Details */}
            <div className="flex-grow">
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                {userData.name}
              </h2>
              <p className="text-gray-600 mb-1">
                <strong>Email:</strong> {userData.email}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Gender:</strong> {userData.gender}
              </p>
              <p className="text-gray-600">
                <strong>Mobile:</strong> {userData.mobile}
              </p>
            </div>
          </div>

          {/* Centered Log Out Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      {modelShow && (
        <UpdateModel
          userData={userData}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
      <ToastContainer />
    </Layout>
  );
};

export default UserProfile;
