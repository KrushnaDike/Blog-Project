import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  popups: null,
  popup: null,
  message: null,
  error: null,
};

const popupSlice = createSlice({
  name: "popups",
  initialState,
  reducers: {
    getAllPopupsRequest: (state) => {
      state.loading = true;
    },
    getAllPopupsSuccess: (state, action) => {
      state.loading = false;
      state.popups = action.payload;
    },
    getAllPopupsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createPopupRequest: (state) => {
      state.loading = true;
    },
    createPopupSuccess: (state, action) => {
      state.loading = false;
      state.popup = action.payload.newPopup;
      state.message = action.payload.message;
    },
    createPopupFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updatePopupRequest: (state) => {
      state.loading = true;
    },
    updatePopupSuccess: (state, action) => {
      state.loading = false;
      state.popup = action.payload.newPopup;
      state.message = action.payload.message;
    },
    updatePopupFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deletePopupRequest: (state) => {
      state.loading = true;
    },
    deletePopupSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deletePopupFail: (state, action) => {
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
  getAllPopupsRequest,
  getAllPopupsSuccess,
  getAllPopupsFail,
  createPopupRequest,
  createPopupSuccess,
  createPopupFail,
  updatePopupRequest,
  updatePopupSuccess,
  updatePopupFail,
  deletePopupRequest,
  deletePopupSuccess,
  deletePopupFail,
  clearError,
  clearMessage,
} = popupSlice.actions;

export default popupSlice.reducer;
