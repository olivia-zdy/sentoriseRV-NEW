import { Link } from "react-router-dom";
import { products, Product } from "@/data/products";
import { useMarket } from "@/context/MarketContext";
import { Check, X, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SeriesComparisonTableProps {
  currentProductId: string;
  series?: string;
}

const SeriesComparisonTable = ({ currentProductId, series }: SeriesComparisonTableProps) => {
  const { formatPrice } = useMarket();
  
  // Get all products in same series, or all products if no series match
  const seriesProducts = series 
    ? products.filter(p => p.series === series)
    : products;

  // If only 1 product in series, show all products for comparison
  const compareProducts = seriesProducts.length > 1 ? seriesProducts : products;

  if (compareProducts.length <= 1) return null;

  const specs = [
    { label: "Capacity", getValue: (p: Product) => p.capacity },
    { label: "Energy", getValue: (p: Product) => p.energy },
    { label: "Voltage", getValue: (p: Product) => p.voltage },
    { label: "BMS Rating", getValue: (p: Product) => p.bms },
    { label: "Dimensions", getValue: (p: Product) => p.dimensions },
    { label: "Weight", getValue: (p: Product) => p.weight || "—" },
    { label: "Bluetooth", getValue: (p: Product) => p.hasBluetooth ? "yes" : "no" },
    { label: "Self-Heating", getValue: (p: Product) => p.hasHeating ? "yes" : "no" },
    { label: "Category", getValue: (p: Product) => p.category },
    { label: "Cycle Life", getValue: () => "4000+" },
  ];

  return (
    <section className="section-padding bg-muted/30 border-y border-border">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-2">
            Compare {series ? `${series} Series` : "All"} Models
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Side-by-side technical comparison to help you choose the right battery.
          </p>

          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full text-sm border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="text-left p-3 text-muted-foreground font-medium bg-muted/50 rounded-tl-lg sticky left-0 z-10">
                    Specification
                  </th>
                  {compareProducts.map((p) => (
                    <th 
                      key={p.id} 
                      className={`p-3 text-center font-semibold bg-muted/50 ${
                        p.id === currentProductId ? "text-primary" : "text-foreground"
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="block">{p.capacity}</span>
                        <span className="block text-xs font-normal text-muted-foreground">
                          {p.category}
                        </span>
                        {p.id === currentProductId && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary text-primary">
                            Current
                          </Badge>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specs.map((spec, i) => (
                  <tr key={spec.label} className={i % 2 === 0 ? "bg-card" : ""}>
                    <td className="p-3 text-muted-foreground font-medium sticky left-0 z-10 bg-inherit">
                      {spec.label}
                    </td>
                    {compareProducts.map((p) => {
                      const value = spec.getValue(p);
                      const isCurrent = p.id === currentProductId;
                      return (
                        <td 
                          key={p.id} 
                          className={`p-3 text-center ${isCurrent ? "font-semibold text-primary" : "text-foreground"}`}
                        >
                          {value === "yes" ? (
                            <Check className="w-4 h-4 text-primary mx-auto" />
                          ) : value === "no" ? (
                            <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                          ) : (
                            value
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {/* Price Row */}
                <tr className="border-t border-border">
                  <td className="p-3 text-muted-foreground font-medium sticky left-0 z-10 bg-background">
                    Price
                  </td>
                  {compareProducts.map((p) => {
                    const isCurrent = p.id === currentProductId;
                    return (
                      <td key={p.id} className="p-3 text-center">
                        <span className={`font-bold ${isCurrent ? "text-primary" : "text-foreground"}`}>
                          {formatPrice(p.salePrice || p.price)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
                {/* View Button Row */}
                <tr>
                  <td className="p-3 sticky left-0 z-10" />
                  {compareProducts.map((p) => {
                    const isCurrent = p.id === currentProductId;
                    return (
                      <td key={p.id} className="p-3 text-center">
                        {isCurrent ? (
                          <span className="text-xs text-muted-foreground">You're here</span>
                        ) : (
                          <Link 
                            to={`/product/${p.id}`}
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                          >
                            View <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeriesComparisonTable;
