import React,{useState} from 'react'
import TravelData from '../Components/TravelData';
function NonVeg() {
    
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 5; // Number of cards per page
  
    const cardsData = [
      {
        title: "Explore Uttarakhand",
        description: "Exploring the hidden places in Uttarakhand",
        image: "./assets/recipe123.png",
      },
    
      {
        title: "Explore Uttarakhand",
        description: "Discover the beauty of the Himalayas1",
        image: "./assets/recipe123.png",
      },
      {
        title: "Explore Uttarakhand",
        description: "Exploring the hidden places in Uttarakhand",
        image: "./assets/recipe123.png",
      },
      {
        title: "Wanderlust in Meghalaya",
        description: "Discover waterfalls, caves, and living root bridges",
        image: "./assets/Recipe2.png",
      },
      {
        title: "Wanderlust in Meghalaya",
        description: "Exploring the hidden places in Uttarakhand",
        image: "./assets/Recipe2.png",
      },
      {
        title: "Explore Uttarakhand",
        description: "Exploring the hidden places in Uttarakhand",
        image: "./assets/recipe123.png",
      },
    
      {
        title: "Explore Uttarakhand",
        description: "Discover the beauty of the Himalayas1",
        image: "./assets/recipe123.png",
      },
      {
        title: "Explore Uttarakhand",
        description: "Exploring the hidden places in Uttarakhand",
        image: "./assets/recipe123.png",
      },
      {
        title: "Wanderlust in Meghalaya",
        description: "Discover waterfalls, caves, and living root bridges",
        image: "./assets/Recipe2.png",
      },
      {
        title: "Wanderlust in Meghalaya",
        description: "Exploring the hidden places in Uttarakhand",
        image: "./assets/Recipe2.png",
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
        <div className="text-[20px] font-bold mx-5">Non-Veg</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mt-3">
          {currentCards.map((card, i) => (
            <TravelData key={i+1} {...card} />
          ))}
        </div>
        <div className="flex justify-center mt-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`px-3 py-1 mx-1 text-gray-700 mb-4 font-bold rounded-md hover:bg-gray-200 ${
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
  
export default NonVeg
