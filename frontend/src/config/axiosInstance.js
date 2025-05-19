import axios from "axios";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const axiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

export default axiosInstance;
