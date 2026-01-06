import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Bluetooth, Thermometer } from "lucide-react";
import heroBattery from "@/assets/hero-battery.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBattery}
          alt="Sentorise LiFePO4 Battery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="max-w-2xl stagger-children">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              European Quality • 5-Year Warranty
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl headline-clean text-foreground mb-6">
            Stay Powered.
            <br />
            <span className="text-primary">Stay Free.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            Premium LiFePO₄ batteries designed for RV, vanlife, and off-grid solar. 
            Smart monitoring, built-in protection, and reliable power for your adventures.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="flex items-center gap-3 p-3 bg-card/80 backdrop-blur-sm rounded-lg border border-border">
              <div className="icon-circle shrink-0">
                <Bluetooth className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Bluetooth App</p>
                <p className="text-xs text-muted-foreground">Real-time monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-card/80 backdrop-blur-sm rounded-lg border border-border">
              <div className="icon-circle shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Smart BMS</p>
                <p className="text-xs text-muted-foreground">Multi-layer protection</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-card/80 backdrop-blur-sm rounded-lg border border-border">
              <div className="icon-circle shrink-0">
                <Thermometer className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Cold Weather</p>
                <p className="text-xs text-muted-foreground">Low-temp protection</p>
              </div>
            </div>
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
      </div>
    </section>
  );
};

export default Hero;
