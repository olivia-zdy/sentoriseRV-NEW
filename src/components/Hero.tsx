import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

// Import scene images for carousel
import heroRvWinter from "@/assets/hero-rv-winter.jpg";
import heroOffgridSolar from "@/assets/hero-offgrid-solar.jpg";
import heroVanlife from "@/assets/hero-vanlife.jpg";
import heroMarine from "@/assets/hero-marine.jpg";

const sceneKeys = ['rv', 'solar', 'vanlife', 'marine'] as const;
const sceneImages = [heroRvWinter, heroOffgridSolar, heroVanlife, heroMarine];
const sceneAlts = ["RV & Motorhome", "Off-Grid Solar", "Van Life", "Marine"];

const sceneTrustPointKeys: Record<string, string[]> = {
  rv: ['warranty', 'bluetooth', 'euStock'],
  solar: ['warranty', 'lowTemp', 'freeShipping'],
  vanlife: ['warranty', 'lightweight', 'easyInstall'],
  marine: ['warranty', 'bms', 'ce'],
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % sceneKeys.length);
      setHasTransitioned(true);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  const scrollToContent = useCallback(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    });
  }, []);

  const key = sceneKeys[currentSlide];
  const trustKeys = sceneTrustPointKeys[key];

  // Use public path for first slide (LCP preload), Vite-bundled for others
  const firstSlidePublicUrl = "/hero-rv-winter.jpg";

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* First slide renders as static img for instant LCP, subsequent slides use motion */}
      {!hasTransitioned && currentSlide === 0 ? (
        <div className="absolute inset-0">
          <img 
            src={firstSlidePublicUrl} 
            alt={sceneAlts[0]}
            fetchPriority="high"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ) : (
        <AnimatePresence initial={false} mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {currentSlide === 0 ? (
              <img 
                src={firstSlidePublicUrl} 
                alt={sceneAlts[0]}
                fetchPriority="high"
                decoding="sync"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${sceneImages[currentSlide]})` }} />
            )}
          </motion.div>
        </AnimatePresence>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-[1]" />

      <div className="container-custom relative z-10 py-16 md:py-20">
        <div className="max-w-2xl">
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
                animate={{ opacity: 1, scale: 1, boxShadow: ["0 0 20px hsl(var(--primary) / 0.4)", "0 0 30px hsl(var(--primary) / 0.6)", "0 0 20px hsl(var(--primary) / 0.4)"] }}
                transition={{ duration: 0.4, delay: 0.1, boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                className="inline-block px-4 py-1.5 bg-primary text-primary-foreground backdrop-blur-sm rounded-full text-base font-semibold mb-4"
              >
                {t(`hero.scenes.${key}.title`)}
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                {t(`hero.scenes.${key}.subtitle`)}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg md:text-xl text-primary font-semibold mt-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
              >
                {t(`hero.scenes.${key}.highlight`)}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div 
              key={`trust-${currentSlide}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {trustKeys.map((tKey, index) => (
                <motion.span 
                  key={tKey}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white font-medium"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {t(`hero.trustPoints.${tKey}`)}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            <Button asChild size="lg" className="group font-bold px-6">
              <Link to="/products">
                <ShoppingBag className="w-5 h-5 mr-2" />
                {t('hero.shopNow')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
              <Link to="/battery-selector">
                {t('hero.howToChoose')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-white/80 hover:text-white hover:bg-white/10">
              <Link to="/products">
                {t('hero.viewAllProducts')}
              </Link>
            </Button>
          </motion.div>

          <div className="flex gap-2">
            {sceneKeys.map((s, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`group relative h-2 rounded-full transition-all duration-500 ${index === currentSlide ? 'bg-primary w-8' : 'bg-white/40 hover:bg-white/60 w-2'}`}
                aria-label={`Go to ${sceneAlts[index]}`}
              >
                {index === currentSlide && (
                  <span className="absolute inset-0 bg-primary rounded-full animate-in fade-in duration-300" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

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
