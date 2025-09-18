import React, { useState } from "react";
import { Link } from "react-router";
import NomadAtlasLogo from "./NomadAtlasLogo";
import { Menu, X } from "lucide-react"; // hamburger & close icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-base-100 shadow-sm px-6 lg:px-12 py-2 flex items-center justify-between sticky top-0 left-0 z-50">
      {/* Left - Logo */}
      <NomadAtlasLogo />

      {/* Center - Links (Desktop) */}

      <div className="flex justify-between gap-5 items-center">
      <div className="hidden md:flex gap-6 text-gray-700 font-medium">
        <Link to="/destinations" className="hover:text-blue-600">
          Destinations
        </Link>
        <Link to="/cost-calculator" className="hover:text-blue-600">
          Cost Calculator
        </Link>
        <Link to="/community" className="hover:text-blue-600">
          Community
        </Link>
        <Link to="/resources" className="hover:text-blue-600">
          Resources
        </Link>
      </div>

      {/* Right - Buttons (Desktop) */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          to="/get-started"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Log In
        </Link>
      </div>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-6 md:hidden">
          <Link
            to="/destinations"
            className="hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Destinations
          </Link>
          <Link
            to="/cost-calculator"
            className="hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Cost Calculator
          </Link>
          <Link
            to="/community"
            className="hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Community
          </Link>
          <Link
            to="/resources"
            className="hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Resources
          </Link>

          {/* Buttons in Mobile */}
          <Link
            to="/get-started"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            onClick={() => setIsOpen(false)}
          >
            Log In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
