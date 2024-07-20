import React, { useState } from "react";
import YouTubeShort from "../Components/YouTubeShort";

function Trending() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6; // Number of cards per page

  const cardsData = [
    {
      description: "Short 1 Description",
      videoUrl: "https://www.youtube.com/embed/7A2CSuNJSrA",
    },
    {
      description: "Short 2 Description",
      videoUrl: "https://www.youtube.com/embed/7A2CSuNJSrA",
    },
    {
      description: "Short 2 Description",
      videoUrl: "https://www.youtube.com/embed/7A2CSuNJSrA",
    },
    {
      description: "Short 2 Description",
      videoUrl: "https://www.youtube.com/embed/7A2CSuNJSrA",
    },
    {
      description: "Short 2 Description",
      videoUrl: "https://www.youtube.com/embed/7A2CSuNJSrA",
    },
    {
      description: "Short 2 Description",
      videoUrl: "https://www.youtube.com/embed/7A2CSuNJSrA",
    },
    {
      description: "Short 2 Description",
      videoUrl: "https://www.youtube.com/embed/7A2CSuNJSrA",
    },
    // Add more YouTube Shorts
  ];

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(cardsData.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className=" mb-6">
        <h1 className="text-3xl font-bold">Trending</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {currentCards.map((card, index) => (
          <div key={index} className="w-full">
            <YouTubeShort {...card} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`mx-1 px-3 py-1 text-gray-700 font-bold rounded-md hover:bg-gray-200 ${
              currentPage === number ? "bg-gray-200" : ""
            }`}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Trending;
