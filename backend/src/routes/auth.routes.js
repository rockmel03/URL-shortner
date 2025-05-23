import express from "express";
import { body } from "express-validator";
import validateRequest from "../middlewares/validate.middleware.js";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").isLength({ min: 3, max: 50 }),
    body("email").isEmail(),
    body("password").isLength({ min: 8, max: 128 }),
    body("username").isLength({ min: 3, max: 50 }),
    validateRequest,
  ],
  authController.register
);

router.post(
  "/login",
  [
    body("email").optional().isEmail(),
    body("username").optional().isLength({ min: 3, max: 50 }),
    body("password").isLength({ min: 8, max: 128 }),
    validateRequest,
  ],
  authController.login
);

router.post(
  "/refresh-token",
  [body("refreshToken").optional().isJWT(), validateRequest],
  authController.refreshTokens
);

router.post("/logout", validateRequest, authController.logout);

export default router;
