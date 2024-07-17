import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  ads: null,
  ad: null,
  message: null,
  error: null,
};

const adSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    getAllAdsRequest: (state) => {
      state.loading = true;
    },
    getAllAdsSuccess: (state, action) => {
      state.loading = false;
      state.ads = action.payload;
    },
    getAllAdsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createAdRequest: (state) => {
      state.loading = true;
    },
    createAdSuccess: (state, action) => {
      state.loading = false;
      state.ad = action.payload.newAd;
      state.message = action.payload.message;
    },
    createAdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateAdRequest: (state) => {
      state.loading = true;
    },
    updateAdSuccess: (state, action) => {
      state.loading = false;
      state.ad = action.payload.ad;
      state.message = action.payload.message;
    },
    updateAdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteAdRequest: (state) => {
      state.loading = true;
    },
    deleteAdSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteAdFail: (state, action) => {
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
  getAllAdsRequest,
  getAllAdsSuccess,
  getAllAdsFail,
  createAdRequest,
  createAdSuccess,
  createAdFail,
  updateAdRequest,
  updateAdSuccess,
  updateAdFail,
  deleteAdRequest,
  deleteAdSuccess,
  deleteAdFail,
  clearError,
  clearMessage,
} = adSlice.actions;

export default adSlice.reducer;
