import React, { useState } from 'react';
import NomadAtlasLogo from '../Header/NomadAtlasLogo';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const handleChange = (e) => {
        const value = e.target.value;
        if (value) {
            navigate(value);
        }
    }
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-200 p-4 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                <NomadAtlasLogo />
                <ul className="mt-6 space-y-3">
                    <li>
                        <NavLink to='/dashboard/home'>Home</NavLink>
                    </li>
                    <select onChange={handleChange} className=" space-y-3">
                        <option value="">Role</option>
                        <option value="/dashboard/admin">Admin</option>
                        <option value="/dashboard/provider">Provider</option>
                    </select>
                </ul>
            </div>

            {/* Overlay (mobile) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}></div>
            )}

            {/* Content area */}
            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Navbar */}
                <div className="lg:hidden flex items-center justify-between bg-gray-300 p-3">
                    <button
                        className="p-2 rounded-md hover:bg-gray-400"
                        onClick={() => setIsOpen(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <NomadAtlasLogo />
                </div>

                {/* Page content */}
                <div className="p-4 flex-1 overflow-auto bg-gray-50">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;