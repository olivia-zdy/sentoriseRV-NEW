import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Bluetooth, Snowflake, Zap } from "lucide-react";
import rvBatteryBg from "@/assets/product-rv-battery.jpg";

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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Full-screen scene background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${rvBatteryBg})` }}
      />
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      {/* Content - Centered */}
      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-white">
              5-Year Warranty • 4000+ Cycles
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl headline-clean text-white mb-6">
            <span className="block">Stay Powered.</span>
            <span className="text-primary">Stay Free.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
            Premium LiFePO₄ batteries designed for RV, vanlife, and off-grid solar. 
            Smart monitoring, built-in protection, and reliable power for your adventures.
          </p>

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

          {/* CTAs */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button asChild size="lg" className="group">
              <Link to="/products">
                Shop Batteries
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
              <Link to="/why-sentorise">
                Why Sentorise
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
