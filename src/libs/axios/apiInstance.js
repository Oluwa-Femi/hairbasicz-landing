/* eslint-disable no-undef */
/*
 * NAME: ApiInstance
 * DESCRIPTION:
 *    AN API INSTANCE TO HANDLE API CALLS THAT REQUIRES
 *    SESSION TOKEN AS BEARER TOKEN AUTHORIZATION HEADERS
 * */

import axios from "axios";
import Storage from "../../utils/services/storage";
import { clearStorage } from "../../utils/functions/ClearStorage";

const ApiInstance = axios.create({
  baseURL: process.env.VITE_REACT_APP_PAYSMOSMO_ECOMMERCE_KEY,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

ApiInstance.interceptors.request.use((config) => {
  const auth = Storage.get("user-session-token");

  if (auth) {
    config.headers = {
      Authorization: `Bearer ${auth}`,
    };
  }
  return config;
});

ApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearStorage();
      return (window.location.href = "/login");
    }

    return Promise.reject(error);
  },
);

export default ApiInstance;
