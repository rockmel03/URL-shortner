import ShortURL from "../models/shortURL.model.js";
import ApiError from "../utils/ApiError.js";
import { generateSlug, normalizeUrl } from "../utils/helper.js";

/**
 *
 * @param {String} url - url must follow http(s) protocol
 * @param {MongoId} userId - valid mongo userId
 * @param {DateISOString} expiry - ISO date string, if `userId` is not provided expiry will set to 1hour
 * @returns short URL Object
 */
export const createShortUrl = async (url, userId, expiry) => {
  if (!url) throw new Error("url not found");

  const normalized = normalizeUrl(url);
  if (!normalized) throw new ApiError(403, "Invalid URL format");

  const slug = generateSlug();
  const shortUrl = new ShortURL({
    originalUrl: normalized,
    shortUrl: slug,
  });

  if (!userId && !expiry) {
    shortUrl.expiry = new Date(
      new Date().setHours(new Date().getHours() + 1)
    ).toISOString();
  }

  if (userId) shortUrl.userId = userId;
  if (expiry) shortUrl.expiry = expiry;

  const savedUrl = await shortUrl.save();

  const shortUrlWithDomain = `${process.env.SERVER_DOMAIN}/${shortUrl.shortUrl}`;
  const normalizeShortURL = normalizeUrl(shortUrlWithDomain);

  const data = savedUrl.toObject();
  data.shortUrl = normalizeShortURL;

  return data;
};

/**
 *
 * @param {String} slug - slug value of shortURL
 * @returns redirect URL
 */
export const getRedirectUrl = async (slug) => {
  if (!slug) throw new Error("slug not found");

  const shortUrlData = await ShortURL.findOneAndUpdate(
    { shortUrl: slug },
    { $inc: { clickCount: 1 } }
  );

  if (!shortUrlData) return null;

  // todo: delete document if it is expried and return null

  return shortUrlData.originalUrl;
};
