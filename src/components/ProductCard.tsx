import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/context/CompareContext";
import { useMarket } from "@/context/MarketContext";
import { Badge } from "@/components/ui/badge";
import StockStatus from "@/components/StockStatus";
import QuickViewModal from "@/components/QuickViewModal";
import { Bluetooth, Thermometer, Zap, ShoppingCart, GitCompare, Flame, Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useTranslation();
  const { addToCompare, removeFromCompare, isInCompare, compareList } = useCompare();
  const { formatPrice } = useMarket();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  
  // Use translated product name/description if available
  const productName = t(`productNames.${product.id}.name`, { defaultValue: product.name });
  const productTagline = t(`productNames.${product.id}.tagline`, { defaultValue: product.tagline });
  const isComparing = isInCompare(product.id);
  const canAddMore = compareList.length < 3;

  // Calculate discount percentage
  const discountPercent = product.salePrice 
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : null;

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isComparing) {
      removeFromCompare(product.id);
    } else if (canAddMore) {
      addToCompare(product);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  const getFeatureIcons = () => {
    const icons = [];
    if (product.features.some(f => f.toLowerCase().includes('bluetooth'))) {
      icons.push({ icon: Bluetooth, label: 'Bluetooth' });
    }
    if (product.features.some(f => f.toLowerCase().includes('heat') || f.toLowerCase().includes('self-heating'))) {
      icons.push({ icon: Thermometer, label: 'Self-Heating' });
    }
    if (product.features.some(f => f.toLowerCase().includes('fast') || f.toLowerCase().includes('quick'))) {
      icons.push({ icon: Zap, label: 'Fast Charge' });
    }
    return icons;
  };

  const featureIcons = getFeatureIcons();

  return (
    <>
      <Link 
        to={`/product/${product.id}`}
        className="group block bg-card rounded-xl border border-border overflow-hidden card-hover"
      >
        {/* Image Container */}
        <div className="relative aspect-square bg-muted/30 p-6 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Top Badges Row */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground text-xs font-semibold">
                NEW
              </Badge>
            )}
            {product.isHot && (
              <Badge className="bg-orange-500 text-white text-xs font-semibold flex items-center gap-1">
                <Flame className="w-3 h-3" />
                HOT
              </Badge>
            )}
          </div>

          {/* Discount Badge - Top Right */}
          {discountPercent && (
            <Badge className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold">
              -{discountPercent}%
            </Badge>
          )}
          
          {/* Feature Icons */}
          {featureIcons.length > 0 && (
            <div className="absolute bottom-3 left-3 flex gap-2">
              {featureIcons.map(({ icon: Icon, label }) => (
                <div 
                  key={label}
                  className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center"
                  title={label}
                >
                  <Icon className="w-4 h-4 text-primary" />
                </div>
              ))}
            </div>
          )}
          
          {/* Quick View Button */}
          <button
            onClick={handleQuickView}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Series & Category */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              {product.series} Series
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground capitalize">{product.category}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {productName}
          </h3>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="text-center p-2 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Voltage</p>
              <p className="text-sm font-semibold text-foreground">{product.voltage}</p>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Capacity</p>
              <p className="text-sm font-semibold text-foreground">{product.capacity}</p>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Energy</p>
              <p className="text-sm font-semibold text-foreground">{product.energy}</p>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Cycle Life</p>
              <p className="text-sm font-semibold text-foreground">4000+</p>
            </div>
          </div>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.highlights.slice(0, 3).map((highlight, index) => (
                <span 
                  key={index}
                  className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {/* Price & Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div>
              {product.salePrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary">{formatPrice(product.salePrice)}</span>
                  <span className="text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
                </div>
              ) : (
                <span className="text-xl font-bold text-foreground">{formatPrice(product.price)}</span>
              )}
              <StockStatus 
                stockQuantity={product.stockQuantity} 
                lowStockThreshold={product.lowStockThreshold}
                compact={true}
                showDelivery={false}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={isComparing ? "default" : "outline"}
                size="icon"
                className="h-9 w-9"
                onClick={handleCompareClick}
                disabled={!isComparing && !canAddMore}
                title={isComparing ? "Remove from compare" : "Add to compare"}
              >
                <GitCompare className="w-4 h-4" />
              </Button>
              <Button size="sm" className="gap-1.5">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            </div>
          </div>
        </div>
      </Link>

      {/* Quick View Modal */}
      <QuickViewModal 
        product={product}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </>
  );
};

export default ProductCard;
