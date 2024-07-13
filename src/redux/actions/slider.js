import axios from "axios";
import { server } from "../store";
import {
  createSliderFail,
  createSliderRequest,
  createSliderSuccess,
  deleteSliderImageFail,
  deleteSliderImageRequest,
  deleteSliderImageSuccess,
  getAllSliderImagesFail,
  getAllSliderImagesRequest,
  getAllSliderImagesSuccess,
  updateSliderFail,
  updateSliderRequest,
  updateSliderSuccess,
} from "../reducers/sliderReducer.js";

export const createSlider = (formdata) => async (dispatch) => {
  try {
    dispatch(createSliderRequest());
    const { data } = await axios.post(
      `${server}/slider/createSliderImage`,
      formdata,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch(createSliderSuccess(data));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(createSliderFail(error.response.data.message));
  }
};

export const updateSlider = (formdata, sliderId) => async (dispatch) => {
  try {
    dispatch(updateSliderRequest());
    const { data } = await axios.put(
      `${server}/slider/updateSliderImage/${sliderId}`,
      formdata,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch(updateSliderSuccess(data));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(updateSliderFail(error.response.data.message));
  }
};

export const getAllSliderImages = () => async (dispatch) => {
  try {
    dispatch(getAllSliderImagesRequest());
    const { data } = await axios.get(`${server}/slider/getAllSliderImages`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(getAllSliderImagesSuccess(data.sliderImages));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(getAllSliderImagesFail(error.response.data.message));
  }
};

export const deleteSliderImage = (sliderId) => async (dispatch) => {
  try {
    dispatch(deleteSliderImageRequest());
    const { data } = await axios.delete(
      `${server}/slider/deleteSliderImage/${sliderId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(deleteSliderImageSuccess(data.message));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(deleteSliderImageFail(error.response.data.message));
  }
};
