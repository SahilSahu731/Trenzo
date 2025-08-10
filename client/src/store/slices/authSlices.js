import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isAuthenticated: false,
  profileLoading: false,
  profileError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
    },
        profileRequestStart: (state) => {
      state.profileLoading = true;
      state.profileError = null;
    },
    profileRequestFail: (state, action) => {
      state.profileLoading = false;
      state.profileError = action.payload;
    },
    profileRequestSuccess: (state, action) => {
      state.profileLoading = false;
      state.userInfo = action.payload;
      state.profileError = null;
    },
  },
});

export const { setCredentials, logout, profileRequestStart,profileRequestSuccess, profileRequestFail} = authSlice.actions;

export default authSlice.reducer;
