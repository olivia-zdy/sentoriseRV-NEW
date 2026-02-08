import { Snowflake, Smartphone, ShieldCheck, AlertTriangle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

// 3 core value modules following scenario-risk-solution-boundary structure
const coreValues = [
  {
    id: "cold-weather",
    icon: Snowflake,
    title: "Low-Temperature Reliability",
    scenario: "You're camping in alpine regions or winter conditions.",
    risk: "Charging below 0°C can permanently damage lithium cells.",
    solution: "Built-in BMS automatically blocks charging below 0°C. Discharging works down to -20°C.",
    boundary: "Heated model (200Ah) activates self-heating at -10°C. Non-heated models require external warming to charge in freezing temps.",
    result: "Safe winter use without worrying about accidental cell damage.",
  },
  {
    id: "smart-monitoring",
    icon: Smartphone,
    title: "Real-Time Bluetooth Monitoring",
    scenario: "You want to know battery status without climbing under the RV.",
    risk: "Hidden battery issues can lead to unexpected power loss.",
    solution: "Bluetooth-enabled models connect to a free app showing voltage, current, temperature, and remaining capacity.",
    boundary: "Bluetooth range is ~10m. App works on iOS 12+ and Android 8+. Not all models have Bluetooth (6Ah does not).",
    result: "Check battery health from your phone in seconds.",
  },
  {
    id: "reliability",
    icon: ShieldCheck,
    title: "Warranty & EU-Based Support",
    scenario: "You want a brand that stands behind its products.",
    risk: "Overseas brands may have slow support or complicated warranty claims.",
    solution: "5-year full replacement warranty. Berlin-based support team responds within 24 hours.",
    boundary: "Warranty covers manufacturing defects, not misuse (e.g., charging below BMS cutoff with external bypass).",
    result: "Peace of mind with local support and clear warranty terms.",
  },
];

const CoreValueModules = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Three Things That Actually Matter
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Before specs and prices, here's what separates Sentorise from generic LiFePO₄ batteries.
          </p>
        </div>

        {/* Value Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {coreValues.map((value, index) => (
            <ScrollReveal key={value.id} delay={index * 0.1}>
            <div
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors h-full"
            >
              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {value.title}
                </h3>
              </div>

              {/* Scenario-Risk-Solution-Boundary Structure */}
              <div className="space-y-4 text-sm">
                {/* Scenario */}
                <div>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Scenario: </span>
                    {value.scenario}
                  </p>
                </div>

                {/* Risk */}
                <div className="flex items-start gap-2 p-3 bg-destructive/5 rounded-lg border border-destructive/10">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="font-medium text-destructive">Risk: </span>
                    {value.risk}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-primary">Solution: </span>
                    {value.solution}
                  </p>
                </div>

                {/* Boundary */}
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Note: </span>
                    {value.boundary}
                  </p>
                </div>

                {/* Result */}
                <div className="pt-2 border-t border-border">
                  <p className="font-medium text-foreground text-sm">
                    → {value.result}
                  </p>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValueModules;
