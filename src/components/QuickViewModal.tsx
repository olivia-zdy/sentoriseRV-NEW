import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCompare } from "@/context/CompareContext";
import StockStatus from "@/components/StockStatus";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Battery, 
  Zap, 
  Shield, 
  Thermometer, 
  Bluetooth, 
  Flame, 
  ArrowRight, 
  GitCompare, 
  Check,
  ShoppingCart
} from "lucide-react";

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuickViewModal = ({ product, open, onOpenChange }: QuickViewModalProps) => {
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompare();

  if (!product) return null;

  const isComparing = isInCompare(product.id);

  const handleCompareClick = () => {
    if (isComparing) {
      removeFromCompare(product.id);
    } else if (canAddMore) {
      addToCompare(product);
    }
  };

  const discountPercent = product.salePrice 
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-muted/30 rounded-xl p-6 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-primary text-primary-foreground">NEW</Badge>
              )}
              {product.isHot && (
                <Badge className="bg-orange-500 text-white flex items-center gap-1">
                  <Flame className="w-3 h-3" /> HOT
                </Badge>
              )}
              {discountPercent && (
                <Badge className="bg-red-500 text-white">-{discountPercent}%</Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Series & Category */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                {product.series} Series
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground capitalize">{product.category}</span>
            </div>

            {/* Name */}
            <h2 className="text-2xl font-bold text-foreground mb-2">{product.name}</h2>
            
            {/* Tagline */}
            <p className="text-muted-foreground mb-4">{product.tagline}</p>

            {/* Quick Specs */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <Battery className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Capacity</p>
                <p className="text-sm font-semibold">{product.capacity}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Energy</p>
                <p className="text-sm font-semibold">{product.energy}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <Shield className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">BMS</p>
                <p className="text-sm font-semibold">{product.bms}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <Thermometer className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Voltage</p>
                <p className="text-sm font-semibold">{product.voltage}</p>
              </div>
            </div>

            {/* Feature Icons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.hasBluetooth && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-muted rounded-lg text-sm">
                  <Bluetooth className="w-3.5 h-3.5 text-primary" />
                  <span>Bluetooth</span>
                </div>
              )}
              {product.hasHeating && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-muted rounded-lg text-sm">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span>Self-Heating</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 px-2 py-1 bg-muted rounded-lg text-sm">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span>5-Year Warranty</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.highlights.map((highlight, index) => (
                <span 
                  key={index}
                  className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full"
                >
                  {highlight}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="mb-4">
              {product.salePrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">€{product.salePrice}</span>
                  <span className="text-lg text-muted-foreground line-through">€{product.price}</span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-foreground">€{product.price}</span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <StockStatus 
                stockQuantity={product.stockQuantity}
                lowStockThreshold={product.lowStockThreshold}
                showDelivery={true}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-auto">
              <Button asChild className="flex-1">
                <Link to={`/products/${product.id}`} onClick={() => onOpenChange(false)}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  View Full Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                variant={isComparing ? "default" : "outline"}
                size="icon"
                onClick={handleCompareClick}
                disabled={!isComparing && !canAddMore}
                title={isComparing ? "Remove from compare" : "Add to compare"}
              >
                {isComparing ? <Check className="w-4 h-4" /> : <GitCompare className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
