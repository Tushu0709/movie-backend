import Movie from "../models/Movie.js";

// Public: Get All Movies with Pagination, Sorting, Searching
export const getMovies = async (req, res) => {
  try {
    const { q, sort, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (q) {
      query = {
        $or: [
          { title: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } }
        ]
      };
    }

    let sortOptions = {};
    if (sort) {
        // Mapping sort keys from frontend to DB
        // Frontend: Name, Rating, Release Date, Duration
        if(sort === 'name') sortOptions = { title: 1 };
        else if(sort === 'rating') sortOptions = { rating: -1 };
        else if(sort === 'date') sortOptions = { releaseDate: -1 };
        else if(sort === 'duration') sortOptions = { duration: -1 };
    } else {
        sortOptions = { releaseDate: -1 };
    }

    const movies = await Movie.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Movie.countDocuments(query);

    res.json({
      success: true,
      movies,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Add Movie
export const addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({ success: true, movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update Movie
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete Movie
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.json({ success: true, message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Public: Get Single Movie by ID
export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    res.json({ success: true, movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
