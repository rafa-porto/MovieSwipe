import { useState } from "react";
import { Link } from "wouter";
import { FiBarChart2, FiBookmark } from "react-icons/fi";
import FavoritesModal from "./FavoritesModal";
import StatsModal from "./StatsModal";

const Header = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [showStats, setShowStats] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#121826]/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center">
              <h1 className="text-2xl font-poppins font-bold text-[#FFCC00] mr-2">
                NOVO
              </h1>
              <span className="text-xs text-[#EAEAEA]/60 font-inter mt-1">
                MOVIE DISCOVERY
              </span>
            </a>
          </Link>
          
          <div className="flex items-center space-x-4">
            <button 
              className="text-[#EAEAEA] hover:text-[#675AFE] transition-colors"
              onClick={() => setShowStats(true)}
            >
              <FiBarChart2 size={20} />
            </button>
            <button 
              className="text-[#EAEAEA] hover:text-[#675AFE] transition-colors"
              onClick={() => setShowFavorites(true)}
            >
              <FiBookmark size={20} />
            </button>
            <div className="h-8 w-8 rounded-full bg-[#675AFE] flex items-center justify-center text-sm font-medium">
              <span>JS</span>
            </div>
          </div>
        </div>
      </header>

      {showFavorites && <FavoritesModal onClose={() => setShowFavorites(false)} />}
      {showStats && <StatsModal onClose={() => setShowStats(false)} />}
    </>
  );
};

export default Header;
