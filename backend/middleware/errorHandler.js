import { fail } from "../utils/response.js";

/**
 * Catch-all for unknown routes.
 */
export function notFoundHandler(req, res) {
  return fail(res, `Route ${req.method} ${req.originalUrl} not found`, 404);
}

/**
 * Global error handler – catches anything thrown in controllers.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  console.error("❌ Unhandled error:", err.message || err);

  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message || "Internal server error";

  return fail(res, message, statusCode);
}
