import React from "react";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { handleError, handleSuccess } from "../../Toastify/Toastify";

function SignUp() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    gender: "",
    mobile: "",
    email: "",
    password: "",
    image: null,
  };
  console.log(initialValues);

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Name is required"),
    gender: Yup.string().required("Gender Required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits") // Ensures the mobile number has exactly 10 digits
      .required("Mobile number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const onSubmit = async (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("gender", values.gender);
    formData.append("mobile", parseInt(values.mobile));
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("image", values.image);
    console.log(":asds", formData);
    try {
      const url = "http://localhost:3000/user/SignUp";
      const resposne = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("data send succesfully", resposne);
      if (resposne.data.success === true) {
        handleSuccess("SignUp SuccessFully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      handleError(`Error Occur: ${error.response.data.message}`);
    }
  };

  return (
    <section id="SignUp">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen m-20 mt-10">
        {/* Left Side - Image */}
        <motion.div
          className="relative rounded-2xl hidden lg:flex items-center justify-center bg-cover"
          style={{
            backgroundImage:
              "url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-ill.jpg')",
          }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr rounded-2xl from-blue-500  opacity-60"></div>
          <div className="z-20 mx-14 text-center text-white p-6">
            <h4 className="mt-5 font-bold text-2xl mb-3">"Join us today!"</h4>
            <p>
              Create an account and start your journey with us. It's quick and
              easy!
            </p>
          </div>
        </motion.div>

        {/* Right Side - Sign Up Form */}
        <motion.div
          className="flex items-center justify-center p-6 bg-white"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex w-full items-center justify-center p-6 bg-white">
            <div className="w-full max-w-md">
              <div className="bg-transparent rounded-2xl shadow-md">
                <div className="p-6 pb-0">
                  <h4 className="font-bold text-xl">Sign Up</h4>
                  <p className="text-gray-600">
                    Fill in the details to create your account
                  </p>
                </div>
                <div className="p-6">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {({ setFieldValue }) => (
                      <Form>
                        <div className="mb-5">
                          <Field
                            name="name"
                            type="text"
                            placeholder="Full Name"
                            className="block w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <ErrorMessage
                            name="name"
                            component="small"
                            className="text-red-500 absolute "
                          />
                        </div>
                        <div className="mb-5">
                          <Field
                            as="select"
                            name="gender"
                            className="block w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </Field>
                          <ErrorMessage
                            name="gender"
                            component="small"
                            className="text-red-500 absolute "
                          />
                        </div>
                        <div className="mb-5">
                          <Field
                            name="mobile"
                            type="phone"
                            placeholder="Mobile Number"
                            className="block w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <ErrorMessage
                            name="mobile"
                            component="small"
                            className="text-red-500 absolute "
                          />
                        </div>
                        <div className="mb-5">
                          <Field
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="block w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <ErrorMessage
                            name="email"
                            component="small"
                            className="text-red-500 absolute "
                          />
                        </div>
                        <div className="mb-5">
                          <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="block w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <ErrorMessage
                            name="password"
                            component="small"
                            className="text-red-500 absolute "
                          />
                        </div>
                        {/* Profile Photo Upload */}
                        <div className="mb-5">
                          <label className="block mb-2 text-gray-700 font-medium">
                            Profile Picture
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              console.log(event.target.files[0]);
                              setFieldValue("image", event.target.files[0]);
                            }}
                            name="image"
                            className="block w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <ErrorMessage
                            name="image"
                            component="small"
                            className="text-red-500 absolute "
                          />
                        </div>
                        {/* btn */}
                        <div className="text-center">
                          <button
                            type="submit"
                            className="w-full px-16 py-3.5 mt-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                          >
                            Sign Up
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                  <div className="p-6 text-center border-t">
                    <p className="text-sm">
                      Already have an account?{" "}
                      <Link
                        to={"/login"}
                        className="font-semibold text-blue-500"
                      >
                        Login
                      </Link>
                    </p>
                    <div className="mt-4">
                      <span className="text-gray-500">Or sign up with:</span>
                      <div className="flex justify-center mt-2 space-x-4">
                        <button className="flex items-center justify-center px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
                          <FaGoogle size={24} />
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
                          <FaFacebook size={24} />
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
                          <FaApple size={24} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <ToastContainer />
      </div>
    </section>
  );
}

export default SignUp;
