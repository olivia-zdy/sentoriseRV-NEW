import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Bluetooth, 
  Battery, 
  Leaf, 
  Award, 
  Clock, 
  Thermometer, 
  Zap,
  ArrowRight,
  Check
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Safety-First Engineering",
    description: "Every Sentorise battery uses Grade-A LiFePO4 cells with multi-layer BMS protection against overcharge, over-discharge, short circuit, and thermal runaway.",
  },
  {
    icon: Award,
    title: "European Quality Standards",
    description: "Designed for European RV and solar markets. CE certified, UN38.3 tested, and compliant with IEC 62619 safety standards.",
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

const WhySentorisePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-muted/50 border-b border-border">
          <div className="container-custom">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Why Sentorise</span>
            </nav>
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Power Freedom, <span className="text-primary">Not Just Capacity</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We're not just another battery seller. Sentorise is a European energy brand 
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
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
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

        {/* Target Markets */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
                Made for Europe
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Designed for European Adventures
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our batteries are specifically designed for European RV formats, camping culture, 
                and climate conditions — from Mediterranean summers to Nordic winters.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {["Germany", "France", "United Kingdom", "Nordic Countries"].map((country) => (
                <div key={country} className="p-6 bg-card rounded-xl border border-border">
                  <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="font-semibold text-foreground">{country}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default WhySentorisePage;
