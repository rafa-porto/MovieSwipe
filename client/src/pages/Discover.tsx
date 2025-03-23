import { useState } from "react";
import Filters from "@/components/Filters";
import SwipeCardStack from "@/components/SwipeCardStack";
import { type MovieGenre, type MovieMood, type StreamingService } from "@/types";

const Discover = () => {
  const [selectedGenres, setSelectedGenres] = useState<MovieGenre[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<MovieMood[]>([]);
  const [selectedServices, setSelectedServices] = useState<StreamingService[]>([]);
  
  const resetFilters = () => {
    setSelectedGenres([]);
    setSelectedMoods([]);
    setSelectedServices([]);
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
      />
      
      <div className="mt-8 text-center">
        <p className="text-sm text-[#EAEAEA]/60 font-inter">
          Today's discovery: <span className="text-[#EAEAEA] font-medium">12 of 50</span> movies
        </p>
        <div className="h-1 w-full max-w-xs bg-[#1E293B]/50 rounded-full mx-auto mt-2">
          <div className="h-full bg-[#675AFE] rounded-full" style={{ width: "24%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
