const isProduction = process.env.NODE_ENV === "production";

export const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "Strict" : "Lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
