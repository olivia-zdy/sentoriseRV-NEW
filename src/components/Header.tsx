import { useState, useRef, useEffect } from "react";
// Mega menu navigation - rebuilt
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "./ThemeToggle";
import { MarketSelector } from "./MarketSelector";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "./CartDrawer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";

// Mega menu definitions moved inside the component to use t()

type MegaMenuColumn = { title: string; items: { name: string; href: string }[] };

interface NavLink {
  name: string;
  href: string;
  active: boolean;
  megaMenu?: MegaMenuColumn[];
}

const MegaMenuPanel = ({ columns, onClose }: { columns: MegaMenuColumn[]; onClose: () => void }) => (
  <div className="absolute top-full left-0 w-full bg-popover border-b border-border shadow-lg z-50 animate-fade-in">
    <div className="container-custom py-8">
      <div className={`grid gap-8 ${columns.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              {col.title}
            </h4>
            <ul className="space-y-2.5">
              {col.items.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-foreground/80 hover:text-primary transition-colors"
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const { resolvedTheme } = useTheme();
  const { t } = useTranslation();

  const productsMegaMenu: MegaMenuColumn[] = [
    { title: t('megaMenu.bySeries'), items: [
      { name: t('megaMenu.liteSeries'), href: "/products?series=Lite" },
      { name: t('megaMenu.coreSeries'), href: "/products?series=Core" },
      { name: t('megaMenu.plusSeries'), href: "/products?series=Plus" },
      { name: t('megaMenu.viewAllProducts'), href: "/products" },
    ]},
    { title: t('megaMenu.byFeature'), items: [
      { name: t('megaMenu.bluetoothBatteries'), href: "/products?feature=bluetooth" },
      { name: t('megaMenu.selfHeatingModels'), href: "/products?feature=heated" },
      { name: t('megaMenu.miniCompact'), href: "/products?feature=mini" },
      { name: t('megaMenu.dinH8Format'), href: "/products?feature=din" },
    ]},
    { title: t('megaMenu.accessories'), items: [
      { name: t('megaMenu.chargers'), href: "/accessories" },
      { name: t('megaMenu.batteryMonitors'), href: "/accessories" },
      { name: t('megaMenu.viewAllAccessories'), href: "/accessories" },
    ]},
    { title: t('megaMenu.tools'), items: [
      { name: t('megaMenu.batterySelector'), href: "/battery-selector" },
      { name: t('megaMenu.powerCalculator'), href: "/battery-selector#calculator" },
      { name: t('megaMenu.productComparison'), href: "/compare" },
    ]},
  ];

  const applicationsMegaMenu: MegaMenuColumn[] = [
    { title: t('megaMenu.mobileLiving'), items: [
      { name: t('megaMenu.rvMotorhome'), href: "/applications#rv" },
      { name: t('megaMenu.vanLife'), href: "/applications#vanlife" },
      { name: t('megaMenu.campingOutdoor'), href: "/applications#camping" },
    ]},
    { title: t('megaMenu.energySystems'), items: [
      { name: t('megaMenu.offGridSolar'), href: "/applications#solar" },
      { name: t('megaMenu.offGridCabin'), href: "/applications#cabin" },
      { name: t('megaMenu.backupPower'), href: "/applications#backup" },
    ]},
    { title: t('megaMenu.marine'), items: [
      { name: t('megaMenu.marineBoat'), href: "/applications#marine" },
      { name: t('megaMenu.trollingMotor'), href: "/applications#trolling" },
    ]},
  ];

  const supportMegaMenu: MegaMenuColumn[] = [
    { title: t('megaMenu.supportTitle'), items: [
      { name: t('megaMenu.helpCenter'), href: "/support#faq" },
      { name: t('megaMenu.contactUsMenu'), href: "/support#contact" },
      { name: t('megaMenu.bluetoothGuide'), href: "/bluetooth-guide" },
    ]},
    { title: t('megaMenu.warranty'), items: [
      { name: t('megaMenu.registerWarranty'), href: "/warranty" },
      { name: t('megaMenu.warrantyPolicy'), href: "/support#warranty" },
      { name: t('megaMenu.warrantyLookup'), href: "/warranty#lookup" },
    ]},
    { title: t('megaMenu.resources'), items: [
      { name: t('megaMenu.knowledgeCenter'), href: "/blog" },
      { name: t('megaMenu.userStories'), href: "/stories" },
      { name: t('megaMenu.certifications'), href: "/certifications" },
      { name: t('megaMenu.downloads'), href: "/support#downloads" },
    ]},
    { title: t('megaMenu.policy'), items: [
      { name: t('megaMenu.termsConditions'), href: "/terms" },
      { name: t('megaMenu.privacyPolicy'), href: "/privacy" },
      { name: t('megaMenu.shippingPolicy'), href: "/terms#shipping" },
    ]},
  ];

  const navLinks: NavLink[] = [
    { name: t('nav.home'), href: "/", active: location.pathname === "/" },
    { 
      name: t('nav.products'), 
      href: "/products", 
      megaMenu: productsMegaMenu,
      active: location.pathname.startsWith("/products")
    },
    { 
      name: t('nav.applications'), 
      href: "/applications", 
      megaMenu: applicationsMegaMenu,
      active: location.pathname === "/applications"
    },
    { 
      name: t('nav.whySentorise'), 
      href: "/why-sentorise",
      active: location.pathname === "/why-sentorise"
    },
    { 
      name: t('nav.support'), 
      href: "/support", 
      megaMenu: supportMegaMenu,
      active: location.pathname === "/support"
    },
    { name: t('nav.blog'), href: "/blog", active: location.pathname.startsWith("/blog") },
  ];

  const logoSrc = resolvedTheme === "dark" ? logoDark : logoLight;

  const toggleMobileSection = (name: string) => {
    setOpenMobileSection(openMobileSection === name ? null : name);
  };

  const handleMegaEnter = (name: string) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setActiveMega(name);
  };

  const handleMegaLeave = () => {
    megaTimeoutRef.current = setTimeout(() => setActiveMega(null), 150);
  };

  // Close mega menu on route change
  useEffect(() => {
    setActiveMega(null);
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Flatten mega menu items for mobile
  const getMobileItems = (megaMenu?: MegaMenuColumn[]) => {
    if (!megaMenu) return [];
    return megaMenu.flatMap((col) => 
      [{ name: `— ${col.title} —`, href: "", isLabel: true }, ...col.items.map(i => ({ ...i, isLabel: false }))]
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logoSrc} 
              alt="Sentorise" 
              width={138}
              height={40}
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              link.megaMenu ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => handleMegaEnter(link.name)}
                  onMouseLeave={handleMegaLeave}
                >
                  <Link
                    to={link.href}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${
                      link.active || activeMega === link.name
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-3 h-3 transition-transform ${activeMega === link.name ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium transition-colors ${
                    link.active 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <MarketSelector />
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="w-5 h-5" />
            </Button>
            <CartDrawer />
            <ThemeToggle />
            <Button asChild variant="default" size="sm" className="ml-2">
              <Link to="/support#contact">{t('nav.contactUs')}</Link>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-1">
            <MarketSelector />
            <ThemeToggle />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu Panels */}
        {navLinks.map((link) => (
          link.megaMenu && activeMega === link.name ? (
            <div
              key={link.name}
              onMouseEnter={() => handleMegaEnter(link.name)}
              onMouseLeave={handleMegaLeave}
            >
              <MegaMenuPanel columns={link.megaMenu} onClose={() => setActiveMega(null)} />
            </div>
          ) : null
        ))}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                link.megaMenu ? (
                  <Collapsible 
                    key={link.name}
                    open={openMobileSection === link.name}
                    onOpenChange={() => toggleMobileSection(link.name)}
                  >
                    <CollapsibleTrigger className={`flex items-center justify-between w-full py-3 px-2 text-base font-medium rounded-lg ${
                      link.active 
                        ? "text-primary bg-primary/5" 
                        : "text-foreground hover:bg-muted"
                    }`}>
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        openMobileSection === link.name ? 'rotate-180' : ''
                      }`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 pb-2">
                      {getMobileItems(link.megaMenu).map((item, idx) => (
                        item.isLabel ? (
                          <span key={idx} className="block py-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">
                            {item.name.replace(/— /g, '').replace(/ —/g, '')}
                          </span>
                        ) : (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block py-2 px-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        )
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center justify-between py-3 px-2 text-base font-medium rounded-lg ${
                      link.active 
                        ? "text-primary bg-primary/5" 
                        : "text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="pt-4 mt-4 border-t border-border">
                <Button asChild variant="default" className="w-full">
                  <Link to="/support#contact" onClick={() => setIsMenuOpen(false)}>{t('nav.contactUs')}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
