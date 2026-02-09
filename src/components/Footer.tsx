import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";
import { Mail, Facebook, Instagram, Youtube, Linkedin, Shield, Award, Leaf, ShieldCheck, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

const RegistrationsToggle = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <div className="text-xs text-muted-foreground mt-4">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1 font-medium text-foreground text-sm hover:text-primary transition-colors">
        {t('footer.registrations')}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="grid grid-cols-1 gap-1 mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <p>🇩🇪 VAT: DE456359817 · Tax: 15/386/85849</p>
          <p>🇩🇪 Packaging: DE3211405650846 · WEEE: 33736135</p>
          <p>🇫🇷 VAT: FR31989375530 · SIRET: 98937553000015</p>
          <p>🇫🇷 Packaging: FR451595_01YOLN · EORI: FRCN989375530</p>
          <p>🇳🇱 Battery: RL10007589</p>
          <p>🇬🇧 VAT: GB500901051 · EORI: GB500901051000</p>
        </div>
      )}
    </div>
  );
};

const Footer = () => {
  const { resolvedTheme } = useTheme();
  const { t } = useTranslation();
  const logo = resolvedTheme === "dark" ? logoDark : logoLight;

  const handleSocialClick = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    toast.info(`Our ${name} page is coming soon!`);
  };

  const certifications = [
    { name: "CE", icon: Award, description: t('footer.europeanConformity') },
    { name: "UN38.3", icon: ShieldCheck, description: t('footer.transportCertified') },
    { name: "RoHS", icon: Leaf, description: t('footer.hazardFree') },
    { name: "IEC 62619", icon: Shield, description: t('footer.safetyStandard') },
  ];

  const footerLinks = {
    products: [
      { name: t('footer.liteSeries'), href: "/products?series=lite" },
      { name: t('footer.coreSeries'), href: "/products?series=core" },
      { name: t('footer.plusSeries'), href: "/products?series=plus" },
      { name: t('footer.compareLabel'), href: "/compare" },
    ],
    applications: [
      { name: t('footer.rvCampervan'), href: "/applications?scene=rv" },
      { name: t('footer.marineBoat'), href: "/applications?scene=marine" },
      { name: t('footer.solarOffGrid'), href: "/applications?scene=solar" },
      { name: t('footer.viewAll'), href: "/applications" },
    ],
    company: [
      { name: t('footer.aboutUs'), href: "/why-sentorise" },
      { name: t('footer.customerStories'), href: "/stories" },
      { name: t('footer.blog'), href: "/blog" },
    ],
    support: [
      { name: t('footer.helpCenter'), href: "/support#faq" },
      { name: t('footer.bluetoothGuide'), href: "/bluetooth-guide" },
      { name: t('footer.downloadsLabel'), href: "/support#downloads" },
      { name: t('footer.registerWarranty'), href: "/warranty" },
      { name: t('footer.warrantyPolicy'), href: "/support#warranty" },
      { name: t('footer.returnsPolicy'), href: "/terms#returns" },
      { name: t('footer.contactUs'), href: "/support#contact" },
    ],
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      {/* Brand Statement & Certifications */}
      <div className="border-b border-border">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">{t('footer.whyBuilt')}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('footer.whyBuiltDesc')}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{t('footer.certifiedCompliant')}</p>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-center gap-2 px-3 py-2 bg-background rounded-lg border border-border">
                    <cert.icon className="w-4 h-4 text-primary" />
                    <div>
                      <span className="text-sm font-semibold text-foreground">{cert.name}</span>
                      <span className="text-xs text-muted-foreground ml-1 hidden sm:inline">{cert.description}</span>
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
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="Sentorise" width={110} height={32} className="h-8" />
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">{t('footer.companyDesc')}</p>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <p className="font-medium text-foreground">Sentorise Energy</p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:support@sentorise.com" className="hover:text-foreground">support@sentorise.com</a>
              </div>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p className="font-medium text-foreground text-sm">{t('footer.warehouses')}</p>
              <p>🇩🇪 Germany · 🇵🇱 Poland · 🇬🇧 United Kingdom</p>
            </div>
            <RegistrationsToggle />
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.products')}</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}><Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.applications')}</h4>
            <ul className="space-y-2">
              {footerLinks.applications.map((link) => (
                <li key={link.href}><Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}><Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href + link.name}><Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground">{link.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
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
            <p className="text-sm text-muted-foreground text-center">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground">{t('footer.privacyPolicy')}</Link>
              <Link to="/terms" className="hover:text-foreground">{t('footer.termsOfService')}</Link>
              <Link to="/terms#returns" className="hover:text-foreground">{t('footer.returns')}</Link>
              <Link to="/support#warranty" className="hover:text-foreground">{t('footer.warrantyLabel')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
