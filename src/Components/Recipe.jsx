import react,{useState} from 'react';
import RecipeData from '../Pages/RecipeData';

const Recipe = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 3 // Number of cards per page

  const cardsData = [
    {
      title: "recipe",
      description:"Lorem Ipsum text lorem ipsum text....",
image:"./assets/trending1.png",   
 },
    {
      title: "Recipe",
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/trending2.png"
    },
    {
      title: "Recipe",
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/trending3.png",
    },
      {
      title: "Recipe",
      description: "Explore coffee plantations and scenic beauty",
      image: "./assets/trending4.png"
      },
      {
      title: "Recipe",
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/trending1.png",
      },
      {
        title: "Recipe",
        description:"Lorem Ipsum text lorem ipsum text....",
        image:"./assets/trending1.png",   
   },
   {
    title: "Recipe",
    description: "Lorem Ipsum text lorem ipsum text....",
    image: "./assets/trending1.png"
    },
    {
      title: "Recipe",
      description: "Lorem Ipsum text lorem ipsum text....",
      image: "./assets/trending1.png"
      },
    ]

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard)
console.log(currentCards + "currentCard");
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(cardsData.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto">
      <div className="text-[25px] font-bold mx-5">Recipe</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {currentCards.map((card) => (
          <RecipeData key={card.title} {...card} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`px-2 py-1 text-gray-700 font-bold rounded-md hover:bg-gray-200 ${
              currentPage === number ? 'bg-gray-200' : ''
            }`}
            onClick={() => paginate(number)}
          >
   0         {number}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Recipe














