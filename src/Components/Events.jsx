import React from "react";
import Navbar from "../Pages/Navbar";
import Awards from "../SubMenu/Awards";
import WomenEmpowerment from "../SubMenu/WomenEmpowerment";
import Footer from "../Pages/Footer";
import Domestic from "../Pages/Domestic";
function Events() {
  return (
    <div className="mx-auto">
      <Navbar />
      <Domestic />
      <Awards />
      <WomenEmpowerment />
      <Footer />
    </div>
  );
}

export default Events;
