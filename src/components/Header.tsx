import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "./CartDrawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";

const productDropdownItems = [
  { name: "Lite Series", desc: "6Ah - 50Ah Portable", href: "/products?series=Lite" },
  { name: "Core Series", desc: "100Ah RV & Solar", href: "/products?series=Core" },
  { name: "Plus Series", desc: "200Ah Heated", href: "/products?series=Plus" },
  { name: "View All Products", desc: "Browse full catalog", href: "/products" },
];

const applicationDropdownItems = [
  { name: "RV & Motorhome", href: "/applications#rv" },
  { name: "Van Life", href: "/applications#vanlife" },
  { name: "Off-Grid Solar", href: "/applications#solar" },
  { name: "Marine & Boat", href: "/applications#marine" },
  { name: "Camping & Outdoor", href: "/applications#camping" },
  { name: "Off-Grid Cabin", href: "/applications#cabin" },
];

const supportDropdownItems = [
  { name: "Help Center", href: "/support#faq" },
  { name: "Downloads", href: "/support#downloads" },
  { name: "Warranty", href: "/support#warranty" },
  { name: "Contact Us", href: "/support#contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const location = useLocation();
  const { resolvedTheme } = useTheme();

  const navLinks = [
    { name: "Home", href: "/", active: location.pathname === "/" },
    { 
      name: "Products", 
      href: "/products", 
      hasDropdown: true,
      dropdownItems: productDropdownItems,
      active: location.pathname.startsWith("/products")
    },
    { 
      name: "Applications", 
      href: "/applications", 
      hasDropdown: true,
      dropdownItems: applicationDropdownItems,
      active: location.pathname === "/applications"
    },
    { 
      name: "Why Sentorise", 
      href: "/why-sentorise",
      active: location.pathname === "/why-sentorise"
    },
    { 
      name: "Support", 
      href: "/support", 
      hasDropdown: true,
      dropdownItems: supportDropdownItems,
      active: location.pathname === "/support"
    },
    { name: "Blog", href: "/blog", active: location.pathname === "/blog" },
  ];

  const logoSrc = resolvedTheme === "dark" ? logoDark : logoLight;

  const toggleMobileSection = (name: string) => {
    setOpenMobileSection(openMobileSection === name ? null : name);
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
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                        link.active 
                          ? "text-primary" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 bg-popover border border-border">
                    {link.name === "Products" && (
                      <>
                        <DropdownMenuLabel className="text-xs text-muted-foreground uppercase">
                          Series
                        </DropdownMenuLabel>
                        {link.dropdownItems?.slice(0, 3).map((item) => (
                          <DropdownMenuItem key={item.name} asChild>
                            <Link to={item.href} className="flex flex-col items-start gap-0.5">
                              <span className="font-medium">{item.name}</span>
                              {'desc' in item && typeof (item as { desc?: string }).desc === 'string' && (
                                <span className="text-xs text-muted-foreground">{(item as { desc: string }).desc}</span>
                              )}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/products" className="font-medium">
                            View All Products
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    {link.name !== "Products" && link.dropdownItems?.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link to={item.href}>{item.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="w-5 h-5" />
            </Button>
            <CartDrawer />
            <ThemeToggle />
            <Button asChild variant="default" size="sm" className="ml-2">
              <Link to="/support#contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                link.hasDropdown ? (
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
                      {link.dropdownItems?.map((item: { name: string; href: string }) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block py-2 px-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
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
                <Button variant="default" className="w-full">
                  Contact Us
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
