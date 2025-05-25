import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoading = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.isLoading = false;
    },
    setToken(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      state.isLoading = false;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { login, logout, setToken, setLoading } = authSlice.actions;
export default authSlice.reducer;
