import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import scene images for carousel
import heroRvWinter from "@/assets/hero-rv-winter.jpg";
import heroOffgridSolar from "@/assets/hero-offgrid-solar.jpg";
import heroVanlife from "@/assets/hero-vanlife.jpg";
import heroMarine from "@/assets/hero-marine.jpg";

interface HeroScene {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  highlight: string;
}

const heroScenes: HeroScene[] = [
  { 
    image: heroRvWinter, 
    alt: "RV & Motorhome",
    title: "Mountain Adventure",
    subtitle: "Power your RV through any terrain",
    highlight: "Cold-weather protection · Works at -20°C"
  },
  { 
    image: heroOffgridSolar, 
    alt: "Off-Grid Solar",
    title: "Off-Grid Living",
    subtitle: "The perfect partner for solar systems",
    highlight: "4000+ cycles · 10 years of reliable power"
  },
  { 
    image: heroVanlife, 
    alt: "Van Life",
    title: "Coastal Camping",
    subtitle: "Energy companion for Van Life explorers",
    highlight: "Bluetooth monitoring · Track power anytime"
  },
  { 
    image: heroMarine, 
    alt: "Marine",
    title: "Ocean Voyage",
    subtitle: "Stable power for yachts and sailboats",
    highlight: "IP67 waterproof · Built for marine environments"
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload first image
  useEffect(() => {
    const img = new Image();
    img.src = heroScenes[0].image;
    img.onload = () => setIsLoaded(true);
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroScenes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
  };

  const currentScene = heroScenes[currentSlide];

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Preload LCP image for faster discovery */}
      <img 
        src={heroScenes[0].image} 
        alt="" 
        fetchPriority="high"
        aria-hidden="true"
        className="absolute w-0 h-0 opacity-0 pointer-events-none"
      />
      
      {/* Animated Carousel Background Images */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${currentScene.image})` }}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-[1]" />

      {/* Content - Left-aligned for clarity */}
      <div className="container-custom relative z-10 py-16 md:py-20">
        <div className="max-w-2xl">

          {/* Scene-specific Title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-4"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  boxShadow: [
                    "0 0 20px hsl(var(--primary) / 0.4)",
                    "0 0 30px hsl(var(--primary) / 0.6)",
                    "0 0 20px hsl(var(--primary) / 0.4)"
                  ]
                }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.1,
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="inline-block px-4 py-1.5 bg-primary text-primary-foreground backdrop-blur-sm rounded-full text-base font-semibold mb-4"
              >
                {currentScene.title}
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                {currentScene.subtitle}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg md:text-xl text-primary font-medium mt-4"
              >
                {currentScene.highlight}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Key Trust Points */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {["5-Year Warranty", "Bluetooth Monitoring", "Free EU Shipping"].map((point, index) => (
              <motion.span 
                key={point}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white font-medium"
              >
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                {point}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <Button asChild size="lg" className="group">
              <Link to="/products">
                Shop Batteries
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
              <Link to="/battery-selector">
                How to Choose
              </Link>
            </Button>
          </motion.div>

          {/* Carousel Indicators */}
          <div className="flex gap-2">
            {heroScenes.map((scene, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`group relative h-2 rounded-full transition-all duration-500 ${
                  index === currentSlide 
                    ? 'bg-primary w-8' 
                    : 'bg-white/40 hover:bg-white/60 w-2'
                }`}
                aria-label={`Go to ${scene.title}`}
              >
                {index === currentSlide && (
                  <motion.div
                    className="absolute inset-0 bg-primary rounded-full"
                    layoutId="activeSlide"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={scrollToContent}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors z-10"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-7 h-7 animate-bounce" />
      </motion.button>
    </section>
  );
};

export default Hero;
