import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
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
    { name: "Warranty", href: "/support#warranty" },
    { name: "Contact Us", href: "/support#contact" },
  ],
};

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
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="Sentorise" className="h-8" />
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Premium LiFePO4 batteries for adventurers who demand reliability.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@sentorise.com" className="hover:text-foreground">info@sentorise.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+49 123 456 7890</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Berlin, Germany</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Applications</h4>
            <ul className="space-y-2">
              {footerLinks.applications.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} onClick={(e) => handleSocialClick(e, social.name)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors" aria-label={social.name}>
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center">© {new Date().getFullYear()} Sentorise. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
