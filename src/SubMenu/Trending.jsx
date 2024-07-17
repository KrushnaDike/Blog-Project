import React, { useState } from 'react';
import Lunch from './Lunch';

function Trending() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6; // Number of cards per page

  const cardsData = [
    {
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/lunch.png",
    },
    {
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/lunch2.png",
    },
    {
      description: "Lorem Ipsum text lorem ipsum text....",
      image:"./assets/lunch.png",
    },
    {
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/lunch.png",
    },
    {
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/lunch.png",
    },
    {
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/lunch.png",
    },
    {
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/lunch2.png",
    },
    {
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/lunch.png",
    },
    {
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/lunch2.png",
    },
    {
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/lunch.png",
    },
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

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6  ">
        {currentCards.map((card, index) => (
          <div key={index} className="w-[100%] h-74 overflow-hidden">
            <Lunch {...card} />
          </div>
        ))}
      </div>

      <div className="flex justify-center ">
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
