import React from "react";
import { Link } from "react-router";
import NomadAtlasLogo from "../../Header/NomadAtlasLogo";

const ForbiddenPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center  text-center p-6">
            {/* Logo */}
           

            {/* Error Code */}
            <h1 className="text-7xl md:text-9xl font-extrabold bg-gradient-to-tr from-cyan-500 to-cyan-400 bg-clip-text text-transparent mt-8">
                403
            </h1>

            {/* Message */}
            <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-lg">
                Access Denied — You don’t have permission to view this page.
            </p>

            {/* Back to Home Button */}
            <Link
                   to="/"
                   className="mt-8 inline-block bg-[#11c3c0] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-[#0fa9a6] transition-all duration-300"
                 >
                   Go Back Home
                 </Link>
           

            {/* Decorative Lock Icon */}
            <div className="mt-12 text-blue-400 animate-pulse">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 11V7a4 4 0 00-8 0v4M6 11v8a2 2 0 002 2h8a2 2 0 002-2v-8H6z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default ForbiddenPage;
