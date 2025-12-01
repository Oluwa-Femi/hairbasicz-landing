import { createSlice } from "@reduxjs/toolkit";
import {
  forgotPassword,
  forgotPasswordResendOtp,
  passwordVerifyOtp,
  resetPassword,
} from "./passwordActions";

export const passwordSlice = createSlice({
  name: "password",
  initialState: {
    data: null,
    isLoading: false,
    isSuccess: false,
    currentUser: {},
    resendIsLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload;
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
      })
      .addCase(passwordVerifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(passwordVerifyOtp.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload;
      })
      .addCase(passwordVerifyOtp.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = payload;
      })
      .addCase(forgotPasswordResendOtp.pending, (state) => {
        state.resendIsLoading = true;
      })
      .addCase(forgotPasswordResendOtp.fulfilled, (state, { payload }) => {
        state.resendIsLoading = false;
        state.resendIsSuccess = true;
        state.data = payload;
      })
      .addCase(forgotPasswordResendOtp.rejected, (state, { payload }) => {
        state.resendIsLoading = false;
        state.resendIsSuccess = false;
        state.errorMessage = payload;
      });
  },
});

export const selectPassword = (state) => state.password;

export default passwordSlice.reducer;
