import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  users: null,
  message: null,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    getAllUsersRequest: (state) => {
      state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getAllUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteUserRequest: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteUserFail: (state, action) => {
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
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  clearError,
  clearMessage,
} = adminSlice.actions;
export default adminSlice.reducer;
