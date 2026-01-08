import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    
    
    title: { type: String, required: true },
    rating: { type: Number, required: true }, // vote_average -> rating
    duration: { type: Number, required: true }, // runtime -> duration
    releaseDate: { type: Date, required: true }, // release_date -> releaseDate
    poster: { type: String, required: true }, // poster_path -> poster
    description: { type: String, required: true }, // overview -> description
  
    
  },
  { timestamps: true }
);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
