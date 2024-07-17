import axios from "axios";
import { server } from "../store";
import {
  createPopupFail,
  createPopupRequest,
  createPopupSuccess,
  deletePopupFail,
  deletePopupRequest,
  deletePopupSuccess,
  getAllPopupsFail,
  getAllPopupsRequest,
  getAllPopupsSuccess,
  updatePopupFail,
  updatePopupRequest,
  updatePopupSuccess,
} from "../reducers/popupReducer.js";

// Create a new popup
export const createPopup = (formdata) => async (dispatch) => {
  try {
    dispatch(createPopupRequest());
    const { data } = await axios.post(`${server}/popup/createPopup`, formdata, {
      headers: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch(createPopupSuccess(data));
  } catch (error) {
    console.log("🚀 ~ createPopup ~ error:", error);
    dispatch(createPopupFail(error.response.data.message));
  }
};

// Update an existing popup
export const updatePopup = (formdata, popupId) => async (dispatch) => {
  try {
    dispatch(updatePopupRequest());
    const { data } = await axios.put(
      `${server}/popup/updatePopup/${popupId}`,
      formdata,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch(updatePopupSuccess(data));
  } catch (error) {
    console.log("🚀 ~ updatePopup ~ error:", error);
    dispatch(updatePopupFail(error.response.data.message));
  }
};

// Get all popups
export const getAllPopups =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch(getAllPopupsRequest());
      const { data } = await axios.get(
        `${server}/popup/getAllPopups?keyword=${keyword}`,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(getAllPopupsSuccess(data.popups));
    } catch (error) {
      console.log("🚀 ~ getAllPopups ~ error:", error);
      dispatch(getAllPopupsFail(error.response.data.message));
    }
  };

// Delete a popup
export const deletePopup = (popupId) => async (dispatch) => {
  try {
    dispatch(deletePopupRequest());
    const { data } = await axios.delete(
      `${server}/popup/deletePopup/${popupId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(deletePopupSuccess(data.message));
  } catch (error) {
    console.log("🚀 ~ deletePopup ~ error:", error);
    dispatch(deletePopupFail(error.response.data.message));
  }
};
