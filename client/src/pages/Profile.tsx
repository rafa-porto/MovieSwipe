import { motion } from "framer-motion";
import { User, Settings, LogOut } from "lucide-react";
import { fadeIn } from "@/lib/motion";

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-poppins font-bold mb-6">Your Profile</h1>
      
      <motion.div 
        className="flex flex-col items-center mb-8"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <div className="w-24 h-24 bg-[#675AFE] rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl font-poppins font-semibold">JS</span>
        </div>
        <h2 className="text-xl font-poppins font-semibold">John Smith</h2>
        <p className="text-sm text-[#EAEAEA]/70">Film enthusiast since 2023</p>
      </motion.div>
      
      <motion.div 
        className="bg-[#1E293B] rounded-xl p-5 mb-6"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <h3 className="text-lg font-poppins font-semibold mb-4">Account Settings</h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 hover:bg-[#121826]/50 rounded-lg transition-colors cursor-pointer">
            <User className="text-[#675AFE]" size={20} />
            <div>
              <div className="text-sm font-medium">Edit Profile</div>
              <div className="text-xs text-[#EAEAEA]/60">Update your personal information</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 hover:bg-[#121826]/50 rounded-lg transition-colors cursor-pointer">
            <Settings className="text-[#675AFE]" size={20} />
            <div>
              <div className="text-sm font-medium">Preferences</div>
              <div className="text-xs text-[#EAEAEA]/60">Manage your movie preferences</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 hover:bg-[#121826]/50 rounded-lg transition-colors cursor-pointer">
            <LogOut className="text-[#675AFE]" size={20} />
            <div>
              <div className="text-sm font-medium">Sign Out</div>
              <div className="text-xs text-[#EAEAEA]/60">Log out of your account</div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-[#1E293B] rounded-xl p-5"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-poppins font-semibold mb-4">App Settings</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">Dark Mode</div>
              <div className="text-xs text-[#EAEAEA]/60">Always use dark theme</div>
            </div>
            <div className="w-12 h-6 bg-[#675AFE] rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">Show Adult Content</div>
              <div className="text-xs text-[#EAEAEA]/60">Include mature movies</div>
            </div>
            <div className="w-12 h-6 bg-[#121826] rounded-full relative">
              <div className="w-5 h-5 bg-[#EAEAEA]/70 rounded-full absolute left-0.5 top-0.5"></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">Notifications</div>
              <div className="text-xs text-[#EAEAEA]/60">Get new movie alerts</div>
            </div>
            <div className="w-12 h-6 bg-[#675AFE] rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
