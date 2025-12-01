import { createAsyncThunk } from "@reduxjs/toolkit";
import responseHandler from "../../utils/notifications/responseHandler";
import Instance from "../../utils/services/api";

const API = Instance.customAxiosInstance();

export const getAllBrands = createAsyncThunk(
  "brands/getAllBrands",
  async (params) => {
    const { data } = await API.get("ecommerce/brands", params);
    if (data.status === "success") {
      return data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
    return data;
  }
);

export const getSingleBrands = createAsyncThunk(
  "brands/getAllBrands",
  async (params) => {
    const { data } = await API.get("ecommerce/brands", params);
    if (data.status === "success") {
      return data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
    return data;
  }
);

export const getPopularBrands = createAsyncThunk(
  "brands/getPopularBrands",
  async (payload) => {
    const { data } = await API.get("/ecommerce/brands/popular", payload);
    if (data.status === "success") {
      // responseHandler(data);
      return data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
  }
);
