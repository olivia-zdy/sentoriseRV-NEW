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

          {/* Center - Standards with glass icons */}
          <div className="flex items-center gap-4 md:gap-8 flex-wrap justify-center">
            {standards.map((standard) => (
              <div 
                key={standard.name} 
                className="flex items-center gap-3 group cursor-default"
              >
                <div className="icon-circle-glass-sm">
                  <standard.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {standard.name}
                </span>
              </div>
            ))}
          </div>

          {/* Right - Spacer for balance */}
          <div className="hidden md:block w-32" />
        </div>
      </div>
    </div>
  );
};

export default StandardsBar;
