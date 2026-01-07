import { Link } from "react-router-dom";
import { ArrowRight, Bluetooth, Flame, Scale, Zap, Battery, RefreshCw } from "lucide-react";
import { Product } from "@/data/products";
import { useCompare } from "@/context/CompareContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompare();
  const inCompare = isInCompare(product.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(product.id);
    } else if (canAddMore) {
      addToCompare(product);
    }
  };

  // Extract cycle life from specs
  const cycleLife = product.specs.find(s => s.label.includes("Cycle"))?.value || "4000+";

  return (
    <Link 
      to={`/products/${product.id}`}
      className="group block bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges - Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badge && (
            <span className="badge-glow">
              {product.badge}
            </span>
          )}
          {product.isNew && (
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary text-primary-foreground">
              New
            </span>
          )}
        </div>

        {/* Feature Icons + Compare - Top Right */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.hasBluetooth && (
            <div className="icon-circle-glass-sm" title="Bluetooth Monitoring">
              <Bluetooth className="w-4 h-4 text-primary" />
            </div>
          )}
          {product.hasHeating && (
            <div className="icon-circle-glass-sm" title="Self-Heating">
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
          )}
          {/* Compare Button */}
          <button
            onClick={handleCompareClick}
            className={cn(
              "icon-circle-glass-sm",
              inCompare && "bg-primary/20 border-primary"
            )}
            title={inCompare ? "Remove from compare" : "Add to compare"}
          >
            <Scale className={cn("w-4 h-4", inCompare ? "text-primary" : "text-muted-foreground")} />
          </button>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center gap-2 text-primary-foreground text-sm font-semibold">
            View Details
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">
          {product.series} Series • {product.category}
        </p>
        <h3 className="text-base font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Spec Grid - 4 columns */}
        <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-center">
            <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-xs font-bold text-foreground">{product.voltage}</p>
            <p className="text-[10px] text-muted-foreground">Voltage</p>
          </div>
          <div className="text-center">
            <Battery className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-xs font-bold text-foreground">{product.capacity}</p>
            <p className="text-[10px] text-muted-foreground">Capacity</p>
          </div>
          <div className="text-center">
            <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-xs font-bold text-foreground">{product.energy}</p>
            <p className="text-[10px] text-muted-foreground">Energy</p>
          </div>
          <div className="text-center">
            <RefreshCw className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-xs font-bold text-foreground">{cycleLife.replace(" cycles", "")}</p>
            <p className="text-[10px] text-muted-foreground">Cycles</p>
          </div>
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.highlights.slice(0, 2).map((highlight, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 bg-secondary rounded-full text-secondary-foreground">
              {highlight}
            </span>
          ))}
        </div>
        
        {/* Price */}
        <div className="flex items-baseline gap-2">
          {product.salePrice ? (
            <>
              <span className="text-lg font-bold text-primary">€{product.salePrice.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">€{product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-foreground">€{product.price.toFixed(2)}</span>
          )}
          {product.inStock && (
            <span className="text-xs text-primary ml-auto">In Stock</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
