import { 
  users, type User, type InsertUser,
  movies, type Movie, type InsertMovie,
  userPreferences, type UserPreference, type InsertUserPreference,
  userActivity, type UserActivity, type InsertUserActivity
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Movie methods
  getMovie(id: number): Promise<Movie | undefined>;
  getMovies(options?: { limit?: number, offset?: number, filters?: any }): Promise<Movie[]>;
  createMovie(movie: InsertMovie): Promise<Movie>;
  
  // UserPreferences methods
  getUserPreferences(userId: number): Promise<UserPreference | undefined>;
  createUserPreferences(preferences: InsertUserPreference): Promise<UserPreference>;
  updateUserPreferences(userId: number, preferences: Partial<UserPreference>): Promise<UserPreference>;
  
  // UserActivity methods
  getUserActivity(userId: number): Promise<UserActivity[]>;
  createUserActivity(activity: InsertUserActivity): Promise<UserActivity>;
  
  // Specialized methods
  getLikedMovies(userId: number): Promise<Movie[]>;
  getRecommendedMovies(userId: number, limit?: number): Promise<Movie[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private movies: Map<number, Movie>;
  private userPreferences: Map<number, UserPreference>;
  private userActivities: UserActivity[];
  private currentUserId: number;
  
  constructor() {
    this.users = new Map();
    this.movies = new Map();
    this.userPreferences = new Map();
    this.userActivities = [];
    this.currentUserId = 1;
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Movie methods
  async getMovie(id: number): Promise<Movie | undefined> {
    return this.movies.get(id);
  }
  
  async getMovies(options?: { limit?: number, offset?: number, filters?: any }): Promise<Movie[]> {
    let movies = Array.from(this.movies.values());
    
    // Apply filters if provided
    if (options?.filters) {
      const { genres, moods, streamingServices } = options.filters;
      
      if (genres && genres.length > 0) {
        movies = movies.filter(movie => 
          movie.genres.some((genre: string) => genres.includes(genre))
        );
      }
      
      if (moods && moods.length > 0) {
        movies = movies.filter(movie => 
          moods.includes(movie.mood)
        );
      }
      
      if (streamingServices && streamingServices.length > 0) {
        movies = movies.filter(movie => 
          movie.streaming_services.some((service: string) => 
            streamingServices.includes(service)
          )
        );
      }
    }
    
    // Apply pagination
    const offset = options?.offset || 0;
    const limit = options?.limit || movies.length;
    
    return movies.slice(offset, offset + limit);
  }
  
  async createMovie(movie: InsertMovie): Promise<Movie> {
    this.movies.set(movie.id, movie as Movie);
    return movie as Movie;
  }
  
  // UserPreferences methods
  async getUserPreferences(userId: number): Promise<UserPreference | undefined> {
    return this.userPreferences.get(userId);
  }
  
  async createUserPreferences(preferences: InsertUserPreference): Promise<UserPreference> {
    const id = preferences.id || Date.now();
    const userPreference: UserPreference = { ...preferences, id };
    this.userPreferences.set(userPreference.user_id, userPreference);
    return userPreference;
  }
  
  async updateUserPreferences(userId: number, updates: Partial<UserPreference>): Promise<UserPreference> {
    const current = this.userPreferences.get(userId);
    if (!current) {
      throw new Error(`User preferences not found for user ${userId}`);
    }
    
    const updated: UserPreference = { ...current, ...updates };
    this.userPreferences.set(userId, updated);
    return updated;
  }
  
  // UserActivity methods
  async getUserActivity(userId: number): Promise<UserActivity[]> {
    return this.userActivities.filter(activity => activity.user_id === userId);
  }
  
  async createUserActivity(activity: InsertUserActivity): Promise<UserActivity> {
    const id = activity.id || Date.now();
    const newActivity: UserActivity = { 
      ...activity, 
      id,
      timestamp: activity.timestamp || new Date()
    };
    
    this.userActivities.push(newActivity);
    return newActivity;
  }
  
  // Specialized methods
  async getLikedMovies(userId: number): Promise<Movie[]> {
    const preferences = await this.getUserPreferences(userId);
    if (!preferences) return [];
    
    const likedMovieIds = preferences.liked_movies as number[];
    const likedMovies: Movie[] = [];
    
    for (const id of likedMovieIds) {
      const movie = await this.getMovie(id);
      if (movie) likedMovies.push(movie);
    }
    
    return likedMovies;
  }
  
  async getRecommendedMovies(userId: number, limit: number = 10): Promise<Movie[]> {
    const preferences = await this.getUserPreferences(userId);
    if (!preferences) return [];
    
    const likedGenres = preferences.liked_genres as Record<string, number>;
    const likedMovieIds = preferences.liked_movies as number[];
    const dislikedMovieIds = preferences.disliked_movies as number[];
    
    // Get all movies that user hasn't interacted with
    const allMovies = Array.from(this.movies.values());
    const unseenMovies = allMovies.filter(
      movie => !likedMovieIds.includes(movie.id) && !dislikedMovieIds.includes(movie.id)
    );
    
    // Calculate a score for each movie based on user preferences
    const scoredMovies = unseenMovies.map(movie => {
      let score = 0;
      
      // Score based on genres
      movie.genres.forEach((genre: string) => {
        if (likedGenres[genre]) {
          score += likedGenres[genre];
        }
      });
      
      return { movie, score };
    });
    
    // Sort by score and take the top ones
    scoredMovies.sort((a, b) => b.score - a.score);
    return scoredMovies.slice(0, limit).map(scored => scored.movie);
  }
}

export const storage = new MemStorage();
