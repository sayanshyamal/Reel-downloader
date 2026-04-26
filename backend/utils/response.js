/**
 * Standardised JSON response helpers.
 * Every API response uses the same shape for consistency.
 */

export const ok = (res, data, statusCode = 200) =>
  res.status(statusCode).json({ success: true, ...data });

export const fail = (res, message, statusCode = 400, extra = {}) =>
  res.status(statusCode).json({ success: false, error: message, ...extra });
