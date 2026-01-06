import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="section-padding bg-primary">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="w-12 h-12 text-primary-foreground/80 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Get the latest product releases, technical guides, and exclusive offers 
            delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-primary-foreground text-foreground placeholder:text-muted-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
              required
            />
            <Button 
              type="submit" 
              variant="secondary"
              className="group px-6"
            >
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
          
          <p className="text-xs text-primary-foreground/60 mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
