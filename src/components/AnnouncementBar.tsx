import { Truck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMarket } from "@/context/MarketContext";

const AnnouncementBar = () => {
  const { t } = useTranslation();
  const { formatPrice } = useMarket();

  const freeShippingThreshold = 199; // EUR base
  const formattedThreshold = formatPrice(freeShippingThreshold);

  return (
    <div className="bg-primary text-primary-foreground py-2.5">
      <div className="container-custom flex items-center justify-center text-sm">
        <div className="flex items-center gap-3">
          <Truck className="w-4 h-4" />
          <span className="hidden sm:inline font-medium">
            {t('announcement.freeShipping', { threshold: formattedThreshold, defaultValue: `Free shipping on orders over ${formattedThreshold}` })}
          </span>
          <span className="sm:hidden font-medium">
            {t('announcement.freeShippingShort', { threshold: formattedThreshold, defaultValue: `Free shipping ${formattedThreshold}+` })}
          </span>
          <span className="hidden md:inline ml-4 font-semibold">Stay Powered. Stay Free.</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
