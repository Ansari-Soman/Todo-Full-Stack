import axios from "axios";
import { AppProperties } from "./AppProperties";
import { callLogoutHandler } from "../Services/authEvents";

const axiosInstance = axios.create({
  baseURL: AppProperties.BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },

  (error) => {
    const normalized = {
      message: "Someting went wrong",
      status: error?.response?.status ?? null,
      raw: error,
    };
    if (error.response?.status === 401) {
      const didLogout = callLogoutHandler();
      if (didLogout) {
        window.location.replace("/login");
      }
    } else if (error?.response?.data) {
      normalized.message =
        error.response.data.message ||
        (Array.isArray(error.response.data.errors) &&
          error.response.data.errors[0]) ||
        normalized.message;
    } else if (error.code === "ECONNABORTED") {
      normalized.message = "Request timeout. Please try again.";
    } else if (!error.response) {
      normalized.message =
        error.message || "Network error. Please check your connection.";
    }

    return Promise.reject(normalized);
  }
);

export default axiosInstance;
