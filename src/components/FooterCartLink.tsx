import { useTranslation } from "react-i18next";
import { useCartStore } from "@/stores/cartStore";
import { useCartEntry, CART_ENTRY_POINTS } from "@/stores/cartUIStore";

/** Footer "Shopping cart" link — opens the CartDrawer instead of navigating. */
export const FooterCartLink = () => {
  const { t } = useTranslation();
  const items = useCartStore((s) => s.items);
  const openCart = useCartEntry(CART_ENTRY_POINTS.FOOTER);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const label =
    totalItems > 0
      ? t("cart.openLabelWithCount", { count: totalItems })
      : t("cart.openLabel");

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={label}
      data-testid="cart-entry-footer"
      className="text-sm text-muted-foreground hover:text-foreground text-left"
    >
      {t("cart.title")}
      {totalItems > 0 ? ` (${totalItems})` : ""}
    </button>
  );
};

export default FooterCartLink;
