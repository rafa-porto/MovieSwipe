import { useState, useEffect } from "react";
import Filters from "@/components/Filters";
import SwipeCardStack from "@/components/SwipeCardStack";
import RecommendationSection from "@/components/RecommendationSection";
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
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  // Fetch user stats on component mount
  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      try {
        const userStats = await fetchUserStats();
        
        // Check if user has interacted with enough movies to show recommendations
        const hasEnoughInteractions = 
          (userStats.moviesViewed && userStats.moviesViewed >= 3) || 
          (userStats.favorites && userStats.favorites >= 2);
        
        setShowRecommendations(hasEnoughInteractions);
        
        // Assuming stats API returns moviesViewed
        setStats({
          moviesViewed: userStats.moviesViewed || 0,
          totalMovies: 50, // Fixed daily goal
          percentage: Math.min(Math.round((userStats.moviesViewed || 0) / 50 * 100), 100)
        });
      } catch (error) {
        console.error("Failed to fetch stats, using default values:", error);
        // Use default values if stats can't be fetched
        setStats({
          moviesViewed: 0,
          totalMovies: 50,
          percentage: 0
        });
        setShowRecommendations(false);
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
      
      // Show recommendations after 3 interactions
      if (newMoviesViewed >= 3 && !showRecommendations) {
        setShowRecommendations(true);
      }
      
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
      
      {/* Daily Progress Indicator */}
      <div className="mt-8 text-center">
        <p className="text-sm text-[#EAEAEA]/60 font-inter">
          Descobertas hoje: <span className="text-[#EAEAEA] font-medium">{stats.moviesViewed} de {stats.totalMovies}</span> filmes
        </p>
        <div className="h-1 w-full max-w-xs bg-[#1E293B]/50 rounded-full mx-auto mt-2">
          <div 
            className="h-full bg-[#675AFE] rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${stats.percentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* AI-Powered Recommendations Section */}
      {showRecommendations && (
        <div className="mt-12 mb-8">
          <RecommendationSection 
            title="IA Recomenda Para Você" 
            subtitle="Baseado nas suas interações recentes e preferências"
            limit={6}
            onMovieLiked={handleMovieViewed}
          />
        </div>
      )}
    </div>
  );
};

export default Discover;
