import { Package, Clock, AlertTriangle, Truck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StockStatusProps {
  stockQuantity: number;
  lowStockThreshold?: number;
  restockDate?: string;
  showDelivery?: boolean;
  compact?: boolean;
}

const StockStatus = ({ 
  stockQuantity, 
  lowStockThreshold = 10, 
  restockDate,
  showDelivery = true,
  compact = false 
}: StockStatusProps) => {
  const getStockStatus = () => {
    if (stockQuantity === 0) {
      return {
        label: restockDate ? "Pre-order Available" : "Out of Stock",
        color: "text-muted-foreground",
        bgColor: "bg-muted",
        progressColor: "bg-muted-foreground",
        icon: Clock,
        urgent: false,
      };
    }
    if (stockQuantity <= 5) {
      return {
        label: `Only ${stockQuantity} left!`,
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-900/20",
        progressColor: "bg-red-500",
        icon: AlertTriangle,
        urgent: true,
      };
    }
    if (stockQuantity <= lowStockThreshold) {
      return {
        label: "Low Stock",
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-50 dark:bg-amber-900/20",
        progressColor: "bg-amber-500",
        icon: Package,
        urgent: false,
      };
    }
    return {
      label: "In Stock",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      progressColor: "bg-green-500",
      icon: Package,
      urgent: false,
    };
  };

  const getShippingInfo = () => {
    if (stockQuantity === 0) {
      return restockDate 
        ? `Expected restock: ${restockDate}`
        : "Contact for availability";
    }
    if (stockQuantity <= 5) {
      return "Ships in 1-2 business days";
    }
    if (stockQuantity <= lowStockThreshold) {
      return "Ships in 1-2 business days";
    }
    return "Ships in 1-2 business days";
  };

  const getDeliveryEstimate = () => {
    if (stockQuantity === 0) return null;
    
    const today = new Date();
    const minDays = stockQuantity <= lowStockThreshold ? 3 : 2;
    const maxDays = stockQuantity <= lowStockThreshold ? 6 : 5;
    
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + minDays);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + maxDays);
    
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${minDate.toLocaleDateString('en-US', options)} - ${maxDate.toLocaleDateString('en-US', options)}`;
  };

  const status = getStockStatus();
  const StatusIcon = status.icon;
  const deliveryEstimate = getDeliveryEstimate();
  
  // Calculate progress for visual indicator (max 50 for full bar)
  const progressValue = Math.min((stockQuantity / 50) * 100, 100);

  if (compact) {
    return (
      <div className={`flex items-center gap-1.5 ${status.color}`}>
        <StatusIcon className={`w-3 h-3 ${status.urgent ? 'animate-pulse' : ''}`} />
        <span className="text-xs font-medium">{status.label}</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Stock Status */}
      <div className={`flex items-center justify-between p-3 rounded-lg ${status.bgColor}`}>
        <div className="flex items-center gap-2">
          <StatusIcon className={`w-4 h-4 ${status.color} ${status.urgent ? 'animate-pulse' : ''}`} />
          <span className={`text-sm font-semibold ${status.color}`}>
            {status.label}
          </span>
        </div>
        {stockQuantity > 0 && stockQuantity <= 20 && (
          <span className="text-xs text-muted-foreground">
            {stockQuantity} units available
          </span>
        )}
      </div>

      {/* Stock Level Progress */}
      {stockQuantity > 0 && stockQuantity <= 20 && (
        <div className="space-y-1">
          <Progress value={progressValue} className="h-1.5" />
          <p className="text-xs text-muted-foreground text-right">
            Selling fast
          </p>
        </div>
      )}

      {/* Shipping Info */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>{getShippingInfo()}</span>
      </div>

      {/* Delivery Estimate */}
      {showDelivery && deliveryEstimate && (
        <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
          <Truck className="w-4 h-4 text-primary" />
          <div className="text-sm">
            <span className="text-muted-foreground">Order now, arrives: </span>
            <span className="font-semibold text-foreground">{deliveryEstimate}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockStatus;
