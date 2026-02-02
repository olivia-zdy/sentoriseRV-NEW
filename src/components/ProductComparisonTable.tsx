import { Check, X, Minus } from "lucide-react";

interface ProductComparisonTableProps {
  capacity: string;
  weight?: string;
  cycleLife?: string;
}

interface ComparisonRow {
  feature: string;
  lifepo4: string | boolean;
  leadAcid: string | boolean;
  highlight?: boolean;
}

const ProductComparisonTable = ({ capacity, weight, cycleLife }: ProductComparisonTableProps) => {
  // Calculate approximate lead-acid equivalents
  const lifepo4Capacity = parseInt(capacity) || 100;
  const leadAcidEquivalent = Math.round(lifepo4Capacity * 2); // Lead-acid only uses ~50% DoD
  const lifepo4Weight = weight ? parseFloat(weight) : lifepo4Capacity * 0.12;
  const leadAcidWeight = Math.round(lifepo4Capacity * 0.32); // Lead-acid ~32kg per 100Ah
  
  const comparisonData: ComparisonRow[] = [
    { 
      feature: "Usable Capacity", 
      lifepo4: `${lifepo4Capacity}Ah (80-100% DoD)`, 
      leadAcid: `${Math.round(leadAcidEquivalent * 0.5)}Ah (50% DoD max)`,
      highlight: true
    },
    { 
      feature: "Cycle Life", 
      lifepo4: cycleLife || "4000+ cycles", 
      leadAcid: "300-500 cycles",
      highlight: true
    },
    { 
      feature: "Weight", 
      lifepo4: weight || `~${lifepo4Weight.toFixed(1)}kg`, 
      leadAcid: `~${leadAcidWeight}kg`,
      highlight: true
    },
    { 
      feature: "Charge Time (0-100%)", 
      lifepo4: "2-4 hours", 
      leadAcid: "8-12 hours" 
    },
    { 
      feature: "Self-Discharge Rate", 
      lifepo4: "<3% per month", 
      leadAcid: "5-15% per month" 
    },
    { 
      feature: "Maintenance Required", 
      lifepo4: false, 
      leadAcid: true 
    },
    { 
      feature: "Mount in Any Position", 
      lifepo4: true, 
      leadAcid: false 
    },
    { 
      feature: "BMS Protection", 
      lifepo4: true, 
      leadAcid: false 
    },
    { 
      feature: "Bluetooth Monitoring", 
      lifepo4: true, 
      leadAcid: false 
    },
    { 
      feature: "Peukert Effect (Capacity loss under load)", 
      lifepo4: "Minimal", 
      leadAcid: "Significant (up to 40%)" 
    },
    { 
      feature: "Typical Lifespan", 
      lifepo4: "10-15 years", 
      leadAcid: "2-5 years" 
    },
    { 
      feature: "Cost per Cycle", 
      lifepo4: "~€0.05", 
      leadAcid: "~€0.30",
      highlight: true
    },
  ];

  const renderValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-primary mx-auto" />
      ) : (
        <X className="w-5 h-5 text-muted-foreground mx-auto" />
      );
    }
    return value;
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              LiFePO₄ vs Lead-Acid Comparison
            </h2>
            <p className="text-muted-foreground">
              See why lithium iron phosphate is the better long-term investment
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-primary bg-primary/5 rounded-t-lg">
                    Sentorise LiFePO₄
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">
                    Lead-Acid (AGM/Gel)
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-border/50 ${row.highlight ? 'bg-primary/5' : ''}`}
                  >
                    <td className="py-3 px-4 text-sm text-foreground">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 text-sm text-center font-medium text-foreground bg-primary/5">
                      {renderValue(row.lifepo4)}
                    </td>
                    <td className="py-3 px-4 text-sm text-center text-muted-foreground">
                      {renderValue(row.leadAcid)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Box */}
          <div className="mt-8 p-6 bg-primary/10 rounded-xl border border-primary/20">
            <h3 className="font-semibold text-foreground mb-2">Bottom Line</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              While LiFePO₄ batteries have a higher upfront cost, the dramatically longer lifespan 
              (4000+ cycles vs 300-500) and deeper usable capacity mean you'll replace a lead-acid 
              battery 4-5 times before one Sentorise battery needs replacement. Factor in weight 
              savings, faster charging, and zero maintenance, and the total cost of ownership is 
              significantly lower.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductComparisonTable;
