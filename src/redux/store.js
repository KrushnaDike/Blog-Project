import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";

export const server = "http://localhost:2000/api/v1";

const store = configureStore({
  reducer: {
    user: userReducer,
    // admin: adminReducer,
  },
});

export default store;
