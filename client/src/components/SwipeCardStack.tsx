import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import MovieCard from "./MovieCard";
import { cardAnimation, swipeLeftAnimation, swipeRightAnimation } from "@/lib/motion";
import { fetchMovies, likeMovie, dislikeMovie } from "@/lib/tmdb";
import type { Movie, FilterOptions } from "@/types";

interface SwipeCardStackProps {
  filters: Partial<FilterOptions>;
}

const SwipeCardStack = ({ filters }: SwipeCardStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { toast } = useToast();

  // Load initial movies
  useEffect(() => {
    loadMovies();
  }, []);
  
  // Load new movies when filters change
  useEffect(() => {
    setMovies([]);
    setCurrentIndex(0);
    setPage(1);
    loadMovies(true);
  }, [filters]);
  
  const loadMovies = async (resetExisting = false) => {
    try {
      setIsLoading(true);
      
      const data = await fetchMovies(page, filters);
      
      if (resetExisting) {
        setMovies(data.movies);
      } else {
        setMovies(prevMovies => [...prevMovies, ...data.movies]);
      }
      
      setPage(prev => prev + 1);
    } catch (error) {
      console.error("Error loading movies:", error);
      toast({
        title: "Error",
        description: "Failed to load movies. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load more movies when we're almost out
  useEffect(() => {
    if (movies.length > 0 && currentIndex >= movies.length - 3) {
      loadMovies();
    }
  }, [currentIndex, movies.length]);
  
  const handleLike = async () => {
    if (currentIndex >= movies.length) return;
    
    setDirection("right");
    
    try {
      await likeMovie(movies[currentIndex].id);
      
      setTimeout(() => {
        setDirection(null);
        setCurrentIndex(prev => prev + 1);
      }, 300);
    } catch (error) {
      console.error("Error liking movie:", error);
      toast({
        title: "Error",
        description: "Failed to like movie. Please try again.",
        variant: "destructive"
      });
      setDirection(null);
    }
  };
  
  const handleDislike = async () => {
    if (currentIndex >= movies.length) return;
    
    setDirection("left");
    
    try {
      await dislikeMovie(movies[currentIndex].id);
      
      setTimeout(() => {
        setDirection(null);
        setCurrentIndex(prev => prev + 1);
      }, 300);
    } catch (error) {
      console.error("Error disliking movie:", error);
      toast({
        title: "Error",
        description: "Failed to dislike movie. Please try again.",
        variant: "destructive"
      });
      setDirection(null);
    }
  };
  
  const currentMovie = movies[currentIndex];
  const hasMovies = movies.length > 0 && currentIndex < movies.length;
  
  return (
    <div className="relative h-[500px] w-full max-w-sm mx-auto">
      {/* Show loading state */}
      {isLoading && !hasMovies && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#1E293B] rounded-xl">
          <div className="w-12 h-12 rounded-full border-4 border-[#675AFE] border-t-transparent animate-spin mb-4"></div>
          <h3 className="text-xl font-poppins font-bold mb-2">Loading movies...</h3>
        </div>
      )}
      
      {/* Show cards */}
      <AnimatePresence>
        {hasMovies && (
          <motion.div
            key={`movie-${currentMovie.id}`}
            variants={cardAnimation}
            initial="initial"
            animate={direction === "left" ? swipeLeftAnimation : direction === "right" ? swipeRightAnimation : "animate"}
            exit="exit"
          >
            <MovieCard
              movie={currentMovie}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Background stacked cards (visual only) */}
      {hasMovies && (
        <>
          <div className="absolute inset-0 -z-10 transform scale-[0.98] translate-y-[10px] rounded-xl opacity-60 blur-[2px] bg-[#1E293B]"></div>
          <div className="absolute inset-0 -z-20 transform scale-[0.95] translate-y-[20px] rounded-xl opacity-30 blur-[4px] bg-[#1E293B]"></div>
        </>
      )}
      
      {/* Empty state */}
      {!isLoading && !hasMovies && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#1E293B] rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#675AFE] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
          <h3 className="text-xl font-poppins font-bold mb-2">No more movies</h3>
          <p className="text-sm text-[#EAEAEA]/70 mb-6">Adjust your filters or check out your favorites!</p>
          <button 
            className="px-4 py-2 bg-[#675AFE] text-[#EAEAEA] rounded-lg font-poppins text-sm hover:bg-[#675AFE]/80 transition-colors"
            onClick={() => loadMovies(true)}
          >
            Refresh Movies
          </button>
        </div>
      )}
    </div>
  );
};

export default SwipeCardStack;
