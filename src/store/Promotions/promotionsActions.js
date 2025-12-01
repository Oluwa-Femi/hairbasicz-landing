import { createAsyncThunk } from "@reduxjs/toolkit";
import responseHandler from "../../utils/notifications/responseHandler";
import Instance from "../../utils/services/api";

export const getBanners = createAsyncThunk(
  "promotions/getBanners",
  async () => {
    const API = Instance.customAxiosInstance();
    const { data } = await API.get("/ecommerce/promotions/banners");
    if (data.status === "success") {
      return data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
    return data;
  },
);

export const getProductsWithDiscount = createAsyncThunk(
  "promotions/getProductsWithDiscount",
  async () => {
    const API = Instance.customAxiosInstance();
    const { data } = await API.get(
      "/ecommerce/products/products-with-discount",
    );
    if (data.status === "success") {
      return data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
    return data;
  },
);
