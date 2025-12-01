import { createSlice } from "@reduxjs/toolkit";
import {
  generateCode,
  login,
  resendGenerateCode,
  signUp,
  verifyOtp,
} from "./AuthActions";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    isLoading: false,
    isSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateCode.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload;
      })
      .addCase(generateCode.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
      })
      .addCase(resendGenerateCode.pending, (state) => {
        state.resendIsLoading = true;
      })
      .addCase(resendGenerateCode.fulfilled, (state, { payload }) => {
        state.resendIsLoading = false;
        state.resendIsSuccess = true;
        state.data = payload;
      })
      .addCase(resendGenerateCode.rejected, (state, { payload }) => {
        state.resendIsLoading = false;
        state.resendIsSuccess = false;
        state.errorMessage = payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload;
      })
      .addCase(verifyOtp.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
      });
  },
});

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
