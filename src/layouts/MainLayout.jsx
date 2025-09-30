import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Header/Navbar";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div>
      <ToastContainer position='top-right' autoClose={2500}></ToastContainer>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
