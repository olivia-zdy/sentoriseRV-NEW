import { Shield, Leaf, Award, ShieldCheck, RefreshCw } from "lucide-react";

const standards = [
  { name: "CE Certified", icon: Award },
  { name: "UN38.3 Tested", icon: ShieldCheck },
  { name: "RoHS Compliant", icon: Leaf },
  { name: "IEC 62619", icon: Shield },
  { name: "5-Year Warranty", icon: RefreshCw },
];

const StandardsBar = () => {
  return (
    <div className="bg-muted/50 border-y border-border py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Label */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              Trusted Certifications:
            </span>
          </div>

          {/* Center - Standards with glass icons - tighter spacing */}
          <div className="flex items-center gap-3 md:gap-5 flex-wrap justify-center">
            {standards.map((standard, index) => (
              <div 
                key={standard.name} 
                className="flex items-center gap-2 group cursor-default"
              >
                <div className="w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm border border-border/40 flex items-center justify-center">
                  <standard.icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                  {standard.name}
                </span>
                {index < standards.length - 1 && (
                  <span className="hidden md:inline text-border mx-1">•</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardsBar;
