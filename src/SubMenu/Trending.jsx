import React, { useEffect, useState } from "react";
import YouTubeShort from "../Components/YouTubeShort";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage } from "../redux/reducers/shortsReducer";
import { getAllYoutubeShorts } from "../redux/actions/shorts";
import Loader from "../Components/Layout/Loader/Loader";

function Trending() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const { youtubeShorts, loading, error, message } = useSelector(
    (state) => state.shorts
  );
  const dispatch = useDispatch();

  // console.log(youtubeShorts);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.info(message);
      dispatch(clearMessage());
    }

    dispatch(getAllYoutubeShorts());
  }, [dispatch, error, message]);

  if (!youtubeShorts || loading) {
    return <Loader />;
  }

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = youtubeShorts.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(youtubeShorts.length / cardsPerPage); i++) {
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
