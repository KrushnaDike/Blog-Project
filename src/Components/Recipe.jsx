import React from "react";
import NonVeg from "../SubMenu/NonVeg";
import Navbar from "../Pages/Navbar";
import Veg from "../SubMenu/Veg";
import Footer from "../Pages/Footer";
import Domestic from "../Pages/Domestic";
function Recipe() {
  return (
    <>
      <div className="mx-auto">
        <Navbar />
        <Domestic />
        <Veg />
        <NonVeg />
        <Footer />
      </div>
    </>
  );
}

export default Recipe;
