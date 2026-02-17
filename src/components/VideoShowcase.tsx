import { Play, Video, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoItem {
  title: string;
  description: string;
  thumbnail?: string;
  category: "unboxing" | "installation" | "testing" | "tutorial";
}

interface VideoShowcaseProps {
  productName: string;
  capacity: string;
  hasBluetooth?: boolean;
  hasHeating?: boolean;
}

const VideoShowcase = ({ productName, capacity, hasBluetooth, hasHeating }: VideoShowcaseProps) => {
  // Generate contextual video list based on product
  const videos: VideoItem[] = [
    {
      title: `${productName} Unboxing`,
      description: "What's in the box: battery, manual, warranty card, and mounting hardware.",
      category: "unboxing",
    },
    {
      title: `RV Installation: ${capacity} LiFePO₄`,
      description: "Complete step-by-step installation in a European motorhome battery compartment.",
      category: "installation",
    },
    {
      title: `Capacity Test: Real ${capacity} Discharge`,
      description: `Full discharge test at various loads. Measured vs rated ${capacity} performance.`,
      category: "testing",
    },
  ];

  if (hasBluetooth) {
    videos.push({
      title: "Bluetooth App Setup & Tour",
      description: "How to connect the Sentorise app, read live data, and configure alerts.",
      category: "tutorial",
    });
  }

  if (hasHeating) {
    videos.push({
      title: "Self-Heating Test at -15°C",
      description: "Cold chamber test demonstrating the automatic heating activation and charge cycle.",
      category: "testing",
    });
  }

  const categoryColors: Record<string, string> = {
    unboxing: "bg-blue-500/10 text-blue-600",
    installation: "bg-primary/10 text-primary",
    testing: "bg-amber-500/10 text-amber-600",
    tutorial: "bg-violet-500/10 text-violet-600",
  };

  const categoryLabels: Record<string, string> = {
    unboxing: "Unboxing",
    installation: "Installation",
    testing: "Testing",
    tutorial: "Tutorial",
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Video className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Video Guides</h2>
              <p className="text-sm text-muted-foreground">Watch before you buy or install</p>
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((video, index) => (
              <div
                key={index}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors"
              >
                {/* Thumbnail Placeholder */}
                <div className="relative aspect-video bg-muted/50 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Play className="w-7 h-7 ml-1" />
                  </div>
                  <span className={`absolute top-3 left-3 px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[video.category]}`}>
                    {categoryLabels[video.category]}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Videos are being produced. Subscribe to be notified when they're ready.
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Visit YouTube Channel
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
