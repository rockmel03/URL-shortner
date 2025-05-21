import axiosInstance from "../config/axiosInstance";

const register = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const login = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const refreshTokens = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/refresh-tokens", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const logout = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/logout", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { register, login, refreshTokens, logout };
