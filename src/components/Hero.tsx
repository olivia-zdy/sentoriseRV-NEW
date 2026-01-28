import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Play, Pause, Volume2, VolumeX } from "lucide-react";
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
    title: "山野探险",
    subtitle: "让房车在雪山脚下也能自由驰骋",
    highlight: "低温充电保护 · 零下20°C正常工作"
  },
  { 
    image: heroOffgridSolar, 
    alt: "Off-Grid Solar",
    title: "离网生活",
    subtitle: "太阳能系统的完美储能搭档",
    highlight: "4000+循环寿命 · 10年可靠续航"
  },
  { 
    image: heroVanlife, 
    alt: "Van Life",
    title: "海边露营",
    subtitle: "Van Life 探索者的能量伙伴",
    highlight: "蓝牙智能监控 · 随时掌握电量"
  },
  { 
    image: heroMarine, 
    alt: "Marine",
    title: "海上航行",
    subtitle: "为游艇和帆船提供稳定动力",
    highlight: "IP67防水 · 专为海洋环境设计"
  },
];



const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Preload first image
  useEffect(() => {
    const img = new Image();
    img.src = heroScenes[0].image;
    img.onload = () => setIsLoaded(true);
  }, []);

  // Auto-rotate carousel (only when not in video mode)
  useEffect(() => {
    if (isVideoMode) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroScenes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isVideoMode]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
  };

  const toggleVideoMode = () => {
    setIsVideoMode(!isVideoMode);
    setIsVideoPlaying(!isVideoMode);
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
      
      {/* Video Background (when enabled) */}
      {isVideoMode && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            poster={heroScenes[0].image}
          >
            {/* Placeholder for video - you can add your video source here */}
            <source src="" type="video/mp4" />
          </video>
        </motion.div>
      )}
      
      {/* Animated Carousel Background Images */}
      {!isVideoMode && (
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
      )}
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-[1]" />

      {/* Content - Left-aligned for clarity */}
      <div className="container-custom relative z-10 py-16 md:py-20">
        <div className="max-w-2xl">
          
          {/* Category Identifier */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-white/70 uppercase tracking-widest mb-4"
          >
            12V LiFePO₄ Battery
          </motion.p>

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
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-primary text-sm font-medium mb-4"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-sm text-white/70"
          >
            <span>✓ 5年质保</span>
            <span>✓ 蓝牙监控</span>
            <span>✓ 欧盟免运</span>
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

          {/* Carousel Indicators + Video Controls */}
          <div className="flex items-center gap-4">
            {/* Slide Indicators */}
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

            {/* Video Controls */}
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={toggleVideoMode}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                aria-label={isVideoMode ? "Show images" : "Play video"}
              >
                {isVideoMode && isVideoPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
              {isVideoMode && (
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
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
