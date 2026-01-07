import { Truck, RotateCcw, Shield, Zap } from "lucide-react";

const promises = [
  {
    icon: Truck,
    title: "Free EU Shipping",
    description: "Orders €99+",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Money Back Guarantee",
  },
  {
    icon: Shield,
    title: "5-Year Warranty",
    description: "Full Coverage",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "2-5 Business Days",
  },
];

const ServicePromises = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {promises.map((promise) => (
        <div
          key={promise.title}
          className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border"
        >
          <div className="icon-circle-glass shrink-0">
            <promise.icon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{promise.title}</p>
            <p className="text-xs text-muted-foreground">{promise.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicePromises;
