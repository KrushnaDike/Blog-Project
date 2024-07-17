import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  quicklinks: null,
  quicklink: null,
  message: null,
  error: null,
};

const quickLinkSlice = createSlice({
  name: "quicklink",
  initialState,
  reducers: {
    getAllQuickLinksRequest: (state) => {
      state.loading = true;
    },
    getAllQuickLinksSuccess: (state, action) => {
      state.loading = false;
      state.quicklinks = action.payload;
    },
    getAllQuickLinksFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createQuickLinkRequest: (state) => {
      state.loading = true;
    },
    createQuickLinkSuccess: (state, action) => {
      state.loading = false;
      state.quicklink = action.payload.newQuickLink;
      state.message = action.payload.message;
    },
    createQuickLinkFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateQuickLinkRequest: (state) => {
      state.loading = true;
    },
    updateQuickLinkSuccess: (state, action) => {
      state.loading = false;
      state.slider = action.payload.sliderImage;
      state.message = action.payload.message;
    },
    updateQuickLinkFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteQuickLinkRequest: (state) => {
      state.loading = true;
    },
    deleteQuickLinkSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteQuickLinkFail: (state, action) => {
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
  getAllQuickLinksRequest,
  getAllQuickLinksSuccess,
  getAllQuickLinksFail,
  deleteQuickLinkRequest,
  deleteQuickLinkSuccess,
  deleteQuickLinkFail,
  createQuickLinkRequest,
  createQuickLinkSuccess,
  createQuickLinkFail,
  updateQuickLinkRequest,
  updateQuickLinkSuccess,
  updateQuickLinkFail,
  clearError,
  clearMessage,
} = quickLinkSlice.actions;
export default quickLinkSlice.reducer;
