import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="loader">
        <div className="inner-circle"></div>
        <div className="outer-circle"></div>
      </div>
    </div>
  );
};

export default Loader;
