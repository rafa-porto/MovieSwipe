import { Switch, Route, useLocation } from "wouter";
import { queryClient, apiRequest } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Discover from "@/pages/Discover";
import Favorites from "@/pages/Favorites";
import Statistics from "@/pages/Statistics";
import Profile from "@/pages/Profile";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { appEntrance, staggerFast } from "@/lib/motion";

function Router() {
  const [location] = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize the app by creating a default user and preferences
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log("Initializing app...");
        const response = await apiRequest("GET", "/api/init");
        const data = await response.json();
        console.log("App initialized:", data);
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        // Hide the initial loader
        const loader = document.getElementById("app-loader");
        if (loader) {
          loader.classList.add("loaded");
          // Remove loader from DOM after animation completes
          setTimeout(() => {
            loader.remove();
            setIsLoaded(true);
          }, 500);
        } else {
          setIsLoaded(true);
        }
      }
    };

    initializeApp();
  }, []);

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-[#121826] text-[#EAEAEA] font-inter"
      variants={appEntrance}
      initial="initial"
      animate="animate"
    >
      <AnimatePresence>
        {isLoaded && (
          <>
            <motion.div
              variants={staggerFast}
              initial="initial"
              animate="animate"
            >
              <motion.header variants={appEntrance}>
                <Header />
              </motion.header>
            </motion.div>

            <motion.main
              className="flex-1 pt-16 pb-20"
              variants={staggerFast}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Switch>
                <Route path="/" component={Discover} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/stats" component={Statistics} />
                <Route path="/profile" component={Profile} />
                <Route component={NotFound} />
              </Switch>
            </motion.main>

            <motion.div
              variants={staggerFast}
              initial="initial"
              animate="animate"
            >
              <motion.nav variants={appEntrance}>
                <NavBar currentPath={location} />
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
