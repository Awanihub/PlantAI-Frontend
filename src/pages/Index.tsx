import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Leaf,
  Camera,
  BookOpen,
  Heart,
  Droplets,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlantCategoryCarousel } from "@/components/PlantCategoryCarousel";
import heroImage from "@/assets/hero-earth-hands.jpg";
import plantsCollection from "@/assets/plants-collection.jpg";
import seedlingHands from "@/assets/seedling-hands.jpg";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300
      ${darkMode ? 'bg-[#0D0D0D] text-gray-300' : 'bg-gradient-to-br from-background via-secondary to-background text-foreground'}`}
    >
      {/* Raindrops animation */}
      {darkMode && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-6 bg-gray-500 opacity-40 rounded-full animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${0.5 + Math.random()}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with Dark Mode Toggle */}
        <header className="mb-12 flex justify-between items-center animate-fade-in">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-foreground'}`}>
              Welcome to PlantID
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2"
          >
            {darkMode ? (
              <>
                <Sun className="w-5 h-5 text-yellow-400" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 text-gray-200" />
                Dark Mode
              </>
            )}
          </Button>
        </header>

        {/* Hero Section */}
        <div className="relative w-full max-w-4xl mx-auto mb-8 rounded-3xl overflow-hidden shadow-lg animate-scale-in">
          <div className={`absolute inset-0 z-10 bg-gradient-to-t from-background/95 via-background/50 to-transparent
            ${darkMode ? 'dark:from-[#0D0D0D]/95 dark:via-[#1a1a1a]/50' : ''}`}
          />
          <img
            src={heroImage}
            alt="Hands holding earth with plants"
            className="w-full h-[400px] object-cover animate-pulse-subtle"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <div className="flex items-center justify-center mb-4 animate-float">
              <div className="relative">
                <Leaf className={`w-16 h-16 ${darkMode ? 'text-green-400' : 'text-primary-light'} drop-shadow-lg`} />
                <Sparkles className="w-6 h-6 text-bloom-yellow absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <h1 className={`text-5xl md:text-7xl font-bold mb-4 drop-shadow-md ${darkMode ? 'text-white' : 'text-foreground'}`}>
              PlantID
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl drop-shadow-sm ${darkMode ? 'text-gray-300/90' : 'text-foreground/90'}`}>
              Your personal plant companion. Identify, learn, and care for your green friends with AI-powered technology.
            </p>
          </div>
        </div>

        {/* Plant Category Carousel */}
        <div className="mb-16">
          <PlantCategoryCarousel />
        </div>

        {/* Decorative Images Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 animate-slide-up">
          <div className="relative rounded-3xl overflow-hidden shadow-lg group">
            <img
              src={plantsCollection}
              alt="Colorful collection of plants"
              className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className={`absolute inset-0 opacity-60 dark:opacity-40 bg-gradient-to-t from-bloom-pink/20 via-transparent to-bloom-purple/20`}/>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-lg group">
            <img
              src={seedlingHands}
              alt="Hands holding seedling"
              className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className={`absolute inset-0 opacity-60 dark:opacity-30 bg-gradient-to-t from-primary/20 via-transparent to-sky-blue/20`}/>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-slide-up">
          {[
            { icon: Camera, title: "Instant Identify", desc: "Snap a photo and instantly identify any plant species" },
            { icon: BookOpen, title: "Learn & Grow", desc: "Access detailed care guides and plant knowledge" },
            { icon: Heart, title: "Health Check", desc: "Diagnose plant health issues with AI analysis" },
            { icon: Droplets, title: "Smart Reminders", desc: "Never forget to water your plants again" },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className={`p-6 rounded-2xl shadow-md hover:-translate-y-2 border-2 transition-all ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-card border-primary/20'}`}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-md bg-gradient-to-br from-green-600 to-green-400">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-card-foreground'}`}>{f.title}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-muted-foreground'}`}>{f.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center animate-scale-in">
          <div className={`relative p-8 rounded-3xl max-w-md mx-auto shadow-lg border-2 overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gradient-to-br from-card via-card to-primary/5 border-primary/30'}`}>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-bloom-yellow animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                Start Your Plant Journey
              </h2>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-muted-foreground'}`}>
                Join thousands of plant lovers caring for their green companions
              </p>
              <div className="space-y-3">
                <Link to="/signup" className="block">
                  <Button className="w-full h-12 text-lg bg-gradient-to-r from-green-600 to-green-400 hover:shadow-lg transition-all hover:scale-105">
                    Create My Garden
                  </Button>
                </Link>
                <Link to="/signin" className="block">
                  <Button className={`w-full h-12 text-lg border-2 transition-all ${darkMode ? 'border-gray-500 text-gray-200 hover:bg-gray-800' : 'hover:border-primary hover:bg-primary/5'}`}>
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={`mt-16 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>
          <p>© 2024 PlantID. Nurture nature, one plant at a time. 🌱</p>
        </footer>
      </div>

      {/* CSS for raindrops animation */}
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(-10px); opacity: 0.5; }
            50% { opacity: 0.7; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          .animate-fall {
            animation: fall linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Index;
