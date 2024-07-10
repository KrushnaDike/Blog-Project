import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Breadcrumb from "./Breadcrumb";

const Layout = ({ children }) => {
  return (
    <div className="flex h-full w-full border border-gray-100">
      <div className="w-48">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <div className="h-12">
          <Navbar />
        </div>
        <div className="mt-16 ml-5">
          <Breadcrumb />
        </div>
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
