import fetch from 'node-fetch';
import { Movie } from '@shared/schema';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Check for API key at startup
if (!TMDB_API_KEY) {
  console.warn('Warning: TMDB_API_KEY not found in .env file. API calls will fail.');
}

// Map TMDB genres to our app genres
const genreMap: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

// Map genres to moods
const moodMap: Record<string, string> = {
  'Action': 'Exciting',
  'Adventure': 'Exciting',
  'Animation': 'Uplifting',
  'Comedy': 'Relaxing',
  'Crime': 'Intense',
  'Documentary': 'Thoughtful',
  'Drama': 'Thoughtful',
  'Family': 'Uplifting',
  'Fantasy': 'Uplifting',
  'History': 'Thoughtful',
  'Horror': 'Intense',
  'Music': 'Relaxing',
  'Mystery': 'Intense',
  'Romance': 'Relaxing',
  'Sci-Fi': 'Exciting',
  'TV Movie': 'Relaxing',
  'Thriller': 'Intense',
  'War': 'Intense',
  'Western': 'Exciting'
};

// Random assignment of streaming services for demo purposes
const streamingServices = ['Netflix', 'Prime', 'Disney+', 'Hulu'];

export async function discoverMovies(page = 1): Promise<Movie[]> {
  try {
    if (!TMDB_API_KEY) {
      throw new Error('TMDB_API_KEY is not set');
    }

    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error(`TMDB API request failed: ${response.status}`);
    }
    
    const data = await response.json() as any;
    
    // Get genre list for mapping IDs to names
    const genres = await getGenres();

    return data.results.map((movie: any) => transformMovie(movie, genres));
  } catch (error) {
    console.error('Error fetching movies from TMDB:', error);
    return [];
  }
}

export async function getMovieDetails(movieId: number): Promise<Movie | null> {
  try {
    if (!TMDB_API_KEY) {
      throw new Error('TMDB_API_KEY is not set');
    }
    
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
    );
    
    if (!response.ok) {
      throw new Error(`TMDB API request failed: ${response.status}`);
    }
    
    const data = await response.json() as any;
    const genres = await getGenres();
    
    return transformMovie(data, genres);
  } catch (error) {
    console.error(`Error fetching movie ${movieId} from TMDB:`, error);
    return null;
  }
}

async function getGenres(): Promise<Record<number, string>> {
  try {
    if (!TMDB_API_KEY) {
      return genreMap;
    }
    
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`
    );
    
    if (!response.ok) {
      return genreMap;
    }
    
    const data = await response.json() as any;
    
    // Create a map of genre IDs to names
    const genreMapFromApi: Record<number, string> = {};
    data.genres.forEach((genre: any) => {
      genreMapFromApi[genre.id] = genre.name;
    });
    
    return genreMapFromApi;
  } catch (error) {
    console.error('Error fetching genres from TMDB:', error);
    return genreMap;
  }
}

function transformMovie(movie: any, genreMap: Record<number, string>): Movie {
  // Map genre IDs to names
  const genres = (movie.genre_ids || movie.genres?.map((g: any) => g.id) || [])
    .map((id: number) => genreMap[id] || genreMap[28]) // Default to Action if not found
    .filter((genre: string) => genre); // Remove any undefined genres
  
  // Determine primary mood based on first genre
  const primaryGenre = genres[0] || 'Action';
  const mood = moodMap[primaryGenre] || 'Exciting';
  
  // Randomly assign streaming services
  const numServices = Math.floor(Math.random() * 2) + 1; // 1 to 2 services
  const assignedServices: string[] = [];
  
  for (let i = 0; i < numServices; i++) {
    const serviceIndex = Math.floor(Math.random() * streamingServices.length);
    if (!assignedServices.includes(streamingServices[serviceIndex])) {
      assignedServices.push(streamingServices[serviceIndex]);
    }
  }
  
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path ? `${POSTER_BASE_URL}${movie.poster_path}` : '',
    backdrop_path: movie.backdrop_path ? `${POSTER_BASE_URL}${movie.backdrop_path}` : '',
    release_date: movie.release_date || '',
    vote_average: movie.vote_average || 0,
    runtime: movie.runtime || Math.floor(Math.random() * 60) + 90, // Random runtime if not available
    genres: genres,
    mood: mood,
    streaming_services: assignedServices
  };
}
