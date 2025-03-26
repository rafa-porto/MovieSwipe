import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Film, Tv, Heart } from "lucide-react";
import { MoodIcons } from "@/assets/mood-icons";
import { StreamingIcons } from "@/assets/streaming-icons";
import { filterAnimation, filterContentAnimation, scaleIn } from "@/lib/motion";
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
  const filterContainerRef = useRef<HTMLDivElement>(null);

  // Use this to prevent the initial animation when the component mounts
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initialize component
  useEffect(() => {
    // Mark as initialized after first render
    if (!hasInitialized) {
      setHasInitialized(true);
    }
  }, []);

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
          transition={{
            scale: { duration: 0.2 },
          }}
          className="flex items-center gap-1.5 text-[#EAEAEA] text-sm px-3 py-1.5 rounded-lg bg-[#675AFE]/20 hover:bg-[#675AFE]/30 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <span>Filters</span>
        </motion.button>
      </div>

      {/* Preload the filter content in a hidden div to prevent layout shifts */}
      <div className="hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Preload content structure */}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            ref={filterContainerRef}
            key="filters"
            initial={hasInitialized ? "initial" : { opacity: 0 }}
            animate="animate"
            exit="exit"
            variants={filterAnimation}
            className="bg-gradient-to-br from-[#1E293B] to-[#1E293B]/80 rounded-xl p-6 mb-6 overflow-hidden shadow-lg border border-[#675AFE]/10"
            style={{
              transformOrigin: "top center",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              perspective: 1000,
            }}
          >
            <motion.div
              variants={filterContentAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Mood Filter */}
                <div>
                  <h3 className="text-sm font-poppins font-medium mb-3 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-pink-400" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600">
                      Mood
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {moods.map((mood) => {
                      const MoodIcon =
                        MoodIcons[mood as keyof typeof MoodIcons];

                      return (
                        <motion.button
                          key={mood}
                          variants={scaleIn}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            scale: { duration: 0.2 },
                          }}
                          className={`px-3.5 py-2 text-xs rounded-full ${
                            selectedMoods.includes(mood)
                              ? "bg-gradient-to-r from-[#675AFE] to-[#8A7BFF] text-white shadow-lg ring-2 ring-[#675AFE]/20"
                              : "bg-[#1E293B]/80 text-[#EAEAEA] hover:bg-[#1E293B] border border-[#675AFE]/30 backdrop-blur-sm"
                          } transition-colors duration-200 flex items-center gap-2`}
                          onClick={() =>
                            toggleFilter(selectedMoods, mood, onMoodChange)
                          }
                        >
                          <div className="w-4 h-4 flex items-center justify-center">
                            <MoodIcon />
                          </div>
                          <span className="font-medium">{mood}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Genre Filter */}
                <div>
                  <h3 className="text-sm font-poppins font-medium mb-3 flex items-center gap-1.5">
                    <Film className="w-4 h-4 text-blue-400" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                      Genre
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <motion.button
                        key={genre}
                        variants={scaleIn}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          scale: { duration: 0.2 },
                        }}
                        className={`px-3.5 py-2 text-xs rounded-full ${
                          selectedGenres.includes(genre)
                            ? "bg-gradient-to-r from-[#675AFE] to-[#8A7BFF] text-white shadow-lg ring-2 ring-[#675AFE]/20"
                            : "bg-[#1E293B]/80 text-[#EAEAEA] hover:bg-[#1E293B] border border-[#675AFE]/30 backdrop-blur-sm"
                        } transition-colors duration-200 font-medium`}
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
                  <h3 className="text-sm font-poppins font-medium mb-3 flex items-center gap-1.5">
                    <Tv className="w-4 h-4 text-green-400" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                      Streaming On
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {streamingServices.map((service) => {
                      const ServiceIcon =
                        StreamingIcons[service as keyof typeof StreamingIcons];

                      return (
                        <motion.button
                          key={service}
                          variants={scaleIn}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            scale: { duration: 0.2 },
                          }}
                          className={`px-3.5 py-2 text-xs rounded-full ${
                            selectedServices.includes(service)
                              ? "bg-gradient-to-r from-[#675AFE] to-[#8A7BFF] text-white shadow-lg ring-2 ring-[#675AFE]/20"
                              : "bg-[#1E293B]/80 text-[#EAEAEA] hover:bg-[#1E293B] border border-[#675AFE]/30 backdrop-blur-sm"
                          } transition-colors duration-200 flex items-center gap-2`}
                          onClick={() =>
                            toggleFilter(
                              selectedServices,
                              service,
                              onServiceChange
                            )
                          }
                        >
                          <div className="w-4 h-4 flex items-center justify-center">
                            <ServiceIcon />
                          </div>
                          <span className="font-medium">{service}</span>
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
                  transition={{
                    scale: { duration: 0.2 },
                  }}
                  className="text-sm font-poppins font-medium text-[#FFCC00] hover:text-[#FFCC00]/80 transition-colors duration-200 px-4 py-2.5 rounded-lg bg-[#1E293B]/70 hover:bg-[#1E293B] border border-[#FFCC00]/20 hover:border-[#FFCC00]/40 flex items-center gap-2 shadow-lg"
                  onClick={onReset}
                >
                  <ChevronDown size={14} className="text-[#FFCC00]" />
                  Reset Filters
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filters;
