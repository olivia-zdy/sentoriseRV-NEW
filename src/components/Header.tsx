import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, ChevronDown, Zap } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/", active: location.pathname === "/" },
    { 
      name: "Products", 
      href: "/products", 
      hasDropdown: true,
      active: location.pathname.startsWith("/products")
    },
    { 
      name: "Applications", 
      href: "/applications", 
      hasDropdown: true,
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
      active: location.pathname === "/support"
    },
    { name: "Blog", href: "/blog", active: location.pathname === "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              <span className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                SENTORISE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  link.active 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown className="w-3 h-3" />}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <ThemeToggle />
            <Button variant="default" size="sm" className="ml-2">
              Contact Us
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
                  {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
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
