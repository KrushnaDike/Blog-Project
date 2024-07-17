import React, { useState } from 'react';
import TravelData from '../Components/TravelData';

function Restaurant() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5; // Number of cards per page

  const cardsData = [
    {
      title: 'Explore Uttarakhand',
      description: 'Exploring the hidden places in Uttarakhand',
      image: '/assets/recipe123.png',
    },
    {
      title: 'Explore Uttarakhand',
      description: 'Discover the beauty of the Himalayas1',
      image:
        'http://www.crazyfoodyranjita.com/Images/2.%20Home%20Page%20Blogs-1%20Images/4.jpg',
    },
    {
      title: 'Explore Uttarakhand',
      description: 'Discover the beauty of the Himalayas1',
      image:
        'http://www.crazyfoodyranjita.com/Images/2.%20Home%20Page%20Blogs-1%20Images/3.jpg',
    },
    {
      title: 'Explore Uttarakhand',
      description: 'Discover the beauty of the Himalayas1',
      image: '/assets/Recipe2.png',
    },
    {
      title: 'Explore Uttarakhand',
      description: 'Exploring the hidden places in Uttarakhand',
      image: '/assets/recipe123.png',
    },
    {
      title: 'Wanderlust in Meghalaya',
      description: 'Discover waterfalls, caves, and living root bridges',
      image: '/assets/Recipe2.png',
    },
    {
      title: 'Wanderlust in Meghalaya',
      description: 'Exploring the hidden places in Uttarakhand',
      image: '/assets/Recipe2.png',
    },
    {
      title: 'Wanderlust in Meghalaya',
      description: 'Exploring the hidden places in Uttarakhand',
      image: '/assets/Recipe2.png',
    },
    {
      title: 'Wanderlust in Meghalaya',
      description: 'Exploring the hidden places in Uttarakhand',
      image: '/assets/Recipe2.png',
    },
    {
      title: 'Wanderlust in Meghalaya',
      description: 'Exploring the hidden places in Uttarakhand',
      image: '/assets/Recipe2.png',
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
    <div className="container mx-auto px-4 ">
      <div className="text-3xl font-bold mt-4">Restaurant</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
        {currentCards.map((card, index) => (
          <TravelData key={index} {...card} />
        ))}
      </div>
      <div className="flex justify-center ">
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
}

export default Restaurant;
