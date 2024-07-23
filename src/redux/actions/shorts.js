import axios from "axios";
import { server } from "../store";
import {
  createYoutubeShortFail,
  createYoutubeShortRequest,
  createYoutubeShortSuccess,
  deleteYoutubeShortFail,
  deleteYoutubeShortRequest,
  deleteYoutubeShortSuccess,
  getAllYoutubeShortsFail,
  getAllYoutubeShortsRequest,
  getAllYoutubeShortsSuccess,
  updateYoutubeShortFail,
  updateYoutubeShortRequest,
  updateYoutubeShortSuccess,
} from "../reducers/shortsReducer.js";

export const createYoutubeShort = (formdata) => async (dispatch) => {
  try {
    dispatch(createYoutubeShortRequest());
    const { data } = await axios.post(
      `${server}/other/createYoutubeShort`,
      formdata,
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(createYoutubeShortSuccess(data));
  } catch (error) {
    console.log("🚀 ~ createYoutubeShort ~ error:", error);
    dispatch(createYoutubeShortFail(error.response.data.message));
  }
};

export const updateYoutubeShort =
  (formdata, youtubeShortId) => async (dispatch) => {
    try {
      dispatch(updateYoutubeShortRequest());
      const { data } = await axios.put(
        `${server}/other/updateYoutubeShort/${youtubeShortId}`,
        formdata,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(updateYoutubeShortSuccess(data));
    } catch (error) {
      console.log("🚀 ~ updateYoutubeShort ~ error:", error);
      dispatch(updateYoutubeShortFail(error.response.data.message));
    }
  };

export const getAllYoutubeShorts = () => async (dispatch) => {
  try {
    dispatch(getAllYoutubeShortsRequest());
    const { data } = await axios.get(`${server}/other/getAllYoutubeShorts`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(getAllYoutubeShortsSuccess(data.youtubeShorts));
  } catch (error) {
    console.log("🚀 ~ getAllYoutubeShorts ~ error:", error);
    dispatch(getAllYoutubeShortsFail(error.response.data.message));
  }
};

export const deleteYoutubeShort = (youtubeShortId) => async (dispatch) => {
  try {
    dispatch(deleteYoutubeShortRequest());
    const { data } = await axios.delete(
      `${server}/other/deleteYoutubeShort/${youtubeShortId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(deleteYoutubeShortSuccess(data.message));
  } catch (error) {
    console.log("🚀 ~ deleteYoutubeShort ~ error:", error);
    dispatch(deleteYoutubeShortFail(error.response.data.message));
  }
};
