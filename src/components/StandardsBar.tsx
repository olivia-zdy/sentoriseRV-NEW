import { Shield, Check } from "lucide-react";

const standards = [
  "BCI GROUP 31",
  "DIN H8 (EN)",
  "IEC 62133",
  "IP65 RATED",
  "UL1973 CELLS",
];

const StandardsBar = () => {
  return (
    <div className="bg-secondary/50 border-y border-border/30 py-4">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left - Label */}
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Hardware Integrity Standards:
            </span>
          </div>

          {/* Center - Standards */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {standards.map((standard) => (
              <div key={standard} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  {standard}
                </span>
              </div>
            ))}
          </div>

          {/* Right - Badge */}
          <div className="flex items-center gap-2 px-4 py-2 border border-border/50 bg-background/50">
            <Check className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Validated Chassis Component
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardsBar;
