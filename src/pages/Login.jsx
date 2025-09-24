// import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import Animation from "../components/Animation/Animation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { logInUser } from "../components/feature/authSlice";
import { useLocation } from "react-router";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    dispatch(logInUser({ email: data.email, password: data.password }))
      .unwrap()
      .then(async () => {
        // toast.success("Login successful!");
        navigate(location.state || "/");
      })
      .catch(() => {
        // toast.error("Something went wrong");
      });
  };
  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-5 my-5">
      <div className="w-full h-full rounded-md shadow  bg-white mb-1 text-gray-800">
        <Animation></Animation>
      </div>
      <div className="w-full p-4 rounded-md shadow sm:p-8 bg-white mb-1 text-gray-800">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Login to Your Account
        </h2>
        <p className="text-sm text-center text-gray-600">
          Don't have Account?
          <Link to={"/register"} className="focus:underline hover:underline">
            {" "}
            Register Here
          </Link>
        </p>
        <div className="my-6 space-y-4">
          <button
            aria-label="Login with Google"
            type="button"
            className="flex cursor-pointer items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-600 focus:dark:ring-violet-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login with Google</p>
          </button>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-gray-600" />
          <p className="px-3 text-gray-600">OR</p>
          <hr className="w-full text-gray-600" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <label className="block text-sm">Name</label>
            <input type="text" {...register('name', { required: true })} placeholder="Enter Your Name" className="" />
            {errors.name?.type === 'required' && <p className="text-red-600 text-sm mt-1">Please enter your name</p>}
          </div>

          <div>
            <label className="block text-sm">Email</label>
            <input type="email" {...register('email', { required: true })} placeholder="Enter Your Email" className="" />
            {errors.email?.type === 'required' && <p className="text-red-600 text-sm mt-1">Email is required</p>}
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input type="password" {...register('password', { required: true })} placeholder="Enter Your password" className="" />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Enter your password</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6+ characters</p>
            )}
          </div>
          <button className=" px-8 py-3 font-semibold rounded-md bg-[#37b6f5] text-gray-50">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
