import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useMarket } from "@/context/MarketContext";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Bluetooth, Thermometer } from "lucide-react";

interface LocalProductCardProps {
  product: Product;
}

const LocalProductCard = ({ product }: LocalProductCardProps) => {
  const { formatPrice } = useMarket();
  const { t } = useTranslation();

  const hasDiscount = product.salePrice !== undefined && product.salePrice < product.price;
  const displayPrice = formatPrice(product.salePrice ?? product.price);
  const compareAtPrice = hasDiscount ? formatPrice(product.price) : null;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.salePrice! / product.price) * 100)
    : 0;

  const isCompact = product.name.toLowerCase().includes('mini') || product.name.toLowerCase().includes('compact');
  const isDinH8 = product.name.toLowerCase().includes('din h8');
  const isUltraCompact = product.name.toLowerCase().includes('ultra-compact');

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30"
    >
      {/* Image */}
      <div className="relative aspect-square bg-muted/30 p-4">
        <img
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Discount Badge - Top Right */}
        {hasDiscount && discountPercent > 0 && (
          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
            <span className="text-base font-extrabold leading-none">-{discountPercent}%</span>
          </div>
        )}

        {/* Feature Badges - Top Left */}
        {(product.hasBluetooth || product.hasHeating) && (
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.hasBluetooth && (
              <span className="inline-flex items-center bg-blue-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-md">
                <Bluetooth className="w-3 h-3 mr-1" />
                Bluetooth
              </span>
            )}
            {product.hasHeating && (
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
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.tagline}
        </p>

        {/* Price Section */}
        <div className="pt-2">
          {hasDiscount && compareAtPrice ? (
            <div className="space-y-1.5">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-foreground">
                  {displayPrice}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {compareAtPrice}
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

        {/* View Details button (no cart since Shopify is down) */}
        <div className="pt-1">
          <Button size="sm" className="w-full gap-2">
            <ShoppingCart className="w-4 h-4" />
            {t('products.viewDetails', { defaultValue: 'View Details' })}
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

export default LocalProductCard;