import { createAsyncThunk } from "@reduxjs/toolkit";
import responseHandler from "../../utils/notifications/responseHandler";
import Instance from "../../utils/services/api";
import Storage from "../../utils/services/storage";

export const getOrders = createAsyncThunk(
  "myorders/getOrders",
  async (params) => {
    const API = Instance.customAxiosInstance(Storage.get("user-session-token"));
    const { data } = await API.get("ecommerce/orders?", params);
    if (data.status === "success") {
      return data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
    return data;
  }
);

export const getAllOrders = createAsyncThunk(
  "myorders/getAllOrders",
  async (params) => {
    const API = Instance.customAxiosInstance(Storage.get("user-session-token"));
    const { data } = await API.get("ecommerce/orders?", params);
    if (data.status === "success") {
      return data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
    return data;
  }
);

export const getSingleOrderDetails = createAsyncThunk(
  "myorders/getSingleOrderDetails",
  async ({ reference }) => {
    const API = Instance.customAxiosInstance(Storage.get("user-session-token"));
    const { data } = await API.get(`ecommerce/orders/${reference}`);
    if (data.status === "success") {
      return data?.data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
    return data?.data;
  }
);

export const createReview = createAsyncThunk(
  "myorders/createReview",
  async (payload) => {
    const API = Instance.customAxiosInstance(Storage.get("user-session-token"));
    const { data } = await API.post(
      `ecommerce/reviews/${payload?.variant_id}`,
      payload?.payload
    );
    if (data.status === "success") {
      responseHandler(data);
    } else if (data.status === "error") {
      responseHandler(data);
    }
  }
);

export const getAllDeliveryLocation = createAsyncThunk(
  "myorders/getAllDeliveryLocation",
  async (payload) => {
    const API = Instance.customAxiosInstance(Storage.get("user-session-token"));
    const { data } = await API.get(`ecommerce/delivery?`, payload);
    if (data.status === "success") {
      return data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
    return data;
  }
);

export const getShippingAddress = createAsyncThunk(
  "myorders/getShippingAddress",
  async () => {
    const API = Instance.customAxiosInstance(Storage.get("user-session-token"));
    const { data } = await API.get(`user/customers/shipping-address`);
    if (data.status === "success") {
      return data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
    return data;
  }
);

export const createOrder = createAsyncThunk(
  "myorders/createOrder",
  async (payload) => {
    const API = Instance.customAxiosInstance(Storage.get("user-session-token"));
    const { data } = await API.post(`ecommerce/orders`, payload?.payload);
    if (data.status === "success") {
      Storage.set("orderRef", JSON.stringify(data?.data?.order?.reference));
      payload.setOpenSuccessModal(true);
    } else if (data.status === "error") {
      responseHandler(data);
      if (
        data.message === "Please complete your profile before you can order"
      ) {
        Storage.set("fromCartToProfilePage", true);
        payload.navigate("/store/profile");
      }
    }
  }
);

export const checkout = createAsyncThunk(
  "myorders/checkout",
  async (payload) => {
    const API = Instance.customAxiosInstance(Storage.get("user-session-token"));
    const { data } = await API.post(
      `ecommerce/orders/${payload?.reference}/checkout`,
      payload?.payload
    );
    if (data.status === "success") {
      responseHandler(data);
      payload.navigate(
        `/store/profile/order-history/${payload?.reference}/paid`
      );
    } else if (data.status === "error") {
      responseHandler(data);
    }
  }
);
