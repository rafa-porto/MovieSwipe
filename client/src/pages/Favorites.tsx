import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink } from "lucide-react";
import { fetchLikedMovies } from "@/lib/tmdb";
import { fadeIn, staggerChildren } from "@/lib/motion";
import type { Movie } from "@/types";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setIsLoading(true);
        const data = await fetchLikedMovies();
        setFavorites(data);
      } catch (error) {
        console.error("Error loading favorites:", error);
        toast({
          title: "Error",
          description: "Failed to load favorites. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [toast]);

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-poppins font-bold mb-6">Your Favorites</h1>
      
      {isLoading ? (
        <div className="py-12 flex justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-[#675AFE] border-t-transparent animate-spin"></div>
        </div>
      ) : favorites.length > 0 ? (
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {favorites.map(movie => (
            <motion.div 
              key={movie.id} 
              className="group relative"
              variants={fadeIn}
            >
              <div className="aspect-[2/3] rounded-lg overflow-hidden">
                <img 
                  src={movie.poster_path || 'https://via.placeholder.com/300x450?text=No+Image'} 
                  alt={`${movie.title} poster`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#121826]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <h3 className="text-sm font-poppins font-semibold line-clamp-1 mb-1">
                    {movie.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium bg-[#675AFE]/30 px-2 py-0.5 rounded">
                      {movie.genres[0] || "Unknown"}
                    </span>
                    {movie.streaming_services.length > 0 && (
                      <a 
                        href="#" 
                        className="text-xs text-[#FFCC00] hover:text-[#FFCC00]/80"
                        onClick={(e) => {
                          e.preventDefault();
                          // Would link to actual streaming service in real app
                          alert(`Watch ${movie.title} on ${movie.streaming_services[0]}`);
                        }}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="py-16 text-center">
          <motion.div variants={fadeIn} initial="initial" animate="animate">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#675AFE]/60 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-xl font-poppins font-medium mb-2">No favorites yet</h3>
            <p className="text-sm text-[#EAEAEA]/70 mb-6">Start swiping right on movies you like to save them here</p>
            <a 
              href="/"
              className="px-4 py-2 bg-[#675AFE] text-[#EAEAEA] rounded-lg font-poppins text-sm hover:bg-[#675AFE]/80 transition-colors"
            >
              Start Swiping
            </a>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
