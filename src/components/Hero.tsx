import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  const scrollToContent = useCallback(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    });
  }, []);

  // Static RV scene - single hero without carousel
  const trustKeys = ['warranty', 'bluetooth', 'lowTemp'];

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Static RV background */}
      <div className="absolute inset-0">
        <img 
          src="/hero-rv-winter.jpg" 
          alt="RV & Motorhome with Sentorise batteries"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-[1]" />

      <div className="container-custom relative z-10 py-16 md:py-20">
        <div className="max-w-2xl">
          {/* Static Hero Content - RV Focused */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-block px-4 py-1.5 bg-primary text-primary-foreground backdrop-blur-sm rounded-full text-base font-semibold mb-4 shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
            >
              {t('hero.category')}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              {t('hero.headline')}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-white font-medium mt-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
            >
              {t('hero.subheadline')}
            </motion.p>
          </motion.div>

          {/* Trust Points */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
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
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                {t(`hero.trustPoints.${tKey}`)}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            <Button asChild size="lg" className="group font-bold px-6 bg-amber text-white hover:bg-amber-dark">
              <Link to="/products">
                <ShoppingBag className="w-5 h-5 mr-2" />
                {t('hero.exploreBatteries')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
              <Link to="/battery-selector">
                {t('hero.capacityGuide')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button 
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors z-10"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-7 h-7 animate-bounce" />
      </motion.button>
    </section>
  );
};

export default Hero;
