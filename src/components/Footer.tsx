import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Linkedin, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { useTheme } from "next-themes";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";

const Footer = () => {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === "dark" ? logoDark : logoLight;

  const footerLinks = {
    Products: [
      { name: "Lite Series", href: "/products?series=lite" },
      { name: "Core Series", href: "/products?series=core" },
      { name: "Plus Series", href: "/products?series=plus" },
      { name: "All Batteries", href: "/products" },
    ],
    Applications: [
      { name: "RV & Motorhome", href: "/applications#rv" },
      { name: "Van Life", href: "/applications#vanlife" },
      { name: "Off-Grid Solar", href: "/applications#solar" },
      { name: "Marine", href: "/applications#marine" },
    ],
    Support: [
      { name: "Help Center", href: "/support" },
      { name: "Warranty", href: "/support#warranty" },
      { name: "Downloads", href: "/support#downloads" },
      { name: "Contact", href: "/support#contact" },
    ],
    Company: [
      { name: "Why Sentorise", href: "/why-sentorise" },
      { name: "Blog", href: "/blog" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Dealers", href: "/dealers" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const dtcFeatures = [
    { icon: Truck, label: "Free EU Shipping", desc: "Orders over €99" },
    { icon: RotateCcw, label: "30-Day Returns", desc: "Hassle-free" },
    { icon: ShieldCheck, label: "5-Year Warranty", desc: "Full coverage" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* DTC Features Bar */}
      <div className="border-b border-border">
        <div className="container-custom py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dtcFeatures.map((feature) => (
              <div key={feature.label} className="flex items-center gap-3 justify-center md:justify-start">
                <div className="icon-circle-glass-sm">
                  <feature.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{feature.label}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img 
                src={logoSrc} 
                alt="Sentorise" 
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs leading-relaxed">
              Premium LiFePO₄ batteries for RV, vanlife, and off-grid solar. 
              European quality. 5-year warranty.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="icon-circle-glass-sm"
                >
                  <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Sentorise. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
