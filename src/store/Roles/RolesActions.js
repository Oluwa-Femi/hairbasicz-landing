import { createAsyncThunk } from "@reduxjs/toolkit";
import responseHandler from "../../utils/notifications/responseHandler";
import Instance from "../../utils/services/api";
import Storage from "../../utils/services/storage";

const API = Instance.customAxiosInstance();

export const createRole = createAsyncThunk("auth/login", async (payload) => {
  const { data } = await API.post(
    "user/customers/login",
    payload.payloadValues,
  );
  if (data.status === "success") {
    responseHandler(data);
    Storage.set(
      "user-session-token",
      data && data.data && data.data.sessionToken,
    );
    payload.navigate("/");
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
