import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, X, Info, Play, Tv, Film, Video } from "lucide-react";
import type { Movie } from "@/types";

interface MovieCardProps {
  movie: Movie;
  onLike: () => void;
  onDislike: () => void;
  onInfo?: () => void;
}

const StreamingIcon = ({ service }: { service: string }) => {
  switch (service) {
    case "Netflix":
      return <Play className="text-red-600" />;
    case "Prime":
      return <Video className="text-blue-400" />;
    case "Disney+":
      return <Film className="text-blue-500" />;
    case "Hulu":
      return <Tv className="text-green-400" />;
    default:
      return null;
  }
};

const MovieCard = ({ movie, onLike, onDislike, onInfo }: MovieCardProps) => {
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);

    // Get the starting position
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    setStartPoint({ x: clientX, y: clientY });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    // Get the current position
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    // Calculate the offset
    const newOffset = {
      x: clientX - startPoint.x,
      y: clientY - startPoint.y,
    };

    setOffset(newOffset);
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    // Determine the action based on the offset
    if (offset.x > 100) {
      onLike();
    } else if (offset.x < -100) {
      onDislike();
    } else {
      // Reset to center
      setOffset({ x: 0, y: 0 });
    }
  };

  const getReleaseYear = (dateString: string) => {
    return dateString ? new Date(dateString).getFullYear() : "";
  };

  // Calculate rotation based on drag distance
  const rotation = offset.x * 0.1;

  // Determine if we should show like/dislike indicators
  const showLikeIndicator = offset.x > 50;
  const showDislikeIndicator = offset.x < -50;

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-0 shadow-xl shadow-black/30"
      style={{ zIndex: isDragging ? 10 : 1 }}
      animate={{
        x: offset.x,
        y: offset.y,
        rotate: rotation,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <div className="relative h-full w-full rounded-xl overflow-hidden bg-[#1E293B] shadow-lg">
        {/* Movie poster */}
        <img
          src={
            movie.poster_path ||
            "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={`${movie.title} poster`}
          className="object-cover h-full w-full"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none bg-gradient-to-t from-[#121826] to-transparent"></div>

        {/* Content overlay */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#FFCC00]/90 text-[#121826] text-sm px-3 py-1 rounded font-medium inline-flex items-center backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{movie.vote_average.toFixed(1)}</span>
            </span>
            {movie.genres[0] && (
              <span className="bg-[#675AFE]/50 text-[#EAEAEA] text-sm px-3 py-1 rounded font-medium backdrop-blur-sm">
                {movie.genres[0]}
              </span>
            )}
            {getReleaseYear(movie.release_date) && (
              <span className="bg-[#1E293B]/90 text-[#EAEAEA] text-sm px-3 py-1 rounded font-medium backdrop-blur-sm">
                {getReleaseYear(movie.release_date)}
              </span>
            )}
          </div>

          <h3 className="text-2xl font-poppins font-bold mb-2">{movie.title}</h3>
          <p className="text-base text-[#EAEAEA]/70 line-clamp-3 mb-3">
            {movie.overview}
          </p>

          <div className="flex items-center gap-3 mb-5">
            {movie.streaming_services.length > 0 && (
              <span className="flex items-center gap-2 text-sm text-[#EAEAEA]/80 bg-[#1E293B]/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <StreamingIcon service={movie.streaming_services[0]} />
                <span>{movie.streaming_services[0]}</span>
              </span>
            )}
            <span className="text-[#EAEAEA]/50 text-lg">•</span>
            <span className="text-sm text-[#EAEAEA]/80 bg-[#1E293B]/60 px-3 py-1.5 rounded-full backdrop-blur-sm">{movie.runtime} min</span>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            <button
              className="h-14 w-14 rounded-full bg-[#1E293B]/80 border border-[#EAEAEA]/20 flex items-center justify-center text-xl hover:bg-red-500/20 hover:border-red-500 hover:text-red-500 transition-colors backdrop-blur-sm"
              onClick={onDislike}
            >
              <X size={24} />
            </button>
            {onInfo && (
              <button
                className="h-12 w-12 rounded-full bg-[#1E293B]/80 border border-[#EAEAEA]/20 flex items-center justify-center text-base hover:bg-[#FFCC00]/20 hover:border-[#FFCC00] hover:text-[#FFCC00] transition-colors mt-1 backdrop-blur-sm"
                onClick={onInfo}
              >
                <Info size={20} />
              </button>
            )}
            <button
              className="h-14 w-14 rounded-full bg-[#1E293B]/80 border border-[#EAEAEA]/20 flex items-center justify-center text-xl hover:bg-green-500/20 hover:border-green-500 hover:text-green-500 transition-colors backdrop-blur-sm"
              onClick={onLike}
            >
              <Heart size={24} />
            </button>
          </div>
        </div>

        {/* Swipe indicators */}
        {showDislikeIndicator && (
          <div className="absolute top-8 left-8 bg-red-500/80 text-white px-4 py-2 rounded-md transform -rotate-12 text-xl font-poppins font-bold backdrop-blur-sm shadow-lg">
            NOPE
          </div>
        )}
        {showLikeIndicator && (
          <div className="absolute top-8 right-8 bg-green-500/80 text-white px-4 py-2 rounded-md transform rotate-12 text-xl font-poppins font-bold backdrop-blur-sm shadow-lg">
            LIKE
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MovieCard;
