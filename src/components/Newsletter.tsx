import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="section-padding bg-secondary/30 border-y border-border/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-widest mb-4 block">
                Technical Updates
              </span>
              <h2 className="text-3xl md:text-4xl headline-italic mb-4">
                <span className="text-foreground">Engineering</span>
                <br />
                <span className="text-primary">Bulletin.</span>
              </h2>
              <p className="text-muted-foreground">
                Get notified about new module releases, firmware updates, 
                and technical documentation.
              </p>
            </div>

            {/* Right - Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  required
                />
                <Button variant="hero" size="xl" type="submit" className="w-full">
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                We respect your data. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
