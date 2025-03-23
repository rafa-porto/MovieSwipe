import { useState, useEffect } from "react";
import Filters from "@/components/Filters";
import SwipeCardStack from "@/components/SwipeCardStack";
import { type MovieGenre, type MovieMood, type StreamingService } from "@/types";
import { fetchUserStats } from "@/lib/tmdb";

const Discover = () => {
  const [selectedGenres, setSelectedGenres] = useState<MovieGenre[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<MovieMood[]>([]);
  const [selectedServices, setSelectedServices] = useState<StreamingService[]>([]);
  const [stats, setStats] = useState({
    moviesViewed: 0,
    totalMovies: 50,
    percentage: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch user stats on component mount
  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);
        const userStats = await fetchUserStats();
        
        // Assuming stats API returns moviesViewed
        setStats({
          moviesViewed: userStats.moviesViewed || 0,
          totalMovies: 50, // Fixed daily goal
          percentage: Math.min(Math.round((userStats.moviesViewed || 0) / 50 * 100), 100)
        });
      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStats();
  }, []);
  
  const resetFilters = () => {
    setSelectedGenres([]);
    setSelectedMoods([]);
    setSelectedServices([]);
  };
  
  // Handle movie viewed update (callback that could be passed to SwipeCardStack)
  const handleMovieViewed = () => {
    setStats(prev => {
      const newMoviesViewed = prev.moviesViewed + 1;
      return {
        moviesViewed: newMoviesViewed,
        totalMovies: prev.totalMovies,
        percentage: Math.min(Math.round(newMoviesViewed / prev.totalMovies * 100), 100)
      };
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <Filters 
        selectedGenres={selectedGenres}
        selectedMoods={selectedMoods}
        selectedServices={selectedServices}
        onGenreChange={setSelectedGenres}
        onMoodChange={setSelectedMoods}
        onServiceChange={setSelectedServices}
        onReset={resetFilters}
      />
      
      <SwipeCardStack 
        filters={{
          genres: selectedGenres,
          moods: selectedMoods,
          streamingServices: selectedServices
        }}
        onMovieInteracted={handleMovieViewed}
      />
      
      <div className="mt-8 text-center">
        <p className="text-sm text-[#EAEAEA]/60 font-inter">
          Today's discovery: <span className="text-[#EAEAEA] font-medium">{stats.moviesViewed} of {stats.totalMovies}</span> movies
        </p>
        <div className="h-1 w-full max-w-xs bg-[#1E293B]/50 rounded-full mx-auto mt-2">
          <div 
            className="h-full bg-[#675AFE] rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${stats.percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
