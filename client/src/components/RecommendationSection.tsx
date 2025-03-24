import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchRecommendations } from "@/lib/tmdb";
import { Movie } from "@/types";
import { motion } from "framer-motion";
import { Loader2, Heart, RefreshCw } from "lucide-react";
import { likeMovie } from "@/lib/tmdb";

interface RecommendationSectionProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  onMovieLiked?: () => void;
}

const RecommendationSection = ({
  title = "AI Recommends For You",
  subtitle = "Based on your swipe history",
  limit = 12, // Aumentando o limite padrão para 12
  onMovieLiked,
}: RecommendationSectionProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likedMovieIds, setLikedMovieIds] = useState<number[]>([]);
  const [loadingLikeId, setLoadingLikeId] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Estado para forçar o refresh
  const { toast } = useToast();

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        setIsLoading(true);

        // Solicitar o dobro de filmes para garantir diversidade
        const data = await fetchRecommendations(limit * 2);

        // Verificar se há duplicatas e remover
        const uniqueMovies = removeDuplicateMovies(data);

        // Limitar ao número desejado
        setMovies(uniqueMovies.slice(0, limit));
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        toast({
          title: "Error",
          description: "Unable to load recommendations",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadRecommendations();
  }, [limit, toast, refreshKey]); // Adicionar refreshKey para permitir recarregar

  // Função para remover filmes duplicados
  const removeDuplicateMovies = (movieList: Movie[]): Movie[] => {
    const uniqueIds = new Set<number>();
    return movieList.filter((movie) => {
      if (uniqueIds.has(movie.id)) {
        return false;
      }
      uniqueIds.add(movie.id);
      return true;
    });
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1); // Incrementar o refreshKey para forçar o useEffect a recarregar
  };

  const handleLike = async (movieId: number) => {
    if (likedMovieIds.includes(movieId)) return;

    try {
      setLoadingLikeId(movieId);
      await likeMovie(movieId);
      setLikedMovieIds((prev) => [...prev, movieId]);

      toast({
        title: "Movie added",
        description: "This movie has been added to your favorites",
        variant: "default",
      });

      if (onMovieLiked) {
        onMovieLiked();
      }
    } catch (error) {
      console.error("Error liking movie:", error);
      toast({
        title: "Error",
        description: "Unable to add to favorites",
        variant: "destructive",
      });
    } finally {
      setLoadingLikeId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full py-12 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#675AFE] animate-spin mb-4" />
        <p className="text-[#EAEAEA]/70">Loading recommendations</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="w-full py-8 px-4 rounded-xl bg-[#1E293B]/50 text-center my-6">
        <h3 className="font-poppins font-semibold text-lg mb-2">
          Recommendations Unavailable
        </h3>
        <p className="text-[#EAEAEA]/70 text-sm mb-2">
          We don't have personalized recommendations for you yet.
        </p>
        <p className="text-[#EAEAEA]/70 text-sm">
          Continue exploring and rate more movies to receive recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full my-6">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="font-poppins font-bold text-xl text-[#EAEAEA]">
            {title}
          </h2>
          <p className="text-[#EAEAEA]/70 text-sm">{subtitle}</p>
        </div>
        <button
          onClick={handleRefresh}
          className="p-2 rounded-full bg-[#1E293B] hover:bg-[#675AFE]/20 text-[#EAEAEA]/70 hover:text-[#675AFE] transition-colors"
          title="Refresh recommendations"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            className="relative overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="relative aspect-[2/3] bg-[#1E293B] rounded-lg overflow-hidden">
              {movie.poster_path ? (
                <img
                  src={
                    movie.poster_path.startsWith("http")
                      ? movie.poster_path
                      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  loading="lazy" // Lazy load para melhor performance
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#1E293B]">
                  <span className="text-[#EAEAEA]/50">No poster</span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="font-poppins font-medium text-[#EAEAEA] text-sm line-clamp-1">
                  {movie.title}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[#EAEAEA]/70 text-xs">
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "N/A"}
                  </span>
                  <span className="text-[#FFCC00] text-xs font-medium">
                    {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleLike(movie.id)}
                disabled={
                  likedMovieIds.includes(movie.id) || loadingLikeId === movie.id
                }
                className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all ${
                  likedMovieIds.includes(movie.id)
                    ? "bg-[#675AFE]/60 text-white"
                    : "bg-black/30 text-white/70 hover:bg-[#675AFE]/40 hover:text-white"
                }`}
              >
                {loadingLikeId === movie.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Heart
                    className={`h-4 w-4 ${
                      likedMovieIds.includes(movie.id) ? "fill-current" : ""
                    }`}
                  />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;
