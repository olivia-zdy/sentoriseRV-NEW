import { Link } from "react-router-dom";
import { accessoryProducts } from "@/data/accessories";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const HomepageAccessories = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
            Accessories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Complete Your System
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chargers, monitors, cables, and protection components designed for Sentorise batteries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {accessoryProducts.map((product) => (
            <Link
              key={product.id}
              to={`/accessory/${product.slug}`}
              className="group block bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30"
            >
              <div className="relative aspect-square bg-muted/30 p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                {product.badge && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">
                    {product.badge}
                  </Badge>
                )}
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {product.subtitle}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-lg font-bold text-primary">
                    €{(product.salePrice ?? product.price).toFixed(2)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/accessories"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            View All Accessories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomepageAccessories;
