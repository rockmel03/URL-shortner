import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import ApiResponse from "./utils/ApiResponse.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serves static file
app.use(express.static(path.join(__dirname, "..", "public")));

// request logger
app.use(morgan("dev"));

import shortUrlRouter from "./routes/shortURL.routes.js";
import { redirectToUrl } from "./controllers/shortURL.controller.js";

app.get("/", (req, res) => {
  res.status(200).json(ApiResponse.success({}, "Hello world"));
});

app.get("/:slug", redirectToUrl);
app.use("/api/v1/url", shortUrlRouter);

// default error handler
app.use(errorHandler);

export default app;
