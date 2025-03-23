import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Heart, Check, Play, Video, Film, Tv } from "lucide-react";
import { fetchUserStats } from "@/lib/tmdb";
import { modalAnimation, fadeIn } from "@/lib/motion";

interface StatsModalProps {
  onClose: () => void;
}

const StatsModal = ({ onClose }: StatsModalProps) => {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUserStats();
        setStats(data);
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
    
    // Prevent scrolling on the body
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const getStreamingIcon = (service: string) => {
    switch (service) {
      case 'Netflix':
        return <Play className="text-red-600" />;
      case 'Prime':
        return <Video className="text-blue-400" />;
      case 'Disney+':
        return <Film className="text-blue-500" />;
      case 'Hulu':
        return <Tv className="text-green-400" />;
      default:
        return null;
    }
  };

  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const pastDate = new Date(timestamp);
    const diff = now.getTime() - pastDate.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-[#121826]/95 z-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="container mx-auto px-4 py-16"
        variants={modalAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-poppins font-bold">Your Stats</h2>
          <button 
            className="text-[#EAEAEA] hover:text-[#675AFE] transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>
        
        {isLoading ? (
          <div className="py-12 flex justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-[#675AFE] border-t-transparent animate-spin"></div>
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preferences */}
            <motion.div 
              className="bg-[#1E293B] rounded-xl p-5"
              variants={fadeIn}
            >
              <h3 className="text-lg font-poppins font-semibold mb-4">Your Preferences</h3>
              
              {/* Preferred Genres */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-[#EAEAEA]/70 mb-2">Top Genres</h4>
                <div className="space-y-3">
                  {stats.topGenres && stats.topGenres.map((genre: any, index: number) => (
                    <div key={genre.genre} className="flex items-center">
                      <span className="w-24 text-sm">{genre.genre}</span>
                      <div className="flex-1 h-2 bg-[#675AFE]/20 rounded-full">
                        <div 
                          className="h-full bg-[#675AFE] rounded-full" 
                          style={{ width: `${genre.percentage}%` }}
                        ></div>
                      </div>
                      <span className="w-10 text-right text-sm">{genre.percentage}%</span>
                    </div>
                  ))}
                  
                  {(!stats.topGenres || stats.topGenres.length === 0) && (
                    <p className="text-sm text-[#EAEAEA]/50">No genre data yet</p>
                  )}
                </div>
              </div>
              
              {/* Preferred Platforms */}
              <div>
                <h4 className="text-sm font-medium text-[#EAEAEA]/70 mb-2">Streaming Platforms</h4>
                <div className="flex flex-wrap gap-4">
                  {stats.streamingServices && stats.streamingServices.map((service: any) => (
                    <div key={service.service} className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-[#1E293B] flex items-center justify-center text-2xl relative">
                        {getStreamingIcon(service.service)}
                        <span className="absolute -bottom-1 -right-1 bg-[#FFCC00] text-[#121826] text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                          {service.count}
                        </span>
                      </div>
                      <span className="text-xs mt-1">{service.service}</span>
                    </div>
                  ))}
                  
                  {(!stats.streamingServices || stats.streamingServices.length === 0) && (
                    <p className="text-sm text-[#EAEAEA]/50">No streaming data yet</p>
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Activity */}
            <motion.div 
              className="bg-[#1E293B] rounded-xl p-5" 
              variants={fadeIn}
            >
              <h3 className="text-lg font-poppins font-semibold mb-4">Your Activity</h3>
              
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-[#121826] p-3 rounded-lg">
                  <div className="text-3xl font-poppins font-bold text-[#675AFE]">{stats.moviesViewed || 0}</div>
                  <div className="text-xs text-[#EAEAEA]/70">Movies Viewed</div>
                </div>
                
                <div className="bg-[#121826] p-3 rounded-lg">
                  <div className="text-3xl font-poppins font-bold text-[#FFCC00]">{stats.favorites || 0}</div>
                  <div className="text-xs text-[#EAEAEA]/70">Favorites</div>
                </div>
                
                <div className="bg-[#121826] p-3 rounded-lg">
                  <div className="text-3xl font-poppins font-bold text-green-500">{stats.likeRate || 0}%</div>
                  <div className="text-xs text-[#EAEAEA]/70">Like Rate</div>
                </div>
                
                <div className="bg-[#121826] p-3 rounded-lg">
                  <div className="text-3xl font-poppins font-bold text-purple-400">{stats.avgRating || 0}</div>
                  <div className="text-xs text-[#EAEAEA]/70">Avg. Rating</div>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div>
                <h4 className="text-sm font-medium text-[#EAEAEA]/70 mb-2">Recent Activity</h4>
                <div className="space-y-3">
                  {stats.recentActivity && stats.recentActivity.map((activity: any, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      {activity.action === 'liked' ? (
                        <Heart className="text-green-500" size={16} />
                      ) : (
                        <X className="text-red-500" size={16} />
                      )}
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {activity.action === 'liked' ? 'Liked' : 'Skipped'} {activity.movieTitle}
                        </div>
                        <div className="text-xs text-[#EAEAEA]/60">
                          {getRelativeTime(activity.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {(!stats.recentActivity || stats.recentActivity.length === 0) && (
                    <p className="text-sm text-[#EAEAEA]/50">No activity yet</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p>Failed to load statistics</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default StatsModal;
