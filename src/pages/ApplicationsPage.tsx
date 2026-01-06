import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Home, Ship, Sun, Tent, Car } from "lucide-react";

const applications = [
  {
    id: "rv",
    icon: Truck,
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

const ApplicationsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
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

        {/* Applications Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((app) => (
                <a
                  key={app.id}
                  href={`#${app.id}`}
                  className="group p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <app.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{app.title}</h3>
                  <p className="text-sm text-muted-foreground">{app.tagline}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Sections */}
        {applications.map((app, index) => (
          <section
            key={app.id}
            id={app.id}
            className={`section-padding ${index % 2 === 0 ? 'bg-muted/30' : 'bg-background'} border-t border-border`}
          >
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <app.icon className="w-8 h-8 text-primary" />
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
                    <Link to="/products">
                      View Recommended Products
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>

                <div className={`aspect-video bg-muted rounded-xl ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {/* Placeholder for application image */}
                  <div className="w-full h-full flex items-center justify-center">
                    <app.icon className="w-24 h-24 text-muted-foreground/30" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationsPage;
