import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  discoverMovies,
  getMovieDetails,
  getMovieExtendedDetails,
} from "./tmdb";
import { z } from "zod";
import { insertUserActivitySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const router = express.Router();

  // Initialize a default user if none exists (for demo purposes)
  router.get("/init", async (req: Request, res: Response) => {
    try {
      // Check if user 1 exists
      const userId = 1;
      const existingUser = await storage.getUser(userId);

      if (!existingUser) {
        // Create default user
        await storage.createUser({
          id: userId,
          username: "demo_user",
          email: "demo@example.com",
          password_hash: "demo_password",
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      // Check if user preferences exist
      const existingPrefs = await storage.getUserPreferences(userId);

      if (!existingPrefs) {
        // Create default user preferences
        await storage.createUserPreferences({
          id: 0, // Will be set by storage
          user_id: userId,
          liked_genres: {},
          liked_movies: [],
          disliked_movies: [],
          streaming_services: {},
        });
      }

      res.json({
        success: true,
        message: "Default user initialized",
      });
    } catch (error: any) {
      console.error("Error initializing default user:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });

  // Get movies with filtering
  router.get("/movies", async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;

      // Parse filter parameters
      const filters: any = {};
      if (req.query.genres) {
        filters.genres = (req.query.genres as string).split(",");
      }
      if (req.query.moods) {
        filters.moods = (req.query.moods as string).split(",");
      }
      if (req.query.streamingServices) {
        filters.streamingServices = (
          req.query.streamingServices as string
        ).split(",");
      }

      // Check if we need to fetch from TMDB or use local storage
      let movies = await storage.getMovies({ limit, offset, filters });

      // If no movies in storage, fetch from TMDB
      if (movies.length === 0) {
        const tmdbMovies = await discoverMovies(page);

        // Save to storage
        for (const movie of tmdbMovies) {
          await storage.createMovie({
            ...movie,
            genres: movie.genres as unknown as JSON,
            streaming_services: movie.streaming_services as unknown as JSON,
          });
        }

        // Retrieve with filters
        movies = await storage.getMovies({ limit, offset, filters });
      }

      res.json({
        movies,
        pagination: {
          page,
          limit,
          total: movies.length,
        },
      });
    } catch (error: any) {
      console.error("Error fetching movies:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Get a single movie
  router.get("/movies/:id", async (req: Request, res: Response) => {
    try {
      const movieId = parseInt(req.params.id);

      // Check if movie exists in storage
      let movie = await storage.getMovie(movieId);

      // If not in storage, fetch from TMDB and save
      if (!movie) {
        const tmdbMovie = await getMovieDetails(movieId);

        if (tmdbMovie) {
          await storage.createMovie({
            ...tmdbMovie,
            genres: tmdbMovie.genres as unknown as JSON,
            streaming_services: tmdbMovie.streaming_services as unknown as JSON,
          });
          movie = tmdbMovie;
        } else {
          return res.status(404).json({ message: "Movie not found" });
        }
      }

      res.json(movie);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get detailed movie information including cast, director and trailer
  router.get("/movies/:id/details", async (req: Request, res: Response) => {
    try {
      const movieId = parseInt(req.params.id);

      // Fetch basic movie data
      let movie = await storage.getMovie(movieId);

      if (!movie) {
        // If not in storage, fetch from TMDB and save
        const tmdbMovie = await getMovieDetails(movieId);

        if (tmdbMovie) {
          await storage.createMovie({
            ...tmdbMovie,
            genres: tmdbMovie.genres as unknown as JSON,
            streaming_services: tmdbMovie.streaming_services as unknown as JSON,
          });
          movie = tmdbMovie;
        } else {
          return res.status(404).json({ message: "Movie not found" });
        }
      }

      // Fetch additional details from TMDB
      const tmdbDetails = await getMovieExtendedDetails(movieId);

      // Combine basic movie data with extended details
      const fullMovieDetails = {
        ...movie,
        ...tmdbDetails,
      };

      res.json(fullMovieDetails);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Like or dislike a movie
  router.post("/movies/:id/interact", async (req: Request, res: Response) => {
    try {
      const movieId = parseInt(req.params.id);
      const userId = req.body.userId || 1; // Default to user 1 for demo

      // Validate request
      const schema = z.object({
        action: z.enum(["liked", "disliked"]),
      });

      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ message: "Invalid request", errors: result.error });
      }

      const { action } = result.data;

      // Get the movie
      const movie = await storage.getMovie(movieId);
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      // Get or create user preferences
      let userPrefs = await storage.getUserPreferences(userId);

      if (!userPrefs) {
        userPrefs = await storage.createUserPreferences({
          id: 0, // Will be set by storage
          user_id: userId,
          liked_genres: {},
          liked_movies: [],
          disliked_movies: [],
          streaming_services: {},
        });
      }

      // Update preferences based on action
      if (action === "liked") {
        // Add to liked movies if not already there
        if (!(userPrefs.liked_movies as number[]).includes(movieId)) {
          const likedMovies = [
            ...(userPrefs.liked_movies as number[]),
            movieId,
          ];

          // Update genre counts
          const likedGenres = {
            ...(userPrefs.liked_genres as Record<string, number>),
          };
          const movieGenres = movie.genres as string[];
          for (const genre of movieGenres) {
            likedGenres[genre] = (likedGenres[genre] || 0) + 1;
          }

          // Update streaming service counts
          const streamingServices = {
            ...(userPrefs.streaming_services as Record<string, number>),
          };
          const movieStreamingServices = movie.streaming_services as string[];
          for (const service of movieStreamingServices) {
            streamingServices[service] = (streamingServices[service] || 0) + 1;
          }

          await storage.updateUserPreferences(userId, {
            liked_movies: likedMovies,
            liked_genres: likedGenres,
            streaming_services: streamingServices,
          });
        }
      } else {
        // Add to disliked movies if not already there
        if (!(userPrefs.disliked_movies as number[]).includes(movieId)) {
          const dislikedMovies = [
            ...(userPrefs.disliked_movies as number[]),
            movieId,
          ];
          await storage.updateUserPreferences(userId, {
            disliked_movies: dislikedMovies,
          });
        }
      }

      // Record activity
      await storage.createUserActivity({
        id: 0, // Will be set by storage
        user_id: userId,
        movie_id: movieId,
        action,
        timestamp: new Date(),
      });

      res.json({ message: "Preference updated" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get user's liked movies
  router.get("/users/:id/liked", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);

      const likedMovies = await storage.getLikedMovies(userId);

      res.json(likedMovies);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get user's statistics
  router.get("/users/:id/stats", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);

      // Get user preferences and activity
      const preferences = await storage.getUserPreferences(userId);
      const activities = await storage.getUserActivity(userId);

      if (!preferences) {
        return res.status(404).json({ message: "User preferences not found" });
      }

      // Calculate statistics
      const likedMovies = (preferences.liked_movies as number[]).length;
      const dislikedMovies = (preferences.disliked_movies as number[]).length;
      const totalMovies = likedMovies + dislikedMovies;

      const likeRate =
        totalMovies > 0 ? Math.round((likedMovies / totalMovies) * 100) : 0;

      // Get average rating of liked movies
      let totalRating = 0;
      let ratedMovies = 0;

      for (const movieId of preferences.liked_movies as number[]) {
        const movie = await storage.getMovie(movieId);
        if (movie && movie.vote_average) {
          totalRating += movie.vote_average;
          ratedMovies++;
        }
      }

      const avgRating =
        ratedMovies > 0 ? (totalRating / ratedMovies).toFixed(1) : "0.0";

      // Get top genres
      const likedGenres = preferences.liked_genres as Record<string, number>;
      const sortedGenres = Object.entries(likedGenres)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([genre, count]) => {
          const percentage =
            totalMovies > 0 ? Math.round((count / totalMovies) * 100) : 0;
          return { genre, count, percentage };
        });

      // Get streaming platform counts
      const streamingServices = preferences.streaming_services as Record<
        string,
        number
      >;
      const sortedServices = Object.entries(streamingServices)
        .sort((a, b) => b[1] - a[1])
        .map(([service, count]) => ({ service, count }));

      // Get recent activity
      const recentActivity = activities
        .sort((a, b) => {
          return (
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
        })
        .slice(0, 5)
        .map(async (activity) => {
          const movie = await storage.getMovie(activity.movie_id);
          return {
            action: activity.action,
            movieTitle: movie?.title || "Unknown Movie",
            timestamp: activity.timestamp,
          };
        });

      const resolvedActivity = await Promise.all(recentActivity);

      res.json({
        moviesViewed: totalMovies,
        favorites: likedMovies,
        likeRate,
        avgRating,
        topGenres: sortedGenres,
        streamingServices: sortedServices,
        recentActivity: resolvedActivity,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get recommended movies for a user
  router.get(
    "/users/:id/recommendations",
    async (req: Request, res: Response) => {
      try {
        const userId = parseInt(req.params.id);
        const limit = parseInt(req.query.limit as string) || 10;

        const recommendations = await storage.getRecommendedMovies(
          userId,
          limit
        );

        res.json(recommendations);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }
  );

  app.use("/api", router);
  const httpServer = createServer(app);

  return httpServer;
}
