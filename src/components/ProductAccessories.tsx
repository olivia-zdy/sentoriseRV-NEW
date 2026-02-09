import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useCartStore, ShopifyProduct } from "@/stores/cartStore";
import charger20aImg from "@/assets/accessory-charger-20a.webp";
import batteryMonitorTr24Img from "@/assets/accessory-battery-monitor-tr24.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  ShoppingCart, 
  Plus,
  Check,
  X,
  Package,
  Zap,
  Cable,
  Gauge,
  Shield,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  Wrench
} from "lucide-react";
import { toast } from "sonner";

interface Accessory {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "cable" | "charger" | "monitor" | "protection" | "mounting";
  compatibility: string[];
  inStock: boolean;
  badge?: string;
}

// Accessory catalog - in production, this would come from Shopify
const accessories: Accessory[] = [
  {
    id: "SENT-CHG-14V6-20A-WP",
    name: "20A LiFePO₄ Charger – Waterproof",
    description: "14.6V 20A fast charger with fully potted waterproof design, 0V wake-up function, and multi-layer protection. EU plug.",
    price: 149.99,
    originalPrice: 149.99,
    image: charger20aImg,
    category: "charger",
    compatibility: ["core-12v100-std", "core-12v100-mini", "core-12v100-din", "plus-12v200-heated"],
    inStock: false,
    badge: "Pre-order"
  },
  {
    id: "SENT-METER-500A-BT-WP",
    name: "TR24 IP68 Battery Monitor",
    description: "500A M8 shunt coulomb counter, 8–100V wide voltage, IP68 waterproof, Bluetooth connectivity.",
    price: 89.99,
    image: batteryMonitorTr24Img,
    category: "monitor",
    compatibility: ["all"],
    inStock: true,
  },
  {
    id: "acc-cable-anderson",
    name: "Anderson SB50 Cable Set",
    description: "Heavy-duty 50A rated Anderson connectors with 1.5m cable length. Perfect for RV and solar installations.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    category: "cable",
    compatibility: ["all"],
    inStock: true,
    badge: "Popular"
  },
  {
    id: "acc-fuse-holder",
    name: "ANL Fuse Holder + 100A Fuse",
    description: "Class T fuse with waterproof holder. Essential protection for your battery system.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1621570169673-9f8b8b8f8f8f?w=300&h=300&fit=crop",
    category: "protection",
    compatibility: ["all"],
    inStock: true,
  },
  {
    id: "acc-terminal-kit",
    name: "Battery Terminal & Cable Kit",
    description: "Marine-grade terminals with heat-shrink boots. Includes M8 bolts and ring terminals.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    category: "cable",
    compatibility: ["all"],
    inStock: true,
  },
  {
    id: "acc-bus-bar",
    name: "Power Distribution Bus Bar",
    description: "4-way positive/negative bus bar set. Simplify multi-battery or multi-load wiring.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1621570169673-9f8b8b8f8f8f?w=300&h=300&fit=crop",
    category: "mounting",
    compatibility: ["core-12v100-std", "core-12v100-mini", "core-12v100-din", "plus-12v200-heated"],
    inStock: true,
  },
];

interface BundleOption {
  id: string;
  name: string;
  description: string;
  accessories: string[];
  discountPercent: number;
  forProducts: string[];
  // Enhanced fields for comparison
  tier: "starter" | "complete" | "pro";
  tagline: string;
  bestFor: string;
  highlights: string[];
  limitations: string[];
  isRecommended?: boolean;
  icon: React.ElementType;
}

const bundles: BundleOption[] = [
  {
    id: "bundle-starter",
    name: "Starter Bundle",
    tagline: "Get Started",
    description: "Essential accessories to get your battery system running safely.",
    accessories: ["acc-cable-anderson", "acc-fuse-holder", "acc-terminal-kit"],
    discountPercent: 15,
    forProducts: ["all"],
    tier: "starter",
    bestFor: "DIY beginners & basic wiring setups",
    highlights: [
      "Anderson cable set",
      "100A fuse protection",
      "Terminal kit"
    ],
    limitations: [
      "No charger included",
      "No monitoring"
    ],
    isRecommended: false,
    icon: Wrench,
  },
  {
    id: "bundle-complete",
    name: "Complete Bundle",
    tagline: "Most Popular",
    description: "Everything you need for a professional installation.",
    accessories: ["SENT-CHG-14V6-20A-WP", "acc-cable-anderson", "acc-fuse-holder", "SENT-METER-500A-BT-WP", "acc-terminal-kit"],
    discountPercent: 20,
    forProducts: ["core-12v100-std", "core-12v100-mini", "core-12v100-din"],
    tier: "complete",
    bestFor: "Full RV or solar installation",
    highlights: [
      "20A waterproof charger",
      "TR24 battery monitor w/ 500A shunt",
      "All Starter items included"
    ],
    limitations: [
      "No bus bar for multi-battery"
    ],
    isRecommended: true,
    icon: Star,
  },
  {
    id: "bundle-pro",
    name: "Pro Bundle",
    tagline: "Full System",
    description: "High-capacity setup with advanced monitoring and protection.",
    accessories: ["SENT-CHG-14V6-20A-WP", "SENT-METER-500A-BT-WP", "acc-fuse-holder", "acc-bus-bar"],
    discountPercent: 20,
    forProducts: ["plus-12v200-heated"],
    tier: "pro",
    bestFor: "200Ah+ systems & multi-battery banks",
    highlights: [
      "20A high-power charger",
      "Advanced monitoring",
      "Distribution bus bar",
      "Full protection suite"
    ],
    limitations: [],
    isRecommended: false,
    icon: Users,
  },
];

const categoryIcons = {
  cable: Cable,
  charger: Zap,
  monitor: Gauge,
  protection: Shield,
  mounting: Package,
};

const categoryLabels = {
  cable: "Cables & Connectors",
  charger: "Chargers",
  monitor: "Monitoring",
  protection: "Protection",
  mounting: "Mounting & Enclosures",
};

// Bundle Comparison Card Component
interface BundleComparisonCardProps {
  bundle: BundleOption;
  prices: { original: number; discounted: number };
  bundleItems: Accessory[];
  isAdding: boolean;
  onAdd: () => void;
  isMobile: boolean;
}

const BundleComparisonCard = ({ 
  bundle, 
  prices, 
  bundleItems, 
  isAdding, 
  onAdd, 
  isMobile 
}: BundleComparisonCardProps) => {
  const IconComponent = bundle.icon;
  
  return (
    <Card 
      className={`relative flex flex-col ${
        isMobile ? 'min-w-[80vw] snap-center' : ''
      } ${
        bundle.isRecommended 
          ? 'border-2 border-primary ring-2 ring-primary/20' 
          : 'border-border'
      } transition-all hover:shadow-lg`}
    >
      {/* Recommended Badge */}
      {bundle.isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-primary text-primary-foreground px-3 py-1 shadow-md">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {bundle.tagline}
          </Badge>
        </div>
      )}
      
      {/* Discount Badge */}
      <Badge 
        className={`absolute top-3 right-3 ${
          bundle.isRecommended ? 'bg-primary' : 'bg-secondary'
        }`}
      >
        Save {bundle.discountPercent}%
      </Badge>
      
      <CardHeader className={`pb-2 ${bundle.isRecommended ? 'pt-6' : 'pt-4'}`}>
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            bundle.isRecommended ? 'bg-primary/10' : 'bg-muted'
          }`}>
            <IconComponent className={`w-4 h-4 ${
              bundle.isRecommended ? 'text-primary' : 'text-muted-foreground'
            }`} />
          </div>
          <div>
            <h4 className="font-bold text-foreground">{bundle.name}</h4>
            {!bundle.isRecommended && (
              <span className="text-xs text-muted-foreground">{bundle.tagline}</span>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col pt-0">
        {/* Best For */}
        <div className="bg-muted/50 rounded-lg px-3 py-2 mb-4">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Best for: </span>
            {bundle.bestFor}
          </p>
        </div>
        
        {/* Highlights - What's included */}
        <div className="flex-1 space-y-2 mb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            What's included
          </p>
          <ul className="space-y-1.5">
            {bundle.highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Limitations - What's NOT included */}
        {bundle.limitations.length > 0 && (
          <div className="space-y-2 mb-4 pb-4 border-b border-border">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Not included
            </p>
            <ul className="space-y-1.5">
              {bundle.limitations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <X className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              €{prices.discounted.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              €{prices.original.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {bundleItems.length} items included
          </p>
        </div>
        
        {/* CTA Button */}
        <Button 
          className="w-full"
          variant={bundle.isRecommended ? 'default' : 'outline'}
          onClick={onAdd}
          disabled={isAdding}
        >
          {isAdding ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <ShoppingCart className="w-4 h-4 mr-2" />
          )}
          Add Bundle to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

interface ProductAccessoriesProps {
  productId: string;
  productName: string;
}

const ProductAccessories = ({ productId, productName }: ProductAccessoriesProps) => {
  const [selectedAccessories, setSelectedAccessories] = useState<Set<string>>(new Set());
  const [isAddingBundle, setIsAddingBundle] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Filter accessories compatible with this product
  const compatibleAccessories = accessories.filter(
    acc => acc.compatibility.includes("all") || acc.compatibility.includes(productId)
  );

  // Filter bundles for this product
  const compatibleBundles = bundles.filter(
    b => b.forProducts.includes("all") || b.forProducts.includes(productId)
  );

  // Scroll to specific slide (mobile carousel)
  const scrollToSlide = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.scrollWidth / compatibleBundles.length;
      scrollContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  };

  const toggleAccessory = (accId: string) => {
    setSelectedAccessories(prev => {
      const next = new Set(prev);
      if (next.has(accId)) {
        next.delete(accId);
      } else {
        next.add(accId);
      }
      return next;
    });
  };

  const getBundlePrice = (bundle: BundleOption) => {
    const items = accessories.filter(a => bundle.accessories.includes(a.id));
    const originalTotal = items.reduce((sum, item) => sum + item.price, 0);
    const discountedTotal = originalTotal * (1 - bundle.discountPercent / 100);
    return { original: originalTotal, discounted: discountedTotal };
  };

  const getSelectedTotal = () => {
    const items = accessories.filter(a => selectedAccessories.has(a.id));
    return items.reduce((sum, item) => sum + item.price, 0);
  };

  const handleAddBundleToCart = async (bundle: BundleOption) => {
    setIsAddingBundle(bundle.id);
    // Simulate adding to cart - in production, this would add each item
    await new Promise(resolve => setTimeout(resolve, 800));
    toast.success(`${bundle.name} added to cart`, {
      description: `${bundle.accessories.length} items with ${bundle.discountPercent}% discount`,
    });
    setIsAddingBundle(null);
  };

  const handleAddSelectedToCart = async () => {
    if (selectedAccessories.size === 0) return;
    toast.success(`${selectedAccessories.size} accessories added to cart`, {
      description: `Total: €${getSelectedTotal().toFixed(2)}`,
    });
    setSelectedAccessories(new Set());
  };

  if (compatibleAccessories.length === 0) return null;

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Recommended Accessories</h2>
              <p className="text-sm text-muted-foreground">
                Complete your setup with compatible accessories for {productName}
              </p>
            </div>
          </div>

          {/* Bundle Comparison Cards */}
          {compatibleBundles.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Bundle & Save — Compare Options
              </h3>
              
              {/* Mobile: Horizontal scroll carousel */}
              {isMobile ? (
                <div className="relative">
                  <div 
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {compatibleBundles.map((bundle, index) => (
                      <BundleComparisonCard
                        key={bundle.id}
                        bundle={bundle}
                        prices={getBundlePrice(bundle)}
                        bundleItems={accessories.filter(a => bundle.accessories.includes(a.id))}
                        isAdding={isAddingBundle === bundle.id}
                        onAdd={() => handleAddBundleToCart(bundle)}
                        isMobile={true}
                      />
                    ))}
                  </div>
                  {/* Scroll indicators */}
                  <div className="flex justify-center gap-2 mt-3">
                    {compatibleBundles.map((bundle, index) => (
                      <button
                        key={bundle.id}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          currentSlide === index ? 'bg-primary' : 'bg-muted-foreground/30'
                        }`}
                        onClick={() => scrollToSlide(index)}
                        aria-label={`Go to ${bundle.name}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                /* Desktop: 3-column grid comparison */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {compatibleBundles.map(bundle => (
                    <BundleComparisonCard
                      key={bundle.id}
                      bundle={bundle}
                      prices={getBundlePrice(bundle)}
                      bundleItems={accessories.filter(a => bundle.accessories.includes(a.id))}
                      isAdding={isAddingBundle === bundle.id}
                      onAdd={() => handleAddBundleToCart(bundle)}
                      isMobile={false}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Individual Accessories */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Individual Accessories</h3>
              {selectedAccessories.size > 0 && (
                <Button onClick={handleAddSelectedToCart} size="sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add {selectedAccessories.size} Items — €{getSelectedTotal().toFixed(2)}
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {compatibleAccessories.map(accessory => {
                const Icon = categoryIcons[accessory.category];
                const isSelected = selectedAccessories.has(accessory.id);
                
                return (
                  <div 
                    key={accessory.id}
                    className={`relative bg-card border rounded-xl p-4 transition-all cursor-pointer ${
                      isSelected 
                        ? "border-primary ring-2 ring-primary/20" 
                        : "border-border hover:border-primary/40"
                    }`}
                    onClick={() => toggleAccessory(accessory.id)}
                  >
                    {/* Selection indicator */}
                    <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected 
                        ? "bg-primary border-primary" 
                        : "border-muted-foreground/30"
                    }`}>
                      {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                    </div>
                    
                    {/* Badge */}
                    {accessory.badge && (
                      <Badge variant="secondary" className="absolute top-3 left-3 text-xs">
                        {accessory.badge}
                      </Badge>
                    )}
                    
                    {/* Image */}
                    <div className="aspect-square bg-muted/30 rounded-lg mb-3 overflow-hidden">
                      <img 
                        src={accessory.image} 
                        alt={accessory.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Category */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {categoryLabels[accessory.category]}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h4 className="font-medium text-foreground text-sm mb-1 line-clamp-2">
                      {accessory.name}
                    </h4>
                    
                    {/* Description */}
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {accessory.description}
                    </p>
                    
                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-foreground">
                        €{accessory.price.toFixed(2)}
                      </span>
                      {accessory.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          €{accessory.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compatibility Note */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground text-center">
              <strong className="text-foreground">Compatibility Note:</strong> All accessories shown are verified compatible with {productName}. 
              For custom installation requirements, <Link to="/support" className="text-primary hover:underline">contact our technical team</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductAccessories;
