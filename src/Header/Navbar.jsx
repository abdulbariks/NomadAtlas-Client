import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react"; // hamburger & close icons
import NomadAtlasLogo from "./NomadAtlasLogo";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../components/feature/authSlice";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const links = <>
    <NavLink to="/destinations" className="hover:text-blue-600">
      Destinations
    </NavLink>
    <NavLink to="/cost-calculator" className="hover:text-blue-600">
      Cost Calculator
    </NavLink>
    <NavLink to="/community" className="hover:text-blue-600">
      Community
    </NavLink>
    <NavLink to="/resources" className="hover:text-blue-600">
      Resources
    </NavLink>
    <NavLink to="/comparison" className="hover:text-blue-600">
      Comparison
    </NavLink>
    <NavLink to="/blogs" className="hover:text-blue-600">
      Blogs
    </NavLink>
  </>

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  // const handleLogout = () => dispatch(logoutUser());

  return (
    <nav className="w-full bg-white shadow-sm px-5 lg:px-20 md:px-10 py-3 flex items-center justify-between sticky top-0 left-0 z-50 ">
      {/* Left - Logo */}
      <NomadAtlasLogo />

      <div className="flex justify-between gap-5 items-center">
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          {links}
        </div>

        <div className="hidden md:flex items-center gap-6">
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : user ? (
            <>
              <span className="font-medium text-gray-700">
                Hi, {user.displayName || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
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
            </>
          )}
        </div>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-6 md:hidden">
          {links}


          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : user ? (
            <>
              <span className="font-medium text-gray-700">
                Hi, {user.displayName || "User"}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
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
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
