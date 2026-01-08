import express from "express";
import { getMovies, getMovieById, addMovie, updateMovie, deleteMovie } from "../controller/movieController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const movieRouter = express.Router();

// Public Routes
movieRouter.get("/", getMovies); // Handles /movies, /movies/search (via query), /movies/sorted (via query)
movieRouter.get("/:id", getMovieById);

// Admin Routes (Protected)
movieRouter.post("/", authMiddleware, adminOnly, addMovie);
movieRouter.put("/:id", authMiddleware, adminOnly, updateMovie);
movieRouter.delete("/:id", authMiddleware, adminOnly, deleteMovie);

export default movieRouter;
