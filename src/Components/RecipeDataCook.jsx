import React, { useState } from 'react';
import RecipeData from '../Pages/RecipeData';

const RecipeDataCook = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5; // Number of cards per page

  const cardsData = [
    {
      title: "recipe1",
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/trending1.png",
    },
    {
      title: "Recipe2",
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/trending2.png",
    },
    {
      title: "Recipe3",
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/trending3.png",
    },
    {
      title: "Recipe4",
      description: "Explore coffee plantations and scenic beauty",
      image: "./assets/trending4.png",
    },
    {
      title: "Recipe5",
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/trending1.png",
    },
    {
      title: "Recipe6",
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/trending1.png",
    },
    {
      title: "Recipe7",
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/trending1.png",
    },
    {
      title: "Recipe8",
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/trending1.png",
    },
    {
      title: "Recipe9",
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/trending1.png",
    },
    {
      title: "Recipe10",
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/trending1.png",
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
    <div className="container mx-auto">
      <div className="text-3xl font-bold mb-2">Recipe</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-5">
        {currentCards.map((card, index) => (
          <RecipeData key={index} {...card} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`px-3 py-1 mx-1 text-gray-700 font-bold rounded-md hover:bg-gray-200 ${
              currentPage === number ? 'bg-gray-200' : ''
            }`}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecipeDataCook;
