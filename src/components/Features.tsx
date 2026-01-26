import { Shield, Thermometer, Headphones, Puzzle, Battery, Zap } from "lucide-react";

// Reordered: Trust & Safety → Compatibility → Performance
const featureGroups = [
  {
    title: "Trust & Safety First",
    subtitle: "What you're really asking: Will this be safe and will you stand behind it?",
    features: [
      {
        icon: Shield,
        title: "Multi-Layer BMS Protection",
        description: "Overcharge, over-discharge, short circuit, and thermal runaway protection. Each cell is individually monitored.",
        highlight: "Certified Safe",
      },
      {
        icon: Thermometer,
        title: "Real Cold Weather Behavior",
        description: "Charging is automatically disabled below 0°C to protect cell integrity. Discharging works down to -20°C.",
        highlight: "-20°C to 60°C",
      },
      {
        icon: Headphones,
        title: "5-Year Warranty & EU Support",
        description: "Full replacement warranty. Berlin-based support team responds within 24 hours. No overseas runaround.",
        highlight: "24h Response",
      },
    ],
  },
  {
    title: "Built for Your System",
    subtitle: "Works with what you already have — no compatibility headaches.",
    features: [
      {
        icon: Puzzle,
        title: "Victron & Solar Compatible",
        description: "Tested with Victron, Renogy, EPEver, and major MPPT controllers. Drop-in replacement for lead-acid.",
        highlight: "Plug & Play",
      },
      {
        icon: Battery,
        title: "Flexible Configurations",
        description: "Connect up to 4 in series (48V) or 4 in parallel for higher capacity. Perfect for custom builds.",
        highlight: "4S4P Ready",
      },
    ],
  },
  {
    title: "Performance That Lasts",
    subtitle: "Now let's talk about what makes LiFePO₄ worth the investment.",
    features: [
      {
        icon: Zap,
        title: "4000+ Cycles at 80% DoD",
        description: "That's 10+ years of daily use. Lead-acid gives you 300-500 cycles. The math is simple.",
        highlight: "10+ Years",
      },
    ],
  },
];

const Features = () => {
  return (
    <section id="features" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
            Why Sentorise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl headline-clean text-foreground mb-4">
            Built for Real-World Reliability
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We answer your questions in the order you're actually asking them.
          </p>
        </div>

        {/* Feature Groups - Ordered by user decision priority */}
        <div className="space-y-16">
          {featureGroups.map((group, groupIndex) => (
            <div key={group.title}>
              {/* Group Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {groupIndex + 1}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    {group.title}
                  </h3>
                </div>
                <p className="text-muted-foreground ml-11 italic">
                  {group.subtitle}
                </p>
              </div>

              {/* Features Grid */}
              <div className={`grid grid-cols-1 ${group.features.length === 1 ? 'md:grid-cols-1 max-w-2xl' : group.features.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 md:gap-8 ml-0 md:ml-11`}>
                {group.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="group p-6 md:p-8 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      {feature.highlight && (
                        <span className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                          {feature.highlight}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
