import React from "react";
import { Link } from "react-router-dom";
import heroImage from '../assets/HeroImage.png';
function HeroPage() {
  return (
    <>
     <div className="relative h-[585px] overflow-hidden">
      <img
        className="w-full h-full object-cover object-center absolute z-0"
        src={heroImage}
        alt="Hero Image"
      />
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Find your perfect spot to spend 
        your weekend with your loved ones</h1>
      <Link to="/food">
          <button className="bg-green-500 mt-20 hover:bg-green-700 text-white py-2 px-4 rounded text-sm sm:text-base md:text-lg lg:text-xl mb-5">
            <Link to="food">Book Now</Link>
          </button>
          
          </Link>
      
      </div>
    </div>
      {/* <div
        className="relative w-full h-[585px] bg-cover bg-center object-cover mx-auto"
        
        style={{ backgroundImage: "url('../src/assets/HeroImage1.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-8 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-8 md:px-16 lg:px-24  mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
            Find your perfect spot to spend your weekend with your loved ones
          </h3>
          <Link to="/food">
          <button className="bg-green-500 mt-20 hover:bg-green-700 text-white py-2 px-4 rounded text-sm sm:text-base md:text-lg lg:text-xl mb-5">
            <Link to="food">Book Now</Link>
          </button>
          
          </Link>
        </div> */}
      {/* </div> */}
    </>
  );
}

export default HeroPage;
