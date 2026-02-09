import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  HelpCircle, 
  FileText, 
  Shield, 
  Mail, 
  Phone, 
  MessageCircle,
  Download,
  ExternalLink
} from "lucide-react";
import { glassIconClass } from "@/lib/utils";

const SupportPage = () => {
  const { t } = useTranslation();

  const supportCategories = [
    { icon: HelpCircle, titleKey: "support.helpCenter", descKey: "support.helpCenterDesc", link: "#faq" },
    { icon: FileText, titleKey: "support.downloads", descKey: "support.downloadsDesc", link: "#downloads" },
    { icon: Shield, titleKey: "support.warranty", descKey: "support.warrantyDesc", link: "#warranty" },
    { icon: MessageCircle, titleKey: "support.contactSupport", descKey: "support.contactSupportDesc", link: "#contact" },
  ];

  const quickLinks = [
    { nameKey: "support.bluetoothSetup", descKey: "support.bluetoothSetupDesc", href: "/bluetooth-guide" },
    { nameKey: "support.registerWarranty", descKey: "support.registerWarrantyDesc", href: "/warranty" },
    { nameKey: "support.batterySelector", descKey: "support.batterySelectorDesc", href: "/battery-selector" },
  ];

  const faqs = t('support.faqs', { returnObjects: true }) as Array<{ question: string; answer: string }>;
  const downloadDocs = [
    t('support.productDatasheets'),
    t('support.installationGuides'),
    t('support.certificationDocs'),
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title={t('support.pageTitle')} 
        description={t('support.pageSubtitle')} 
      />
      <AnnouncementBar />
      <Header />
      <PageTransition>
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-muted/50 border-b border-border">
          <div className="container-custom">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary">{t('common.home')}</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{t('nav.support')}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t('support.pageTitle')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t('support.pageSubtitle')}
            </p>
          </div>
        </section>

        {/* Support Categories */}
        <section className="section-padding">
          <div className="container-custom">
            <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportCategories.map((category) => (
                <a
                  key={category.titleKey}
                  href={category.link}
                  className="group p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className={`${glassIconClass} mb-4 group-hover:border-primary`}>
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t(category.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(category.descKey)}</p>
                </a>
              ))}
            </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
            <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
              <h3 className="font-semibold text-foreground mb-4">{t('support.quickLinks')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickLinks.map((link) => (
                  <Link 
                    key={link.nameKey}
                    to={link.href}
                    className="flex items-center justify-between p-3 bg-card rounded-lg border hover:border-primary/30 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{t(link.nameKey)}</p>
                      <p className="text-xs text-muted-foreground">{t(link.descKey)}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="section-padding bg-muted/30 border-y border-border">
          <div className="container-custom">
            <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t('support.faqTitle')}
              </h2>
              <p className="text-muted-foreground">
                {t('support.faqSubtitle')}
              </p>
            </div>
            </ScrollReveal>

            <div className="max-w-3xl mx-auto">
              <ScrollReveal delay={0.1}>
              <Accordion type="single" collapsible className="space-y-4">
                {Array.isArray(faqs) && faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="bg-card rounded-xl border border-border px-6 data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Downloads */}
        <section id="downloads" className="section-padding">
          <div className="container-custom">
            <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t('support.downloadsTitle')}
              </h2>
              <p className="text-muted-foreground">
                {t('support.downloadsSubtitle')}
              </p>
            </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {downloadDocs.map((doc) => (
                <div key={doc} className="p-6 bg-card rounded-xl border border-border text-center hover:border-primary/30 transition-colors">
                  <div className={`${glassIconClass} mx-auto mb-4`}>
                    <Download className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-4">{doc}</h3>
                  <Button variant="outline" size="sm">
                    {t('support.download')}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Warranty Section */}
        <section id="warranty" className="section-padding bg-muted/30 border-y border-border">
          <div className="container-custom">
            <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className={`${glassIconClass} mx-auto mb-6`}>
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t('support.warrantyTitle')}
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t('support.warrantyText')}
              </p>
              <Button>{t('support.registerProduct')}</Button>
            </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-padding bg-muted/30">
          <div className="container-custom">
            <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t('support.contactTitle')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('support.contactSubtitle')}
              </p>
            </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="bg-card p-6 md:p-8 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">{t('support.sendMessage')}</h3>
                <ContactForm />
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-card rounded-xl border border-border">
                  <Mail className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{t('support.emailSupport')}</h3>
                  <p className="text-muted-foreground">{t('support.emailAddress')}</p>
                  <p className="text-sm text-muted-foreground mt-2">{t('support.emailResponse')}</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <Phone className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{t('support.phoneSupport')}</h3>
                  <p className="text-muted-foreground">{t('support.phoneNumber')}</p>
                  <p className="text-sm text-muted-foreground mt-2">{t('support.phoneHours')}</p>
                </div>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default SupportPage;