import React from "react";
import nalphoto from "../assets/NalPhoto.png";
import Navbar from "../Pages/Navbar";
import Category from "../Pages/Category";
import Spiritual from "../SubMenu/Spiritual";
import International from "../SubMenu/International";
import Footer from "../Pages/Footer";
import National from "../SubMenu/National";
import Domestic from "../Pages/Domestic";

function Travel() {
  return (
    <div className="mx-auto">
      <Navbar />
      <div className="hero min-h mt-2 bg-cover bg-center">
        <img
          src={nalphoto}
          alt=""
          className="w-full h-300 object-cover bg-cover"
        />
      </div>
      <Category />
      <div className="text-2xl font-bold mx-5 -mb-4">Recent Posts</div>
      <Domestic />
      <Spiritual />
      <National />
      <International />
      <Footer />
    </div>
  );
}

export default Travel;
