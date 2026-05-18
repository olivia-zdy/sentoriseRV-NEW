import { Truck } from "lucide-react";
import { useTranslation } from "react-i18next";

const AnnouncementBar = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-primary text-primary-foreground py-2.5">
      <div className="container-custom flex items-center justify-center text-sm">
        <div className="flex items-center gap-3">
          <Truck className="w-4 h-4" />
          <span className="hidden sm:inline font-medium">
            {t('announcement.shipping', { defaultValue: 'EU-wide shipping from our Berlin warehouse · 2–5 working days' })}
          </span>
          <span className="sm:hidden font-medium">
            {t('announcement.shippingShort', { defaultValue: 'EU-wide shipping · 2–5 days' })}
          </span>
          <span className="hidden md:inline ml-4 font-semibold">Stay Powered. Stay Free.</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
