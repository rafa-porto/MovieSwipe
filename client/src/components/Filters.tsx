import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Play,
  Video,
  Film,
  Tv,
  Heart,
  Zap,
  Brain,
  Coffee,
  Music,
} from "lucide-react";
import { filterAnimation, scaleIn } from "@/lib/motion";
import {
  type MovieGenre,
  type MovieMood,
  type StreamingService,
} from "@/types";

interface FiltersProps {
  selectedGenres: MovieGenre[];
  selectedMoods: MovieMood[];
  selectedServices: StreamingService[];
  onGenreChange: (genres: MovieGenre[]) => void;
  onMoodChange: (moods: MovieMood[]) => void;
  onServiceChange: (services: StreamingService[]) => void;
  onReset: () => void;
}

const genres: MovieGenre[] = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

const moods: MovieMood[] = [
  "Relaxing",
  "Exciting",
  "Thoughtful",
  "Uplifting",
  "Intense",
];

const streamingServices: StreamingService[] = [
  "Netflix",
  "Prime",
  "Disney+",
  "Hulu",
];

const Filters = ({
  selectedGenres,
  selectedMoods,
  selectedServices,
  onGenreChange,
  onMoodChange,
  onServiceChange,
  onReset,
}: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = (
    current: string[],
    item: string,
    updateFn: (newItems: any[]) => void
  ) => {
    const newItems = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
    updateFn(newItems as any);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-poppins font-semibold bg-gradient-to-r from-[#EAEAEA] to-[#EAEAEA]/80 text-transparent bg-clip-text">
          Discover Movies
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 text-[#EAEAEA] text-sm px-3 py-1.5 rounded-lg bg-[#675AFE]/20 hover:bg-[#675AFE]/30 transition-all duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <span>Filters</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="filters"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={filterAnimation}
            className="bg-gradient-to-br from-[#1E293B] to-[#1E293B]/80 rounded-xl p-6 mb-6 overflow-hidden shadow-lg border border-[#675AFE]/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Mood Filter */}
              <div>
                <h3 className="text-sm font-poppins font-medium mb-2 flex items-center gap-1">
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span>Mood</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {moods.map((mood) => {
                    const getMoodIcon = () => {
                      switch (mood) {
                        case "Relaxing":
                          return <Coffee className="w-3 h-3 text-teal-400" />;
                        case "Exciting":
                          return <Zap className="w-3 h-3 text-yellow-400" />;
                        case "Thoughtful":
                          return <Brain className="w-3 h-3 text-indigo-400" />;
                        case "Uplifting":
                          return <Music className="w-3 h-3 text-pink-400" />;
                        case "Intense":
                          return <Film className="w-3 h-3 text-red-400" />;
                        default:
                          return null;
                      }
                    };

                    return (
                      <motion.button
                        key={mood}
                        variants={scaleIn}
                        initial="initial"
                        animate="animate"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-1.5 text-xs rounded-full ${
                          selectedMoods.includes(mood)
                            ? "bg-gradient-to-r from-[#675AFE] to-[#8A7BFF] text-white shadow-md"
                            : "bg-[#675AFE]/20 text-[#EAEAEA] hover:bg-[#675AFE]/30 backdrop-blur-sm"
                        } transition-all duration-200 flex items-center gap-1.5`}
                        onClick={() =>
                          toggleFilter(selectedMoods, mood, onMoodChange)
                        }
                      >
                        {getMoodIcon()}
                        <span>{mood}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Genre Filter */}
              <div>
                <h3 className="text-sm font-poppins font-medium mb-2 flex items-center gap-1">
                  <Film className="w-4 h-4 text-blue-400" />
                  <span>Genre</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <motion.button
                      key={genre}
                      variants={scaleIn}
                      initial="initial"
                      animate="animate"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1.5 text-xs rounded-full ${
                        selectedGenres.includes(genre)
                          ? "bg-gradient-to-r from-[#675AFE] to-[#8A7BFF] text-white shadow-md"
                          : "bg-[#675AFE]/20 text-[#EAEAEA] hover:bg-[#675AFE]/30 backdrop-blur-sm"
                      } transition-all duration-200`}
                      onClick={() =>
                        toggleFilter(selectedGenres, genre, onGenreChange)
                      }
                    >
                      {genre}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Streaming Filter */}
              <div>
                <h3 className="text-sm font-poppins font-medium mb-2 flex items-center gap-1">
                  <Tv className="w-4 h-4 text-green-400" />
                  <span>Streaming On</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {streamingServices.map((service) => {
                    const getIcon = () => {
                      switch (service) {
                        case "Netflix":
                          return <Play className="w-3 h-3 text-red-600" />;
                        case "Prime":
                          return <Video className="w-3 h-3 text-blue-400" />;
                        case "Disney+":
                          return <Film className="w-3 h-3 text-blue-500" />;
                        case "Hulu":
                          return <Tv className="w-3 h-3 text-green-400" />;
                        default:
                          return null;
                      }
                    };

                    return (
                      <motion.button
                        key={service}
                        variants={scaleIn}
                        initial="initial"
                        animate="animate"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-1.5 text-xs rounded-full ${
                          selectedServices.includes(service)
                            ? "bg-gradient-to-r from-[#675AFE] to-[#8A7BFF] text-white shadow-md"
                            : "bg-[#675AFE]/20 text-[#EAEAEA] hover:bg-[#675AFE]/30 backdrop-blur-sm"
                        } transition-all duration-200 flex items-center gap-1.5`}
                        onClick={() =>
                          toggleFilter(
                            selectedServices,
                            service,
                            onServiceChange
                          )
                        }
                      >
                        {getIcon()}
                        <span>{service}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-poppins font-medium text-[#FFCC00] hover:text-[#FFCC00]/80 transition-all duration-200 px-4 py-2 rounded-lg bg-[#1E293B]/50 hover:bg-[#1E293B]/70 border border-[#FFCC00]/20 flex items-center gap-1.5"
                onClick={onReset}
              >
                <ChevronDown size={14} className="text-[#FFCC00]" />
                Reset Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filters;
