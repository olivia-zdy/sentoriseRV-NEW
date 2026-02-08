import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

// Simplified product matrix entry for quick capacity selection
const capacityOptions = [
  {
    capacity: "50Ah",
    energy: "640Wh",
    typical: "Weekend trips, small systems",
    productId: "lite-12v50",
    price: 129.99,
    badge: null,
  },
  {
    capacity: "100Ah",
    energy: "1280Wh",
    typical: "Daily RV/van use, most popular",
    productId: "core-12v100-std",
    price: 279.99,
    badge: "Most Popular",
  },
  {
    capacity: "200Ah",
    energy: "2560Wh",
    typical: "Heavy use, cold climates, off-grid",
    productId: "plus-12v200-heated",
    price: 699.99,
    badge: "Self-Heating",
  },
];

const ProductMatrix = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Choose Your Capacity
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            All models include Bluetooth monitoring, low-temp protection, and 5-year warranty.
          </p>
        </div>

        {/* Capacity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {capacityOptions.map((option, index) => (
            <ScrollReveal key={option.capacity} delay={index * 0.1}>
            <Link
              key={option.capacity}
              to={`/product/${option.productId}`}
              className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all"
            >
              {/* Badge */}
              {option.badge && (
                <span className="absolute -top-3 left-6 px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                  {option.badge}
                </span>
              )}

              {/* Capacity Display */}
              <div className="text-center mb-4 pt-2">
                <span className="text-4xl md:text-5xl font-bold text-foreground">
                  {option.capacity.replace("Ah", "")}
                </span>
                <span className="text-xl text-muted-foreground">Ah</span>
                <p className="text-sm text-muted-foreground mt-1">
                  {option.energy}
                </p>
              </div>

              {/* Typical Use */}
              <p className="text-sm text-center text-muted-foreground mb-4">
                {option.typical}
              </p>

              {/* Price */}
              <p className="text-center text-xl font-bold text-foreground mb-4">
                €{option.price}
              </p>

              {/* CTA */}
              <div className="flex items-center justify-center text-sm font-medium text-primary group-hover:underline">
                View Details
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Secondary Links */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="outline">
            <Link to="/products">View All 6 Models</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/battery-selector">Not sure? Use capacity calculator →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductMatrix;
