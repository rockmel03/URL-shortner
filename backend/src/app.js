import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";

import ApiResponse from "./utils/ApiResponse.js";
import errorHandler from "./utils/errorHandler.js";
import { corsOptions } from "./config/CORS.config.js";

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors(corsOptions)); // cors setup
app.use(cookieParser()); // cookie parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public"))); // serves static file
app.use(morgan("dev")); // request logger

import shortUrlRouter from "./routes/shortURL.routes.js";
import { redirectToUrl } from "./controllers/shortURL.controller.js";
import authRouter from "./routes/auth.routes.js";

app.get("/", (req, res) => {
  res.status(200).json(ApiResponse.success({}, "Hello world"));
});

app.get("/:slug", redirectToUrl);
app.use("/api/v1/url", shortUrlRouter);
app.use("/api/v1/auth", authRouter);

// default error handler
app.use(errorHandler);

export default app;
