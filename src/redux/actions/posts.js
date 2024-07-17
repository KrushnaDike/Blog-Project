import axios from "axios";
import { server } from "../store";
import {
  createPostFail,
  createPostRequest,
  createPostSuccess,
  deletePostFail,
  deletePostRequest,
  deletePostSuccess,
  getAllPostsFail,
  getAllPostsRequest,
  getAllPostsSuccess,
  getRecentPostsFail,
  getRecentPostsRequest,
  getRecentPostsSuccess,
  updatePostFail,
  updatePostRequest,
  updatePostSuccess,
} from "../reducers/postsReducer.js";

export const createPost = (formdata) => async (dispatch) => {
  try {
    dispatch(createPostRequest());
    const { data } = await axios.post(`${server}/post/createPost`, formdata, {
      headers: {
        "Content-type": "multipart/form-data",
      },
      withCredentials: true,
    });

    console.log(data);

    dispatch(createPostSuccess(data));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(createPostFail(error.response.data.message));
  }
};

export const updatePost = (formdata, postId) => async (dispatch) => {
  try {
    dispatch(updatePostRequest());
    const { data } = await axios.put(
      `${server}/post/updatePost/${postId}`,
      formdata,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch(updatePostSuccess(data));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(updatePostFail(error.response.data.message));
  }
};

export const getAllPosts =
  (category = "", keyword = "") =>
  async (dispatch) => {
    try {
      dispatch(getAllPostsRequest());
      const { data } = await axios.get(
        `${server}/post/getAllPosts?keyword=${keyword}&category=${category}`,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(getAllPostsSuccess(data.posts));
    } catch (error) {
      console.log("🚀 ~ login ~ error:", error);
      dispatch(getAllPostsFail(error.response.data.message));
    }
  };

export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch(deletePostRequest());
    const { data } = await axios.delete(`${server}/post/deletePost/${postId}`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(deletePostSuccess(data.message));
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    dispatch(deletePostFail(error.response.data.message));
  }
};

export const getRecentFourPosts = () => async (dispatch) => {
  try {
    dispatch(getRecentPostsRequest());
    const { data } = await axios.get(`${server}/post/getRecentPosts`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(getRecentPostsSuccess(data.recentPosts));
  } catch (error) {
    console.log("🚀 ~ getRecentPosts ~ error:", error);
    dispatch(getRecentPostsFail(error.response.data.message));
  }
};
