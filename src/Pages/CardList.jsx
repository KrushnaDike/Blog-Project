import React, { useState } from "react";

const Card = ({ title, description, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm mx-auto mb-4">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h5 className="text-xl font-bold mb-2">{title}</h5>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const CardList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3; // Number of cards per page

  const cardsData = [
    {
      title: "Explore Uttarakhand",
      description: "Discover the beauty of the Himalayas",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Relax in Kerala",
      description: "Unwind in the backwaters and beaches",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Adventure in Goa",
      description: "Experience water sports and vibrant nightlife",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Chill in Coorg",
      description: "Explore coffee plantations and scenic beauty",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Wanderlust in Meghalaya",
      description: "Discover waterfalls, caves, and living root bridges",
      image: "https://via.placeholder.com/300x200",
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentCards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`px-2 py-1 text-gray-700 font-bold rounded-md hover:bg-gray-200 ${
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
};

export default CardList;
