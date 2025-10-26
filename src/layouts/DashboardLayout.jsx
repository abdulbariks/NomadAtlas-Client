import React, { useState } from "react";
import NomadAtlasLogo from "../Header/NomadAtlasLogo";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import useRole from "../customHook/useRole";
import { Menu, Home, Calculator, MapPin, CreditCard, FilePlus, Calendar, LogOut, UserCog, CalendarCheck } from "lucide-react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../redux/authSlice";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role, loading } = useRole();
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogout = () => {
    dispatch(logOutUser());
    navigate("/login")
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#f9fafb] to-[#eef6f7]">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64
          bg-gradient-to-br from-[#ffffffcc] via-[#f0f9ffb3] to-[#e0f2f1cc]
          backdrop-blur-xl shadow-lg border-r border-white/30
          p-4 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <NomadAtlasLogo />
        <ul className="mt-6 space-y-3">
          <li className="flex items-center gap-2">
            <Home className="w-5 h-5 text-black" />
            <NavLink
              className={({ isActive }) =>
                `transition font-semibold rounded-lg px-2 py-1 flex-1 ${isActive
                  ? "bg-teal-500 text-white shadow-sm"
                  : "text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                }`
              }
              to="/dashboard/home"
            >
              Home
            </NavLink>
          </li>

          <li className="flex items-center gap-2">
            <FilePlus className="w-5 h-5 text-black" />
            <NavLink
              className={({ isActive }) =>
                `transition font-semibold rounded-lg px-2 py-1 flex-1 ${isActive
                  ? "bg-teal-500 text-white shadow-sm"
                  : "text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                }`
              }
              to="/dashboard/add-resource"
            >
              Add Resource
            </NavLink>
          </li>

          {/* <li className="flex items-center gap-2">
            <UsersRound className="w-5 h-5 text-black" />
            <NavLink
              className={({ isActive }) =>
                `transition font-semibold rounded-lg px-2 py-1 flex-1 ${isActive
                  ? "bg-teal-500 text-white shadow-sm"
                  : "text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                }`
              }
              to="/dashboard/community"
            >
              Community
            </NavLink>
          </li> */}

          <li className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-black" />
            <NavLink
              className={({ isActive }) =>
                `transition font-semibold rounded-lg px-2 py-1 flex-1 ${isActive
                  ? "bg-teal-500 text-white shadow-sm"
                  : "text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                }`
              }
              to="/dashboard/data-of-calculator"
            >
              Cost Calculator CRUD
            </NavLink>
          </li>

          <li className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-black" />
            <NavLink
              className={({ isActive }) =>
                `transition font-semibold rounded-lg px-2 py-1 flex-1 ${isActive
                  ? "bg-teal-500 text-white shadow-sm"
                  : "text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                }`
              }
              to="/dashboard/payment-history"
            >
              Payment History
            </NavLink>
          </li>

          <li className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-black" />
            <NavLink
              className={({ isActive }) =>
                `transition font-semibold rounded-lg px-2 py-1 flex-1 ${isActive
                  ? "bg-teal-500 text-white shadow-sm"
                  : "text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                }`
              }
              to="/dashboard/admin-booking"
            >
              Booked Destinations
            </NavLink>
          </li>
          <li className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-gray-800" />
            <NavLink
              className={({ isActive }) =>
                `transition font-semibold rounded-lg px-2 py-1 flex-1 ${isActive
                  ? "bg-teal-500 text-white shadow-sm"
                  : "text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                }`
              }
              to="/dashboard/add-jobs"
            >
              Add Jobs
            </NavLink>
          </li>

          {!loading && role === "admin" && (
            <>
              <li className="flex items-center gap-2">
                <UserCog className="w-5 h-5 text-black" />
                <NavLink
                  className={({ isActive }) =>
                    `transition font-semibold rounded-lg px-2 py-1 flex-1 ${isActive
                      ? "bg-teal-500 text-white shadow-sm"
                      : "text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                    }`
                  }
                  to="/dashboard/activeUsers"
                >
                  Active Users
                </NavLink>
              </li>

              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-black" />
                <NavLink
                  className={({ isActive }) =>
                    `transition font-semibold rounded-lg px-2 py-1 flex-1 ${isActive
                      ? "bg-teal-500 text-white shadow-sm"
                      : "text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                    }`
                  }
                  to="/dashboard/addDestinations"
                >
                  Add Destinations
                </NavLink>
              </li>
            </>
          )}

          {!loading && role === "provider" && (
            <li className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-black" />
              <NavLink
                className={({ isActive }) =>
                  `transition font-semibold rounded-lg px-2 py-1 flex-1 ${isActive
                    ? "bg-teal-500 text-white shadow-sm"
                    : "text-gray-800 hover:bg-teal-100 hover:text-teal-700"
                  }`
                }
                to="/dashboard/addDestinations"
              >
                Add Destinations
              </NavLink>
            </li>
          )}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <li className="flex items-center gap-2 cursor-pointer list-none">
              <LogOut className="w-5 h-5 text-black" />
              <Link
                onClick={handleLogout}
                className="transition font-semibold rounded-lg px-2 py-1 flex-1 text-left text-gray-800 hover:bg-red-100 hover:text-red-600"
              >
                Logout
              </Link>
            </li>
          </div>
        </ul>


      </div>

      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Content area */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Navbar */}
        <div className="lg:hidden flex items-center justify-between bg-white/80 backdrop-blur-md shadow-sm p-3">
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <NomadAtlasLogo />
        </div>

        {/* Page content */}
        <div className="p-6 flex-1 overflow-auto bg-gradient-to-br from-[#f9fafb] to-[#eef6f7]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
