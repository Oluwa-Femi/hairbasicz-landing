import { createAsyncThunk } from "@reduxjs/toolkit";
import responseHandler from "../../utils/notifications/responseHandler";
import Instance from "../../utils/services/api";
import Storage from "../../utils/services/storage";

const API = Instance.customAxiosInstance();

export const forgotPassword = createAsyncThunk(
  "password/forgotPassword",
  async (payload) => {
    const { data } = await API.post(
      "user/customers/forgot-password",
      payload.payloadValues,
    );
    Storage.set("customer-details", JSON.stringify(payload.payloadValues));
    if (data.status === "success") {
      responseHandler(data);
      payload.navigate("/forgot-password-verify-account");
    } else if (data.status === "error") {
      responseHandler(data);
    }
  },
);

export const forgotPasswordResendOtp = createAsyncThunk(
  "password/forgotPasswordResendOtp",
  async (payload) => {
    const { data } = await API.post(
      "user/customers/forgot-password",
      payload.payloadValues,
    );
    Storage.set("customer-details", JSON.stringify(payload.payloadValues));

    if (data.status === "success") {
      responseHandler(data);
      payload.navigate("/forgot-password-verify-account");
    } else if (data.status === "error") {
      responseHandler(data);
    }
  },
);

export const passwordVerifyOtp = createAsyncThunk(
  "password/passwordVerifyOtp ",
  async (payload) => {
    const { data } = await API.post(
      "user/customers/verify-password-reset-otp",
      payload.payloadValues,
    );
    if (data.status === "success") {
      responseHandler(data);
      Storage.set("token", JSON.stringify(data?.data?.token));
      payload.navigate("/reset-password");
    } else if (data.status === 400) {
      responseHandler(data);
    }
  },
);

export const resetPassword = createAsyncThunk(
  "password/resetPassword",
  async (payload) => {
    const { data } = await API.put(
      "user/customers/reset-password",
      payload.payloadValues,
    );
    if (data.status === "success") {
      responseHandler(data);
      payload.navigate("/login");
    } else if (data.status === "error") {
      responseHandler(data);
    }
  },
);
