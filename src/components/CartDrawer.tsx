import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, Truck, Shield, RotateCcw, Award, Warehouse as WarehouseIcon } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useCartUI, useCartEntry, CART_ENTRY_POINTS, type CartEntryId } from "@/stores/cartUIStore";
import { useTranslation } from "react-i18next";
import { useActiveWarehouse } from "@/hooks/useLocalWarehouse";

interface CartDrawerProps {
  /** Identifies which UI surface this trigger lives on (audit + tests). */
  entryId?: CartEntryId;
}

export const CartDrawer = ({ entryId = CART_ENTRY_POINTS.HEADER_DESKTOP }: CartDrawerProps = {}) => {
  const isOpen = useCartUI((s) => s.isOpen);
  const setIsOpen = useCartUI((s) => s.setOpen);
  useCartEntry(entryId);
  const itemsRegionRef = useRef<HTMLDivElement>(null);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const { t } = useTranslation();
  const { warehouse, copy, market } = useActiveWarehouse();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const currencyCode = items[0]?.price.currencyCode || 'GBP';

  useEffect(() => {
    if (isOpen) {
      syncCart();
      // Focus the items region for screen readers / keyboard users
      const timer = setTimeout(() => itemsRegionRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  };

  const triggerLabel = totalItems > 0
    ? t('cart.openLabelWithCount', { count: totalItems })
    : t('cart.openLabel');

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label={triggerLabel}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                data-testid="cart-trigger"
                onClick={(e) => e.stopPropagation()}
                className="relative min-h-11 min-w-11 z-10"
              >
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                {totalItems > 0 && (
                  <Badge
                    aria-hidden="true"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
                  >
                    {totalItems}
                  </Badge>
                )}
                <span className="sr-only">{triggerLabel}</span>
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">{t('cart.tooltip')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>{t('cart.title')}</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? t('cart.empty') : t('cart.itemsCount', { count: totalItems })}
          </SheetDescription>
        </SheetHeader>
        {/* Shipping notice */}
        {totalItems > 0 && (
          <div className="mt-4 space-y-2">
            <div className="p-3 rounded-lg border bg-muted/30 border-border">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">
                  {t('cart.shippingNotice')}
                </span>
              </div>
            </div>
            {warehouse && (
              <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
                <div className="flex items-start gap-2">
                  <WarehouseIcon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-medium text-foreground">
                      <span className="mr-1">{market.flag}</span>
                      {warehouse.display_name}
                    </p>
                    <p className="text-muted-foreground mt-0.5">{copy}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div
          ref={itemsRegionRef}
          tabIndex={-1}
          role="region"
          aria-label={t('cart.title')}
          data-testid="cart-items-region"
          className="flex flex-col flex-1 pt-6 min-h-0 focus:outline-none"
        >
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
                <p className="text-foreground font-medium">{t('cart.empty')}</p>
                <p className="text-sm text-muted-foreground mt-2">{t('cart.emptyHint')}</p>
                <Button asChild className="mt-4" onClick={() => setIsOpen(false)}>
                  <Link to="/products">{t('cart.emptyCta')}</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-3 rounded-lg bg-muted/30 border">
                      <div className="w-20 h-20 bg-background rounded-md overflow-hidden flex-shrink-0 border">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img 
                            src={item.product.node.images.edges[0].node.url} 
                            alt={item.product.node.title} 
                            className="w-full h-full object-contain p-1" 
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm leading-tight line-clamp-2">{item.product.node.title}</h4>
                        <p className="text-lg font-bold text-primary mt-1">
                          {formatPrice(parseFloat(item.price.amount))}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10" 
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-1 border rounded-md">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-4 pt-4 border-t bg-background">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{t('cart.total')}</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(totalPrice)}</span>
                </div>
                <Button 
                  onClick={handleCheckout} 
                  className="w-full" 
                  size="lg" 
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('cart.checkout')}
                    </>
                  )}
                </Button>
                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Shield className="w-3.5 h-3.5 text-primary" />
                    <span>{t('cart.trust.ssl')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <RotateCcw className="w-3.5 h-3.5 text-primary" />
                    <span>{t('cart.trust.returns')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Award className="w-3.5 h-3.5 text-primary" />
                    <span>{t('cart.trust.warranty')}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  {t('cart.poweredBy')}
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
