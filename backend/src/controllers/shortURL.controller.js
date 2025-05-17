import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ShortURL from "../models/shortURL.model.js";
import ApiError from "../utils/ApiError.js";
import { normalizeUrl } from "../utils/helper.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createShortURL = asyncHandler(async (req, res) => {
  const { url, expiry } = req.body;
  if (!url) throw ApiError.validationError([{ message: "url not found" }]);

  const normalized = normalizeUrl(url);
  if (!normalized) {
    throw ApiError.validationError([{ message: "Invalid URL format" }]);
  }

  const id = nanoid(8);
  const shortUrl = new ShortURL({
    originalUrl: normalized,
    shortUrl: id,
  });

  await shortUrl.save();

  return res
    .status(201)
    .json(ApiResponse.success(shortUrl, "URL created successfully!"));
});

export const redirectToUrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id)
    throw ApiError.validationError([{ message: "id not found in params" }]);

  const urlData = await ShortURL.findOne({ shortUrl: id });
  if (!urlData) {
    return res
      .status(404)
      .sendFile(path.join(__dirname, "..", "views", "notFound.html"));
  }

  return res.status(301).redirect(urlData.originalUrl);
});
