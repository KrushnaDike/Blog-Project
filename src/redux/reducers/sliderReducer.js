import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  sliders: null,
  slider: null,
  message: null,
  error: null,
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    getAllSliderImagesRequest: (state) => {
      state.loading = true;
    },
    getAllSliderImagesSuccess: (state, action) => {
      state.loading = false;
      state.sliders = action.payload;
    },
    getAllSliderImagesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createSliderRequest: (state) => {
      state.loading = true;
    },
    createSliderSuccess: (state, action) => {
      state.loading = false;
      state.slider = action.payload.newSliderImage;
      state.message = action.payload.message;
    },
    createSliderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateSliderRequest: (state) => {
      state.loading = true;
    },
    updateSliderSuccess: (state, action) => {
      state.loading = false;
      state.slider = action.payload.sliderImage;
      state.message = action.payload.message;
    },
    updateSliderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteSliderImageRequest: (state) => {
      state.loading = true;
    },
    deleteSliderImageSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteSliderImageFail: (state, action) => {
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
  getAllSliderImagesRequest,
  getAllSliderImagesSuccess,
  getAllSliderImagesFail,
  deleteSliderImageRequest,
  deleteSliderImageSuccess,
  deleteSliderImageFail,
  createSliderRequest,
  createSliderSuccess,
  createSliderFail,
  updateSliderRequest,
  updateSliderSuccess,
  updateSliderFail,
  clearError,
  clearMessage,
} = sliderSlice.actions;
export default sliderSlice.reducer;
