import "dotenv/config";
import express from "express";
import cors from "cors";
import downloadRoutes from "./routes/download.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ─── CORS ────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ─── Body Parsing ────────────────────────────────────────────────────────────
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// ─── Request Logger (dev only) ───────────────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
  app.use((req, _res, next) => {
    const ts = new Date().toISOString();
    console.log(`[${ts}] ${req.method} ${req.originalUrl}`);
    next();
  });
}

// ─── Health Check ────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({
    success: true,
    service: "AnyClip API",
    version: "1.0.0",
    status: "operational",
    endpoints: {
      instagram: "POST /api/download/instagram",
      facebook: "POST /api/download/facebook",
      youtube: "POST /api/download/youtube",
    },
  });
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));

// ─── API Routes ──────────────────────────────────────────────────────────────
app.use("/api/download", downloadRoutes);

// ─── Error Handling ──────────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 AnyClip API running on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`   CORS origins: ${allowedOrigins.join(", ")}\n`);
});

export default app;
