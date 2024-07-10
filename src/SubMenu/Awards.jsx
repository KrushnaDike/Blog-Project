import React from 'react';

const Awards = () => {
  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
      <a href="#" className="text-xl font-bold">Your Logo</a>
      <div className="hidden md:flex items-center">
        <input type="text" placeholder="Search" className="bg-gray-700 rounded-md px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="button" className="flex items-center">
          <i className="fas fa-search text-white"></i>
        </button>
      </div>
      <ul className="flex space-x-4 md:hidden">
        <li>
          <a href="#">
            <i className="fab fa-facebook-f text-white"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fab fa-youtube text-white"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fab fa-twitter text-white"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fab fa-whatsapp text-white"></i>
          </a>
        </li>
      </ul>
      <ul className="hidden md:flex space-x-4">
        <li>
          <a href="#">
            <i className="fab fa-facebook-f text-white"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fab fa-youtube text-white"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fab fa-twitter text-white"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fab fa-whatsapp text-white"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Awards;
