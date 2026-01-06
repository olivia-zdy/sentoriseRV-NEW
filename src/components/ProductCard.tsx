import { Link } from "react-router-dom";
import { ArrowRight, Bluetooth, Flame } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
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
        
        {/* Badges */}
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

        {/* Feature Icons - 玻璃态圆形容器 */}
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
        <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground font-mono mb-3">
          {product.voltage} • {product.capacity} • {product.energy}
        </p>
        
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
