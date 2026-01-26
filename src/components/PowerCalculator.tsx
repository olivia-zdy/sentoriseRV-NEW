import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { products, Product } from "@/data/products";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Trash2, 
  Calculator, 
  Lightbulb, 
  Refrigerator, 
  Laptop, 
  Smartphone, 
  Tv, 
  Fan, 
  Coffee,
  Waves,
  Zap,
  ArrowRight,
  RotateCcw,
  Check
} from "lucide-react";

interface Appliance {
  id: string;
  name: string;
  watts: number;
  hoursPerDay: number;
  quantity: number;
}

const commonAppliances = [
  { name: "LED Light", watts: 10, icon: Lightbulb },
  { name: "Fridge (12V)", watts: 50, icon: Refrigerator },
  { name: "Laptop", watts: 60, icon: Laptop },
  { name: "Phone Charger", watts: 10, icon: Smartphone },
  { name: "TV (32\")", watts: 50, icon: Tv },
  { name: "Fan", watts: 25, icon: Fan },
  { name: "Coffee Maker", watts: 800, icon: Coffee },
  { name: "Water Pump", watts: 60, icon: Waves },
];

const PowerCalculator = ({ currentProduct }: { currentProduct?: Product }) => {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [autonomyDays, setAutonomyDays] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const addAppliance = (name: string, watts: number) => {
    const newAppliance: Appliance = {
      id: crypto.randomUUID(),
      name,
      watts,
      hoursPerDay: 2,
      quantity: 1,
    };
    setAppliances([...appliances, newAppliance]);
    setShowResult(false);
  };

  const addCustomAppliance = () => {
    addAppliance("Custom Appliance", 50);
  };

  const updateAppliance = (id: string, field: keyof Appliance, value: number | string) => {
    setAppliances(appliances.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
    setShowResult(false);
  };

  const removeAppliance = (id: string) => {
    setAppliances(appliances.filter(a => a.id !== id));
    setShowResult(false);
  };

  const reset = () => {
    setAppliances([]);
    setAutonomyDays(1);
    setShowResult(false);
  };

  // Calculate total daily Wh consumption
  const dailyWh = appliances.reduce((total, a) => {
    return total + (a.watts * a.hoursPerDay * a.quantity);
  }, 0);

  // Total Wh needed (with autonomy days)
  const totalWhNeeded = dailyWh * autonomyDays;

  // Recommended Ah at 12V (with 20% buffer and 80% DoD)
  const recommendedAh = Math.ceil((totalWhNeeded / 12.8) / 0.8 * 1.2);

  // Find suitable products
  const getSuitableProducts = (): Product[] => {
    return products
      .filter(p => {
        const capacity = parseInt(p.capacity);
        return capacity >= recommendedAh * 0.8; // Allow 20% under if close
      })
      .sort((a, b) => {
        const aCapacity = parseInt(a.capacity);
        const bCapacity = parseInt(b.capacity);
        const aDiff = Math.abs(aCapacity - recommendedAh);
        const bDiff = Math.abs(bCapacity - recommendedAh);
        return aDiff - bDiff;
      })
      .slice(0, 3);
  };

  const handleCalculate = () => {
    setShowResult(true);
  };

  const suitableProducts = getSuitableProducts();

  // Check if current product is sufficient
  const currentProductSufficient = currentProduct 
    ? parseInt(currentProduct.capacity) >= recommendedAh * 0.8
    : false;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Power Calculator</h3>
          <p className="text-sm text-muted-foreground">Calculate your battery needs</p>
        </div>
      </div>

      {/* Quick Add Buttons */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Quick Add Appliances</Label>
        <div className="flex flex-wrap gap-2">
          {commonAppliances.map((appliance) => (
            <Button
              key={appliance.name}
              variant="outline"
              size="sm"
              onClick={() => addAppliance(appliance.name, appliance.watts)}
              className="text-xs"
            >
              <appliance.icon className="w-3 h-3 mr-1" />
              {appliance.name}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addCustomAppliance}
            className="text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Custom
          </Button>
        </div>
      </div>

      {/* Appliances List */}
      {appliances.length > 0 && (
        <div className="mb-6 space-y-3">
          <Label className="text-sm font-medium">Your Appliances</Label>
          <AnimatePresence>
            {appliances.map((appliance) => (
              <motion.div
                key={appliance.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Input
                    value={appliance.name}
                    onChange={(e) => updateAppliance(appliance.id, "name", e.target.value)}
                    className="text-sm h-8"
                    placeholder="Name"
                  />
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={appliance.watts}
                      onChange={(e) => updateAppliance(appliance.id, "watts", parseInt(e.target.value) || 0)}
                      className="text-sm h-8 w-16"
                      min={1}
                    />
                    <span className="text-xs text-muted-foreground">W</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={appliance.hoursPerDay}
                      onChange={(e) => updateAppliance(appliance.id, "hoursPerDay", parseFloat(e.target.value) || 0)}
                      className="text-sm h-8 w-16"
                      min={0.5}
                      max={24}
                      step={0.5}
                    />
                    <span className="text-xs text-muted-foreground">h/day</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={appliance.quantity}
                      onChange={(e) => updateAppliance(appliance.id, "quantity", parseInt(e.target.value) || 1)}
                      className="text-sm h-8 w-12"
                      min={1}
                    />
                    <span className="text-xs text-muted-foreground">×</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => removeAppliance(appliance.id)}
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Autonomy Days */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-2 block">Days of Autonomy (without charging)</Label>
        <div className="flex items-center gap-3">
          {[1, 2, 3, 5].map((days) => (
            <Button
              key={days}
              variant={autonomyDays === days ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setAutonomyDays(days);
                setShowResult(false);
              }}
            >
              {days} day{days > 1 ? 's' : ''}
            </Button>
          ))}
        </div>
      </div>

      {/* Live Summary */}
      {appliances.length > 0 && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Daily consumption:</span>
            <span className="font-semibold">{dailyWh.toLocaleString()} Wh/day</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total needed ({autonomyDays} day{autonomyDays > 1 ? 's' : ''}):</span>
            <span className="font-semibold">{totalWhNeeded.toLocaleString()} Wh</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Recommended capacity:</span>
            <span className="font-bold text-primary">{recommendedAh} Ah</span>
          </div>
        </div>
      )}

      {/* Calculate Button */}
      <div className="flex gap-3 mb-6">
        <Button 
          onClick={handleCalculate} 
          disabled={appliances.length === 0}
          className="flex-1"
        >
          <Zap className="w-4 h-4 mr-2" />
          Calculate Requirements
        </Button>
        {appliances.length > 0 && (
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Results */}
      <AnimatePresence>
        {showResult && appliances.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Current Product Check */}
            {currentProduct && (
              <div className={`p-4 rounded-lg border-2 ${currentProductSufficient ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {currentProductSufficient ? (
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  )}
                  <span className={`font-semibold ${currentProductSufficient ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'}`}>
                    {currentProductSufficient 
                      ? `This ${currentProduct.name} is perfect for your needs!` 
                      : `You may need more capacity than the ${currentProduct.capacity}`}
                  </span>
                </div>
                {currentProductSufficient && (
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Capacity utilization:</span>
                      <span className="font-medium">
                        {Math.round((recommendedAh / parseInt(currentProduct.capacity)) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={Math.min((recommendedAh / parseInt(currentProduct.capacity)) * 100, 100)} 
                      className="h-2" 
                    />
                  </div>
                )}
              </div>
            )}

            {/* Recommended Products */}
            {(!currentProduct || !currentProductSufficient) && suitableProducts.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Recommended Batteries</h4>
                <div className="space-y-2">
                  {suitableProducts.map((product, index) => (
                    <div 
                      key={product.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${index === 0 ? 'border-primary bg-primary/5' : 'border-border'}`}
                    >
                      <div className="w-12 h-12 bg-muted/30 rounded p-1 flex items-center justify-center shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm text-foreground truncate">{product.name}</p>
                          {index === 0 && <Badge variant="default" className="text-xs">Best Match</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground">{product.capacity} • {product.energy}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-foreground">€{product.salePrice || product.price}</p>
                        <Button asChild variant="ghost" size="sm" className="h-7 text-xs">
                          <Link to={`/products/${product.id}`}>
                            View <ArrowRight className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No suitable products */}
            {suitableProducts.length === 0 && (
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-muted-foreground text-sm">
                  Your power needs exceed our single battery capacity. Consider connecting multiple batteries in parallel.
                </p>
                <Button asChild variant="link" className="mt-2">
                  <Link to="/support">Contact us for custom solutions</Link>
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default PowerCalculator;
