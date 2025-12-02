import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Header/Navbar";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import Header from "../Header/Header";

const MainLayout = () => {
  return (
    <div className="bg-[#edf7f7] ">
      <div className="relative ">
        <ToastContainer position="top-right" autoClose={2500} />
        <Header/>
      
        <Outlet />
        
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
