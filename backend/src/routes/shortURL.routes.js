import { Router } from "express";
import { body, query } from "express-validator";
import {
  createShortURL,
  getAllUrls,
} from "../controllers/shortURL.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import validateRequest from "../middlewares/validate.middleware.js";

const router = Router();

router
  .route("/")
  .get(
    [
      query("limit")
        .default(10)
        .isInt()
        .withMessage("limit must be an integer"),
      query("page").default(1).isInt().withMessage("page must be an number"),
    ],
    validateRequest,
    authMiddleware(),
    getAllUrls
  )
  .post(
    [
      body("url")
        .isURL({
          protocols: ["http", "https"],
        })
        .withMessage("Invalid Url format"),
      body("customSlug")
        .optional()
        .isString()
        .isLength({ min: 6, max: 10 })
        .withMessage("custom slug must be 6-10 characters long"),
      body("expiry").optional().isDate().withMessage("expiry must be a Date"),
    ],
    validateRequest,
    authMiddleware({ optional: true }),
    createShortURL
  );

export default router;
