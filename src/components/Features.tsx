import { Battery, Cpu, Shield, Bluetooth, Leaf, Clock } from "lucide-react";

const features = [
  {
    icon: Bluetooth,
    title: "Bluetooth Monitoring",
    description: "Check battery status, voltage, current, and temperature in real-time from your smartphone.",
  },
  {
    icon: Shield,
    title: "Intelligent BMS",
    description: "Multi-layer protection against overcharge, over-discharge, short circuit, and thermal runaway.",
  },
  {
    icon: Clock,
    title: "5-Year Warranty",
    description: "Industry-leading warranty backed by our commitment to quality and customer satisfaction.",
  },
  {
    icon: Battery,
    title: "4000+ Cycles",
    description: "LiFePO4 chemistry delivers exceptional lifespan — 4x longer than traditional lead-acid batteries.",
  },
  {
    icon: Cpu,
    title: "Low-Temp Protection",
    description: "Built-in safeguards prevent charging below freezing to protect cell integrity.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Recyclable paper-mold packaging and non-toxic LiFePO4 cells for sustainable power.",
  },
];

const Features = () => {
  return (
    <section id="features" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
            Why Choose Sentorise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl headline-clean text-foreground mb-4">
            Built for Reliability
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every Sentorise battery is engineered with premium LiFePO4 cells and 
            smart technology for safe, dependable power in any environment.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 md:p-8 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
