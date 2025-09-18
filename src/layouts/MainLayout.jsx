import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <h2>MainLayout</h2>
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
