import React, { useState } from "react";
import { Link } from "react-router-dom";
import facebook from "../assets/Facebook.png";
import Instgram from "../assets/Instagram.png";
import Twitter from "../assets/Twitter.png";
import youtube from '../assets/youtube123.png';
import calling from "../assets/Icon.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
const [active, setActive]=useState("food")
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleClick = (item) => {
    setActive(item); // Update active state on menu item click
  };

  return (
    <>
      <nav className="bg-green-100 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link to="/" className="flex items-center space-x-3">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Logo
            </span>
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <div class="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="flex items-center w-full md:w-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 mr-2 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="focus:outline-none rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 bg-white px-3 py-2 w-full md:w-80"
              />
            </div>

            <div
              className={`flex items-center space-x-4 rtl:space-x-reverse md:flex md:flex-grow md:justify-end 
          isOpen ? 'block' : 'hidden'
         }`}
            >
              <a href="#">
                <img src={facebook} alt="facebook" />
              </a>
              <a href="#">
                <img src={youtube} alt="you tube"/>
              </a>
              <a href="#">
                <img src={Instgram} alt="instgram"/>
              </a>
              <a href="#">
                <img src={Twitter} alt="Twitter" className="w-1/2" />
              </a>
            </div>
            <div
              className={`flex flex-col space-y-4 md:hidden md:flex-grow md:justify-end ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <Link
                to="/food"
                className="text-gray-900 dark:text-white hover:underline px-3 py-2"
              >
                Food
              </Link>
              <Link
                to="/travel"
                className="text-gray-900 dark:text-white hover:underline px-3 py-2"
              >
                Travel
              </Link>
              <Link
                to="/familyFun"
                className="text-gray-900 dark:text-white hover:underline px-3 py-2"
              >
                Family & Fun
              </Link>
              <Link
                to="/recipe"
                className="text-gray-900 dark:text-white hover:underline px-3 py-2"
              >
                Recipe
              </Link>
              <Link
                to="/events"
                className="text-gray-900 dark:text-white hover:underline px-3 py-2"
              >
                {" "}
                Events
              </Link>
              <Link
                to="/foundation"
                className="text-gray-900 dark:text-white hover:underline px-3 py-2"
              >
                Foundation
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <nav className="bg-green-200 flex justify-center items-center px-4 py-2 shadow-md">
      <ul className="flex flex-row space-x-4">
        <li
          className={`text-black-300 hover:text-black cursor-pointer px-2 py-1 rounded-md ${
            active === 'food' ? 'bg-green-700' : ''
          }`}
          onClick={() => handleClick('food')}
        >
          <Link to="/food">Food</Link>
        </li>
        <li
          className={`text-black-300 hover:text-black cursor-pointer px-2 py-1 rounded-md ${
            active === 'travel' ? 'bg-green-700' : ''
          }`}
          onClick={() => handleClick('travel')}
        >
          <Link to="/travel">Travel</Link>
        </li>
        <li
          className={`text-black-300 hover:text-black cursor-pointer px-2 py-1 rounded-md ${
            active === 'familyFun' ? 'bg-green-700' : ''
          }`}
          onClick={() => handleClick('familyFun')}
        >
          <Link to="/familyFun">Family & Fun</Link>
        </li>
        <li
          className={`text-black-300 hover:text-black cursor-pointer px-2 py-1 rounded-md ${
            active === 'recipe' ? 'bg-green-700' : ''
          }`}
          onClick={() => handleClick('recipe')}
        >
          <Link to="/recipe">Recipe</Link>
        </li>
        <li
          className={`text-black-300 hover:text-underline hover:text-black cursor-pointer px-2 py-1 rounded-md ${
            active === 'events' ? 'bg-green-700' : ''
          }`}
          onClick={() => handleClick('events')}
        >
          <Link to="/events">Events</Link>
        </li>
        <li
          className={`text-black-300 hover:text-underline hover:text-black cursor-pointer px-2 py-1 rounded-md ${
            active === 'foundation' ? 'bg-gray-700' : ''
          }`}
          onClick={() => handleClick('recipe')}
        >
          <Link to="/foundation">Foundation</Link>
        </li>

      </ul>
      <div className="flex justify-end items-center w-1/2">
        <Link to="/contactus" className="text-white hover:text-black mr-4 px-4 py-2 bg-green-900">
          Contact Us
        </Link>
       
      </div>
    </nav>
      {/* <nav class="bg-green-200 dark:bg-gray-700">
        <div class="max-w-screen-xl px-4 py-3 mx-auto">
          <div class="flex justify-end items-center">
            <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm items-center">
              <li>
                <Link
                  to="/food"
                  class="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  Food
                </Link>
              </li>
              <li>
                <Link
                  to="/travel"
                  class="text-gray-900 dark:text-white hover:underline hover:bg-green-600"
                >
                  Travel
                </Link>
              </li>
              <li>
                <Link
                  to="/familyFun"
                  class="text-gray-900 dark:text-white hover:underline"
                >
                  Family & Fun
                </Link>
              </li>
              <li>
                <Link
                  to="/recipe"
                  class="text-gray-900 dark:text-white hover:underline"
                >
                  Recipe
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  class="text-gray-900 dark:text-white hover:underline"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/foundation"
                  class="text-gray-900 dark:text-white hover:underline"
                >
                  Foundation
                </Link>
              </li>

              <li>
                <Link to="/home">
                  <button className="bg-green-700 hover:bg-grren-700 mx-5 text-white font-bold py-2 px-4 rounded shadow-md focus:outline-none">
                    Contact Us
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
    </>
  );
};

export default Navbar;
