import { Shield, Leaf, Award, ShieldCheck, RefreshCw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const standards = [
  { name: "CE Certified", icon: Award, description: "符合欧盟安全、健康和环保要求的产品标志" },
  { name: "UN38.3 Tested", icon: ShieldCheck, description: "通过联合国危险货物运输安全测试认证" },
  { name: "RoHS Compliant", icon: Leaf, description: "符合有害物质限制指令，环保无毒" },
  { name: "IEC 62619", icon: Shield, description: "工业用锂电池安全标准认证" },
  { name: "5-Year Warranty", icon: RefreshCw, description: "提供5年产品质保，安心无忧" },
];

const StandardsBar = () => {
  return (
    <TooltipProvider delayDuration={200}>
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
                <Tooltip key={standard.name}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 group cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm border border-border/40 flex items-center justify-center group-hover:border-primary group-hover:scale-110 transition-all duration-200">
                        <standard.icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                        {standard.name}
                      </span>
                      {index < standards.length - 1 && (
                        <span className="hidden md:inline text-border mx-1">•</span>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-[200px] text-center">
                    <p className="text-xs">{standard.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StandardsBar;
