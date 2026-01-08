import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
// import { clerkMiddleware } from "@clerk/express"; // Removed Clerk
// Inngest integration removed (local ./inngest/index.js missing)
// If you later add an `inngest` integration, re-enable these imports:
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js";

import movieRouter from "./routes/movieRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();
const port = 3000;

await connectDB();

// Middleware
app.use(express.json());
app.use(cors());
// app.use(clerkMiddleware()); // Removed Clerk

// API Routes
app.get("/", (req, res) => res.send("Server is Live!"));
app.use("/api/auth", authRouter); // New Auth Routes
app.use('/api/movie', movieRouter);

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
