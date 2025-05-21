import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import userModel from "../models/user.model.js";

const generateTokens = (user) => {
  if (!user) {
    throw new ApiError(500, "User not found");
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  if (!accessToken || !refreshToken) {
    throw new ApiError(500, "Failed to generate tokens");
  }

  return { accessToken, refreshToken };
};

const registerUser = async (userData) => {
  const { name, email, password, username } = userData;
  const user = await userModel.create({ name, email, password, username });
  const { accessToken, refreshToken } = generateTokens(user);

  const userObject = user.toObject();
  delete userObject.password;

  return { user: userObject, accessToken, refreshToken };
};

const loginUser = async (credentials) => {
  const { email, password, username } = credentials;
  const user = await userModel.findOne({ $or: [{ email }, { username }] });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new ApiError(401, "Invalid email or password");
  }

  const { accessToken, refreshToken } = generateTokens(user);

  const userObject = user.toObject();
  delete userObject.password;

  return { user: userObject, accessToken, refreshToken };
};

const refreshUserToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, "No token provided");
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const user = await userModel.findById(decoded._id);

  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }

  const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

  return { accessToken, refreshToken: newRefreshToken };
};

export default {
  registerUser,
  loginUser,
  refreshUserToken,
};
