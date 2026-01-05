import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marcus Eriksson",
    role: "Fleet Manager, Nordic Logistics",
    content:
      "The DIN H8 modules dropped right into our existing chassis rails. Zero modification required. The thermal logic has prevented any cold-weather failures across our entire fleet.",
    avatar: "ME",
  },
  {
    name: "Dr. Sarah Chen",
    role: "Systems Engineer, Marine Tech",
    content:
      "Finally, a LiFePO4 manufacturer that understands mechanical fitment. The vibration-rated terminals and IP65 enclosure have survived 18 months of offshore deployment.",
    avatar: "SC",
  },
  {
    name: "Thomas Müller",
    role: "Technical Director, RV Systems EU",
    content:
      "We've tested 47 different battery brands. Sentorise is the only one that delivers consistent voltage sag control under high-draw scenarios. The engineering is legitimate.",
    avatar: "TM",
  },
];

const Testimonials = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">03. Field Validation</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl headline-italic mb-16">
          <span className="text-foreground">Engineering</span>
          <br />
          <span className="text-primary">Testimonials.</span>
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 border border-border/30 bg-card/50 hover:border-primary/30 transition-colors"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/30 mb-6" />

              {/* Content */}
              <p className="text-foreground text-base mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border/30">
                <div className="w-12 h-12 bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">
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
