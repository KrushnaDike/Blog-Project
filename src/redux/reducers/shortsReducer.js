import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  youtubeShorts: null,
  youtubeShort: null,
  message: null,
  error: null,
};

const youtubeShortsSlice = createSlice({
  name: "youtubeShorts",
  initialState,
  reducers: {
    getAllYoutubeShortsRequest: (state) => {
      state.loading = true;
    },
    getAllYoutubeShortsSuccess: (state, action) => {
      state.loading = false;
      state.youtubeShorts = action.payload;
    },
    getAllYoutubeShortsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createYoutubeShortRequest: (state) => {
      state.loading = true;
    },
    createYoutubeShortSuccess: (state, action) => {
      state.loading = false;
      state.youtubeShort = action.payload.newYoutubeShort;
      state.message = action.payload.message;
    },
    createYoutubeShortFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateYoutubeShortRequest: (state) => {
      state.loading = true;
    },
    updateYoutubeShortSuccess: (state, action) => {
      state.loading = false;
      state.youtubeShort = action.payload.youtubeShort;
      state.message = action.payload.message;
    },
    updateYoutubeShortFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteYoutubeShortRequest: (state) => {
      state.loading = true;
    },
    deleteYoutubeShortSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteYoutubeShortFail: (state, action) => {
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
  getAllYoutubeShortsRequest,
  getAllYoutubeShortsSuccess,
  getAllYoutubeShortsFail,
  createYoutubeShortRequest,
  createYoutubeShortSuccess,
  createYoutubeShortFail,
  updateYoutubeShortRequest,
  updateYoutubeShortSuccess,
  updateYoutubeShortFail,
  deleteYoutubeShortRequest,
  deleteYoutubeShortSuccess,
  deleteYoutubeShortFail,
  clearError,
  clearMessage,
} = youtubeShortsSlice.actions;
export default youtubeShortsSlice.reducer;
