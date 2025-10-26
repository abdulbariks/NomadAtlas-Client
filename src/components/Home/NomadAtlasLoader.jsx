import React from "react";
import logo from "../../assets/Logo/NLogo2.png";

const NomadAtlasLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {/* Rotating Logo */}
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-500 to-yellow-400 shadow-md animate-spin">
                <img src={logo} alt="Loading..." className="w-full h-full object-contain" />
            </div>

            {/* Loading Text */}
            <p className="mt-4 text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-500 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                Loading...
            </p>
        </div>
    );
};


export default NomadAtlasLoader;
