import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import errorAnimation from "../../assets/Lottie/Error 404 Page.json"; // 🧩 Place your Lottie JSON file here


const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white px-6">
      {/* Logo */}
    

      {/* Lottie Animation */}
      <div className="w-80 md:w-96 mt-8">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>

      {/* Error Text */}
    
      <p className="text-lg md:text-xl text-gray-600 mt-3">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Back Home Button */}
      <Link
        to="/"
        className="mt-8 inline-block bg-[#11c3c0] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-[#0fa9a6] transition-all duration-300"
      >
        Go Back Home
      </Link>

      {/* Decorative Arrow (optional) */}
      <div className="mt-10 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mx-auto text-[#11c3c0]"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default Error;
