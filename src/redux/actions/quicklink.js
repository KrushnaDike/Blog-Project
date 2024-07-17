import axios from "axios";
import { server } from "../store";
import {
  createQuickLinkFail,
  createQuickLinkRequest,
  createQuickLinkSuccess,
  deleteQuickLinkFail,
  deleteQuickLinkRequest,
  deleteQuickLinkSuccess,
  getAllQuickLinksFail,
  getAllQuickLinksRequest,
  getAllQuickLinksSuccess,
  updateQuickLinkFail,
  updateQuickLinkRequest,
  updateQuickLinkSuccess,
} from "../reducers/quicklinkReducer.js";

export const createQuickLink = (formdata) => async (dispatch) => {
  try {
    console.log(formdata);
    dispatch(createQuickLinkRequest());
    const { data } = await axios.post(
      `${server}/quicklink/createQuickLink`,
      formdata,
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(createQuickLinkSuccess(data));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(createQuickLinkFail(error.response.data.message));
  }
};

export const updateQuickLink = (formdata, quickLinkId) => async (dispatch) => {
  try {
    dispatch(updateQuickLinkRequest());
    const { data } = await axios.put(
      `${server}/quicklink/updateQuickLink/${quickLinkId}`,
      formdata,
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(updateQuickLinkSuccess(data));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(updateQuickLinkFail(error.response.data.message));
  }
};

export const getAllQucikLinks = () => async (dispatch) => {
  try {
    dispatch(getAllQuickLinksRequest());
    const { data } = await axios.get(`${server}/quicklink/getAllQuickLinks`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(getAllQuickLinksSuccess(data.quickLinks));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(getAllQuickLinksFail(error.response.data.message));
  }
};

export const deleteQucikLink = (quickLinkId) => async (dispatch) => {
  try {
    dispatch(deleteQuickLinkRequest());
    const { data } = await axios.delete(
      `${server}/quicklink/deleteQuickLink/${quickLinkId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(deleteQuickLinkSuccess(data.message));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(deleteQuickLinkFail(error.response.data.message));
  }
};
