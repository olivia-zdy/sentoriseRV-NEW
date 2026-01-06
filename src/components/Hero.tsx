import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Bluetooth, Snowflake, Award } from "lucide-react";
import product100ahStd from "@/assets/product-100ah-std.png";

const heroFeatures = [
  {
    icon: Bluetooth,
    label: "Bluetooth App",
    desc: "Real-time monitoring",
  },
  {
    icon: Shield,
    label: "Smart BMS",
    desc: "Multi-layer protection",
  },
  {
    icon: Snowflake,
    label: "Cold Weather",
    desc: "Low-temp protection",
  },
];

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Abstract gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orb - top right */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-3xl" />
        {/* Small gradient orb - bottom left */}
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-primary/8 via-primary/3 to-transparent blur-2xl" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), 
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} 
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <div className="stagger-children">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                European Quality • 5-Year Warranty
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl headline-clean text-foreground mb-6">
              <span className="block">Stay Powered.</span>
              <span className="text-primary">Stay Free.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
              Premium LiFePO₄ batteries designed for RV, vanlife, and off-grid solar. 
              Smart monitoring, built-in protection, and reliable power for your adventures.
            </p>

            {/* Features - Glass icons */}
            <div className="flex flex-wrap gap-6 md:gap-8 mb-10">
              {heroFeatures.map((feature) => (
                <div key={feature.label} className="feature-item-glass">
                  <div className="icon-circle-glass">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">{feature.label}</p>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="group">
                <Link to="/products">
                  Shop Batteries
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/why-sentorise">
                  Why Sentorise
                </Link>
              </Button>
            </div>
          </div>

          {/* Right - Product Display */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Glow effect behind product */}
            <div className="absolute inset-0 flex items-center justify-center lg:justify-end">
              <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl animate-pulse-glow" />
            </div>
            
            {/* Product image */}
            <div className="relative z-10 animate-float">
              <img
                src={product100ahStd}
                alt="Sentorise Core 12V 100Ah LiFePO4 Battery"
                className="w-[280px] md:w-[380px] lg:w-[420px] h-auto drop-shadow-2xl"
              />
              
              {/* Floating specs badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 bg-card/90 backdrop-blur-md border border-border rounded-full shadow-lg">
                <span className="text-xs font-medium text-muted-foreground">Best Seller</span>
                <span className="w-1 h-1 rounded-full bg-primary" />
                <span className="text-sm font-bold text-foreground">€279.99</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
