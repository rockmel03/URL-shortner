import { nanoid } from "nanoid";

export const generateSlug = (size = 8) => {
  return nanoid(size);
};

export function normalizeUrl(url) {
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  try {
    const parsed = new URL(url);
    return parsed.href;
  } catch (e) {
    return null;
  }
}
