import React,{useState} from 'react'
import Lunch from './Lunch';
function Trending() {
  
    
      const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3; // Number of cards per page

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
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4">
        <h1 className="text-3xl font-bold text-white mb-4">Trending</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
        {currentCards.map((card) => (
          <Lunch key={card.description} {...card} />
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
  )
}

export default Trending
