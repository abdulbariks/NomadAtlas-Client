import React from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <h2>MainLayout</h2>
      <Outlet />
    </div>
  );
};

export default MainLayout;
