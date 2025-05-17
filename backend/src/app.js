import express from "express";
import errorHandler from "./utils/errorHandler.js";
import ApiResponse from "./utils/ApiResponse.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json(ApiResponse.success({}, "Hello world"));
});

// default error handler
app.use(errorHandler);

export default app;
