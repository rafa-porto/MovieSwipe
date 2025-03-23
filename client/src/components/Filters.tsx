import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Play, Video, Film, Tv } from "lucide-react";
import { filterAnimation } from "@/lib/motion";
import { type MovieGenre, type MovieMood, type StreamingService } from "@/types";

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
  'Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'
];

const moods: MovieMood[] = [
  'Relaxing', 'Exciting', 'Thoughtful', 'Uplifting', 'Intense'
];

const streamingServices: StreamingService[] = [
  'Netflix', 'Prime', 'Disney+', 'Hulu'
];

const Filters = ({
  selectedGenres,
  selectedMoods,
  selectedServices,
  onGenreChange,
  onMoodChange,
  onServiceChange,
  onReset
}: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = (
    current: string[],
    item: string,
    updateFn: (newItems: any[]) => void
  ) => {
    const newItems = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
    updateFn(newItems as any);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-poppins font-semibold">Discover Movies</h2>
        <button 
          className="flex items-center text-[#EAEAEA] space-x-1 text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <span>Filters</span>
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="filters"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={filterAnimation}
            className="bg-[#1E293B] rounded-xl p-4 mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Mood Filter */}
              <div>
                <h3 className="text-sm font-poppins font-medium mb-2">Mood</h3>
                <div className="flex flex-wrap gap-2">
                  {moods.map(mood => (
                    <button
                      key={mood}
                      className={`px-3 py-1 text-xs rounded-full ${
                        selectedMoods.includes(mood)
                          ? "bg-[#675AFE] text-[#EAEAEA] backdrop-blur-sm"
                          : "bg-[#675AFE]/20 text-[#EAEAEA] hover:bg-[#675AFE]/40 backdrop-blur-sm"
                      } transition-colors`}
                      onClick={() => toggleFilter(selectedMoods, mood, onMoodChange)}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Genre Filter */}
              <div>
                <h3 className="text-sm font-poppins font-medium mb-2">Genre</h3>
                <div className="flex flex-wrap gap-2">
                  {genres.map(genre => (
                    <button
                      key={genre}
                      className={`px-3 py-1 text-xs rounded-full ${
                        selectedGenres.includes(genre)
                          ? "bg-[#675AFE] text-[#EAEAEA] backdrop-blur-sm"
                          : "bg-[#675AFE]/20 text-[#EAEAEA] hover:bg-[#675AFE]/40 backdrop-blur-sm"
                      } transition-colors`}
                      onClick={() => toggleFilter(selectedGenres, genre, onGenreChange)}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Streaming Filter */}
              <div>
                <h3 className="text-sm font-poppins font-medium mb-2">Streaming On</h3>
                <div className="flex flex-wrap gap-2">
                  {streamingServices.map(service => {
                    const getIcon = () => {
                      switch (service) {
                        case 'Netflix':
                          return <Play className="w-3 h-3 text-red-600" />;
                        case 'Prime':
                          return <Video className="w-3 h-3 text-blue-400" />;
                        case 'Disney+':
                          return <Film className="w-3 h-3 text-blue-500" />;
                        case 'Hulu':
                          return <Tv className="w-3 h-3 text-green-400" />;
                        default:
                          return null;
                      }
                    };
                  
                    return (
                      <button
                        key={service}
                        className={`px-3 py-1 text-xs rounded-full ${
                          selectedServices.includes(service)
                            ? "bg-[#675AFE] text-[#EAEAEA] backdrop-blur-sm"
                            : "bg-[#675AFE]/20 text-[#EAEAEA] hover:bg-[#675AFE]/40 backdrop-blur-sm"
                        } transition-colors flex items-center gap-1`}
                        onClick={() => toggleFilter(selectedServices, service, onServiceChange)}
                      >
                        {getIcon()}
                        <span>{service}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button 
                className="text-sm font-poppins font-medium text-[#FFCC00] hover:text-[#FFCC00]/80 transition-colors"
                onClick={onReset}
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filters;
