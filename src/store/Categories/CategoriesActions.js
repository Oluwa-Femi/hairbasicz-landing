import { createAsyncThunk } from "@reduxjs/toolkit";
import responseHandler from "../../utils/notifications/responseHandler";
import Instance from "../../utils/services/api";

// const API = Instance.customAxiosInstance(Storage.get("user-session-token"));
const API = Instance.customAxiosInstance();

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (payload) => {
    const { data } = await API.post("ecommerce/categories", payload);
    if (data.status === "success") {
      responseHandler(data);
    } else if (data.status === "error") {
      responseHandler(data);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (params) => {
    const { data } = await API.get("ecommerce/categories", params);
    if (data.status === "success") {
      // responseHandler(data);
      return data?.data?.categories;
    } else if (data.status === "error") {
      responseHandler(data);
    }
    return data?.data?.categories;
  }
);

export const getSingleCategory = createAsyncThunk(
  "categories/getSingleCategory",
  async (id) => {
    const { data } = await API.get(`ecommerce/categories/${id}`, id);
    if (data.status === "success") {
      responseHandler(data);
    } else if (data.status === "error") {
      responseHandler(data);
    }
  }
);

export const getPopularCategory = createAsyncThunk(
  "categories/getPopularCategory",
  async () => {
    const { data } = await API.get("/ecommerce/categories/popular");
    if (data.status === "success") {
      // responseHandler(data);
      return data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
  }
);
