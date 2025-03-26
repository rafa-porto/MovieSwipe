import { useState } from "react";
import { Link } from "wouter";
import { FiBarChart2, FiBookmark } from "react-icons/fi";
import { motion } from "framer-motion";
import { logoAnimation, navItemAnimation } from "@/lib/motion";
import FavoritesModal from "./FavoritesModal";
import StatsModal from "./StatsModal";

const Header = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [showStats, setShowStats] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#121826]/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <motion.h1
              className="text-2xl font-poppins font-bold text-[#FFCC00] mr-2"
              variants={logoAnimation}
              initial="initial"
              animate="animate"
            >
              NOVO
            </motion.h1>
            <motion.span
              className="text-xs text-[#EAEAEA]/60 font-inter mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              MOVIE DISCOVERY
            </motion.span>
          </Link>

          <div className="flex items-center space-x-4">
            <motion.button
              className="text-[#EAEAEA] hover:text-[#675AFE] transition-colors"
              onClick={() => setShowStats(true)}
              variants={navItemAnimation}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiBarChart2 size={20} />
            </motion.button>
            <motion.button
              className="text-[#EAEAEA] hover:text-[#675AFE] transition-colors"
              onClick={() => setShowFavorites(true)}
              variants={navItemAnimation}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiBookmark size={20} />
            </motion.button>
            <motion.div
              className="h-8 w-8 rounded-full bg-[#675AFE] flex items-center justify-center text-sm font-medium"
              variants={navItemAnimation}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
            >
              <span>JS</span>
            </motion.div>
          </div>
        </div>
      </header>

      {showFavorites && (
        <FavoritesModal onClose={() => setShowFavorites(false)} />
      )}
      {showStats && <StatsModal onClose={() => setShowStats(false)} />}
    </>
  );
};

export default Header;
