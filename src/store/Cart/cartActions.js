import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import responseHandler from "../../utils/notifications/responseHandler";
import Instance from "../../utils/services/api";
import Storage from "../../utils/services/storage";

export const userInstorage = () => {
  const jwt_Token_decoded =
    Storage.get("user-session-token") &&
    jwt_decode(Storage.get("user-session-token"));
  const tokenIsActive = jwt_Token_decoded?.exp * 1000 > Date.now();

  return tokenIsActive;
};

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (payload) => {
    if (userInstorage()) {
      const API = Instance.customAxiosInstance(
        Storage.get("user-session-token")
      );
      const { data } = await API.post("ecommerce/carts", payload);
      if (data.status === "success") {
        return data;
      } else if (data.status === "error") {
        responseHandler(data);
      }
      return data;
    } else {
      Storage.set("localCart", JSON.stringify(payload));
    }
  }
);

export const getCart = createAsyncThunk("cart/getCart", async () => {
  if (userInstorage()) {
    const API = Instance.customAxiosInstance(Storage.get("user-session-token"));

    const { data } = await API.get("ecommerce/carts");
    if (data.status === "success") {
      return data;
    } else if (data.status === "error") {
      //disable alert in handler because it is used on the login page
      responseHandler(data);
    }
    return data;
  } else {
    const result = JSON.parse(Storage.get("localCart"));
    const newData = {
      data: result.carts.data
    };
    return newData;
  }
});

export const removeProductFromCart = createAsyncThunk(
  "cart/removeProductFromCart",
  async (payload) => {
    if (userInstorage()) {
      const API = Instance.customAxiosInstance(
        Storage.get("user-session-token")
      );
      const { data } = await API.patch("ecommerce/carts", payload);
      if (data.status === "success") {
        // return data;
      } else if (data.status === "error") {
        responseHandler(data);
      }
      return data;
    } else {
      const localCart = JSON.parse(Storage.get("localCart"));
      const localCartArray = localCart?.carts?.data?.cart;
      const newLocalCart = [...localCartArray];
      newLocalCart.splice(payload, 1);
      const newLocalStorageCart = {
        carts: {
          data: {
            cart: newLocalCart
          }
        }
      };

      Storage.set("localCart", JSON.stringify(newLocalStorageCart));
    }
  }
);

export const editCart = createAsyncThunk("cart/editCart", async (payload) => {
  if (userInstorage()) {
    const API = Instance.customAxiosInstance(Storage.get("user-session-token"));
    const { data } = await API.put("ecommerce/carts", payload);
    if (data.status === "success") {
      return data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
    return data;
  } else {
    const localPayload = {
      carts: {
        data: {
          cart: payload
        }
      }
    };
    return Storage.set("localCart", JSON.stringify(localPayload));
  }
});

export const getSavingsBalances = createAsyncThunk(
  "cart/getSavingsBalances",
  async (params) => {
    const API = Instance.customAxiosInstance(Storage.get("user-session-token"));
    const { data } = await API.get("savings/wallets", params);
    if (data.status === "success") {
      return data;
    } else if (data.status === "error") {
      responseHandler(data);
    }
    return data;
  }
);
