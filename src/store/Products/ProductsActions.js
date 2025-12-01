import { createAsyncThunk } from "@reduxjs/toolkit";
import responseHandler from "../../utils/notifications/responseHandler";
import Instance from "../../utils/services/api";

const API = Instance.customAxiosInstance();


export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (params) => {
    const { data } = await API.get("/ecommerce/products", params);
    if (data.status === "success") {
      return data && data?.data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
    return data && data?.data;
  },
);

export const getSingleVariant = createAsyncThunk(
  "products/getSingleVariant",
  async (id) => {
    const { data } = await API.get(`ecommerce/products/${id}`);
    if (data.status === "success") {
      return data && data.data && data.data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
    return data;
  },
);

export const getTopSellingItems = createAsyncThunk(
  "products/getTopSellingItems",

  async () => {
    const { data } = await API.get("/ecommerce/products/variants/top-selling");
    if (data.status === "success") {
      return data;
    } else if (data.status === "error") {
      return;
    }
    return data;
  }
);
