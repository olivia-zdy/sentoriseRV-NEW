import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Bluetooth, Snowflake, ChevronDown, CheckCircle2 } from "lucide-react";

// Import all scene images for carousel
import rvBatteryBg from "@/assets/product-rv-battery.jpg";
import industrialBg from "@/assets/product-industrial.jpg";
import portableBg from "@/assets/product-portable.jpg";
import marineBg from "@/assets/hero-battery.jpg";

// Target audience segments - clear user identification
const audienceSegments = [
  "RV & Motorhome",
  "Van Life",
  "Off-Grid Solar",
  "Marine & Boat",
];

const heroFeatures = [
  {
    icon: Shield,
    label: "5-Year Warranty",
    desc: "Full replacement guarantee",
  },
  {
    icon: Bluetooth,
    label: "Smart BMS",
    desc: "Real-time monitoring app",
  },
  {
    icon: Snowflake,
    label: "Thermal Control",
    desc: "-20°C to 60°C safe range",
  },
];

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
          {/* Audience Segments - Clear user identification */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {audienceSegments.map((segment) => (
              <span 
                key={segment}
                className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90"
              >
                {segment}
              </span>
            ))}
          </div>

          {/* Headline - Clear value proposition */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl headline-clean text-white mb-4">
            <span className="block">Premium LiFePO₄ Power</span>
            <span className="text-primary">for European Adventurers</span>
          </h1>

          {/* Differentiator - Why us, not just what we do */}
          <p className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed max-w-2xl mx-auto font-medium">
            Designed for RV, vanlife & off-grid users who refuse to compromise.
          </p>
          
          {/* Trust anchors - Verifiable claims */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              CE & UN38.3 Certified
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              4000+ Cycle Lifespan
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Berlin-Based Support
            </span>
          </div>

          {/* Features - Glass icons */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
            {heroFeatures.map((feature) => (
              <div key={feature.label} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-white">{feature.label}</p>
                  <p className="text-xs text-white/60">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs - Decision-oriented, not purchase-oriented */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
            <Button asChild size="lg" className="group">
              <Link to="/applications">
                Find Your Battery
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
              <Link to="/why-sentorise">
                How It Works
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
