import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, Shield, Award, Leaf, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const footerLinks = {
  products: [
    { name: "Lite Series", href: "/products?series=lite" },
    { name: "Core Series", href: "/products?series=core" },
    { name: "Plus Series", href: "/products?series=plus" },
    { name: "Compare", href: "/compare" },
  ],
  applications: [
    { name: "RV & Campervan", href: "/applications?scene=rv" },
    { name: "Marine & Boat", href: "/applications?scene=marine" },
    { name: "Solar & Off-Grid", href: "/applications?scene=solar" },
    { name: "View All", href: "/applications" },
  ],
  company: [
    { name: "About Us", href: "/why-sentorise" },
    { name: "Customer Stories", href: "/stories" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "Help Center", href: "/support#faq" },
    { name: "Downloads", href: "/support#downloads" },
    { name: "Register Warranty", href: "/warranty" },
    { name: "Warranty Policy", href: "/support#warranty" },
    { name: "Contact Us", href: "/support#contact" },
  ],
};

const certifications = [
  { name: "CE", icon: Award, description: "European Conformity" },
  { name: "UN38.3", icon: ShieldCheck, description: "Transport Certified" },
  { name: "RoHS", icon: Leaf, description: "Hazard-Free" },
  { name: "IEC 62619", icon: Shield, description: "Safety Standard" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

const Footer = () => {
  const { resolvedTheme } = useTheme();
  const logo = resolvedTheme === "dark" ? logoDark : logoLight;

  const handleSocialClick = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    toast.info(`Our ${name} page is coming soon!`);
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      {/* Brand Statement & Certifications */}
      <div className="border-b border-border">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Brand Statement */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Why We Built Sentorise
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We started Sentorise because we were tired of batteries that failed when it mattered most. 
                As RV and off-grid enthusiasts ourselves, we built the battery we wanted to buy: 
                safe, reliable, and backed by people who actually use them.
              </p>
            </div>
            
            {/* Certifications */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Certified & Compliant
              </p>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert) => (
                  <div 
                    key={cert.name}
                    className="flex items-center gap-2 px-3 py-2 bg-background rounded-lg border border-border"
                  >
                    <cert.icon className="w-4 h-4 text-primary" />
                    <div>
                      <span className="text-sm font-semibold text-foreground">{cert.name}</span>
                      <span className="text-xs text-muted-foreground ml-1 hidden sm:inline">
                        {cert.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="Sentorise" className="h-8" />
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Premium LiFePO₄ batteries for adventurers who demand reliability. 
              Designed in Europe, built for the world.
            </p>
            
            {/* Company Entity Info */}
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <p className="font-medium text-foreground">Sentorise Energy GmbH</p>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Friedrichstraße 123, 10117 Berlin, Germany</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:support@sentorise.com" className="hover:text-foreground">
                  support@sentorise.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+49 30 1234 5678</span>
              </div>
            </div>

            {/* VAT Info */}
            <p className="text-xs text-muted-foreground">
              VAT: DE123456789 | HRB 12345 B
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Applications */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Applications</h4>
            <ul className="space-y-2">
              {footerLinks.applications.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  onClick={(e) => handleSocialClick(e, social.name)} 
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors" 
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Sentorise Energy GmbH. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-foreground">Terms of Service</Link>
              <Link to="/support#warranty" className="hover:text-foreground">Warranty</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
