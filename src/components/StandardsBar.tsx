import { Shield, Leaf, Award } from "lucide-react";

const standards = [
  { name: "CE Certified", icon: Award },
  { name: "UN38.3 Tested", icon: Shield },
  { name: "RoHS Compliant", icon: Leaf },
  { name: "IEC 62619", icon: Shield },
  { name: "5-Year Warranty", icon: Award },
];

const StandardsBar = () => {
  return (
    <div className="bg-muted border-y border-border py-6">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Label */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              Trusted Certifications:
            </span>
          </div>

          {/* Center - Standards */}
          <div className="flex items-center gap-6 md:gap-10 flex-wrap justify-center">
            {standards.map((standard) => (
              <div key={standard.name} className="flex items-center gap-2">
                <standard.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
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
