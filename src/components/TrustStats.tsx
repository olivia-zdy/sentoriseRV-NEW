import { Shield, Leaf, Wrench, Award } from "lucide-react";

const stats = [
  { value: "100K+", label: "Happy Customers", description: "Worldwide" },
  { value: "4000+", label: "Cycle Life", description: "Per Battery" },
  { value: "5 Years", label: "Warranty", description: "Full Coverage" },
  { value: "25+", label: "Countries", description: "Served" },
];

const trustBadges = [
  { icon: Award, label: "Grade A LiFePO₄ Cells" },
  { icon: Shield, label: "EV-Grade Safety" },
  { icon: Leaf, label: "Eco-Friendly" },
  { icon: Wrench, label: "Low Maintenance" },
];

const TrustStats = () => {
  return (
    <section className="py-16 md:py-20 bg-primary">
      <div className="container-custom">
        {/* Headline */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
            Trusted by Adventurers Worldwide
          </h2>
          <p className="text-primary-foreground/70">
            Join thousands who power their freedom with Sentorise
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-primary-foreground/90 mb-0.5">
                {stat.label}
              </p>
              <p className="text-xs text-primary-foreground/60">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            >
              <badge.icon className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
