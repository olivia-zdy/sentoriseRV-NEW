import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct, useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Loader2, Bluetooth, Thermometer } from "lucide-react";
import { toast } from "sonner";

interface ShopifyProductCardProps {
  product: ShopifyProduct;
}

export const ShopifyProductCard = ({ product }: ShopifyProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currencyCode = node.priceRange.minVariantPrice.currencyCode;
  const image = node.images?.edges?.[0]?.node;
  const variant = node.variants?.edges?.[0]?.node;
  
  // Detect features from tags or title
  const hasBluetooth = node.title.toLowerCase().includes('bluetooth') || 
                       node.description?.toLowerCase().includes('bluetooth');
  const hasHeating = node.title.toLowerCase().includes('heated') || 
                     node.description?.toLowerCase().includes('self-heating');
  const isCompact = node.title.toLowerCase().includes('mini') || 
                    node.title.toLowerCase().includes('compact');

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!variant) return;
    
    setIsAdding(true);
    try {
      await addItem({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions || []
      });
      toast.success("Added to cart", {
        description: node.title,
      });
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Link 
      to={`/shop/${node.handle}`}
      className="group block bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30"
    >
      {/* Image */}
      <div className="relative aspect-square bg-muted/30 p-4">
        {image && (
          <img 
            src={image.url} 
            alt={image.altText || node.title}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}
        
        {/* Feature Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {hasBluetooth && (
            <Badge variant="secondary" className="text-xs">
              <Bluetooth className="w-3 h-3 mr-1" />
              Bluetooth
            </Badge>
          )}
          {hasHeating && (
            <Badge className="bg-orange-500/90 text-white text-xs">
              <Thermometer className="w-3 h-3 mr-1" />
              Heated
            </Badge>
          )}
          {isCompact && (
            <Badge variant="outline" className="text-xs bg-background/80">
              Compact
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {node.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {node.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(price)}
            </span>
          </div>
          
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            disabled={isAdding || !variant?.availableForSale}
            className="gap-2"
          >
            {isAdding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add
              </>
            )}
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center gap-2 pt-2 border-t text-xs text-muted-foreground">
          <span>5-Year Warranty</span>
          <span>•</span>
          <span>Free EU Shipping</span>
        </div>
      </div>
    </Link>
  );
};

export default ShopifyProductCard;
