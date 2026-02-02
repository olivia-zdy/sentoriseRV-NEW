import { useState } from "react";
import { Play, RotateCcw, Image, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductMediaShowcaseProps {
  productId: string;
  productName: string;
  primaryImage: string;
  additionalImages?: string[];
  videoUrl?: string;
  has360View?: boolean;
}

// Product-specific media configurations
const productMediaConfig: Record<string, { 
  videoUrl?: string;
  has360View?: boolean;
  galleryImages?: string[];
  highlights?: { label: string; position: { top: string; left: string } }[];
}> = {
  "core-12v100-std": {
    has360View: true,
    highlights: [
      { label: "Smart BMS", position: { top: "30%", left: "20%" } },
      { label: "Bluetooth Module", position: { top: "45%", left: "75%" } },
      { label: "M8 Terminals", position: { top: "15%", left: "50%" } },
    ],
  },
  "plus-12v200-heated": {
    has360View: true,
    highlights: [
      { label: "Self-Heating System", position: { top: "60%", left: "25%" } },
      { label: "200A BMS", position: { top: "35%", left: "70%" } },
      { label: "Arctic-Rated Cells", position: { top: "50%", left: "50%" } },
    ],
  },
};

const ProductMediaShowcase = ({
  productId,
  productName,
  primaryImage,
  additionalImages = [],
  videoUrl,
  has360View,
}: ProductMediaShowcaseProps) => {
  const [activeTab, setActiveTab] = useState<"gallery" | "360" | "video">("gallery");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showHotspots, setShowHotspots] = useState(true);

  const config = productMediaConfig[productId] || {};
  const allImages = [primaryImage, ...additionalImages];
  const hasVideo = !!videoUrl || !!config.videoUrl;
  const supports360 = has360View ?? config.has360View;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <section className="section-padding bg-muted/30 border-y border-border">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Product Details
            </h2>
            <p className="text-muted-foreground">
              Explore the {productName} from every angle
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-2 mb-6">
            <Button
              variant={activeTab === "gallery" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("gallery")}
              className="gap-2"
            >
              <Image className="w-4 h-4" />
              Gallery
            </Button>
            {supports360 && (
              <Button
                variant={activeTab === "360" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("360")}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                360° View
              </Button>
            )}
            {hasVideo && (
              <Button
                variant={activeTab === "video" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("video")}
                className="gap-2"
              >
                <Play className="w-4 h-4" />
                Video
              </Button>
            )}
          </div>

          {/* Content Area */}
          <div className="relative aspect-[16/10] bg-card rounded-2xl border border-border overflow-hidden">
            {activeTab === "gallery" && (
              <div className="relative w-full h-full">
                {/* Main Image */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <img
                    src={allImages[currentImageIndex]}
                    alt={`${productName} - View ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Hotspots */}
                {showHotspots && config.highlights && currentImageIndex === 0 && (
                  <div className="absolute inset-0 pointer-events-none">
                    {config.highlights.map((hotspot, index) => (
                      <div
                        key={index}
                        className="absolute pointer-events-auto group"
                        style={{ top: hotspot.position.top, left: hotspot.position.left }}
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/80 border-2 border-white shadow-lg flex items-center justify-center cursor-pointer animate-pulse">
                          <span className="text-xs font-bold text-primary-foreground">
                            {index + 1}
                          </span>
                        </div>
                        <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/95 backdrop-blur border border-border rounded-lg px-3 py-1.5 shadow-lg whitespace-nowrap">
                          <span className="text-sm font-medium text-foreground">
                            {hotspot.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-background/80 backdrop-blur rounded-full text-sm text-muted-foreground">
                  {currentImageIndex + 1} / {allImages.length}
                </div>

                {/* Toggle Hotspots */}
                {config.highlights && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 bg-background/80"
                    onClick={() => setShowHotspots(!showHotspots)}
                  >
                    {showHotspots ? "Hide Labels" : "Show Labels"}
                  </Button>
                )}
              </div>
            )}

            {activeTab === "360" && supports360 && (
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <div className="relative">
                  <img
                    src={primaryImage}
                    alt={productName}
                    className="max-w-full max-h-[300px] object-contain opacity-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-background/90 backdrop-blur rounded-xl border border-border px-6 py-4 text-center">
                      <RotateCcw className="w-8 h-8 text-primary mx-auto mb-2 animate-spin-slow" />
                      <p className="text-sm font-medium text-foreground mb-1">
                        360° View Coming Soon
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Interactive 3D model in development
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "video" && hasVideo && (
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <div className="relative">
                  <img
                    src={primaryImage}
                    alt={productName}
                    className="max-w-full max-h-[300px] object-contain opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-background/90 backdrop-blur rounded-xl border border-border px-6 py-4 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Play className="w-8 h-8 text-primary ml-1" />
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Product Video Coming Soon
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Installation and feature walkthrough
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {allImages.length > 1 && activeTab === "gallery" && (
            <div className="mt-4 flex justify-center gap-2">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                    currentImageIndex === index
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductMediaShowcase;
