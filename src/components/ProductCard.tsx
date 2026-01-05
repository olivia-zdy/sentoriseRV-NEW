import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  image: string;
  name: string;
  category: string;
  specs: string;
  badge?: string;
}

const ProductCard = ({
  image,
  name,
  category,
  specs,
  badge,
}: ProductCardProps) => {
  return (
    <div className="group relative bg-card border border-border/30 overflow-hidden hover:border-primary/50 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badge */}
        {badge && (
          <span className="absolute top-4 left-4 badge-glow">
            {badge}
          </span>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider">
            View Specs
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 border-t border-border/30">
        <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2">{category}</p>
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground font-mono">{specs}</p>
      </div>
    </div>
  );
};

export default ProductCard;
