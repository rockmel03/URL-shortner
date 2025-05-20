import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import userModel from "../models/user.model.js";
import { cookieOptions } from "../config/cookieOptions.js";

const generateTokensAndCookie = (user) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return { accessToken, refreshToken };
};

const register = asyncHandler(async (req, res, next) => {
  validateRequest(req);

  const { name, email, password, username } = req.body;
  const user = await userModel.create({ name, email, password, username });
  const { accessToken, refreshToken } = generateTokensAndCookie(user, res);

  res.cookie("refreshToken", refreshToken, cookieOptions);
  res
    .status(201)
    .send(
      new ApiResponse(201, "User created successfully", { accessToken, user })
    );
});

const login = asyncHandler(async (req, res, next) => {
  validateRequest(req);

  const { email, password, username } = req.body;
  const user = await userModel.findOne({ $or: [{ email }, { username }] });
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new ApiError(401, "Invalid email or password");
  }

  const { accessToken, refreshToken } = generateTokensAndCookie(user, res);

  res.cookie("refreshToken", refreshToken, cookieOptions);
  res
    .status(200)
    .send(
      new ApiResponse(200, "Logged in successfully", { accessToken, user })
    );
});

const refreshToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new ApiError(401, "Unauthorized");
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const user = await userModel.findById(decoded._id);
  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }

  const accessToken = user.generateAccessToken();

  //   res.cookie("refreshToken", refreshToken, cookieOptions);
  res.status(200).send(
    new ApiResponse(200, "Access token generated successfully", {
      accessToken,
    })
  );
});

const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("refreshToken");
  res.status(200).send(new ApiResponse(200, "Logged out successfully"));
});

export { register, login, refreshToken, logout };
