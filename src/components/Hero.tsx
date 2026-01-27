import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Snowflake, ChevronDown } from "lucide-react";

// Import scene images for carousel
import rvBatteryBg from "@/assets/product-rv-battery.jpg";
import industrialBg from "@/assets/product-industrial.jpg";
import portableBg from "@/assets/product-portable.jpg";
import marineBg from "@/assets/hero-battery.jpg";

const heroScenes = [
  { image: rvBatteryBg, alt: "RV & Motorhome" },
  { image: industrialBg, alt: "Off-Grid Solar" },
  { image: portableBg, alt: "Van Life" },
  { image: marineBg, alt: "Marine" },
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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Content - Centered */}
      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* 1. WHAT: Product Definition - Clear & Specific */}
          <p className="text-sm md:text-base text-primary font-medium tracking-wide uppercase mb-4">
            12V LiFePO₄ Batteries for RV, Vanlife & Off-Grid
          </p>

          {/* 2. DIFFERENT: Key Differentiator - Cold Weather Focus */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl headline-clean text-white mb-6">
            <span className="block">Power That Works</span>
            <span className="flex items-center justify-center gap-3 text-primary">
              <Snowflake className="w-10 h-10 md:w-12 md:h-12" />
              Even at -20°C
            </span>
          </h1>

          {/* 3. WHY DIFFERENT: Specific Benefit */}
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Built-in low-temperature protection and optional self-heating. 
            <span className="block mt-2 text-white/70">
              Your battery charges and discharges safely in European winter conditions.
            </span>
          </p>

          {/* Audience Fit Question - Self-Selection */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-10 max-w-xl mx-auto">
            <p className="text-sm text-white/60 uppercase tracking-wide mb-2">Is this for you?</p>
            <p className="text-white font-medium">
              You need reliable 12V power for your RV, van, or solar system — 
              <span className="text-primary"> especially in cold climates or alpine regions.</span>
            </p>
          </div>

          {/* CTAs - Decision-oriented */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
            <Button asChild size="lg" className="group">
              <Link to="/battery-selector">
                Find Your Battery
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
              <Link to="/products">
                View All Models
              </Link>
            </Button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {heroScenes.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary w-8' 
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors z-10"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
