import { configureStore } from "@reduxjs/toolkit";

// Importing Reducers
import userReducer from "./reducers/userReducer";
import adminReducer from "./reducers/adminReducer";
import sliderReducer from "./reducers/sliderReducer";
import quicklinkReducer from "./reducers/quicklinkReducer";
import postsReducer from "./reducers/postsReducer";
import pagesReducer from "./reducers/pagesReducer";
import popupReducer from "./reducers/popupReducer";
import adReducer from "./reducers/adReducer";
import otherReducer from "./reducers/otherReducer";

export const server = "https://blog-server-sp45.onrender.com/api/v1";

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    slider: sliderReducer,
    quicklink: quicklinkReducer,
    posts: postsReducer,
    pages: pagesReducer,
    popups: popupReducer,
    ads: adReducer,
    other: otherReducer,
  },
});

export default store;
