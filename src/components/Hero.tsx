import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";

// Import scene images for carousel
import heroRvWinter from "@/assets/hero-rv-winter.jpg";
import heroOffgridSolar from "@/assets/hero-offgrid-solar.jpg";
import heroVanlife from "@/assets/hero-vanlife.jpg";
import heroMarine from "@/assets/hero-marine.jpg";

const heroScenes = [
  { image: heroRvWinter, alt: "RV & Motorhome" },
  { image: heroOffgridSolar, alt: "Off-Grid Solar" },
  { image: heroVanlife, alt: "Van Life" },
  { image: heroMarine, alt: "Marine" },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
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
      setCurrentSlide((prev) => (prev + 1) % heroScenes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
  };

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
      
      {/* Carousel Background Images */}
      {heroScenes.map((scene, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${scene.image})` }}
        />
      ))}
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Content - Left-aligned for clarity */}
      <div className="container-custom relative z-10 py-16 md:py-20">
        <div className="max-w-2xl">
          
          {/* Category Identifier */}
          <p className="text-sm text-white/70 uppercase tracking-widest mb-4">
            12V LiFePO₄ Battery
          </p>

          {/* Main Headline - Clear Differentiator */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Cold-Weather Ready.
            <span className="block text-primary">Built for European Winters.</span>
          </h1>

          {/* Subtitle - Application Context */}
          <p className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed">
            For RV, off-grid, and solar systems that need to work reliably
            <span className="text-white font-medium"> — even when it's freezing.</span>
          </p>

          {/* Key Trust Points - Minimal, Scannable */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-sm text-white/70">
            <span>✓ Low-temp charging protection</span>
            <span>✓ Bluetooth monitoring</span>
            <span>✓ 5-year warranty</span>
          </div>

          {/* CTAs - PRD Compliant */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
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
          </div>

          {/* Carousel Indicators */}
          <div className="flex gap-2">
            {heroScenes.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary w-6' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors z-10"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-7 h-7 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
