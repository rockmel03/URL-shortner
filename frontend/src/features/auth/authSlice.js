import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
    setToken(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
  },
});

export const { login, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
