import { Router } from "express";
import { body } from "express-validator";
import { createShortURL } from "../controllers/shortURL.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import validateRequest from "../middlewares/validate.middleware.js";

const router = Router();

router.route("/").post(
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
