import { Router } from "express";
import { createShortURL } from "../controllers/shortURL.controller.js";

const router = Router();

router.route("/").post(createShortURL);

export default router;
