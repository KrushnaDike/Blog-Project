import axios from "axios";
import { server } from "../store";
import {
  createPageFail,
  createPageRequest,
  createPageSuccess,
  deletePageFail,
  deletePageRequest,
  deletePageSuccess,
  getAllPagesFail,
  getAllPagesRequest,
  getAllPagesSuccess,
  updatePageFail,
  updatePageRequest,
  updatePageSuccess,
} from "../reducers/pagesReducer.js";

export const createPage = (formdata) => async (dispatch) => {
  try {
    dispatch(createPageRequest());
    const { data } = await axios.post(`${server}/page/savePage`, formdata, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    console.log(data);

    dispatch(createPageSuccess(data));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(createPageFail(error.response.data.message));
  }
};

export const updatePage = (formdata, pageId) => async (dispatch) => {
  try {
    dispatch(updatePageRequest());
    const { data } = await axios.put(
      `${server}/page/updatePage/${pageId}`,
      formdata,
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(updatePageSuccess(data));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(updatePageFail(error.response.data.message));
  }
};

export const getAllPages = () => async (dispatch) => {
  try {
    dispatch(getAllPagesRequest());
    const { data } = await axios.get(`${server}/page/getAllPages`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(getAllPagesSuccess(data.pages));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(getAllPagesFail(error.response.data.message));
  }
};

export const deletePage = (pageId) => async (dispatch) => {
  try {
    dispatch(deletePageRequest());
    const { data } = await axios.delete(`${server}/page/deletePage/${pageId}`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(deletePageSuccess(data.message));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(deletePageFail(error.response.data.message));
  }
};
