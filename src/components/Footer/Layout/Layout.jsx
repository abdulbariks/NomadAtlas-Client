import React from "react";

import Newsletter from "../../Home/Newsletter";
import Footer from "../Footer";


const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-gray-50">
      <main className="flex-grow">{children}</main>

      {/* Newsletter floating above footer */}
      <div className="absolute left-0 right-0 bottom-[260px] flex justify-center">
        <Newsletter/>
      </div>

      {/* Keep your existing footer design */}
     <Footer/>
    </div>
  );
};

export default Layout;
