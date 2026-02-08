import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { glassIconClassSm } from "@/lib/utils";
import ScrollReveal from "@/components/ScrollReveal";

const testimonials = [
  {
    name: "Marcus Eriksson",
    role: "Van Life Enthusiast",
    location: "Sweden",
    content:
      "The Core 100Ah has been powering our Sprinter for 8 months now. The Bluetooth monitoring is incredibly useful — I can check battery status from bed. Best investment for our van life journey.",
    rating: 5,
  },
  {
    name: "Sophie Laurent",
    role: "Off-Grid Homeowner",
    location: "France",
    content:
      "We run our entire cabin on two Plus 200Ah batteries with solar. Even in French Alps winters, the self-heating feature keeps them charging. Absolutely reliable.",
    rating: 5,
  },
  {
    name: "Thomas Müller",
    role: "RV Dealer",
    location: "Germany",
    content:
      "We've switched all our RV installations to Sentorise. The DIN H8 format fits perfectly in European motorhomes, and the 5-year warranty gives our customers peace of mind.",
    rating: 5,
  },
  {
    name: "Emma van der Berg",
    role: "Sailboat Owner",
    location: "Netherlands",
    content:
      "Our sailboat's electrical system has never been more reliable. The Core 100Ah handles the trolling motor, navigation, and cabin lights without breaking a sweat!",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Solar Installer",
    location: "United Kingdom",
    content:
      "The efficiency is remarkable. We're getting nearly 95% round-trip efficiency, compared to maybe 80% with lead-acid. That's significant for off-grid setups.",
    rating: 5,
  },
  {
    name: "Anna Johansen",
    role: "Camping Enthusiast",
    location: "Norway",
    content:
      "The Lite 50Ah is the perfect companion for our camping trips. Light enough to carry, powerful enough to run our portable fridge for a week in the wilderness.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl headline-clean text-foreground mb-4">
            Trusted by Adventurers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from RV owners, vanlifers, and off-grid enthusiasts across Europe & America.
          </p>
        </div>

        {/* Testimonials Grid - 2 rows of 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.08}>
            <div
              className="group p-6 md:p-8 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all h-full"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed line-clamp-4">
                "{testimonial.content}"
              </p>

              {/* Author with glass avatar */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className={glassIconClassSm}>
                  <span className="text-primary font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Link to Stories Page */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link to="/stories">
              Read More Customer Stories
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
