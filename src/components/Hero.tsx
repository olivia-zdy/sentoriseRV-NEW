import { Button } from "@/components/ui/button";
import { ArrowRight, Thermometer, Zap, Layers } from "lucide-react";
import heroBattery from "@/assets/hero-battery.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBattery}
          alt="Energy Storage Systems"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-20">
        <div className="max-w-4xl stagger-children">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-border/50 bg-background/50 mb-10">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Engineering Validated — Architectural Component
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl headline-italic mb-8">
            <span className="text-foreground">RUGGED POWER.</span>
            <br />
            <span className="text-primary">BUILT TO FIT.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
            Modular LiFePO4 architecture designed to eliminate the voltage stability paradox. 
            We prioritize mechanical fitment and thermal logic over synthetic capacity metrics.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="icon-circle">
                <Thermometer className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Thermal Logic</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Integrated safety heating boundaries</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="icon-circle">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Validation</h4>
                <p className="text-xs text-muted-foreground mt-0.5">300A Validated Peak logic v4.2</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="icon-circle">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Boundaries</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Standardized BCI / DIN Formats</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="hero" size="xl" className="group">
              PROVISION SYSTEM
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="text-left">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Logic Assessment Required</p>
              <p className="text-xs text-muted-foreground/60">Download Datasheets Below</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
