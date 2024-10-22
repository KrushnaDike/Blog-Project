import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import Contact from "../Components/Contact/Contact"; // Import the Contact component
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";

function Footer() {
  const [showContact, setShowContact] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { logo } = useSelector((state) => state.other);

  return (
    <>
      <footer className="bg-black dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-7">
            <div className="flex flex-col items-center">
              <div className="rounded-full h-14 w-14 px-2 bg-white flex justify-center items-center">
                {logo ? (
                <img
                  src={logo.logoImage.url}
                  alt="Logo"
                  className="text-center"
                />
              ) : (
                <img src={logo} alt="Logo" className="text-center" />
              )}
              </div>

              <div className="mt-4">
                {isAuthenticated ? (
                  <>
                    <div className="bg-green-900 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                      <UserOutlined style={{ fontSize: "1.5rem" }} />
                      <span className="ml-2">{user.name}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <button className="bg-green-900 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                        Login
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-green-700 uppercase dark:text-green-600">
                Food
              </h2>
              <ul className="text-white dark:text-white font-medium">
                <li className="mb-4">
                  <Link to="/food/restaurant" className=" hover:underline">
                    Restaurant
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/food/streetfood" className="hover:underline">
                    Street Food
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/food/lunchWithStar" className="hover:underline">
                    Lunch with Star
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-green-700 uppercase dark:text-green-600">
                Travel
              </h2>
              <ul className="text-white dark:text-white font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">
                    Travel
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/travel/spiritual" className="hover:underline">
                    Spiritual
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/travel/national" className="hover:underline">
                    National
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/travel/international" className="hover:underline">
                    International
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-green-700 uppercase dark:text-green-600">
                Family & Fun
              </h2>
              <ul className="text-white dark:text-white font-medium">
                <li className="mb-4">
                  <Link to="/familyfun/challenge" className="hover:underline">
                    Challenge
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/familyfun/rahanVeg" className="hover:underline">
                    Rahan's Vlog
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/familyfun/oreeMummy" className="hover:underline">
                    Ovee & Mumma
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-green-700 uppercase dark:text-green-600">
                Quick Link
              </h2>
              <ul className="text-white dark:text-white font-medium">
                <li className="mb-4">
                  <Link
                    to="/quickLink/womenEmpowerment"
                    className="hover:underline"
                  >
                    Women Empowerment
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/quickLink/award" className="hover:underline">
                    Awards
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/quickLink/foundation" className="hover:underline">
                    Foundation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-green-700 uppercase dark:text-green-600">
                Recipe
              </h2>
              <ul className="text-white dark:text-white font-medium">
                <li className="mb-4">
                  <Link to="/recipe/veg" className="hover:underline">
                    Veg
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/recipe/nonVeg" className="hover:underline">
                    Non-Veg
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-green-700 uppercase dark:text-green-700">
                Quick Link
              </h2>
              <ul className="flex flex-col space-y-2">
                <li className="text-white dark:text-white">
                  Have a support question?
                </li>
              </ul>
              <div className="mt-2">
                <button
                  onClick={() => setShowContact(true)}
                  className="text-white font-semibold bg-green-700 px-4 w-auto py-2 rounded-md"
                >
                  Contact us
                </button>
                <p className="text-green-700 dark:green-text-500">Call us at</p>
                <p className="text-white">+91 9260066999</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Contact show={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}

export default Footer;
