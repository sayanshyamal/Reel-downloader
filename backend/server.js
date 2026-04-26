import "dotenv/config";
import express from "express";
import cors from "cors";
import downloadRoutes from "./routes/download.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ─── CORS ────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  "https://reels.sayan.studio",
  "http://localhost:3000",
  "http://localhost:3001"
];

// Add any extra origins from environment variable
if (process.env.CORS_ORIGINS) {
  process.env.CORS_ORIGINS.split(",").forEach((o) => {
    const origin = o.trim();
    if (origin && !allowedOrigins.includes(origin)) {
      allowedOrigins.push(origin);
    }
  });
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS Policy Error: Origin ${origin} is not allowed.`));
    }
  },
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Explicitly handle preflight (OPTIONS) requests for all routes to ensure the browser doesn't block them
app.options("*", cors(corsOptions));

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
