import path from "path";
import { fileURLToPath } from "url";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as shortUrlServices from "../services/shortURL.services.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createShortURL = asyncHandler(async (req, res) => {
  const { url, customSlug, expiry } = req.body;
  const userId = req.user?._id;

  const shortUrl = await shortUrlServices.createShortUrl(
    { url, customSlug, expiry },
    userId
  );

  return res
    .status(201)
    .json(ApiResponse.success(shortUrl, "URL created successfully!"));
});

export const redirectToUrl = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const redirectUrl = await shortUrlServices.getRedirectUrl(slug);
  if (!redirectUrl) {
    return res
      .status(404)
      .sendFile(path.join(__dirname, "..", "views", "notFound.html"));
  }

  return res.status(301).redirect(redirectUrl);
});

export const getAllUrls = asyncHandler(async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const userId = req.user?._id;

  const urlsData = await shortUrlServices.getAllUrls({ limit, page }, userId);

  return res
    .status(200)
    .json(ApiResponse.success(urlsData, "Urls fetched successfully"));
});

