import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Header/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
