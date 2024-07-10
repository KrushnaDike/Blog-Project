import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="flex text-gray-600 text-sm mb-4" aria-label="breadcrumb">
      <ol className="inline-flex items-center space-x-1">
        {pathnames.length > 0 ? (
          <li className="inline-flex items-center">
            <Link to="/" className="text-blue-600 hover:underline">
              Dashboard
            </Link>
            <svg
              className="w-4 h-4 mx-2 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </li>
        ) : (
          <li className="inline-flex items-center text-gray-600">Home</li>
        )}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <li
              key={to}
              className="inline-flex items-center text-gray-600 font-semibold"
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </li>
          ) : (
            <li key={to} className="inline-flex items-center">
              <Link to={to} className="text-blue-600 hover:underline">
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Link>
              <svg
                className="w-4 h-4 mx-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
