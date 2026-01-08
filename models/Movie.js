import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    duration: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    poster: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
