import React from "react";

// importing components
import Sidebar from "./AdminComponents/Sidebar";
import Navbar from "./AdminComponents/Navbar";
import Dashboard from "./AdminComponents/Dashboard";
import Breadcrumb from "./AdminComponents/Breadcrumb";

const Admin = () => {
  return (
    <>
      <div className="flex h-full w-full border border-gray-100">
        <div className="w-48 ">
          <Sidebar className="" />
        </div>
        <div className="flex flex-col flex-1">
          <div className="h-12 ">
            <Navbar />
          </div>
          <div className="mt-16 ml-5">
            {" "}
            <Breadcrumb />
          </div>
          <div className="flex-1 p-5 bg-white">
            <Dashboard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
