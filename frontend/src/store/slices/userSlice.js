import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    csrfToken: localStorage.getItem("csrfToken")
      ? localStorage.getItem("csrfToken")
      : null,
    pending: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    resetUserState: (state) => {
      (state.csrfToken = localStorage.getItem("csrfToken")
        ? localStorage.getItem("csrfToken")
        : null),
        (state.pending = false);
      state.error = false;
      state.errorMessage = "";
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    loginRequest: (state) => {
      state.pending = true;
    },
    loginSuccess: (state, action) => {
      state.pending = false;
      state.csrfToken = action.payload;
    },
    loginFailed: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    registerRequest: (state) => {
      state.pending = true;
    },
    registerSuccess: (state, action) => {
      state.pending = false;
      state.csrfToken = action.payload;
    },
    registerFailed: (state, action) => {
      state.pending = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
  },
});

export const {
  resetUserState,
  setUsername,
  loginRequest,
  loginFailed,
  loginSuccess,
  registerRequest,
  registerFailed,
  registerSuccess,
} = userSlice.actions;
export default userSlice.reducer;
