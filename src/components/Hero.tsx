import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Leaf } from "lucide-react";
import heroBattery from "@/assets/hero-battery.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBattery}
          alt="Energy Storage Systems"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-20">
        <div className="max-w-2xl stagger-children">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Next-Gen LiFePO4 Technology
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            Power Your
            <br />
            <span className="text-gradient">Future</span> Today
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-muted-foreground mb-10 max-w-lg">
            Premium LiFePO4 energy storage solutions for homes, businesses, and 
            adventures. Safe, sustainable, and built to last.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Button variant="hero" size="xl">
              Explore Products
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="xl">
              Get a Quote
            </Button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">10,000+ Cycles</p>
                <p className="text-sm text-muted-foreground">Long lifespan</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">10 Year Warranty</p>
                <p className="text-sm text-muted-foreground">Peace of mind</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">100% Safe</p>
                <p className="text-sm text-muted-foreground">No thermal runaway</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2">
          <div className="w-1 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
