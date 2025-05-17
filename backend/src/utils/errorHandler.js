import ApiError from "./ApiError.js";

export default function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      ...err,
    });
  }
  console.log(err);
  return res.status(500).json(new ApiError(500, "Internal Server Error"));
}
