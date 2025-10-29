import React from "react";
import { Link } from "react-router";
import logo from "../assets/Logo/NLogo2.png";

const NomadAtlasLogo = () => {
  return (
    <Link to="/" className="group">
      <div className="flex gap-2 items-center">
        {/* Logo */}
        <div className="  group-hover:scale-110 transition-transform duration-300">
          <img src={logo} alt="NomadAtlas Logo" className="w-7 h-7 md:w-10 md:h-10 " />
        </div>
       
        
       
        {/* Text */}
        </div>
   
    </Link>
  );
};
export default NomadAtlasLogo;