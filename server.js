import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";

import movieRouter from "./routes/movieRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();
const port = 3000;

await connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Server is Live!"));
app.use("/api/auth", authRouter);
app.use("/api/movie", movieRouter);

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
