import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import NomadAtlasLogo from "./NomadAtlasLogo";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../redux/authSlice";
import NomadAtlasLoader from "../components/Home/NomadAtlasLoader";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);
console.log(user)
  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

  const navClasses =
    isHome && !scrolled
      ? "fixed top-0 z-50 left-0 w-full bg-gradient-to-b from-black/60 via-black/20 to-transparent text-white"
      : "fixed top-0 z-50 left-0 w-full backdrop-blur-lg bg-white/90 shadow-md  text-gray-900";

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <>
      <nav
        className={`px-5 lg:px-10 md:px-8 py-3 flex items-center justify-between z-50 transition-all duration-300 ${navClasses}`}
      >
        {/* Left - Logo */}
        <NomadAtlasLogo />

        {/* Desktop Menu */}
        
          <div className="hidden md:flex gap-6 font-medium">
            {/* Your existing desktop links */}
            <NavLink to="/destinations" className="hover:text-[#11c3c0] transition">
              Destinations
            </NavLink>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#11c3c0] transition"
              >
                Explore
                {isDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white/80  shadow-lg rounded-md flex flex-col py-2 z-50">
                  {/* <NavLink
                    to="/dashboard"
                    className="px-4 py-2 hover:bg-yellow-50 hover:text-orange-500"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </NavLink> */}

                  <NavLink
                    to="/cost-calculator"
                    className="px-4 py-2 hover:bg-[#e0efef] hover:text-[#158e8c]"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Cost Calculator
                  </NavLink>
                  <NavLink
                    to="/comparison"
                    className="px-4 py-2 hover:bg-blue-50 hover:text-[rgb(62,161,241)]"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Comparison
                  </NavLink>
                  
                  <NavLink
                    to="/services"
                    className="px-4 py-2 hover:bg-[#e0efef] hover:text-[#158e8c]"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Services
                  </NavLink>
                 <NavLink
                    to="/community"
                    className="px-4 py-2 hover:bg-blue-50 hover:text-[rgb(62,161,241)]"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Community
                  </NavLink>
                  <NavLink
                    to="/time-zone-converter"
                    className="px-4 py-2 hover:bg-[#e0efef] hover:text-[#158e8c]"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                   Time Zone Converter
                  </NavLink>
                  <NavLink
                    to="/internet-speed"
                    className="px-4 py-2 hover:bg-[#e0efef] hover:text-[#158e8c]"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                   Internet Speed
                  </NavLink>


                </div>
              )}
            </div>

          
            <NavLink to="/resources" className="hover:text-[#11c3c0] transition">
              Resources
            </NavLink>
            <NavLink to="/blogs" className="hover:text-[#11c3c0] transition">
              Blogs
            </NavLink>

            <NavLink to="/dashboard" className="hover:text-[#11c3c0] transition">
              Dashboard
            </NavLink>
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-6">
            {loading ? (
              <p>Loading...</p>
            ) : user ? (
              <>
                <div
                  className="relative group cursor-pointer"
                  onClick={() => navigate("/dashboard")}
                >
                  <img
                    src={user.photoURL || "https://i.ibb.co/YPXktqs/avatar.png"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#11c3c0]"
                  />
                  <span className="absolute left-1/2 -translate-x-1/2 bg-white text-black text-sm rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
                    {user.displayName || "User"}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-[#11c3c0] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#11a19e] transition"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>

                <Link
                  to="/login"
                  className="bg-[#11c3c0] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#11a19e] transition"
                >
                  Log In
                </Link>

                  <Link
                  to="/register"
                  className="bg-[#3ea1f1] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#2f7bb9] transition"
                >
                  Get Started
                </Link>              
              </>
            )}
          </div>
        

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

     {/* ✅ MOBILE DRAWER UPDATE */}
       {isOpen && (
       <div className="absolute top-14 left-0 w-full bg-black/90 text-white shadow-md flex flex-col md:hidden">
    {/* === Drawer Header with Profile === */}
    {user && !loading ? (
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
        {/* Profile image & name */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            navigate("/dashboard");
            setIsOpen(false);
          }}
        >
          <img
            src={user.photoURL || "https://i.ibb.co/YPXktqs/avatar.png"}
            alt="User Avatar"
            className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.displayName || "User"}</span>
            <span className="text-xs text-gray-300">Go to Dashboard</span>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={() => {
            handleLogout();
            setIsOpen(false);
          }}
          className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-semibold hover:bg-yellow-300 transition text-sm"
        >
          Log Out
        </button>
      </div>
    ) : (
      !loading && (
        <div className="flex justify-end items-center gap-2 px-6 py-3 border-b border-white/20">
          <Link
            to="/register"
            className="bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm font-semibold hover:bg-yellow-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-gray-200 text-gray-900 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Log In
          </Link>
        </div>
      )
    )}

    {/* === Drawer Links === */}
    <div className="flex flex-col items-start space-y-4 py-6 px-8">
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
      <NavLink to="/internet-speed" onClick={() => setIsOpen(false)}>
        Internet Speed
      </NavLink>
      <NavLink to="/resources" onClick={() => setIsOpen(false)}>
        Resources
      </NavLink>
      <NavLink to="/blogs" onClick={() => setIsOpen(false)}>
        Blogs
      </NavLink>
    </div>
  </div>
)}

      </nav>

      {!isHome && <div className="h-[50px] md:h-[60px]"></div>}
    </>
  );
};

export default Navbar;