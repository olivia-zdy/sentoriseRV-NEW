import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, Truck, Check } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useMarket } from "@/context/MarketContext";
import { useTranslation } from "react-i18next";

const FREE_SHIPPING_THRESHOLD_EUR = 199;

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const { convertPrice, formatPrice: marketFormatPrice } = useMarket();
  const { t } = useTranslation();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const currencyCode = items[0]?.price.currencyCode || 'GBP';

  const freeShippingThreshold = convertPrice(FREE_SHIPPING_THRESHOLD_EUR);
  const remaining = Math.max(0, freeShippingThreshold - totalPrice);
  const progress = Math.min(100, (totalPrice / freeShippingThreshold) * 100);
  const qualified = remaining <= 0;

  useEffect(() => { 
    if (isOpen) syncCart(); 
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

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>
        {/* Free Shipping Progress */}
        {totalItems > 0 && (
          <div className={`mt-4 p-3 rounded-lg border ${qualified ? 'bg-primary/5 border-primary/20' : 'bg-muted/30 border-border'}`}>
            <div className="flex items-center gap-2 mb-2">
              {qualified ? (
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
              ) : (
                <Truck className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
              <span className={`text-sm font-medium ${qualified ? 'text-primary' : 'text-foreground'}`}>
                {qualified
                  ? t('cart.freeShippingQualified', { defaultValue: 'You qualify for free shipping!' })
                  : t('cart.freeShippingRemaining', {
                      amount: formatPrice(remaining),
                      defaultValue: `Add ${formatPrice(remaining)} more for free shipping`,
                    })}
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-2">Add batteries to get started</p>
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
                  <span className="text-lg font-semibold">Total</span>
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
                      Proceed to Checkout
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Secure checkout powered by Shopify
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
