import { Truck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalShippingCopy } from "@/hooks/useLocalWarehouse";

const AnnouncementBar = () => {
  const { t } = useTranslation();
  const localCopy = useLocalShippingCopy(t('announcement.shipping'));

  return (
    <div className="bg-primary text-primary-foreground py-2.5">
      <div className="container-custom flex items-center justify-center text-sm">
        <div className="flex items-center gap-3">
          <Truck className="w-4 h-4" />
          <span className="hidden sm:inline font-medium">
            {localCopy || t('announcement.shipping')}
          </span>
          <span className="sm:hidden font-medium">
            {t('announcement.shippingShort')}
          </span>
          <span className="hidden md:inline ml-4 font-semibold">Stay Powered. Stay Free.</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;

