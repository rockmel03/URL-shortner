import axios from "axios";
import store from "../app/store";
import { refreshTokens } from "../api/auth.api";
import { logout, setToken } from "../features/auth/authSlice";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const axiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = store.getState().auth.token;
    if (token && !request.headers.Authorization) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

//flag to prevent infinite loop
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReqest = error.config;

    if (error.response?.status === 401 && !originalReqest._retry) {
      if (isRefreshing) {
        return Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalReqest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalReqest);
        });
      }

      originalReqest._retry = true;
      isRefreshing = true;
      console.log("refreshing token...");

      try {
        const response = await refreshTokens();
        const accessToken = response.data.accessToken;
        store.dispatch(setToken(accessToken));
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        processQueue(null, accessToken);
        return axiosInstance(originalReqest);
      } catch (err) {
        processQueue(err, null);

        store.dispatch(logout());
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
