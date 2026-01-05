import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";

interface ProductCardProps {
  image: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  badge?: string;
}

const ProductCard = ({
  image,
  name,
  category,
  price,
  originalPrice,
  badge,
}: ProductCardProps) => {
  return (
    <div className="group relative bg-card rounded-xl overflow-hidden card-hover border border-border/50">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badge */}
        {badge && (
          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
            {badge}
          </span>
        )}

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button variant="hero" className="w-full">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-sm text-primary font-medium mb-1">{category}</p>
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground">{price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
