import axiosInstance from "../config/axiosInstance";

export const register = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/register", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/login", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const refreshTokens = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/auth/refresh-tokens",
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/logout", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
