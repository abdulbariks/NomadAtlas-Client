import React from "react";
import { Link } from "react-router";
import logo from "../assets/Logo/NLogo2.png";

const NomadAtlasLogo = () => {
  return (
    <Link to="/" className="group">
      <div className="flex gap-2 items-center">
        {/* Logo */}
        <div className="  group-hover:scale-110 transition-transform duration-300">
          <img src={logo} alt="NomadAtlas Logo" className="w-7 h-6 md:w-7 md:h-7 " />
        </div>
       

       
        {/* Text */}
        <h2 className="text-md md:text-xl font-extrabold bg-[#11c3c0] bg-clip-text text-transparent  transition-colors duration-300">
          NA
        </h2> </div>
   
    </Link>
  );
};
export default NomadAtlasLogo;