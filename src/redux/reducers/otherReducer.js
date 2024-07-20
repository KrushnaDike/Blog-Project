import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
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
  clearError,
  clearMessage,
} = otherSlice.actions;
export default otherSlice.reducer;
