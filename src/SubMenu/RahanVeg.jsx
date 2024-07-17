import React from 'react'
import { Link } from 'react-router-dom';
import facebook from "../assets/Facebook.png";
import Instgram from "../assets/Instagram.png";
import Twitter from "../assets/Twitter.png";
import Youtube1 from "../assets/Youtube1.png";
import food from '../assets/food.png';

function RahanVeg() {
  return (
    <>
      <div className="text-xl font-bold mx-5 mb-2">Rahan's Veg</div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-row space-y-4">
          <div className="relative overflow-hidden rounded-xl shadow-md">
            <img
              src={food}
              alt="Image description"
              className="w-full h-65 object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-gray-700 font-bold">I went to Malaysia for the family trip and...</p>
            <p className="text-gray-400">by ABC xyz</p>
            <div className="flex flex-col justify-between mt-4">
              <Link to="/showMore">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md">
                  Show More
                </button>
              </Link>
              <div className="flex flex-row justify-start mt-4">
                <a href="#">
                  <img src={facebook} alt="facebook" className="w-6 h-6 mx-2" />
                </a>
                <a href="#">
                  <img src={Youtube1} alt="you tube" className="w-6 h-6 mx-2" />
                </a>
                <a href="#">
                  <img src={Instgram} alt="instgram" className="w-6 h-6 mx-2" />
                </a>
                <a href="#">
                  <img src={Twitter} alt="Twitter" className="w-6 h-6 mx-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-y-4">
          <div className="relative overflow-hidden rounded-xl shadow-md">
            <img
              src={food}
              alt="Image description"
              className="w-full h-65 object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-gray-700 font-bold">I went to Malaysia for the family trip and...</p>
            <p className="text-gray-400">by ABC xyz</p>
            <div className="flex flex-col justify-between mt-4">
              <Link to="/showMore">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md">
                  Show More
                </button>
              </Link>
              <div className="flex flex-row justify-start mt-4">
                <a href="#">
                  <img src={facebook} alt="facebook" className="w-6 h-6 mx-2" />
                </a>
                <a href="#">
                  <img src={Youtube1} alt="you tube" className="w-6 h-6 mx-2" />
                </a>
                <a href="#">
                  <img src={Instgram} alt="instgram" className="w-6 h-6 mx-2" />
                </a>
                <a href="#">
                  <img src={Twitter} alt="Twitter" className="w-6 h-6 mx-2" />
                </a>
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}

export default RahanVeg;






