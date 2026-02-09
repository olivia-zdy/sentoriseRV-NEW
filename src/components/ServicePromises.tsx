import { Truck, RotateCcw, Shield, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const ServicePromises = () => {
  const { t } = useTranslation();

  const promises = [
    { icon: Truck, titleKey: "servicePromises.freeShipping", descKey: "servicePromises.freeShippingDesc" },
    { icon: RotateCcw, titleKey: "servicePromises.returns", descKey: "servicePromises.returnsDesc" },
    { icon: Shield, titleKey: "servicePromises.warranty", descKey: "servicePromises.warrantyDesc" },
    { icon: Zap, titleKey: "servicePromises.fastDelivery", descKey: "servicePromises.fastDeliveryDesc" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {promises.map((promise) => (
        <div
          key={promise.titleKey}
          className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border"
        >
          <div className="icon-circle-glass shrink-0">
            <promise.icon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{t(promise.titleKey)}</p>
            <p className="text-xs text-muted-foreground">{t(promise.descKey)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicePromises;
