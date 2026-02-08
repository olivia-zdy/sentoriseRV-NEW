import { useState } from "react";
import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import PageMeta from "@/components/PageMeta";
import PageTransition from "@/components/PageTransition";
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

const applications = [
  {
    id: "rv",
    icon: Truck,
    image: rvScene,
    title: "RV & Motorhome",
    tagline: "The heart of your home on wheels",
    description: "Whether you're a weekend warrior or full-time RVer, Sentorise batteries provide reliable power for all your onboard systems — from lights and refrigerators to air conditioning and entertainment.",
    benefits: [
      "Drop-in replacement for lead-acid batteries",
      "50% lighter than equivalent lead-acid",
      "No maintenance required",
      "Safe for indoor installation",
      "Bluetooth monitoring from inside your RV",
    ],
    recommendedProducts: ["Core 12V 100Ah Standard", "Core 12V 100Ah DIN H8", "Plus 12V 200Ah Heated"],
  },
  {
    id: "vanlife",
    icon: Car,
    image: vanScene,
    title: "Van Life",
    tagline: "Freedom in a compact package",
    description: "Van conversions demand maximum power in minimum space. Our compact Core MINI and Lite series deliver serious energy density for Sprinters, Transits, and other popular van platforms.",
    benefits: [
      "Ultra-compact designs for tight spaces",
      "Lightweight for better fuel economy",
      "Silent operation — no venting required",
      "Works with all popular solar controllers",
      "5-year warranty for peace of mind",
    ],
    recommendedProducts: ["Core 12V 100Ah MINI", "Lite 12V 50Ah Lightweight", "Core 12V 100Ah Standard"],
  },
  {
    id: "solar",
    icon: Sun,
    image: solarScene,
    title: "Off-Grid Solar",
    tagline: "Store the sun's energy",
    description: "Build a reliable off-grid power system with Sentorise batteries. Our deep-cycle LiFePO4 technology maximizes solar harvest and delivers consistent power day and night.",
    benefits: [
      "4000+ cycle lifespan",
      "95%+ round-trip efficiency",
      "Full depth of discharge capability",
      "Parallel connection for more capacity",
      "Works with Victron, MPPT, and hybrid inverters",
    ],
    recommendedProducts: ["Plus 12V 200Ah Heated", "Core 12V 100Ah Standard", "Core 12V 100Ah DIN H8"],
  },
  {
    id: "marine",
    icon: Ship,
    image: marineScene,
    title: "Marine & Boat",
    tagline: "Power your adventures on the water",
    description: "Sentorise batteries handle the demands of marine environments — powering trolling motors, fish finders, and cabin systems with reliable, maintenance-free performance.",
    benefits: [
      "Vibration-resistant construction",
      "IP-rated enclosures available",
      "No acid spills or fumes",
      "Consistent voltage under load",
      "Lightweight for better boat performance",
    ],
    recommendedProducts: ["Core 12V 100Ah Standard", "Lite 12V 50Ah Lightweight"],
  },
  {
    id: "camping",
    icon: Tent,
    image: campScene,
    title: "Camping & Outdoor",
    tagline: "Portable power for any adventure",
    description: "From weekend camping trips to extended backcountry expeditions, our Lite series provides reliable portable power for lights, phones, cameras, and small appliances.",
    benefits: [
      "Ultra-lightweight and portable",
      "Works with portable solar panels",
      "Powers camping lights, fans, and chargers",
      "Long shelf life — ready when you need it",
      "Compact enough for backpacking basecamp",
    ],
    recommendedProducts: ["Lite 12V 6Ah Ultra-Compact", "Lite 12V 50Ah Lightweight"],
  },
  {
    id: "cabin",
    icon: Home,
    image: cabinScene,
    title: "Off-Grid Cabin",
    tagline: "Independent living, reliable power",
    description: "Power your remote cabin or holiday home with a complete off-grid system. Sentorise batteries store solar energy for lighting, water pumps, refrigeration, and more.",
    benefits: [
      "High capacity for whole-cabin power",
      "Self-heating for cold climates",
      "Low maintenance — set and forget",
      "Expandable with parallel connections",
      "10+ year expected lifespan",
    ],
    recommendedProducts: ["Plus 12V 200Ah Heated", "Core 12V 100Ah Standard"],
  },
];

type ApplicationFilter = "all" | "rv" | "vanlife" | "solar" | "marine" | "camping" | "cabin";

const ApplicationsPage = () => {
  const [activeFilter, setActiveFilter] = useState<ApplicationFilter>("all");

  const filteredApplications = activeFilter === "all" 
    ? applications 
    : applications.filter(app => app.id === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Applications | Sentorise LiFePO₄ Batteries"
        description="Discover the right Sentorise battery for your RV, van, off-grid solar, marine, or camping setup. Real-world application guides and product recommendations."
      />
      <AnnouncementBar />
      <Header />
      <PageTransition>
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-muted/50 border-b border-border">
          <div className="container-custom">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Applications</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Power Every Adventure
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              From weekend camping to full-time off-grid living, Sentorise batteries 
              deliver reliable power for every lifestyle and application.
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
                All Applications
              </Button>
              {applications.map((app) => (
                <Button
                  key={app.id}
                  variant={activeFilter === app.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(app.id as ApplicationFilter)}
                  className="gap-2"
                >
                  <app.icon className="w-4 h-4" />
                  {app.title}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Applications Grid - Quick Entry Points */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApplications.map((app) => (
                <a
                  key={app.id}
                  href={`#${app.id}`}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden"
                >
                  {/* Background Image */}
                  <img 
                    src={app.image}
                    alt={app.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className={`${glassIconClass} mb-4 w-12 h-12`}>
                      <app.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{app.title}</h3>
                    <p className="text-sm text-white/80">{app.tagline}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Sections */}
        {filteredApplications.map((app, index) => (
          <section
            key={app.id}
            id={app.id}
            className={`section-padding ${index % 2 === 0 ? 'bg-muted/30' : 'bg-background'} border-t border-border`}
          >
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={glassIconClass}>
                      <app.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                      {app.title}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {app.tagline}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {app.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {app.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild>
                    <Link to={`/products?application=${app.id}`}>
                      View Recommended Products
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>

                <div className={`aspect-video rounded-xl overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img 
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}

        <Newsletter />
      </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default ApplicationsPage;
