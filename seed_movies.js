import axios from "axios";
import mongoose from "mongoose";
import Movie from "./models/Movie.js";
import "dotenv/config";

// Simulating the "Lazy Insertion" Queue Worker behavior
const populateMovies = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        console.log("Using Mock Data (API Key Invalid)...");

        const movies = [
            {
                title: "The Shawshank Redemption",
               rating: 8.7,
                duration: 142,
                releaseDate: new Date("1994-09-23"),
                poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
             
            },
            {
                title: "The Godfather",
               rating: 8.7,
                duration: 175,
                releaseDate: new Date("1972-03-14"),
                poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
               
            },
            {
                title: "The Dark Knight",
                rating: 8.5,
                duration: 152,
                releaseDate: new Date("2008-07-16"),
                poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
               
            },
             {
                title: "Schindler's List",
                rating: 8.6,
                duration: 195,
                releaseDate: new Date("1993-12-15"),
                poster: "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
               
            },
            {
                title: "12 Angry Men",
                rating: 8.5,
                duration: 96,
                releaseDate: new Date("1957-04-10"),
                poster: "https://image.tmdb.org/t/p/w500/ow3wq89wM8qd5X7hFZkIyburMx4.jpg",
               
            },
            {
                title: "Dilwale Dulhania Le Jayenge",
                rating: 8.6,
                duration: 190,
                releaseDate: new Date("1995-10-19"),
                poster: "https://image.tmdb.org/t/p/w500/lfRkUr7DYdHldAqi3PwdQGBRBPM.jpg",
               
            },
            {
                title: "Spirited Away",
                rating: 8.5,
                duration: 125,
                releaseDate: new Date("2001-07-20"),
                poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUKGnSxQb9mn.jpg",
               
            },
            {
                title: "Parasite",
                rating: 8.5,
                duration: 132,
                releaseDate: new Date("2019-05-30"),
                poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
                
            }
        ];

        console.log(`Seeding ${movies.length} mock movies...`);

        for (const m of movies) {
           const movieData = {
               title: m.title,
               rating: m.rating,
               duration: m.duration,
               releaseDate: m.releaseDate,
               poster: m.poster,
           };
           
           // Upsert to avoid duplicates
           await Movie.findOneAndUpdate({ title: m.title }, movieData, { upsert: true, new: true });
        }

        console.log("Movies Inserted/Updated Successfully!");
        process.exit(0);

    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

populateMovies();
