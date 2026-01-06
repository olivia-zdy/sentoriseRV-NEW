import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marcus Eriksson",
    role: "Van Life Enthusiast, Sweden",
    content:
      "The Core 100Ah has been powering our Sprinter for 8 months now. The Bluetooth monitoring is incredibly useful — I can check battery status from bed. Best investment for our van life journey.",
    rating: 5,
  },
  {
    name: "Sophie Laurent",
    role: "Off-Grid Homeowner, France",
    content:
      "We run our entire cabin on two Plus 200Ah batteries with solar. Even in French Alps winters, the self-heating feature keeps them charging. Absolutely reliable.",
    rating: 5,
  },
  {
    name: "Thomas Müller",
    role: "RV Dealer, Germany",
    content:
      "We've switched all our RV installations to Sentorise. The DIN H8 format fits perfectly in European motorhomes, and the 5-year warranty gives our customers peace of mind.",
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
            Real stories from RV owners, vanlifers, and off-grid enthusiasts across Europe.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 md:p-8 bg-card rounded-xl border border-border"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
