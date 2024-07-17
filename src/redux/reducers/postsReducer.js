import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  posts: null,
  post: null,
  message: null,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getAllPostsRequest: (state) => {
      state.loading = true;
    },
    getAllPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    getAllPostsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getRecentPostsRequest: (state) => {
      state.loading = true;
    },
    getRecentPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    getRecentPostsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createPostRequest: (state) => {
      state.loading = true;
    },
    createPostSuccess: (state, action) => {
      state.loading = false;
      state.post = action.payload.newPost;
      state.message = action.payload.message;
    },
    createPostFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updatePostRequest: (state) => {
      state.loading = true;
    },
    updatePostSuccess: (state, action) => {
      state.loading = false;
      state.post = action.payload.newPost;
      state.message = action.payload.message;
    },
    updatePostFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deletePostRequest: (state) => {
      state.loading = true;
    },
    deletePostSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deletePostFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  getAllPostsRequest,
  getAllPostsSuccess,
  getAllPostsFail,
  deletePostRequest,
  deletePostSuccess,
  deletePostFail,
  createPostRequest,
  createPostSuccess,
  createPostFail,
  updatePostRequest,
  updatePostSuccess,
  updatePostFail,
  getRecentPostsRequest,
  getRecentPostsSuccess,
  getRecentPostsFail,

  clearError,
  clearMessage,
} = postSlice.actions;
export default postSlice.reducer;
