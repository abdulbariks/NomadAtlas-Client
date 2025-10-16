import React from "react";
import { Link } from "react-router";
import logo from "../assets/Logo/NomadLogo.png";

const NomadAtlasLogo = () => {
  return (
    <Link to="/" className="group">
      <div className="flex gap-2 items-center">
        {/* Icon container: subtle teal ring, soft shadow */}
        <div className="rounded-xl p-1 bg-white/40 border border-teal-200 shadow-sm
                        group-hover:scale-105 transition-transform duration-200">
          <img
            src={logo}
            alt="NomadAtlas Logo"
            className="w-6 h-6 md:w-7 md:h-7 block"
          />
        </div>

        {/* Text: neutral 'Nomad' + calm teal 'Atlas' */}
        <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold flex items-center">
          <span className="text-gray-800">Nomad</span>
          <span className="ml-1 text-teal-600">Atlas</span>
        </h2>
      </div>
    </Link>
  );
};

export default NomadAtlasLogo;
