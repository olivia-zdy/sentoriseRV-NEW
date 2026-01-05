import { Battery, Cpu, Shield, Zap, Leaf, Wifi } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Logic Control",
    items: ["Active Cell Balancing v2", "LFP Specific Logic Floor", "Predictable Voltage Sag Control"],
  },
  {
    icon: Shield,
    title: "Safety Ethics",
    items: ["Thermal Charge Disconnect", "Vibration-Rated Terminals", "Grade-A Laboratory Cells"],
  },
];

const techFeatures = [
  {
    icon: Battery,
    title: "Structural Fitment Protocol",
    description: "Every Sentorise module aligns with standardized DIN H8 or BCI 31 formats, ensuring chassis-mounting validity without secondary modifications or structural welding.",
  },
  {
    icon: Zap,
    title: "Thermal Derating Engine",
    description: "Our proprietary logic caps charge/discharge rates when ambient or cell temperatures reach defined thresholds — prioritizing longevity over synthetic peak performance.",
  },
  {
    icon: Wifi,
    title: "CAN Protocol Compliance",
    description: "Every unit ships with CAN-bus compatibility for real-time telemetry integration with inverters, alternators, and fleet management systems.",
  },
];

const Features = () => {
  return (
    <section id="features" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">01. Integrity Protocol</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left - Headline */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl headline-italic">
              <span className="text-foreground">Stability over</span>
              <br />
              <span className="text-primary">Synthetic Capacity.</span>
            </h2>
          </div>
          
          {/* Right - Description */}
          <div className="flex flex-col justify-center">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We design for system reliability — not just lab specs. While others chase peak capacity numbers, 
              we validate every module for the mechanical and thermal realities of the modern vehicle chassis.
            </p>
            
            {/* Feature Lists */}
            <div className="grid grid-cols-2 gap-8">
              {features.map((feature) => (
                <div key={feature.title}>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 flex items-center gap-2">
                    <feature.icon className="w-4 h-4 text-primary" />
                    {feature.title}
                  </h4>
                  <ul className="space-y-2">
                    {feature.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="text-primary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Features Grid */}
        <div className="border-t border-border/30 pt-16">
          <div className="flex items-center gap-4 mb-10">
            <Cpu className="w-5 h-5 text-primary" />
            <span className="text-lg font-bold text-foreground">Engineering Logic Hub</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techFeatures.map((feature) => (
              <div
                key={feature.title}
                className="p-6 border border-border/30 bg-card/50 hover:border-primary/30 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
