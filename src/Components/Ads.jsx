import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError, clearMessage } from "../redux/reducers/adReducer";
import { getAllAds } from "../redux/actions/ads";
import Loader from "./Layout/Loader/Loader";
// import "./Ads.css";

const Ads = () => {
  const { ads, loading, error, message } = useSelector((state) => state.ads);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.info(message);
      dispatch(clearMessage());
    }

    dispatch(getAllAds());
  }, [dispatch, error, message]);

  if (loading || !ads) {
    return (
      <div className="ads-container p-4">
        <Loader />
      </div>
    );
  }

  // console.log(ads);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="ads-container p-4">
      <Slider {...settings}>
        {ads.map((ad) => (
          <div key={ad._id} className="ad-item">
            <a href={ad.link} target="_blank" rel="noopener noreferrer">
              <img
                src={ad.image.url}
                alt="Ad"
                className="ad-image w-full h-64 object-fit rounded-lg shadow-lg"
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Ads;
