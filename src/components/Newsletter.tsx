import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Stay Updated
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Join Our
            <br />
            <span className="text-gradient">Newsletter</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Get exclusive offers, product updates, and energy-saving tips 
            delivered straight to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button variant="hero" size="xl" type="submit">
              Subscribe
              <Send className="w-5 h-5" />
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
