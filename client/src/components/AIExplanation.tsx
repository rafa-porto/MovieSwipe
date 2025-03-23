import { motion } from 'framer-motion';
import { Brain, Zap, BarChart, Lock, Film, Heart } from 'lucide-react';

const AIExplanation = () => {
  return (
    <div className="w-full bg-[#1E293B]/50 rounded-lg p-5 my-6">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="h-6 w-6 text-[#675AFE]" />
        <h2 className="font-poppins font-bold text-lg text-[#EAEAEA]">How our AI works</h2>
      </div>
      
      <p className="text-[#EAEAEA]/80 text-sm mb-6">
        Our recommendation technology uses multiple AI techniques to suggest movies you'll likely enjoy.
      </p>
      
      <div className="space-y-5">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex gap-3 items-start"
        >
          <div className="p-2 rounded-lg bg-[#675AFE]/10 text-[#675AFE]">
            <Film className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-[#EAEAEA] text-sm">Content-Based Filtering</h3>
            <p className="text-[#EAEAEA]/70 text-xs">
              We analyze the genres, directors, actors, and other attributes of the movies you like 
              to find patterns in your preferences.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex gap-3 items-start"
        >
          <div className="p-2 rounded-lg bg-[#675AFE]/10 text-[#675AFE]">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-[#EAEAEA] text-sm">Collaborative Filtering</h3>
            <p className="text-[#EAEAEA]/70 text-xs">
              We identify patterns between similar movies and how users with similar tastes 
              rated those movies to create personalized recommendations.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex gap-3 items-start"
        >
          <div className="p-2 rounded-lg bg-[#675AFE]/10 text-[#675AFE]">
            <BarChart className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-[#EAEAEA] text-sm">Continuous Learning</h3>
            <p className="text-[#EAEAEA]/70 text-xs">
              Our system improves with each interaction. Each interaction helps refine 
              your recommendations and make them more accurate over time.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex gap-3 items-start"
        >
          <div className="p-2 rounded-lg bg-[#675AFE]/10 text-[#675AFE]">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-[#EAEAEA] text-sm">Surprise Factor</h3>
            <p className="text-[#EAEAEA]/70 text-xs">
              We add a controlled element of surprise to allow you to discover new movies 
              that you might not otherwise find.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex gap-3 items-start"
        >
          <div className="p-2 rounded-lg bg-[#675AFE]/10 text-[#675AFE]">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-[#EAEAEA] text-sm">Privacy Preserved</h3>
            <p className="text-[#EAEAEA]/70 text-xs">
              Your preferences are processed in our system securely, and we never share your usage data 
              with third parties.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIExplanation;