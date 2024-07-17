import axios from "axios";
import { server } from "../store";
import {
  createAdFail,
  createAdRequest,
  createAdSuccess,
  deleteAdFail,
  deleteAdRequest,
  deleteAdSuccess,
  getAllAdsFail,
  getAllAdsRequest,
  getAllAdsSuccess,
  updateAdFail,
  updateAdRequest,
  updateAdSuccess,
} from "../reducers/adReducer.js";

// Create a new ad
export const createAd = (formdata) => async (dispatch) => {
  try {
    dispatch(createAdRequest());
    const { data } = await axios.post(`${server}/ad/createAd`, formdata, {
      headers: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    });

    console.log(data);

    dispatch(createAdSuccess(data));
  } catch (error) {
    console.log("🚀 ~ createAd ~ error:", error);
    dispatch(createAdFail(error.response.data.message));
  }
};

// Update an existing ad
export const updateAd = (formdata, adId) => async (dispatch) => {
  try {
    dispatch(updateAdRequest());
    const { data } = await axios.put(
      `${server}/ad/updateAd/${adId}`,
      formdata,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch(updateAdSuccess(data));
  } catch (error) {
    console.log("🚀 ~ updateAd ~ error:", error);
    dispatch(updateAdFail(error.response.data.message));
  }
};

// Get all ads
export const getAllAds =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch(getAllAdsRequest());
      const { data } = await axios.get(
        `${server}/ad/getAllAds?keyword=${keyword}`,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(getAllAdsSuccess(data.ads));
    } catch (error) {
      console.log("🚀 ~ getAllAds ~ error:", error);
      dispatch(getAllAdsFail(error.response.data.message));
    }
  };

// Delete an ad
export const deleteAd = (adId) => async (dispatch) => {
  try {
    dispatch(deleteAdRequest());
    const { data } = await axios.delete(`${server}/ad/deleteAd/${adId}`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(deleteAdSuccess(data.message));
  } catch (error) {
    console.log("🚀 ~ deleteAd ~ error:", error);
    dispatch(deleteAdFail(error.response.data.message));
  }
};
