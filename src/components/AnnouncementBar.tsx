import { Globe } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="bg-background border-b border-border/50 py-2.5">
      <div className="container-custom flex items-center justify-between text-sm">
        {/* Left - News */}
        <div className="flex items-center gap-3">
          <span className="badge-glow rounded">LATEST NEWS</span>
          <span className="text-muted-foreground hidden sm:inline">
            NEW DIN H8 MODULES IN STOCK • UN38.3 VALIDATED
          </span>
        </div>

        {/* Right - Language & Shipping */}
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">EN</span>
          </div>
          <span className="hidden md:inline text-border">|</span>
          <span className="hidden md:inline">EUR €</span>
          <span className="hidden lg:inline text-border">|</span>
          <span className="hidden lg:inline">
            FREE SHIPPING / <span className="text-primary">OVER €1500</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
