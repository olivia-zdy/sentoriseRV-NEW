import { Globe, Truck } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2.5">
      <div className="container-custom flex items-center justify-between text-sm">
        {/* Left - Promo */}
        <div className="flex items-center gap-3">
          <Truck className="w-4 h-4" />
          <span className="hidden sm:inline font-medium">
            Free shipping on orders over €500
          </span>
          <span className="sm:hidden font-medium">Free shipping €500+</span>
        </div>

        {/* Center - Tagline (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-2">
          <span className="font-semibold">Stay Powered. Stay Free.</span>
        </div>

        {/* Right - Language & Currency */}
        <div className="flex items-center gap-4 text-primary-foreground/80">
          <div className="flex items-center gap-2 cursor-pointer hover:text-primary-foreground transition-colors">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">EN</span>
          </div>
          <span className="hidden md:inline opacity-50">|</span>
          <span className="hidden md:inline">EUR €</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
