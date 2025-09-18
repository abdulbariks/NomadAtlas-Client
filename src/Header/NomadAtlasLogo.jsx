import React from "react";
import Lottie from "lottie-react";
import { Link } from "react-router";
import logo from "../assets/Logo/NomadLogo.png";

const NomadAtlasLogo = () => {
  return (
    <Link to="/">
      <div className="flex gap-1 items-center">
        {/* Lottie Animation */}

        {/* <Lottie
            animationData={logo}
            loop={true}
            className="size-10 md:size-14 "  
            >     
          
            </Lottie> */}

        {/* Logo */}

        <img src={logo} alt="logo" className="size-5" />

        {/* Text */}
        <h2 className=" text-md md:text-xl font-extrabold   text-gray-900">
          NomadAtlas
        </h2>
      </div>
    </Link>
  );
};

export default NomadAtlasLogo;
