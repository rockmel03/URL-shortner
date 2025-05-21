import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { cookieOptions } from "../config/cookieOptions.js";
import authService from "../services/auth.services.js";

const register = asyncHandler(async (req, res, next) => {
  const { user, accessToken, refreshToken } = await authService.registerUser(
    req.body
  );

  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.status(201).json(
    ApiResponse.success(
      {
        accessToken,
        refreshToken,
        user,
      },
      "User created successfully",
      201
    )
  );
});

const login = asyncHandler(async (req, res, next) => {
  const { user, accessToken, refreshToken } = await authService.loginUser(
    req.body
  );

  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.status(200).json(
    ApiResponse.success(
      {
        accessToken,
        refreshToken,
        user,
      },
      "Logged in successfully"
    )
  );
});

const refreshTokens = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  const { accessToken, refreshToken } = await authService.refreshUserToken(
    token
  );

  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.status(200).json(
    ApiResponse.success(
      {
        accessToken,
        refreshToken,
      },
      "Access token generated successfully"
    )
  );
});

const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("refreshToken");
  res.status(200).json(ApiResponse.success({}, "Logged out successfully"));
});

export default { register, login, refreshTokens, logout };
