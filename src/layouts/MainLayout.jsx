import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
