import axios from "axios";
import { create } from "apisauce";

class Instance {
  static customAxiosInstance(token) {
    const customAxiosInstance = axios.create({
      baseURL: process.env.VITE_REACT_APP_PAYSMOSMO_ECOMMERCE_KEY,
      responseType: "json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const apisauceInstance = create({
      axiosInstance: customAxiosInstance,
    });
    return apisauceInstance;
  }
}

export default Instance;
