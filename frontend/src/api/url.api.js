import axiosInstance from "../config/axiosInstance";

export const createShortURL = async (data) => {
  try {
    const response = await axiosInstance.post("api/v1/url/", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
