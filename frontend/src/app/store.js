import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true, // TODO : set devtools to false while in production
});

export default store;
