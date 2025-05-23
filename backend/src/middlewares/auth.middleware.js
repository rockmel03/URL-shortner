import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export const authMiddleware = ({ optional = false, roles = [] } = {}) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers?.authorization || "";
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

      if (optional && !token) return next();

      if (!token) {
        return res.status(401).json(ApiError.authError("Missing auth token"));
      }

      try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
      } catch (err) {
        return res
          .status(401)
          .json(ApiError.authError("Invalid or expired auth token"));
      }

      if (
        roles.length > 0 &&
        (!req.user?.role || !roles.includes(req.user.role))
      ) {
        return res.status(403).json(ApiError.authError("Access denied"));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
