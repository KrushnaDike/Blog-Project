import React, { useState } from 'react';

const categories = [
  'Mumbai',
  'Delhi',
  'Hyderabad',
  'Dubai',
  'Malaysia',
  'Pune',
  'Mumbai',
  'Delhi',
  'Hyderabad',
  'Dubai',
  'Malaysia',
  'Pune',
];

const Category = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9; // Number of categories per page

  const handleCategoryClick = (category) => {
    // Handle click event for each category (e.g., display category details)
    console.log(`Category clicked: ${category}`);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(categories.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedCategories = categories.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <h2 className="text-xl font-semibold mb-4 text-start">Exploring the hidden places in Uttarakhand</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {displayedCategories.map((category, index) => (
          <div key={index} className="relative cursor-pointer">
            <div
              className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center"
              onClick={() => handleCategoryClick(category)}
            >
            </div>
            <p className="text-xs text-center mt-2">{category}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 bg-gray-200 rounded-full"
          disabled={currentPage === 0}
          onClick={handlePrevPage}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 18l-6-6l6-6"
            />
          </svg>
        </button>
        <span className="text-sm font-medium">
          {currentPage + 1} / {Math.ceil(categories.length / itemsPerPage)}
        </span>
        <button
          className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 bg-gray-200 rounded-full"
          disabled={currentPage === Math.ceil(categories.length / itemsPerPage) - 1}
          onClick={handleNextPage}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l6 6-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Category;


