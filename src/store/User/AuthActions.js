import { createAsyncThunk } from "@reduxjs/toolkit";
import responseHandler from "../../utils/notifications/responseHandler";
import Instance from "../../utils/services/api";
import Storage from "../../utils/services/storage";

const API = Instance.customAxiosInstance();

export const generateCode = createAsyncThunk(
  "auth/generateCode",
  async (payload) => {
    const { data } = await API.post(
      "user/customers/generateOtp",
      payload.payloadValues || payload.payloadValues2,
    );
    if (data.status === "success") {
      responseHandler(data);
      payload.navigate("/verify-account");
      Storage.set("customer-details", JSON.stringify(payload.payloadValues));
    } else if (data.status === "error") {
      responseHandler(data);
    }
  },
);

export const resendGenerateCode = createAsyncThunk(
  "auth/resendGenerateCode",
  async (payload) => {
    const { data } = await API.post(
      "user/customers/generateOtp",
      payload.payloadValues || payload.payloadValues2,
    );
    if (data.status === "success") {
      responseHandler(data);
      payload.navigate("/verify-account");
      Storage.set("customer-details", JSON.stringify(payload.payloadValues));
    } else if (data.status === "error") {
      responseHandler(data);
    }
  },
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp ",
  async (payload) => {
    const { data } = await API.post(
      "user/customers/verifyOtp",
      payload.payloadValues,
    );
    if (data.status === "success") {
      responseHandler(data);
      payload.navigate("/onboarding");
    } else if (data.status === "error") {
      responseHandler(data);
    }
  },
);

export const login = createAsyncThunk("auth/login", async (payload) => {
  const { data } = await API.post(
    "user/customers/login",
    payload.payloadValues,
  );
  if (data.status === "success") {
    responseHandler(data);
    Storage.set("user-session-token", data?.data?.sessionToken);
    Storage.set("user-email", JSON.stringify(data?.data?.email));
    const prevPage = JSON.parse(Storage.get("pageBeforeLogin"));
    if (prevPage) {
      payload.navigate(prevPage);
    } else {
      payload.navigate("/store");
    }
  } else if (data.status === "error") {
    responseHandler(data);
  }
});

export const signUp = createAsyncThunk("auth/signUp", async (payload) => {
  const { data } = await API.post("user/customers/signup", payload.data);
  if (data.status === "success") {
    responseHandler(data);
    payload.navigate("/account-created");
  } else if (data.status === "error") {
    responseHandler(data);
  }
});
