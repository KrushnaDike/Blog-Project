import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSliderImages } from "../redux/actions/slider";
import { clearError, clearMessage } from "../redux/reducers/sliderReducer";
import { toast } from "react-toastify";
import "./HeroPage.css";
import Loader from "../Components/Layout/Loader/Loader";

function HeroPage() {
  const { sliders, loading, error, message } = useSelector(
    (state) => state.slider
  );
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

    dispatch(getAllSliderImages());
  }, [dispatch, error, message]);

  if (!sliders || loading) {
    return <Loader />;
  }

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide custom-carousel"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {sliders.map((slider, index) => (
          <button
            key={slider._id}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {sliders.map((slider, index) => (
          <div
            key={slider._id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={slider.thumbnailImage.url}
              className="d-block w-100 custom-carousel-image"
              alt={slider.title}
            />
            <div className="carousel-caption">
              <h2>{slider.title}</h2>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default HeroPage;
