import React from "react";
import { Link } from "react-router";
import logo from "../assets/Logo/NomadLogo.png";

const NomadAtlasLogo = () => {
  return (
    <Link to="/" className="group">
      <div className="flex gap-2 items-center">
        {/* Logo */}
        <div className=" bg-gradient-to-tr from-blue-400 to-yellow-400  rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
          <img src={logo} alt="NomadAtlas Logo" className="w-5 h-5 md:w-7 md:h-7 " />
        </div>

        {/* Text */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold bg-blue-400 bg-clip-text text-transparent  transition-colors duration-300">
          Nomad<span className="bg-yellow-400 bg-clip-text text-transparent  transition-colors duration-300">Atlas</span>
        </h2>
      </div>
    </Link>
  );
};

export default NomadAtlasLogo;
