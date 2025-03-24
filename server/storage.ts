import {
  users,
  type User,
  type InsertUser,
  movies,
  type Movie,
  type InsertMovie,
  userPreferences,
  type UserPreference,
  type InsertUserPreference,
  userActivity,
  type UserActivity,
  type InsertUserActivity,
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Movie methods
  getMovie(id: number): Promise<Movie | undefined>;
  getMovies(options?: {
    limit?: number;
    offset?: number;
    filters?: any;
  }): Promise<Movie[]>;
  createMovie(movie: InsertMovie): Promise<Movie>;

  // UserPreferences methods
  getUserPreferences(userId: number): Promise<UserPreference | undefined>;
  createUserPreferences(
    preferences: InsertUserPreference
  ): Promise<UserPreference>;
  updateUserPreferences(
    userId: number,
    preferences: Partial<UserPreference>
  ): Promise<UserPreference>;

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
      (user) => user.username === username
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

  async getMovies(options?: {
    limit?: number;
    offset?: number;
    filters?: any;
  }): Promise<Movie[]> {
    let movies = Array.from(this.movies.values());

    // Apply filters if provided
    if (options?.filters) {
      // Excluir filmes já avaliados pelo usuário (liked/disliked)
      if (
        options.filters.excludeIds &&
        Array.isArray(options.filters.excludeIds) &&
        options.filters.excludeIds.length > 0
      ) {
        movies = movies.filter(
          (movie) => !options.filters.excludeIds.includes(movie.id)
        );
      }

      const { genres, moods, streamingServices } = options.filters;

      if (genres && genres.length > 0) {
        movies = movies.filter((movie) => {
          // Garante que o filme tem gêneros definidos
          if (!movie.genres || !Array.isArray(movie.genres)) return false;

          // Verifica se o filme contém pelo menos um dos gêneros selecionados
          return movie.genres.some((genre: string) =>
            genres.some((g: string) =>
              genre.toLowerCase().includes(g.toLowerCase())
            )
          );
        });
      }

      if (moods && moods.length > 0) {
        movies = movies.filter((movie) => {
          // Caso o filme não tenha humor definido
          if (!movie.mood) return false;

          // Verifica se o humor do filme está na lista de humores selecionados
          return moods.some((m: string) =>
            movie.mood?.toLowerCase().includes(m.toLowerCase())
          );
        });
      }

      if (streamingServices && streamingServices.length > 0) {
        movies = movies.filter((movie) => {
          // Garante que o filme tem serviços de streaming definidos
          if (
            !movie.streaming_services ||
            !Array.isArray(movie.streaming_services)
          )
            return false;

          // Verifica se o filme está disponível em pelo menos um dos serviços selecionados
          return movie.streaming_services.some((service: string) =>
            streamingServices.some((s: string) =>
              service.toLowerCase().includes(s.toLowerCase())
            )
          );
        });
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
  async getUserPreferences(
    userId: number
  ): Promise<UserPreference | undefined> {
    return this.userPreferences.get(userId);
  }

  async createUserPreferences(
    preferences: InsertUserPreference
  ): Promise<UserPreference> {
    const id = preferences.id || Date.now();
    const userPreference: UserPreference = { ...preferences, id };
    this.userPreferences.set(userPreference.user_id, userPreference);
    return userPreference;
  }

  async updateUserPreferences(
    userId: number,
    updates: Partial<UserPreference>
  ): Promise<UserPreference> {
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
    return this.userActivities.filter(
      (activity) => activity.user_id === userId
    );
  }

  async createUserActivity(
    activity: InsertUserActivity
  ): Promise<UserActivity> {
    const id = activity.id || Date.now();
    const newActivity: UserActivity = {
      ...activity,
      id,
      timestamp: activity.timestamp || new Date(),
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

  async getRecommendedMovies(
    userId: number,
    limit: number = 10
  ): Promise<Movie[]> {
    const preferences = await this.getUserPreferences(userId);
    if (!preferences) return [];

    const likedGenres = preferences.liked_genres as Record<string, number>;
    const likedMovieIds = preferences.liked_movies as number[];
    const dislikedMovieIds = preferences.disliked_movies as number[];
    const preferredServices = preferences.streaming_services as Record<
      string,
      number
    >;

    // Get all movies that user hasn't interacted with
    const allMovies = Array.from(this.movies.values());
    const unseenMovies = allMovies.filter(
      (movie) =>
        !likedMovieIds.includes(movie.id) &&
        !dislikedMovieIds.includes(movie.id)
    );

    // Se não temos filmes não vistos suficientes, buscamos mais (simulando)
    if (unseenMovies.length < limit) {
      console.log(
        `Warning: Only ${unseenMovies.length} unseen movies available for recommendations`
      );

      // No ambiente real aqui buscaríamos mais filmes de uma API externa
      // Para o propósito dessa demonstração, vamos reutilizar alguns já existentes com IDs modificados

      // Pegar alguns filmes aleatórios e modificar seus IDs para simular novos filmes
      const additionalMovies = [];
      const existingIds = new Set([
        ...likedMovieIds,
        ...dislikedMovieIds,
        ...unseenMovies.map((m) => m.id),
      ]);

      let newId = 90000; // ID base para filmes simulados
      for (const movie of allMovies.slice(0, 20)) {
        // Encontrar um ID que não existe ainda
        while (existingIds.has(newId)) {
          newId++;
        }

        // Criar uma cópia do filme com novo ID
        const newMovie = {
          ...movie,
          id: newId,
          title: movie.title + " " + (newId % 5 === 0 ? "(New)" : ""),
        };

        additionalMovies.push(newMovie);
        existingIds.add(newId);
        newId++;
      }

      // Adicionar filmes simulados à lista de não vistos
      unseenMovies.push(...additionalMovies);
    }

    // If no movies to recommend, return empty array
    if (unseenMovies.length === 0) return [];

    // Get user's liked movies to use as content-based reference
    const likedMovies: Movie[] = [];
    for (const id of likedMovieIds) {
      const movie = await this.getMovie(id);
      if (movie) likedMovies.push(movie);
    }

    // AI-powered recommendation algorithm using content-based filtering
    const scoredMovies = unseenMovies.map((movie: Movie) => {
      // Base score starts at 0
      let score = 0;

      // Adicionar um componente aleatório maior para aumentar a variedade
      score += Math.random() * 4;

      // 1. CONTENT-BASED FILTERING: Similarity to liked content
      // Genre similarity score (weighted most heavily)
      if (movie.genres && Array.isArray(movie.genres)) {
        movie.genres.forEach((genre: string) => {
          // Give higher weight to genres user has liked more frequently
          if (likedGenres[genre]) {
            score += likedGenres[genre] * 2; // Weight genre matches heavily
          } else {
            // Dar pontuação para gêneros variados também
            score += 0.5;
          }
        });
      }

      // Service preference score
      if (movie.streaming_services && Array.isArray(movie.streaming_services)) {
        movie.streaming_services.forEach((service: string) => {
          if (preferredServices[service]) {
            score += preferredServices[service]; // Add points for preferred services
          }
        });
      }

      // 2. COLLABORATIVE FILTERING SIMULATION: Item-to-item similarity
      if (likedMovies.length > 0) {
        // Calculate similarity to each liked movie
        const similarityScores = likedMovies.map((likedMovie) => {
          let similarity = 0;

          // Genre overlap
          if (
            likedMovie.genres &&
            Array.isArray(likedMovie.genres) &&
            movie.genres &&
            Array.isArray(movie.genres)
          ) {
            const overlapCount = likedMovie.genres.filter((g) =>
              movie.genres.includes(g)
            ).length;

            if (likedMovie.genres.length > 0) {
              similarity += (overlapCount / likedMovie.genres.length) * 5;
            }
          }

          // Rating similarity (if ratings are close)
          if (
            typeof likedMovie.vote_average === "number" &&
            typeof movie.vote_average === "number"
          ) {
            const ratingDiff = Math.abs(
              likedMovie.vote_average - movie.vote_average
            );
            if (ratingDiff < 1) similarity += 3;
            else if (ratingDiff < 2) similarity += 2;
            else if (ratingDiff < 3) similarity += 1;
          }

          // Release date recency bonus
          if (likedMovie.release_date && movie.release_date) {
            const likedYear = new Date(likedMovie.release_date).getFullYear();
            const movieYear = new Date(movie.release_date).getFullYear();
            if (Math.abs(likedYear - movieYear) < 5) {
              similarity += 1;
            }
          }

          return similarity;
        });

        // Use the average similarity score from all liked movies
        if (similarityScores.length > 0) {
          const avgSimilarity =
            similarityScores.reduce((sum, score) => sum + score, 0) /
            similarityScores.length;
          score += avgSimilarity;
        }
      }

      // 3. RECENCY BOOST: Favor newer movies slightly
      if (movie.release_date) {
        const releaseYear = new Date(movie.release_date).getFullYear();
        const currentYear = new Date().getFullYear();
        if (releaseYear >= currentYear - 2) {
          score += 1; // Small boost for very recent movies
        }
      }

      // 4. RATING QUALITY FACTOR: Higher rated movies get a small boost
      if (typeof movie.vote_average === "number" && movie.vote_average > 7) {
        score += movie.vote_average - 7; // Up to 3 point boost for top-rated films
      }

      // 5. MOOD MATCHING: If movie mood matches previous liked moods
      if (movie.mood && movie.mood in likedGenres) {
        score += 2;
      }

      return { movie, score };
    });

    // Sort by score and take the top ones
    scoredMovies.sort((a, b) => b.score - a.score);

    // Para aumentar a diversidade, vamos selecionar um conjunto maior de filmes
    // e então adicionar mais aleatoriedade
    const topMovies = scoredMovies.slice(
      0,
      Math.min(limit * 3, scoredMovies.length)
    );

    // Adicionar fator aleatório significativo para aumentar a diversidade
    topMovies.forEach((item) => {
      item.score += Math.random() * 5; // Fator aleatório maior para diversidade
    });

    // Re-sort after adding randomness
    topMovies.sort((a, b) => b.score - a.score);

    // Retornar pelo menos 2x o limite solicitado para garantir diversidade no cliente
    return topMovies
      .slice(0, Math.min(limit * 2, topMovies.length))
      .map((scored) => scored.movie);
  }
}

export const storage = new MemStorage();
