import React from "react";
import foodhero from "../assets/foodhero.png";
import Restaurant from "../SubMenu/Restaurant";
import LunchwithStar from "../SubMenu/LunchwithStar";
import StreetFood from "../SubMenu/StreetFood";
import Navbar from "../Pages/Navbar";
import Footer from "../Pages/Footer";
import Domestic from "../Pages/Domestic";
function Food() {
  return (
    <div className="mx-auto">
      <Navbar />
      <div className="hero min-h mt-2 bg-cover bg-center mb-2">
        <img
          src={foodhero}
          alt=""
          className="w-full h-300 object-cover bg-cover"
        />
      </div>
      <div className="text-2xl font-bold mx-5 -mb-4">Recent Posts</div>
      <Domestic />
      <Restaurant />
      <StreetFood />
      <LunchwithStar />
      <LunchwithStar />
      <LunchwithStar />
      <Footer />
    </div>
  );
}

export default Food;
