import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { products, Product } from "@/data/products";
import { 
  Truck, 
  Tent, 
  Sun, 
  Anchor, 
  Zap, 
  Battery, 
  Snowflake, 
  ArrowRight, 
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Home
} from "lucide-react";

type Step = "scenario" | "space" | "power" | "climate" | "result";

interface Selection {
  scenario?: string;
  space?: string;
  power?: string;
  climate?: string;
}

const steps: Step[] = ["scenario", "space", "power", "climate", "result"];

const scenarioOptions = [
  { id: "rv", label: "RV / Motorhome", icon: Truck, desc: "Full-time or weekend trips" },
  { id: "van", label: "Van / Camper Van", icon: Tent, desc: "Compact conversions" },
  { id: "solar", label: "Off-Grid Solar", icon: Sun, desc: "Cabin or home backup" },
  { id: "marine", label: "Marine / Boat", icon: Anchor, desc: "Auxiliary power" },
  { id: "portable", label: "Portable / Camping", icon: Battery, desc: "Lightweight and mobile" },
  { id: "backup", label: "Backup Power", icon: Home, desc: "Emergency reserves" },
];

const spaceOptions = [
  { id: "standard", label: "Standard Battery Bay", desc: "Group 31 format fits" },
  { id: "tight", label: "Tight Space / Under-Seat", desc: "MINI or DIN H8 needed" },
  { id: "large", label: "Large Dedicated Area", desc: "No size restrictions" },
  { id: "unsure", label: "Not Sure", desc: "I'll measure later" },
];

const powerOptions = [
  { id: "light", label: "Light Use", desc: "Lights, phone charging", range: "6-50Ah" },
  { id: "moderate", label: "Moderate Use", desc: "Fridge, laptop, lights", range: "100Ah" },
  { id: "heavy", label: "Heavy Use", desc: "Multiple appliances, long trips", range: "200Ah+" },
  { id: "calculate", label: "Help Me Calculate", desc: "Not sure what I need" },
];

const climateOptions = [
  { id: "cold", label: "Below Freezing", icon: Snowflake, desc: "Regular use at -20°C or colder" },
  { id: "cool", label: "Occasionally Cool", icon: Snowflake, desc: "Sometimes 0-10°C" },
  { id: "warm", label: "Mostly Warm", icon: Sun, desc: "Rarely below 10°C" },
];

const BatterySelector = () => {
  const [currentStep, setCurrentStep] = useState<Step>("scenario");
  const [selection, setSelection] = useState<Selection>({});

  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex) / (steps.length - 1)) * 100;

  const handleSelect = (stepKey: keyof Selection, value: string) => {
    setSelection(prev => ({ ...prev, [stepKey]: value }));
    
    // Auto-advance to next step
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setTimeout(() => setCurrentStep(steps[nextIndex]), 300);
    }
  };

  const goBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const restart = () => {
    setSelection({});
    setCurrentStep("scenario");
  };

  const getRecommendedProducts = (): { primary: Product; alternatives: Product[] } => {
    const { scenario, space, power, climate } = selection;
    
    // Scoring logic
    const scored = products.map(product => {
      let score = 0;
      const reasons: string[] = [];

      // Scenario matching
      if (scenario === "portable" || scenario === "backup") {
        if (product.series === "Lite") {
          score += 30;
          reasons.push("Lightweight and portable");
        }
      } else if (scenario === "rv" || scenario === "van" || scenario === "solar") {
        if (product.series === "Core" || product.series === "Plus") {
          score += 20;
          reasons.push(`Perfect for ${scenarioOptions.find(s => s.id === scenario)?.label}`);
        }
      }

      // Space matching
      if (space === "tight") {
        if (product.id.includes("mini") || product.id.includes("din")) {
          score += 25;
          reasons.push("Compact form factor");
        }
      } else if (space === "standard") {
        if (product.id.includes("std")) {
          score += 25;
          reasons.push("Standard Group 31 format");
        }
      }

      // Power matching
      if (power === "light") {
        if (parseInt(product.capacity) <= 50) {
          score += 25;
          reasons.push("Right-sized for light use");
        }
      } else if (power === "moderate") {
        if (parseInt(product.capacity) === 100) {
          score += 25;
          reasons.push("Ideal 100Ah capacity");
        }
      } else if (power === "heavy") {
        if (parseInt(product.capacity) >= 200) {
          score += 30;
          reasons.push("High capacity for heavy loads");
        }
      }

      // Climate matching
      if (climate === "cold" && product.hasHeating) {
        score += 35;
        reasons.push("Self-heating for arctic conditions");
      } else if (climate === "warm" || climate === "cool") {
        if (!product.hasHeating) score += 5;
      }

      return { product, score, reasons };
    });

    // Sort by score
    scored.sort((a, b) => b.score - a.score);

    return {
      primary: scored[0].product,
      alternatives: scored.slice(1, 3).map(s => s.product),
    };
  };

  const getMatchReason = (product: Product): string => {
    const { scenario, space, power, climate } = selection;
    const reasons: string[] = [];

    if (climate === "cold" && product.hasHeating) {
      reasons.push("Self-heating for cold weather");
    }
    if (space === "tight" && (product.id.includes("mini") || product.id.includes("din"))) {
      reasons.push("Fits tight spaces");
    }
    if (power === "heavy" && parseInt(product.capacity) >= 200) {
      reasons.push("High capacity for heavy use");
    }
    if (product.series === "Core") {
      reasons.push("Best value for RV/Solar");
    }

    return reasons.length > 0 ? reasons.join(" • ") : "Great all-around choice";
  };

  const renderStep = () => {
    switch (currentStep) {
      case "scenario":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">What will you be powering?</h3>
              <p className="text-muted-foreground">Select your primary use case</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {scenarioOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect("scenario", option.id)}
                  className={`group p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                    selection.scenario === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <option.icon className={`w-8 h-8 mb-3 ${
                    selection.scenario === option.id ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                  }`} />
                  <h4 className="font-semibold text-foreground mb-1">{option.label}</h4>
                  <p className="text-sm text-muted-foreground">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case "space":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">What's your space situation?</h3>
              <p className="text-muted-foreground">This helps us recommend the right form factor</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {spaceOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect("space", option.id)}
                  className={`group p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                    selection.space === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <h4 className="font-semibold text-foreground mb-1">{option.label}</h4>
                  <p className="text-sm text-muted-foreground">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case "power":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">How much power do you need?</h3>
              <p className="text-muted-foreground">Consider what appliances you'll run</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {powerOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect("power", option.id)}
                  className={`group p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                    selection.power === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-foreground">{option.label}</h4>
                    {option.range && (
                      <Badge variant="secondary" className="text-xs">{option.range}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case "climate":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Will you use it in cold weather?</h3>
              <p className="text-muted-foreground">This determines if you need a heated model</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {climateOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect("climate", option.id)}
                  className={`group p-6 rounded-xl border-2 text-center transition-all duration-200 ${
                    selection.climate === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <option.icon className={`w-10 h-10 mx-auto mb-3 ${
                    selection.climate === option.id ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                  }`} />
                  <h4 className="font-semibold text-foreground mb-1">{option.label}</h4>
                  <p className="text-sm text-muted-foreground">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case "result":
        const { primary, alternatives } = getRecommendedProducts();
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Your Perfect Match</h3>
              <p className="text-muted-foreground">Based on your requirements</p>
            </div>

            {/* Primary Recommendation */}
            <Card className="p-6 border-2 border-primary bg-primary/5">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                  <div className="aspect-square bg-muted/30 rounded-lg p-4 flex items-center justify-center">
                    <img 
                      src={primary.image} 
                      alt={primary.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <Badge className="mb-2">Best Match</Badge>
                  <h4 className="text-xl font-bold text-foreground mb-2">{primary.name}</h4>
                  <p className="text-muted-foreground mb-4">{primary.tagline}</p>
                  
                  <div className="flex items-center gap-2 mb-4 text-sm text-primary">
                    <HelpCircle className="w-4 h-4" />
                    <span>{getMatchReason(primary)}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-2 bg-background rounded-lg">
                      <p className="text-xs text-muted-foreground">Capacity</p>
                      <p className="font-semibold">{primary.capacity}</p>
                    </div>
                    <div className="text-center p-2 bg-background rounded-lg">
                      <p className="text-xs text-muted-foreground">Energy</p>
                      <p className="font-semibold">{primary.energy}</p>
                    </div>
                    <div className="text-center p-2 bg-background rounded-lg">
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="font-semibold">€{primary.salePrice || primary.price}</p>
                    </div>
                  </div>

                  <Button asChild className="w-full sm:w-auto">
                    <Link to={`/products/${primary.id}`}>
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Alternatives */}
            {alternatives.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">Also Consider</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {alternatives.map((product) => (
                    <Card key={product.id} className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-muted/30 rounded-lg p-2 flex items-center justify-center shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-foreground text-sm truncate">{product.name}</h5>
                          <p className="text-xs text-muted-foreground mb-2">{product.capacity} • {product.energy}</p>
                          <p className="text-sm font-semibold text-foreground">€{product.salePrice || product.price}</p>
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm" className="w-full mt-3">
                        <Link to={`/products/${product.id}`}>View Details</Link>
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Restart */}
            <div className="text-center pt-4">
              <Button variant="ghost" onClick={restart}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Progress Bar */}
      {currentStep !== "result" && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStepIndex + 1} of 4</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {currentStep !== "scenario" && currentStep !== "result" && (
        <div className="mt-8 flex justify-start">
          <Button variant="ghost" onClick={goBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default BatterySelector;
