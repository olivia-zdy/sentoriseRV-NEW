import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Michael Chen",
    role: "Homeowner, California",
    content:
      "The PowerWall Pro has completely transformed our home's energy independence. We haven't paid an electricity bill in months!",
    rating: 5,
    avatar: "MC",
  },
  {
    name: "Sarah Johnson",
    role: "RV Enthusiast",
    content:
      "The RV Freedom battery is perfect for off-grid adventures. Reliable, lightweight, and the app monitoring is fantastic.",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "David Park",
    role: "Business Owner",
    content:
      "We installed the Industrial BESS system last year. The ROI has been incredible with significant savings on peak demand charges.",
    rating: 5,
    avatar: "DP",
  },
];

const Testimonials = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Trusted by
            <br />
            <span className="text-gradient">Thousands Worldwide</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-card border border-border/50 card-hover"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground text-lg mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-energy-gradient flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
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
