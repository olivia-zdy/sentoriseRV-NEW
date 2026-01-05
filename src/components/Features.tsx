import { Battery, Cpu, Shield, Zap, Leaf, Wifi } from "lucide-react";

const features = [
  {
    icon: Battery,
    title: "LiFePO4 Chemistry",
    description:
      "Safest lithium technology with superior thermal stability and no risk of thermal runaway.",
  },
  {
    icon: Cpu,
    title: "Smart BMS",
    description:
      "Intelligent battery management system monitors and protects every cell in real-time.",
  },
  {
    icon: Shield,
    title: "10 Year Warranty",
    description:
      "Industry-leading warranty coverage backed by our commitment to quality.",
  },
  {
    icon: Zap,
    title: "10,000+ Cycles",
    description:
      "Ultra-long lifespan means decades of reliable power for your home or business.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description:
      "Zero emissions, recyclable materials, and sustainable manufacturing processes.",
  },
  {
    icon: Wifi,
    title: "Remote Monitoring",
    description:
      "Track performance, manage settings, and receive alerts via our mobile app.",
  },
];

const Features = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Advanced Technology
            <br />
            <span className="text-gradient">Unmatched Quality</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Every product is engineered with cutting-edge technology and 
            manufactured to the highest standards.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border/50 card-hover"
            >
              <div className="w-14 h-14 rounded-xl bg-energy-gradient flex items-center justify-center mb-6 group-hover:animate-pulse-glow transition-all">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
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
