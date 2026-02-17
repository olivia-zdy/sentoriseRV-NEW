import { 
  Wrench, Cable, AlertTriangle, CheckCircle2, 
  Zap, PlugZap, Thermometer, ArrowRight 
} from "lucide-react";

interface InstallationGuideProps {
  productName: string;
  capacity: string;
  voltage?: string;
  hasHeating?: boolean;
  hasBluetooth?: boolean;
}

const InstallationGuide = ({ productName, capacity, hasHeating, hasBluetooth }: InstallationGuideProps) => {
  const capacityNum = parseInt(capacity) || 100;

  // Dynamic wiring recommendations based on capacity
  const getWiringSpec = () => {
    if (capacityNum <= 6) return { gauge: "14 AWG (2.5mm²)", fuse: "10A ANL", torque: "3-4 Nm" };
    if (capacityNum <= 50) return { gauge: "8 AWG (10mm²)", fuse: "60A ANL", torque: "8-10 Nm" };
    if (capacityNum <= 100) return { gauge: "4 AWG (25mm²)", fuse: "120A ANL", torque: "10-12 Nm" };
    return { gauge: "2/0 AWG (70mm²)", fuse: "250A ANL", torque: "12-15 Nm" };
  };

  const wiring = getWiringSpec();

  const steps = [
    {
      step: 1,
      title: "Disconnect all loads",
      description: "Turn off inverter, charger, and all connected devices before installation.",
      icon: PlugZap,
      warning: null,
    },
    {
      step: 2,
      title: "Mount the battery securely",
      description: "Place on a flat, ventilated surface. Use battery straps or a mounting bracket. Avoid direct sunlight.",
      icon: Wrench,
      warning: "Do NOT mount upside down. Ensure adequate ventilation (min. 20mm clearance on all sides).",
    },
    {
      step: 3,
      title: "Connect negative (−) first",
      description: `Use ${wiring.gauge} cable. Torque terminal bolt to ${wiring.torque}. Apply dielectric grease to prevent corrosion.`,
      icon: Cable,
      warning: null,
    },
    {
      step: 4,
      title: "Install ANL fuse on positive (+)",
      description: `Install a ${wiring.fuse} fuse within 30cm of the positive terminal. Then connect the positive cable.`,
      icon: Zap,
      warning: "A fuse is REQUIRED. Operating without a fuse voids the warranty.",
    },
    {
      step: 5,
      title: "Verify & power on",
      description: "Check all connections are tight. Measure voltage with a multimeter (should read 12.8-13.2V). Turn on loads one by one.",
      icon: CheckCircle2,
      warning: null,
    },
  ];

  const safetyRules = [
    "Never short-circuit the terminals",
    "Use only LiFePO₄-compatible chargers (14.2-14.6V)",
    "Do not charge below 0°C (unless self-heating model)",
    "Do not exceed maximum discharge current",
    "Keep away from water and extreme heat sources",
    "Dispose of at designated battery recycling centers",
  ];

  return (
    <section className="section-padding border-y border-border">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Installation Guide</h2>
              <p className="text-sm text-muted-foreground">Step-by-step wiring for {productName}</p>
            </div>
          </div>

          {/* Wiring Specifications Card */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-card border border-border rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Recommended Cable</p>
              <p className="font-semibold text-foreground text-sm">{wiring.gauge}</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Fuse Rating</p>
              <p className="font-semibold text-foreground text-sm">{wiring.fuse}</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Terminal Torque</p>
              <p className="font-semibold text-foreground text-sm">{wiring.torque}</p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4 mb-8">
            {steps.map((s) => (
              <div key={s.step} className="flex gap-4 p-4 bg-card border border-border rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {s.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                    <s.icon className="w-4 h-4 text-primary" />
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                  {s.warning && (
                    <div className="mt-2 flex items-start gap-2 text-xs p-2 bg-amber-500/10 border border-amber-500/20 rounded">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                      <span className="text-foreground/80">{s.warning}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Safety Rules */}
          <div className="p-5 bg-destructive/5 border border-destructive/20 rounded-lg">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Safety Rules
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {safetyRules.map((rule, i) => (
                <p key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-destructive font-bold mt-0.5">•</span>
                  {rule}
                </p>
              ))}
            </div>
          </div>

          {/* Charger Compatibility Note */}
          {hasHeating && (
            <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Thermometer className="w-5 h-5 text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Self-Heating Model Note</p>
                  <p className="text-muted-foreground">
                    The self-heating system activates automatically when charging below -10°C. 
                    Ensure your charger supports LiFePO₄ mode (14.2-14.6V). The heating circuit draws 
                    from the battery itself — ensure at least 20% SOC before cold charging.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InstallationGuide;
