import { Link } from "wouter";
import { Home, Compass, Bookmark, User } from "lucide-react";

interface NavBarProps {
  currentPath: string;
}

const NavBar = ({ currentPath }: NavBarProps) => {
  const isActive = (path: string) => currentPath === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1E293B]/90 backdrop-blur-sm border-t border-[#EAEAEA]/10 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center py-3">
          <Link href="/">
            <a className={`flex flex-col items-center ${isActive('/') ? 'text-[#675AFE]' : 'text-[#EAEAEA]/90 hover:text-[#675AFE]'} transition-colors`}>
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </a>
          </Link>
          
          <Link href="/discover">
            <a className={`flex flex-col items-center ${isActive('/discover') ? 'text-[#675AFE]' : 'text-[#EAEAEA]/90 hover:text-[#675AFE]'} transition-colors`}>
              <Compass size={20} />
              <span className="text-xs mt-1">Discover</span>
            </a>
          </Link>
          
          <Link href="/favorites">
            <a className={`flex flex-col items-center ${isActive('/favorites') ? 'text-[#675AFE]' : 'text-[#EAEAEA]/90 hover:text-[#675AFE]'} transition-colors`}>
              <Bookmark size={20} />
              <span className="text-xs mt-1">Favorites</span>
            </a>
          </Link>
          
          <Link href="/profile">
            <a className={`flex flex-col items-center ${isActive('/profile') ? 'text-[#675AFE]' : 'text-[#EAEAEA]/90 hover:text-[#675AFE]'} transition-colors`}>
              <User size={20} />
              <span className="text-xs mt-1">Profile</span>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
