import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import facebook from "../assets/Facebook.png";
import Instgram from "../assets/Instagram.png";
import Twitter from "../assets/Twitter.png";
import Youtube1 from "../assets/Youtube1.png";
import { getAllPosts } from "../redux/actions/posts";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage } from "../redux/reducers/postsReducer";
import { toast } from "react-toastify";

function Domestic() {
  const { posts, loading, error, message } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();

  const location = useLocation();

  // Extracting the page title from the location state
  const { title: pageTitle } = location.state || {};

  console.log(pageTitle);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.info(message);
      dispatch(clearMessage());
    }

    if (pageTitle) {
      dispatch(getAllPosts(pageTitle));
    } else {
      dispatch(getAllPosts());
    }
  }, [dispatch, error, message]);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 mb-4 mt-10">
        {posts.map((item) => (
          <Post key={item._id} item={item} />
        ))}
      </div>
    </>
  );
}

export default Domestic;

const Post = ({ item }) => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <div className="relative overflow-hidden rounded-xl shadow-md flex-shrink-0 w-full md:w-1/2 h-60">
        <img
          src={item.thumbnailImage.url}
          alt="Image description"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col justify-between w-full md:w-1/2">
        <div>
          <p className="text-gray-700 font-bold">{item.title}</p>
          <p className="text-gray-400">{item.author}</p>
        </div>
        <div className="flex flex-col justify-between mt-4">
          <Link to="/showMore">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md">
              Show More
            </button>
          </Link>
          <div className="flex flex-row justify-start mt-4 space-x-2">
            <a href="#">
              <img src={facebook} alt="facebook" className="w-6 h-6" />
            </a>
            <a href="#">
              <img src={Youtube1} alt="you tube" className="w-6 h-6" />
            </a>
            <a href="#">
              <img src={Instgram} alt="instgram" className="w-6 h-6" />
            </a>
            <a href="#">
              <img src={Twitter} alt="Twitter" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
