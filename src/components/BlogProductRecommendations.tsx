import { Link } from "react-router-dom";
import { products, Product } from "@/data/products";
import { ArrowRight, Battery, Thermometer, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Map blog post tags to relevant product IDs
const tagToProducts: Record<string, string[]> = {
  "Cold Weather": ["plus-12v200-heated", "core-12v100-std", "core-12v100-mini"],
  "Winter": ["plus-12v200-heated", "core-12v100-std"],
  "BMS": ["core-12v100-std", "core-12v100-mini", "core-12v100-din", "plus-12v200-heated"],
  "System Design": ["core-12v100-std", "plus-12v200-heated", "lite-12v50"],
  "DIY": ["core-12v100-std", "lite-12v50", "core-12v100-mini"],
  "Marine": ["core-12v100-std", "core-12v100-din", "plus-12v200-heated"],
  "Parallel": ["core-12v100-std", "core-12v100-mini", "plus-12v200-heated"],
  "Inverter": ["plus-12v200-heated", "core-12v100-std"],
  "Solar": ["core-12v100-std", "lite-12v50", "plus-12v200-heated"],
  "Charging": ["core-12v100-std", "lite-12v50"],
  "RV": ["core-12v100-std", "core-12v100-din", "plus-12v200-heated"],
  "Voltage": ["core-12v100-std", "plus-12v200-heated"],
  "Monitoring": ["core-12v100-std", "core-12v100-mini"],
  "Bluetooth": ["core-12v100-std", "core-12v100-mini", "lite-12v50"],
  "Maintenance": ["core-12v100-std", "plus-12v200-heated"],
  "Troubleshooting": ["core-12v100-std", "lite-12v50"],
  "Corrosion": ["core-12v100-std", "core-12v100-din"],
  "Sizing": ["lite-12v50", "core-12v100-std", "plus-12v200-heated"],
  "Cycle Life": ["core-12v100-std", "plus-12v200-heated"],
  "Storage": ["core-12v100-std", "lite-12v50"],
};

function getRecommendedProducts(tags: string[]): Product[] {
  const productScores: Record<string, number> = {};
  
  tags.forEach(tag => {
    const productIds = tagToProducts[tag] || [];
    productIds.forEach((id, index) => {
      productScores[id] = (productScores[id] || 0) + (productIds.length - index);
    });
  });

  const sorted = Object.entries(productScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([id]) => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  return sorted;
}

interface BlogProductRecommendationsProps {
  tags: string[];
  category: string;
}

const BlogProductRecommendations = ({ tags, category }: BlogProductRecommendationsProps) => {
  if (category !== "Engineering") return null;
  
  const recommended = getRecommendedProducts(tags);
  if (recommended.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Battery className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Recommended Products
            </h2>
            <p className="text-sm text-muted-foreground">
              Batteries discussed in this article
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {recommended.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group flex flex-col bg-muted/30 rounded-xl border border-border hover:border-primary/30 overflow-hidden transition-all"
            >
              <div className="aspect-[4/3] bg-muted/50 p-4 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">{product.series}</Badge>
                  {product.hasHeating && (
                    <Thermometer className="w-3.5 h-3.5 text-destructive" />
                  )}
                  {product.hasBluetooth && (
                    <Zap className="w-3.5 h-3.5 text-primary" />
                  )}
                </div>
                <h3 className="font-semibold text-foreground text-sm leading-tight mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {product.capacity} · {product.energy} · {product.bms} BMS
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    €{(product.salePrice ?? product.price).toFixed(2)}
                  </span>
                  <span className="text-xs text-primary flex items-center gap-1 group-hover:underline">
                    View Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogProductRecommendations;
