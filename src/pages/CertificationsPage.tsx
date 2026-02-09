import { useTranslation } from "react-i18next";
import { Shield, Award, ShieldCheck, Leaf, Radio, Zap, FileCheck, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PageMeta from "@/components/PageMeta";
import ScrollReveal from "@/components/ScrollReveal";

const certifications = [
  {
    id: "ce",
    icon: Award,
    name: "CE",
    fullName: "European Conformity",
    description: "Meets EU safety, health, and environmental protection standards for products sold within the European Economic Area.",
  },
  {
    id: "ul",
    icon: ShieldCheck,
    name: "UL",
    fullName: "UL Listed",
    description: "Independently tested and certified by Underwriters Laboratories for safety compliance in North American markets.",
  },
  {
    id: "un383",
    icon: Shield,
    name: "UN38.3",
    fullName: "Transport Safety",
    description: "Passed all UN 38.3 transport safety tests including altitude simulation, thermal cycling, vibration, and shock.",
  },
  {
    id: "iec62619",
    icon: FileCheck,
    name: "IEC 62619",
    fullName: "Industrial Battery Safety",
    description: "Certified under IEC 62619 for secondary lithium cells and batteries used in industrial applications.",
  },
  {
    id: "rohs",
    icon: Leaf,
    name: "RoHS",
    fullName: "RoHS Compliant",
    description: "Restriction of Hazardous Substances — free from lead, mercury, cadmium, and other restricted materials.",
  },
  {
    id: "fcc",
    icon: Radio,
    name: "FCC",
    fullName: "FCC Certified",
    description: "Federal Communications Commission certified for electromagnetic compatibility on Bluetooth-enabled models.",
  },
];

const mediaPartners = [
  { name: "Börse", displayName: "Börse" },
  { name: "Le Figaro", displayName: "LE FIGARO" },
  { name: "Neozone", displayName: "NEOZONE" },
  { name: "Yahoo!", displayName: "yahoo!" },
  { name: "NewsBreak", displayName: "NEWSBREAK" },
  { name: "SBT Insight", displayName: "SBT Insight" },
  { name: "One News Page", displayName: "One News Page" },
  { name: "Alphens.nl", displayName: "Alphens.nl" },
  { name: "Nydus", displayName: "Nydus" },
  { name: "tz", displayName: "tz" },
];

const CertificationsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageMeta
        title="Certifications & Media — Sentorise"
        description="Sentorise LiFePO4 batteries are certified by CE, UL, UN38.3, IEC 62619, RoHS, and FCC. Featured in leading European and international media."
      />
      <Header />
      <PageTransition>
        <main>
          {/* Hero Section */}
          <section className="relative py-20 md:py-28 bg-gradient-to-b from-muted/60 to-background overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
            <div className="container-custom relative text-center">
              <ScrollReveal>
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
                  {t('certifications.badge', 'Quality & Compliance')}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  {t('certifications.title', 'Our Certifications')}
                </h1>
                <div className="w-12 h-1 bg-primary mx-auto mb-6" />
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('certifications.subtitle', 'Passed multiple technical certifications from internationally recognized testing organizations.')}
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* Certifications Grid */}
          <section className="py-16 md:py-24 bg-background">
            <div className="container-custom">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <ScrollReveal key={cert.id} delay={index * 0.08}>
                    <div className="group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <cert.icon className="w-7 h-7 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-foreground">{cert.name}</h3>
                            <CheckCircle className="w-4 h-4 text-primary" />
                          </div>
                          <p className="text-sm font-medium text-primary/80 mb-2">{cert.fullName}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Trust Stats */}
          <section className="py-16 bg-muted/40 border-y border-border">
            <div className="container-custom">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: "6+", label: t('certifications.statCerts', 'International Certifications') },
                  { value: "5", label: t('certifications.statWarranty', 'Year Warranty') },
                  { value: "50+", label: t('certifications.statTests', 'Safety Tests Passed') },
                  { value: "100%", label: t('certifications.statCompliance', 'EU Compliance') },
                ].map((stat, i) => (
                  <ScrollReveal key={stat.label} delay={i * 0.1}>
                    <div>
                      <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Media Coverage Section */}
          <section className="py-16 md:py-24 bg-background">
            <div className="container-custom text-center">
              <ScrollReveal>
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
                  {t('certifications.mediaBadge', 'Press & Media')}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t('certifications.mediaTitle', 'Media Coverage')}
                </h2>
                <div className="w-12 h-1 bg-primary mx-auto mb-6" />
                <p className="text-muted-foreground max-w-xl mx-auto mb-12">
                  {t('certifications.mediaSubtitle', 'Featured and referenced by leading European and international media outlets.')}
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {mediaPartners.map((partner, index) => (
                  <ScrollReveal key={partner.name} delay={index * 0.05}>
                    <div className="flex items-center justify-center h-20 px-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300">
                      <span className="text-lg font-bold text-foreground/70 group-hover:text-foreground transition-colors">
                        {partner.displayName}
                      </span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-muted/40 border-t border-border">
            <div className="container-custom text-center">
              <ScrollReveal>
                <Zap className="w-8 h-8 text-primary mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {t('certifications.ctaTitle', 'Need Certification Documents?')}
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                  {t('certifications.ctaDescription', 'Download official test reports and compliance certificates for your records or regulatory needs.')}
                </p>
                <a
                  href="/support#downloads"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  {t('certifications.ctaButton', 'Go to Downloads')}
                </a>
              </ScrollReveal>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
};

export default CertificationsPage;
