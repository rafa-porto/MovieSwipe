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
import { useEffect } from "react";

function Router() {
  const [location] = useLocation();
  
  // Initialize the app by creating a default user and preferences
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log("Initializing app...");
        const response = await apiRequest('GET', '/api/init');
        const data = await response.json();
        console.log("App initialized:", data);
      } catch (error) {
        console.error("Error initializing app:", error);
      }
    };
    
    initializeApp();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#121826] text-[#EAEAEA] font-inter">
      <Header />
      
      <main className="flex-1 pt-16 pb-20">
        <Switch>
          <Route path="/" component={Discover} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/stats" component={Statistics} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      <NavBar currentPath={location} />
    </div>
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
