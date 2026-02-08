import { Link } from "react-router-dom";
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

const values = [
  {
    icon: Shield,
    title: "Safety-First Engineering",
    description: "Every Sentorise battery uses Grade-A LiFePO4 cells with multi-layer BMS protection against overcharge, over-discharge, short circuit, and thermal runaway.",
  },
  {
    icon: Award,
    title: "International Quality Standards",
    description: "CE certified, UN38.3 tested, FCC compliant, and meets IEC 62619 safety standards. Ready for European and American markets.",
  },
  {
    icon: Bluetooth,
    title: "Smart Monitoring",
    description: "Check battery status, voltage, current, temperature, and remaining capacity in real-time from our smartphone app via Bluetooth.",
  },
  {
    icon: Battery,
    title: "Long-Life Technology",
    description: "4000+ cycle lifespan — that's 4x longer than lead-acid batteries. Our LiFePO4 chemistry delivers consistent performance for 10+ years.",
  },
  {
    icon: Thermometer,
    title: "All-Weather Performance",
    description: "Built-in low-temperature protection prevents charging below freezing. Plus series includes self-heating for Arctic conditions.",
  },
  {
    icon: Leaf,
    title: "Sustainable Choice",
    description: "LiFePO4 is non-toxic and recyclable. Our eco-friendly paper-mold packaging reduces plastic waste. Power your adventures responsibly.",
  },
];

const differentiators = [
  "5-Year warranty on all products",
  "European DIN and BCI standard formats",
  "Bluetooth monitoring on most models",
  "Grade-A prismatic LiFePO4 cells",
  "Multi-layer BMS protection",
  "Low-temperature charge protection",
  "Self-heating available (Plus series)",
  "Eco-friendly packaging",
];

const markets = [
  { flag: "🇩🇪", country: "Germany", subtitle: "DIN Standards" },
  { flag: "🇫🇷", country: "France", subtitle: "CE Certified" },
  { flag: "🇬🇧", country: "United Kingdom", subtitle: "UK Approved" },
  { flag: "🇪🇺", country: "Nordic Countries", subtitle: "Arctic Ready" },
  { flag: "🇺🇸", country: "United States", subtitle: "BCI Compatible" },
  { flag: "🇨🇦", country: "Canada", subtitle: "Cold Climate Tested" },
];

const stats = [
  { icon: Users, end: 50000, suffix: "+", label: "Happy Customers" },
  { icon: Globe, end: 25, suffix: "+", label: "Countries Served" },
  { icon: Zap, end: 4000, suffix: "+", label: "Cycle Lifespan" },
  { icon: Heart, end: 98, suffix: "%", label: "Satisfaction Rate" },
];

const WhySentorisePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Why Sentorise" 
        description="Discover why Sentorise is the trusted choice for LiFePO4 batteries. Safety-first engineering, international standards, and sustainable technology."
      />
      <AnnouncementBar />
      <Header />
      <PageTransition>
      <main>
        {/* Hero Section with Background Image */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBattery})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
          
          <div className="container-custom relative z-10">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Why Sentorise</span>
            </nav>
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6">
                The Sentorise Difference
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Power Freedom,<br />
                <span className="text-primary">Not Just Capacity</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We're not just another battery seller. Sentorise is an energy brand 
                built for people who choose mobile, independent, and sustainable lifestyles. 
                Our batteries are designed to give you reliable power wherever you roam.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/products">
                    Explore Products
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/support">
                    Contact Us
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
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-foreground/10 mb-4">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-1">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm font-medium text-primary-foreground/80">
                    {stat.label}
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
                What SENTORISE Means
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Every Letter, A Commitment
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our name reflects the principles behind every product we design, test, and deliver — not slogans, but standards we build by.
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
                Our Philosophy
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Built for Reliability, Not Specs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-6 md:p-8 bg-card rounded-xl border border-border"
                >
                  <div className="icon-circle-glass mb-5">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
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
                  What Sets Us Apart
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  While others chase synthetic capacity metrics, we focus on what matters: 
                  reliability, safety, and real-world performance.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {differentiators.map((item, index) => (
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
                Our Journey
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                The Sentorise Story
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From a small workshop to a global energy brand — here's how we've grown while staying true to our mission.
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
                Global Reach, Local Standards
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Trusted Across Europe & America
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our batteries are specifically designed for European and American RV formats, camping culture, 
                and climate conditions — from Mediterranean summers to Nordic winters, from sunny California to snowy Canada.
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
