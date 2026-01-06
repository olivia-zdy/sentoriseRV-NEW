import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Bluetooth, Snowflake, Award } from "lucide-react";
import heroBattery from "@/assets/hero-battery.jpg";

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
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              European Quality • 5-Year Warranty
            </span>
          </div>

          {/* Headline - 混合创新风格 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl headline-clean text-foreground mb-6">
            <span className="block">Stay Powered.</span>
            <span className="text-primary">Stay Free.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            Premium LiFePO₄ batteries designed for RV, vanlife, and off-grid solar. 
            Smart monitoring, built-in protection, and reliable power for your adventures.
          </p>

          {/* Features - 圆形玻璃态图标 */}
          <div className="flex flex-wrap gap-6 md:gap-10 mb-10">
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
      </div>
    </section>
  );
};

export default Hero;
