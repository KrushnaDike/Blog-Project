import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  logo: null,
  contacts: null,
  message: null,
  error: null,
};

const otherSlice = createSlice({
  name: "other",
  initialState,
  reducers: {
    getAllContactsRequest: (state) => {
      state.loading = true;
    },
    getAllContactsSuccess: (state, action) => {
      state.loading = false;
      state.contacts = action.payload;
    },
    getAllContactsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createLogoRequest: (state) => {
      state.loading = true;
    },
    createLogoSuccess: (state, action) => {
      state.loading = false;
      state.logo = action.payload.newLogo;
      state.message = action.payload.message;
    },
    createLogoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateLogoRequest: (state) => {
      state.loading = true;
    },
    updateLogoSuccess: (state, action) => {
      state.loading = false;
      state.logo = action.payload.logo;
      state.message = action.payload.message;
    },
    updateLogoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getLogoRequest: (state) => {
      state.loading = true;
    },
    getLogoSuccess: (state, action) => {
      state.loading = false;
      state.logo = action.payload;
    },
    getLogoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    contactRequest: (state) => {
      state.loading = true;
    },
    contactSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    contactFail: (state, action) => {
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
  contactRequest,
  contactSuccess,
  contactFail,
  getAllContactsRequest,
  getAllContactsSuccess,
  getAllContactsFail,
  getLogoRequest,
  getLogoSuccess,
  getLogoFail,
  createLogoSuccess,
  createLogoFail,
  createLogoRequest,
  updateLogoRequest,
  updateLogoSuccess,
  updateLogoFail,
  clearError,
  clearMessage,
} = otherSlice.actions;
export default otherSlice.reducer;
