export type MovieGenre = 
  | 'Action' 
  | 'Adventure' 
  | 'Animation' 
  | 'Comedy' 
  | 'Crime' 
  | 'Documentary' 
  | 'Drama' 
  | 'Family' 
  | 'Fantasy' 
  | 'History' 
  | 'Horror' 
  | 'Music' 
  | 'Mystery' 
  | 'Romance' 
  | 'Science Fiction' 
  | 'Sci-Fi'
  | 'TV Movie' 
  | 'Thriller' 
  | 'War' 
  | 'Western';

export type MovieMood = 
  | 'Relaxing' 
  | 'Exciting' 
  | 'Thoughtful' 
  | 'Uplifting' 
  | 'Intense';

export type StreamingService = 
  | 'Netflix' 
  | 'Prime' 
  | 'Disney+' 
  | 'Hulu' 
  | 'HBO Max' 
  | 'Apple TV+';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: MovieGenre[];
  mood?: MovieMood;
  streaming_services: StreamingService[];
}

export interface FilterOptions {
  moods: MovieMood[];
  genres: MovieGenre[];
  streamingServices: StreamingService[];
}

export interface UserPreferences {
  likedGenres: Record<MovieGenre, number>;
  likedMovies: number[];
  dislikedMovies: number[];
  streamingServices: Record<StreamingService, number>;
}

export interface UserStats {
  moviesViewed: number;
  favorites: number;
  likeRate: number;
  avgRating: number;
  recentActivity: {
    action: 'liked' | 'disliked';
    movieTitle: string;
    timestamp: string;
  }[];
}
