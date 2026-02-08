import { Shield, Truck, RefreshCw, Headphones } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const badges = [
  {
    icon: Shield,
    label: "5-Year Warranty",
    sublabel: "Full replacement",
  },
  {
    icon: Truck,
    label: "Free EU Shipping",
    sublabel: "Orders over €150",
  },
  {
    icon: RefreshCw,
    label: "30-Day Returns",
    sublabel: "No questions asked",
  },
  {
    icon: Headphones,
    label: "Berlin Support",
    sublabel: "24h response",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-8 bg-muted/50 border-y border-border">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {badges.map((badge, index) => (
            <ScrollReveal key={badge.label} delay={index * 0.08}>
            <div
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <badge.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {badge.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {badge.sublabel}
                </p>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
