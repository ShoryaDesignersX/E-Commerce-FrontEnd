import React, { useState } from "react";
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

function Login() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const url = "http://localhost:3000/user/login";
      const resposne = await axios.post(url, values);
      console.log("data send succesfully", resposne);
      if (resposne.data.success === true) {
        console.log("ifffff", resposne.data.success);
        localStorage.setItem("jwttoken", resposne.data.jwt_token);
        handleSuccess("Login SuccessFully");
        setTimeout(() => {
          navigate("/user");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      handleError(`Error Occur: ${error.response.data.message}`);
    }
  };
  return (
    <section id="Login">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen m-20 mt-10">
        {/* Left Side - Sign In Form */}
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
                  <h4 className="font-bold text-xl">Login</h4>
                  <p className="text-gray-600">
                    Enter your email and password to Login
                  </p>
                </div>
                <div className="p-6">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {() => (
                      <Form>
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
                        <div className="mb-1">
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

                        <div className="text-center">
                          <button
                            type="submit"
                            className="w-full px-16 py-3.5 mt-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                          >
                            Sign In
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                  <div className="p-6 text-center border-t">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <Link
                        to={"/signup"}
                        className="font-semibold text-blue-500"
                      >
                        Sign up
                      </Link>
                    </p>
                    <div className="mt-4">
                      <span className="text-gray-500">Or sign in with:</span>
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
        {/* Right Side - Image */}
        <motion.div
          className="relative rounded-2xl hidden lg:flex items-center justify-center bg-cover"
          style={{
            backgroundImage:
              "url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg')",
          }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr rounded-2xl from-blue-500 opacity-60"></div>
          <div className="z-20 mx-14 text-center text-white p-6">
            <h4 className="mt-5 font-bold text-2xl mb-3">"Welcome Back!"</h4>
            <p>Please enter your credentials to access your account.</p>
          </div>
        </motion.div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Login;
