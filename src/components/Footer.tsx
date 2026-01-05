import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Products: [
      { name: "DIN H8 Modules", href: "#" },
      { name: "BCI 31 Series", href: "#" },
      { name: "48V Systems", href: "#" },
      { name: "Marine Grade", href: "#" },
    ],
    Applications: [
      { name: "Automotive", href: "#" },
      { name: "Marine", href: "#" },
      { name: "RV & Camper", href: "#" },
      { name: "Industrial", href: "#" },
    ],
    Support: [
      { name: "Help Center", href: "#" },
      { name: "Datasheets", href: "#" },
      { name: "Warranty", href: "#" },
      { name: "Contact", href: "#" },
    ],
    Company: [
      { name: "About Sentorise", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Press", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Youtube, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  return (
    <footer id="contact" className="bg-card border-t border-border/30">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-black text-foreground tracking-tight">
                SENTORISE
              </span>
              <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L8 6H2V8L6 12L2 16V18H8L12 22L16 18H22V16L18 12L22 8V6H16L12 2Z" />
              </svg>
            </a>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs leading-relaxed">
              Modular LiFePO4 architecture designed for mechanical fitment 
              and thermal logic validation.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 Sentorise Green Energy. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
