import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import NomadAtlasLogo from "./NomadAtlasLogo";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../components/feature/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Is homepage?
  const isHome = location.pathname === "/";

  // Navbar style logic (fixed instead of sticky)
  const navClasses =
    isHome && !scrolled
      ? "fixed top-0 z-50 left-0  w-full bg-gradient-to-b from-black/60 via-black/20 to-transparent text-white"
      : "fixed top-0 z-50 left-0 w-full bg-white shadow-md text-gray-900";

  // Desktop Links
  const links = (
    <>
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-1 hover:text-yellow-500 transition"
        >
          Explore
          {isDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {isDropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md flex flex-col py-2 z-50">
            <NavLink
              to="/destinations"
              className="px-4 py-2 hover:bg-blue-50 hover:text-blue-700"
              onClick={() => setIsDropdownOpen(false)}
            >
              Destinations
            </NavLink>
            <NavLink
              to="/cost-calculator"
              className="px-4 py-2 hover:bg-yellow-50 hover:text-orange-500"
              onClick={() => setIsDropdownOpen(false)}
            >
              Cost Calculator
            </NavLink>
            <NavLink
              to="/comparison"
              className="px-4 py-2 hover:bg-blue-50 hover:text-blue-700"
              onClick={() => setIsDropdownOpen(false)}
            >
              Comparison
            </NavLink>
          </div>
        )}
      </div>

      <NavLink to="/community" className="hover:text-yellow-500 transition">
        Community
      </NavLink>
      <NavLink to="/resources" className="hover:text-yellow-500 transition">
        Resources
      </NavLink>
      <NavLink to="/blogs" className="hover:text-yellow-500 transition">
        Blogs
      </NavLink>
    </>
  );

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <nav
      className={`px-5 lg:px-20 md:px-10 py-4 flex items-center justify-between z-50 transition-all duration-300 ${navClasses}`}
    >
      {/* Left - Logo */}
      <NomadAtlasLogo />

      {/* Desktop Menu */}
      <div className="flex justify-between gap-5 items-center">
        <div className="hidden md:flex gap-6 font-medium">{links}</div>

        <div className="hidden md:flex items-center gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <>
              <span>Hi, {user.displayName || "User"}</span>
              <button
                onClick={handleLogout}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-blue-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-blue-300 transition"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-black/90 text-white shadow-md flex flex-col items-center space-y-4 py-6 md:hidden">
          <NavLink to="/destinations" onClick={() => setIsOpen(false)}>
            Destinations
          </NavLink>
          <NavLink to="/cost-calculator" onClick={() => setIsOpen(false)}>
            Cost Calculator
          </NavLink>
          <NavLink to="/comparison" onClick={() => setIsOpen(false)}>
            Comparison
          </NavLink>
          <NavLink to="/community" onClick={() => setIsOpen(false)}>
            Community
          </NavLink>
          <NavLink to="/resources" onClick={() => setIsOpen(false)}>
            Resources
          </NavLink>
          <NavLink to="/blogs" onClick={() => setIsOpen(false)}>
            Blogs
          </NavLink>

          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <>
              <span>Hi, {user.displayName || "User"}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-yellow-400 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
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

export default Navbar;
