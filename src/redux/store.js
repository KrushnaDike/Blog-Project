import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import adminReducer from "./reducers/adminReducer";
import sliderReducer from "./reducers/sliderReducer";

export const server = "http://localhost:2000/api/v1";

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    slider: sliderReducer,
  },
});

export default store;
