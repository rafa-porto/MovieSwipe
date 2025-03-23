import { apiRequest } from "./queryClient";
import type { Movie, FilterOptions } from "../types";

export async function fetchMovies(
  page: number = 1, 
  filters?: Partial<FilterOptions>
): Promise<{ movies: Movie[]; pagination: { page: number; limit: number; total: number } }> {
  let url = `/api/movies?page=${page}`;
  
  if (filters) {
    if (filters.genres && filters.genres.length > 0) {
      url += `&genres=${filters.genres.join(',')}`;
    }
    
    if (filters.moods && filters.moods.length > 0) {
      url += `&moods=${filters.moods.join(',')}`;
    }
    
    if (filters.streamingServices && filters.streamingServices.length > 0) {
      url += `&streamingServices=${filters.streamingServices.join(',')}`;
    }
  }
  
  const response = await fetch(url, { credentials: "include" });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }
  
  return await response.json();
}

export async function fetchMovie(id: number): Promise<Movie> {
  const response = await fetch(`/api/movies/${id}`, { credentials: "include" });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch movie ${id}: ${response.statusText}`);
  }
  
  return await response.json();
}

export async function likeMovie(movieId: number): Promise<void> {
  await apiRequest("POST", `/api/movies/${movieId}/interact`, {
    action: "liked",
    userId: 1 // Using default user for demo
  });
}

export async function dislikeMovie(movieId: number): Promise<void> {
  await apiRequest("POST", `/api/movies/${movieId}/interact`, {
    action: "disliked",
    userId: 1 // Using default user for demo
  });
}

export async function fetchLikedMovies(): Promise<Movie[]> {
  const response = await fetch("/api/users/1/liked", { credentials: "include" });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch liked movies: ${response.statusText}`);
  }
  
  return await response.json();
}

export async function fetchUserStats(): Promise<any> {
  const response = await fetch("/api/users/1/stats", { credentials: "include" });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user stats: ${response.statusText}`);
  }
  
  return await response.json();
}

export async function fetchRecommendations(limit: number = 10): Promise<Movie[]> {
  const response = await fetch(`/api/users/1/recommendations?limit=${limit}`, {
    credentials: "include"
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch recommendations: ${response.statusText}`);
  }
  
  return await response.json();
}
