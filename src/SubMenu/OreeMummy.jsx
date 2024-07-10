import React from 'react'
import facebook from "../assets/Facebook.png";
import Instgram from "../assets/Instagram.png";
import Twitter from "../assets/Twitter.png";
import Youtube1 from "../assets/Youtube1.png";
import food from '../assets/food.png';
const OreeMummy = () => {
  return (
    <div>
       <div className="flex flex-row pt-2">
    <div className="w-1/2 flex items-center justify-start">
      <img
        src={food}
        alt="Image description"
        className="w-50 h-60 object-cover rounded-xl shadow-md"
      />
    </div>
    <div className="w-2/2 p-4">
      <p className="text-gray-900 dark:text-black">
      I went to Malaysia for the family trip and.......
      </p>
      <p className='text-gray-400'>by ABC xyz</p>
      
      <div className="flex justify-between mt-4">
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md">
        Book Now
      </button>
      <a href="#">
          <img src={facebook} alt="facebook" />
        </a>
        <a href="#">
          <img src={Youtube1} alt="you tube" className="w-8 h-8" />
        </a>
        <a href="#">
          <img src={Instgram} alt="instgram" />
        </a>
        <a href="#">
          <img src={Twitter} alt="Twitter" />
        </a>
      </div>
    </div>
  </div>
    </div>
  )
}

export default OreeMummy
