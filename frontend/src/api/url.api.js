import axiosInstance from "../config/axiosInstance";

export const createShortURL = async ({ url, expiry }) => {
  try {
    const response = await axiosInstance.post("api/v1/url/", { url, expiry });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
