import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Newsletter from "@/components/Newsletter";
import PageMeta from "@/components/PageMeta";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import FAQSchema from "@/components/SEO/FAQSchema";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Home, Ship, Sun, Tent, Car } from "lucide-react";
import { glassIconClass } from "@/lib/utils";

// Import dedicated scene images
import rvScene from "@/assets/scene-rv.jpg";
import vanScene from "@/assets/scene-vanlife.jpg";
import solarScene from "@/assets/scene-solar.jpg";
import marineScene from "@/assets/scene-marine.jpg";
import campScene from "@/assets/scene-camping.jpg";
import cabinScene from "@/assets/scene-cabin.jpg";

const applicationIds = ["rv", "vanlife", "solar", "marine", "camping", "cabin"] as const;

const applicationIcons: Record<string, typeof Truck> = {
  rv: Truck,
  vanlife: Car,
  solar: Sun,
  marine: Ship,
  camping: Tent,
  cabin: Home,
};

const applicationImages: Record<string, string> = {
  rv: rvScene,
  vanlife: vanScene,
  solar: solarScene,
  marine: marineScene,
  camping: campScene,
  cabin: cabinScene,
};

const recommendedProducts: Record<string, string[]> = {
  rv: ["Core 12V 100Ah Standard", "Core 12V 100Ah DIN H8", "Plus 12V 200Ah Heated"],
  vanlife: ["Core 12V 100Ah MINI", "Lite 12V 50Ah Lightweight", "Core 12V 100Ah Standard"],
  solar: ["Plus 12V 200Ah Heated", "Core 12V 100Ah Standard", "Core 12V 100Ah DIN H8"],
  marine: ["Core 12V 100Ah Standard", "Lite 12V 50Ah Lightweight"],
  camping: ["Lite 12V 6Ah Ultra-Compact", "Lite 12V 50Ah Lightweight"],
  cabin: ["Plus 12V 200Ah Heated", "Core 12V 100Ah Standard"],
};

type ApplicationFilter = "all" | typeof applicationIds[number];

const ApplicationsPage = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<ApplicationFilter>("all");

  const filteredIds = activeFilter === "all" 
    ? [...applicationIds] 
    : applicationIds.filter(id => id === activeFilter);

  const faqs = t('applications.faqs', { returnObjects: true }) as Array<{ question: string; answer: string }>;

  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title={`${t('nav.applications')} | Sentorise LiFePO₄`}
        description={t('applications.pageSubtitle')}
      />
      <FAQSchema faqs={Array.isArray(faqs) ? faqs : []} />
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
              <span className="text-foreground">{t('nav.applications')}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t('applications.pageTitle')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t('applications.pageSubtitle')}
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-6 border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-md z-30">
          <div className="container-custom">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("all")}
              >
                {t('applications.allApplications')}
              </Button>
              {applicationIds.map((id) => {
                const Icon = applicationIcons[id];
                return (
                  <Button
                    key={id}
                    variant={activeFilter === id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(id)}
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {t(`applications.${id}.title`)}
                  </Button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Applications Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIds.map((id, index) => {
                const Icon = applicationIcons[id];
                return (
                  <ScrollReveal key={id} delay={index * 0.08}>
                  <a
                    href={`#${id}`}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden block"
                  >
                    <img 
                      src={applicationImages[id]}
                      alt={t(`applications.${id}.title`)}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className={`${glassIconClass} mb-4 w-12 h-12`}>
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{t(`applications.${id}.title`)}</h3>
                      <p className="text-sm text-white/80">{t(`applications.${id}.tagline`)}</p>
                    </div>
                  </a>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Sections */}
        {filteredIds.map((id, index) => {
          const Icon = applicationIcons[id];
          const benefits = t(`applications.${id}.benefits`, { returnObjects: true }) as string[];
          return (
            <section
              key={id}
              id={id}
              className={`section-padding ${index % 2 === 0 ? 'bg-muted/30' : 'bg-background'} border-t border-border`}
            >
              <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={glassIconClass}>
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                        {t(`applications.${id}.title`)}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {t(`applications.${id}.tagline`)}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {t(`applications.${id}.description`)}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {Array.isArray(benefits) && benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <Button asChild>
                      <Link to={`/products?application=${id}`}>
                        {t('applications.viewRecommended')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>

                  <div className={`aspect-video rounded-xl overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <img 
                      src={applicationImages[id]}
                      alt={t(`applications.${id}.title`)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* FAQ Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {t('applications.faqTitle')}
                </h2>
                <p className="text-muted-foreground">
                  {t('applications.faqSubtitle')}
                </p>
              </div>
              </ScrollReveal>

              <ScrollReveal>
              <Accordion type="single" collapsible className="space-y-3">
                {Array.isArray(faqs) && faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="border border-border rounded-lg px-6 bg-card"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default ApplicationsPage;