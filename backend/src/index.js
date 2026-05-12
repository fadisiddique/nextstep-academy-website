require("dotenv").config();
require("express-async-errors");

const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const helmet   = require("helmet");
const morgan   = require("morgan");
const rateLimit = require("express-rate-limit");

const authRoutes         = require("./routes/auth");
const courseRoutes       = require("./routes/courses");
const testimonialRoutes  = require("./routes/testimonials");
const leadRoutes         = require("./routes/leads");
const dashboardRoutes    = require("./routes/dashboard");
const contactRoutes      = require("./routes/contact");
const tutorRoutes        = require("./routes/tutorApplications");
const errorHandler       = require("./middleware/errorHandler");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://nextstepacademyonline.in",
    "https://www.nextstepacademyonline.in",
    "https://nextstep-academy-website.vercel.app"
  ],
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

// ── Rate limiting ──────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,
  message: { success: false, message: "Too many requests, please try again later." },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many login attempts, please try again later." },
});

app.use("/api", apiLimiter);
app.use("/api/auth/login", authLimiter);

// ── Routes ─────────────────────────────────────────────────────────────────
app.use("/api/auth",              authRoutes);
app.use("/api/courses",           courseRoutes);
app.use("/api/testimonials",      testimonialRoutes);
app.use("/api/leads",             leadRoutes);
app.use("/api/dashboard",         dashboardRoutes);
app.use("/api/contact",           contactRoutes);
app.use("/api/tutor-applications",tutorRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.json({ success: true, message: "NextStep Academy API is healthy 🎓", timestamp: new Date() });
});

// 404
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use(errorHandler);

// ── DB + Server ────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/nextstep-academy")
  .then(() => {
    console.log("✅  MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀  NextStep Academy API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌  MongoDB connection error:", err);
    process.exit(1);
  });

module.exports = app;
