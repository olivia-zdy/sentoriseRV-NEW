import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct, useCartStore } from "@/stores/cartStore";
import { useMarket } from "@/context/MarketContext";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Loader2, Bluetooth, Thermometer } from "lucide-react";
import { toast } from "sonner";
import { products as localProducts } from "@/data/products";

// Local image overrides to fix Shopify CDN mismatch
import img6ah from "@/assets/product-6ah.png";
import img50ah from "@/assets/product-50ah.png";
import img100ahStd from "@/assets/product-100ah-std.png";
import img100ahMini from "@/assets/product-100ah-mini.png";
import img100ahDin from "@/assets/product-100ah-din.png";
import img200ahHeated from "@/assets/product-200ah-heated.png";

const localImageMap: Record<string, string> = {
  "lite-12v-6ah-ultra-compact-lifepo-battery": img6ah,
  "lite-12v-50ah-bluetooth-lifepo-battery": img50ah,
  "core-12v-100ah-standard-lifepo-battery": img100ahStd,
  "core-12v-100ah-mini-compact-lifepo-battery": img100ahMini,
  "core-12v-100ah-din-h8-under-seat-lifepo-battery": img100ahDin,
  "plus-12v-200ah-heated-arctic-lifepo-battery": img200ahHeated,
};

// Map Shopify handles to local product IDs for fallback pricing
const handleToLocalId: Record<string, string> = {
  "lite-12v-6ah-ultra-compact-lifepo-battery": "lite-12v6",
  "lite-12v-50ah-bluetooth-lifepo-battery": "lite-12v50",
  "core-12v-100ah-standard-lifepo-battery": "core-12v100-std",
  "core-12v-100ah-mini-compact-lifepo-battery": "core-12v100-mini",
  "core-12v-100ah-din-h8-under-seat-lifepo-battery": "core-12v100-din",
  "plus-12v-200ah-heated-arctic-lifepo-battery": "plus-12v200-heated",
};

interface ShopifyProductCardProps {
  product: ShopifyProduct;
}

export const ShopifyProductCard = ({ product }: ShopifyProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  const { formatPrice: formatMarketPrice } = useMarket();
  const { t } = useTranslation();
  const { node } = product;
  
  // Use local product data as source of truth for display pricing (EUR)
  const localProduct = localProducts.find(p => p.id === handleToLocalId[node.handle]);
  const localOriginalPrice = localProduct?.price;
  const localSalePrice = localProduct?.salePrice;
  
  // Primary display price: prefer local salePrice > local price > Shopify price
  const basePrice = localSalePrice || localOriginalPrice || parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAtPrice = (localOriginalPrice && localSalePrice && localSalePrice < localOriginalPrice) 
    ? localOriginalPrice 
    : null;
  const hasDiscount = compareAtPrice !== null && compareAtPrice > basePrice;
  const discountPercent = hasDiscount ? Math.round((1 - basePrice / compareAtPrice) * 100) : 0;

  const shopifyImage = node.images?.edges?.[0]?.node;
  const localImage = localImageMap[node.handle];
  const shopifyUrl = shopifyImage?.url;
  const optimizedShopifyUrl = shopifyUrl && shopifyUrl.includes('cdn.shopify.com')
    ? `${shopifyUrl}${shopifyUrl.includes('?') ? '&' : '?'}width=400`
    : shopifyUrl;
  const imageUrl = localImage || optimizedShopifyUrl;
  const imageAlt = shopifyImage?.altText || node.title;
  const variant = node.variants?.edges?.[0]?.node;
  
  // Detect features from tags or title
  const hasBluetooth = node.title.toLowerCase().includes('bluetooth') || 
                       node.description?.toLowerCase().includes('bluetooth');
  const hasHeating = node.title.toLowerCase().includes('heated') || 
                     node.description?.toLowerCase().includes('self-heating');
  const isCompact = node.title.toLowerCase().includes('mini') || 
                    node.title.toLowerCase().includes('compact');
  const isDinH8 = node.title.toLowerCase().includes('din h8');
  const isUltraCompact = node.title.toLowerCase().includes('ultra-compact');

  // Format prices via market context (always from EUR base)
  const displayPrice = formatMarketPrice(basePrice);
  const displayCompareAtPrice = hasDiscount ? formatMarketPrice(compareAtPrice) : null;

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
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={imageAlt}
            width={400}
            height={400}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}
        
        {/* Discount Badge - Top Right, Large & Bold */}
        {hasDiscount && discountPercent > 0 && (
          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
            <span className="text-base font-extrabold leading-none">-{discountPercent}%</span>
          </div>
        )}

        {/* Feature Badges - Top Left */}
        {(hasBluetooth || hasHeating) && (
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {hasBluetooth && (
              <span className="inline-flex items-center bg-blue-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-md">
                <Bluetooth className="w-3 h-3 mr-1" />
                Bluetooth
              </span>
            )}
            {hasHeating && (
              <span className="inline-flex items-center bg-orange-500 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-md">
                <Thermometer className="w-3 h-3 mr-1" />
                Heated
              </span>
            )}
          </div>
        )}

        {/* Form-factor Badges - Bottom Left */}
        {(isCompact || isDinH8 || isUltraCompact) && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {isUltraCompact && (
              <span className="text-[11px] font-medium text-muted-foreground bg-card/90 backdrop-blur-sm border border-border rounded px-2 py-0.5">
                Ultra-Compact
              </span>
            )}
            {isCompact && !isUltraCompact && (
              <span className="text-[11px] font-medium text-muted-foreground bg-card/90 backdrop-blur-sm border border-border rounded px-2 py-0.5">
                Compact
              </span>
            )}
            {isDinH8 && (
              <span className="text-[11px] font-medium text-muted-foreground bg-card/90 backdrop-blur-sm border border-border rounded px-2 py-0.5">
                DIN H8
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {node.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {node.description}
        </p>

        {/* Price Section - Large & prominent */}
        <div className="pt-2">
          {hasDiscount && displayCompareAtPrice ? (
            <div className="space-y-1.5">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-foreground">
                  {displayPrice}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {displayCompareAtPrice}
                </span>
              </div>
              <span className="inline-block bg-destructive text-destructive-foreground text-xs font-bold px-2.5 py-1 rounded-md">
                {t('products.save', { percent: discountPercent, defaultValue: `Save ${discountPercent}%` })}
              </span>
            </div>
          ) : (
            <div className="mb-1">
              <span className="text-2xl font-extrabold text-foreground">
                {displayPrice}
              </span>
            </div>
          )}
        </div>

        {/* Add to Cart */}
        <div className="pt-1">
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            disabled={isAdding || !variant?.availableForSale}
            className="w-full gap-2"
          >
            {isAdding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                {t('products.addToCart')}
              </>
            )}
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>{t('products.warranty')}</span>
            <span>•</span>
            <span>{t('products.freeShipping')}</span>
          </div>
          <Link 
            to="/warranty" 
            onClick={(e) => e.stopPropagation()}
            className="text-primary hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default ShopifyProductCard;
