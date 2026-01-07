import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

// Static UGC-style content (would be replaced with real Instagram API integration)
const posts = [
  { id: 1, caption: "Morning coffee with a view", tag: "@vanlife_mike" },
  { id: 2, caption: "Off-grid in the mountains", tag: "@outdoor_sarah" },
  { id: 3, caption: "Solar setup complete", tag: "@rv_adventures" },
  { id: 4, caption: "Beach camping perfection", tag: "@coastal_nomad" },
  { id: 5, caption: "Winter camping ready", tag: "@nordic_camper" },
  { id: 6, caption: "Desert sunset vibes", tag: "@desert_explorer" },
];

const InstagramFeed = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Instagram className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">
              #SentorisePowered
            </span>
          </div>
          <p className="text-muted-foreground">
            Join our community of adventurers
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg border border-border overflow-hidden group relative cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                <Instagram className="w-8 h-8" />
              </div>
              <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3">
                <p className="text-xs text-primary-foreground text-center mb-1">
                  {post.caption}
                </p>
                <p className="text-[10px] text-primary-foreground/70">
                  {post.tag}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => window.open("https://instagram.com", "_blank")}
          >
            <Instagram className="w-4 h-4 mr-2" />
            Follow Us on Instagram
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
