import { XCircle, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Who is this NOT for - builds trust by being honest
const notForList = [
  "Budget-first buyers who prioritize lowest upfront cost over total cost of ownership",
  "Users who need more than 48V systems (we focus on 12V/24V/48V configurations)",
  "Applications requiring extreme discharge rates above 200A continuous",
];

// Comparison: vs Lead-Acid, vs Cheap LiFePO4
const comparisons = [
  {
    title: "Sentorise vs Lead-Acid",
    ourAdvantages: [
      "4x longer lifespan (4000+ vs 300-500 cycles)",
      "70% lighter weight",
      "No maintenance required",
      "Deeper discharge (80% vs 50%)",
      "Faster charging (1C rate)",
    ],
    consideration: "Higher upfront cost, but lower total cost of ownership over 10 years.",
  },
  {
    title: "Sentorise vs Budget LiFePO4",
    ourAdvantages: [
      "5-year warranty (vs 1-2 years typical)",
      "EU-based support in your timezone",
      "Genuine Grade-A cells with full certification",
      "Active thermal management (not just cutoff)",
      "Bluetooth app with real-time diagnostics",
    ],
    consideration: "We're not the cheapest — but we're the one you won't regret.",
  },
];

// Risk mitigation
const riskHandling = [
  {
    risk: "Shipping Damage",
    solution: "Free replacement. Photo the damage, email us, done.",
  },
  {
    risk: "Installation Issues",
    solution: "Free 30-min video call with our tech team for any setup questions.",
  },
  {
    risk: "App Connection Problems",
    solution: "Detailed troubleshooting guide + direct WhatsApp support line.",
  },
  {
    risk: "Warranty Claims",
    solution: "Ship it back on our label. We send replacement before receiving yours.",
  },
];

const DecisionSupport = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
            Honest Guidance
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl headline-clean text-foreground mb-4">
            Is Sentorise Right for You?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd rather you make the right choice than make a sale you'll regret.
          </p>
        </div>

        {/* Who is this NOT for */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-destructive" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Sentorise May NOT Be For You If...
            </h3>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 md:p-8">
            <ul className="space-y-4">
              {notForList.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Comparison Tables */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              How We Compare
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisons.map((comparison) => (
              <div
                key={comparison.title}
                className="bg-card rounded-xl border border-border p-6 md:p-8"
              >
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  {comparison.title}
                </h4>
                <ul className="space-y-3 mb-6">
                  {comparison.ourAdvantages.map((advantage, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{advantage}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground italic">
                    {comparison.consideration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Mitigation */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              What If Something Goes Wrong?
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {riskHandling.map((item) => (
              <div
                key={item.risk}
                className="bg-card rounded-xl border border-border p-5 flex items-start gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-1">{item.risk}</p>
                  <p className="text-sm text-muted-foreground">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions? Our team is here to help you decide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/support#contact">
                Talk to Our Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/applications">
                Explore Use Cases
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DecisionSupport;
