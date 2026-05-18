import { ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import { useCartEntry, CART_ENTRY_POINTS } from "@/stores/cartUIStore";

interface Props {
  onOpen?: () => void;
}

/** Cart entry rendered inside the mobile hamburger menu. */
export const MobileMenuCartEntry = ({ onOpen }: Props) => {
  const { t } = useTranslation();
  const items = useCartStore((s) => s.items);
  const openCart = useCartEntry(CART_ENTRY_POINTS.MOBILE_MENU);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const label =
    totalItems > 0
      ? t("cart.openLabelWithCount", { count: totalItems })
      : t("cart.openLabel");

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full justify-between min-h-11"
      data-testid="cart-entry-mobile-menu"
      aria-label={label}
      onClick={() => {
        openCart();
        onOpen?.();
      }}
    >
      <span className="flex items-center gap-2">
        <ShoppingCart className="w-4 h-4" aria-hidden="true" />
        {t("cart.title")}
      </span>
      {totalItems > 0 && (
        <Badge className="bg-primary text-primary-foreground">{totalItems}</Badge>
      )}
    </Button>
  );
};

export default MobileMenuCartEntry;
