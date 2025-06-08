import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import db from "./config/db";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes";
import { ERROR } from "./utils/httpStatus";
import mediaRoutes from "./routes/mediaRoutes";
import path from "path";

// Load environment variables
dotenv.config();

// Initialize Express application
const app = express();
const PORT = process.env.PORT;

// Database Connection
db();

// Security Middleware
app.use(helmet()); // Sets various security-related HTTP headers
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// for Cross-Origin Opener Policy and Resource Policy
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// Static File Serving for Uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rate Limiting (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

// Body Parsing Middleware
app.use(express.json({ limit: "10mb" })); // For JSON payloads
app.use(express.urlencoded({ extended: true, limit: "100mb" })); // For form data

// API Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/media", mediaRoutes); // Protected media routes

// Error Handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const appError = err as any;
  res.status(appError.statusCode || 500).json({
    status: appError.statusText || ERROR,
    message: err.message,
    code: appError.statusCode || 500,
    data: null,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
