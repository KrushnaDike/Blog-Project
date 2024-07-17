import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  pages: null,
  page: null,
  message: null,
  error: null,
};

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    getAllPagesRequest: (state) => {
      state.loading = true;
    },
    getAllPagesSuccess: (state, action) => {
      state.loading = false;
      state.pages = action.payload;
    },
    getAllPagesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createPageRequest: (state) => {
      state.loading = true;
    },
    createPageSuccess: (state, action) => {
      state.loading = false;
      state.page = action.payload.newPage;
      state.message = action.payload.message;
    },
    createPageFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updatePageRequest: (state) => {
      state.loading = true;
    },
    updatePageSuccess: (state, action) => {
      state.loading = false;
      state.page = action.payload.page;
      state.message = action.payload.message;
    },
    updatePageFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deletePageRequest: (state) => {
      state.loading = true;
    },
    deletePageSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deletePageFail: (state, action) => {
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
  getAllPagesRequest,
  getAllPagesSuccess,
  getAllPagesFail,
  deletePageRequest,
  deletePageSuccess,
  deletePageFail,
  createPageRequest,
  createPageSuccess,
  createPageFail,
  updatePageRequest,
  updatePageSuccess,
  updatePageFail,

  clearError,
  clearMessage,
} = pageSlice.actions;
export default pageSlice.reducer;
