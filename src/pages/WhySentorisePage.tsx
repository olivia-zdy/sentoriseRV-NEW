import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageTransition from "@/components/PageTransition";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import BrandAcronym from "@/components/BrandAcronym";
import BrandTimeline from "@/components/BrandTimeline";
import AnimatedCounter from "@/components/AnimatedCounter";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Bluetooth, 
  Battery, 
  Leaf, 
  Award, 
  Thermometer, 
  ArrowRight,
  Check,
  Users,
  Globe,
  Zap,
  Heart
} from "lucide-react";
import heroBattery from "@/assets/hero-battery.jpg";

const valueKeys = [
  { key: "safety", icon: Shield },
  { key: "quality", icon: Award },
  { key: "smart", icon: Bluetooth },
  { key: "longLife", icon: Battery },
  { key: "weather", icon: Thermometer },
  { key: "sustainable", icon: Leaf },
];

const markets = [
  { flag: "🇩🇪", country: "Germany", subtitle: "DIN Standards" },
  { flag: "🇫🇷", country: "France", subtitle: "CE Certified" },
  { flag: "🇬🇧", country: "United Kingdom", subtitle: "UK Approved" },
  { flag: "🇪🇺", country: "Nordic Countries", subtitle: "Arctic Ready" },
  { flag: "🇺🇸", country: "United States", subtitle: "BCI Compatible" },
  { flag: "🇨🇦", country: "Canada", subtitle: "Cold Climate Tested" },
];

const statKeys = [
  { icon: Users, end: 50000, suffix: "+", labelKey: "happyCustomers" },
  { icon: Globe, end: 25, suffix: "+", labelKey: "countriesServed" },
  { icon: Zap, end: 4000, suffix: "+", labelKey: "cycleLifespan" },
  { icon: Heart, end: 98, suffix: "%", labelKey: "satisfactionRate" },
];

const WhySentorisePage = () => {
  const { t } = useTranslation();
  const differentiators = t('whySentorise.differentiators', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title={t('nav.whySentorise')} 
        description={t('whySentorise.heroSubtitle')}
      />
      <AnnouncementBar />
      <Header />
      <PageTransition>
      <main>
        {/* Hero Section with Background Image */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBattery})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
          
          <div className="container-custom relative z-10">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary">{t('common.home')}</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{t('nav.whySentorise')}</span>
            </nav>
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6">
                {t('whySentorise.badge')}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {t('whySentorise.heroTitle1')}<br />
                <span className="text-primary">{t('whySentorise.heroTitle2')}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t('whySentorise.heroSubtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/products">
                    {t('whySentorise.exploreProducts')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/support">
                    {t('whySentorise.contactUs')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Stats Section */}
        <section className="py-12 md:py-16 bg-primary">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {statKeys.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-foreground/10 mb-4">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-1">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm font-medium text-primary-foreground/80">
                    {t(`whySentorise.${stat.labelKey}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Acronym Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-10">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
                {t('whySentorise.acronymLabel')}
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {t('whySentorise.acronymTitle')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('whySentorise.acronymSubtitle')}
              </p>
            </div>
            <BrandAcronym />
          </div>
        </section>

        {/* Values Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
                {t('whySentorise.philosophyLabel')}
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                {t('whySentorise.philosophyTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {valueKeys.map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className="p-6 md:p-8 bg-card rounded-xl border border-border"
                >
                  <div className="icon-circle-glass mb-5">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {t(`whySentorise.values.${key}.title`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`whySentorise.values.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="section-padding bg-primary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
                  {t('whySentorise.differentiatorTitle')}
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  {t('whySentorise.differentiatorSubtitle')}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.isArray(differentiators) && differentiators.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary-foreground shrink-0" />
                    <span className="text-primary-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Brand Timeline Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
                {t('whySentorise.journeyLabel')}
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {t('whySentorise.journeyTitle')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('whySentorise.journeySubtitle')}
              </p>
            </div>
            <BrandTimeline />
          </div>
        </section>

        {/* Target Markets */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
                {t('whySentorise.marketsLabel')}
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {t('whySentorise.marketsTitle')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('whySentorise.marketsSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {markets.map((market) => (
                <div 
                  key={market.country} 
                  className="p-5 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 hover:bg-card transition-all duration-300 group"
                >
                  <div className="text-4xl mb-3 text-center group-hover:scale-110 transition-transform duration-300">
                    {market.flag}
                  </div>
                  <p className="font-semibold text-foreground text-center text-sm mb-1">
                    {market.country}
                  </p>
                  <p className="text-xs text-muted-foreground text-center">
                    {market.subtitle}
                  </p>
                </div>
              ))}
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

export default WhySentorisePage;
