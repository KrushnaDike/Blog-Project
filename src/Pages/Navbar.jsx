import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import facebook from "../assets/Facebook.png";
import Instgram from "../assets/Instagram.png";
import Twitter from "../assets/Twitter.png";
import youtube from "../assets/youtube123.png";
import mainlogo from "../assets/mainlogo.png";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage } from "../redux/reducers/pagesReducer";
import { getAllPages } from "../redux/actions/pages";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("All");

  const location = useLocation();
  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActive(path ? path.charAt(0).toUpperCase() + path.slice(1) : "All");
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (item) => {
    setActive(item);
  };

  const { pages, loading, error, message } = useSelector(
    (state) => state.pages
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.info(message);
      dispatch(clearMessage());
    }
    dispatch(getAllPages());
  }, [dispatch, error, message]);

  const formatTitleForUrl = (title) => {
    return title.replace(/ & /g, "").replace(/ /g, "").toLowerCase();
  };

  if (!pages) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav className="bg-green-100 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link to="/" className="flex items-center space-x-3">
            <img src={mainlogo} alt="Logo" className="h-10" />
          </Link>
          <div className="flex items-center space-x-6 md:hidden">
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
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
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
              ${isOpen ? "block" : "hidden"}`}
            >
              <a href="#">
                <img src={facebook} alt="facebook" />
              </a>
              <a href="#">
                <img src={youtube} alt="you tube" />
              </a>
              <a href="#">
                <img src={Instgram} alt="instgram" />
              </a>
              <a href="#">
                <img src={Twitter} alt="Twitter" className="w-1/2" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <nav className="bg-green-200 flex justify-center items-center px-4 py-2 shadow-md">
        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0">
          <li
            className={`text-black-300 hover:text-black cursor-pointer px-2 py-1 rounded-md ${
              active === "All" ? "bg-green-500 text-white" : ""
            }`}
            onClick={() => handleClick("All")}
          >
            <Link to="/">Home</Link>
          </li>

          {pages.map((page) => (
            <li
              key={page._id}
              className={`text-black-300 hover:text-black cursor-pointer px-2 py-1 rounded-md ${
                active === page.title ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => handleClick(page.title)}
            >
              <Link
                to={`/${formatTitleForUrl(page.title.toLowerCase())}`}
                state={{
                  title: page.title,
                  content: page.content,
                  metaKeywords: page.metaKeywords,
                  metaDescription: page.metaDescription,
                }}
                onClick={() => handleClick(page.title)}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex justify-end items-center w-1/2">
          <Link
            to="/contactus"
            className="text-white hover:text-black mr-4 px-4 py-2 bg-green-900 rounded"
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
