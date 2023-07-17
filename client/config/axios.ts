import axios from "axios";
import { tokenDetailsCookie } from "@/lib/cookie";
import { logout, refreshToken } from "@/lib/authHelper";
import cookie from "js-cookie";

export const axiosClient = axios.create();

axiosClient.interceptors.request.use(
  (config) => {
    console.log("axiosClient", tokenDetailsCookie.getJson);
    console.log("jsCookie", JSON.parse(cookie.get("token_details") || "{}"));
    const accessToken = tokenDetailsCookie.getJson?.accessToken;
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    throw error;
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      console.log("error", error.response);
      if (
        error.response.status == 401 &&
        error.response.data.error.message.message === "TokenExpired"
      ) {
        console.log("running if condition");
        const originalConfig = error.config;
        console.log("originalConfig", originalConfig);
        if (!originalConfig._retry) {
          originalConfig._retry = true;

          console.log("running origin config conditon");
          try {
            console.log("running refreshToken try block");
            await refreshToken();
            console.log("returning axios return data");
            return axios(originalConfig);
          } catch (error) {
            logout();
            return new Promise(() => {});
          }
        }
      }
    }
    return Promise.reject(error);
  }
);
