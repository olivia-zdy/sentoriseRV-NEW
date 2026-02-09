import { Globe, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMarket } from "@/context/MarketContext";

const AnnouncementBar = () => {
  const { t } = useTranslation();
  const { market, formatPrice } = useMarket();

  const freeShippingThreshold = 500; // EUR base
  const formattedThreshold = formatPrice(freeShippingThreshold);

  const languageLabels: Record<string, string> = {
    DE: "DE",
    FR: "FR",
    UK: "EN",
    US: "EN",
  };

  const currencyLabels: Record<string, string> = {
    DE: "EUR €",
    FR: "EUR €",
    UK: "GBP £",
    US: "USD $",
  };

  return (
    <div className="bg-primary text-primary-foreground py-2.5">
      <div className="container-custom flex items-center justify-between text-sm">
        {/* Left - Promo */}
        <div className="flex items-center gap-3">
          <Truck className="w-4 h-4" />
          <span className="hidden sm:inline font-medium">
            {t('announcement.freeShipping', { threshold: formattedThreshold, defaultValue: `Free shipping on orders over ${formattedThreshold}` })}
          </span>
          <span className="sm:hidden font-medium">
            {t('announcement.freeShippingShort', { threshold: formattedThreshold, defaultValue: `Free shipping ${formattedThreshold}+` })}
          </span>
        </div>

        {/* Center - Tagline (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-2">
          <span className="font-semibold">Stay Powered. Stay Free.</span>
        </div>

        {/* Right - Language & Currency */}
        <div className="flex items-center gap-4 text-primary-foreground/80">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{languageLabels[market.code] || "EN"}</span>
          </div>
          <span className="hidden md:inline opacity-50">|</span>
          <span className="hidden md:inline">{currencyLabels[market.code] || "EUR €"}</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
