import { createAsyncThunk } from "@reduxjs/toolkit";
import responseHandler from "../../utils/notifications/responseHandler";
import Instance from "../../utils/services/api";
import Storage from "../../utils/services/storage";

export const getNotifications = createAsyncThunk(
  "profile/getNotifications",
  async (params) => {
    const API = Instance.customAxiosInstance(Storage.get("user-session-token"));
    const { data } = await API.get("user/customers/notifications?", params);
    if (data.status === "success") {
      return data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
    return data;
  },
);

export const getUserProfile = createAsyncThunk(
  "profile/getUserProfile",
  async () => {
    const API = Instance.customAxiosInstance(Storage.get("user-session-token"));
    const { data } = await API.get("user/customers/profile");
    if (data.status === "success") {
      return data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
    return data;
  },
);
