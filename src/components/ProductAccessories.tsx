import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore, ShopifyProduct } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Plus,
  Check,
  Package,
  Zap,
  Cable,
  Gauge,
  Shield,
  Loader2
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
    id: "acc-charger-smart",
    name: "LiFePO₄ Smart Charger 14.6V/10A",
    description: "Optimized charging profile for LiFePO₄ chemistry. Auto-detect and temperature compensation.",
    price: 49.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1609592424117-6a6e7eecc699?w=300&h=300&fit=crop",
    category: "charger",
    compatibility: ["lite-12v6", "lite-12v50", "core-12v100-std", "core-12v100-mini", "core-12v100-din"],
    inStock: true,
    badge: "Recommended"
  },
  {
    id: "acc-charger-20a",
    name: "LiFePO₄ Smart Charger 14.6V/20A",
    description: "High-power charger for 100Ah+ batteries. Built-in cooling fan and LED status display.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1609592424117-6a6e7eecc699?w=300&h=300&fit=crop",
    category: "charger",
    compatibility: ["core-12v100-std", "core-12v100-mini", "core-12v100-din", "plus-12v200-heated"],
    inStock: true,
  },
  {
    id: "acc-monitor-shunt",
    name: "Battery Monitor with Shunt",
    description: "Precision Coulomb counter with 500A shunt. Shows voltage, current, SOC, and history.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop",
    category: "monitor",
    compatibility: ["all"],
    inStock: true,
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
  {
    id: "acc-battery-box",
    name: "Weatherproof Battery Box",
    description: "IP65 rated enclosure for outdoor installations. Fits Group 31 batteries.",
    price: 69.99,
    originalPrice: 89.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    category: "mounting",
    compatibility: ["core-12v100-std"],
    inStock: true,
    badge: "20% Off"
  },
];

interface BundleOption {
  id: string;
  name: string;
  description: string;
  accessories: string[];
  discountPercent: number;
  forProducts: string[];
}

const bundles: BundleOption[] = [
  {
    id: "bundle-starter",
    name: "Starter Bundle",
    description: "Essential accessories to get your battery system running safely.",
    accessories: ["acc-cable-anderson", "acc-fuse-holder", "acc-terminal-kit"],
    discountPercent: 15,
    forProducts: ["all"],
  },
  {
    id: "bundle-complete",
    name: "Complete Installation Bundle",
    description: "Everything you need for a professional installation.",
    accessories: ["acc-charger-smart", "acc-cable-anderson", "acc-fuse-holder", "acc-monitor-shunt", "acc-terminal-kit"],
    discountPercent: 20,
    forProducts: ["core-12v100-std", "core-12v100-mini", "core-12v100-din"],
  },
  {
    id: "bundle-pro",
    name: "Pro System Bundle",
    description: "High-capacity setup with advanced monitoring and protection.",
    accessories: ["acc-charger-20a", "acc-monitor-shunt", "acc-fuse-holder", "acc-bus-bar"],
    discountPercent: 20,
    forProducts: ["plus-12v200-heated"],
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

interface ProductAccessoriesProps {
  productId: string;
  productName: string;
}

const ProductAccessories = ({ productId, productName }: ProductAccessoriesProps) => {
  const [selectedAccessories, setSelectedAccessories] = useState<Set<string>>(new Set());
  const [isAddingBundle, setIsAddingBundle] = useState<string | null>(null);

  // Filter accessories compatible with this product
  const compatibleAccessories = accessories.filter(
    acc => acc.compatibility.includes("all") || acc.compatibility.includes(productId)
  );

  // Filter bundles for this product
  const compatibleBundles = bundles.filter(
    b => b.forProducts.includes("all") || b.forProducts.includes(productId)
  );

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

          {/* Bundle Deals */}
          {compatibleBundles.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Bundle & Save
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {compatibleBundles.map(bundle => {
                  const prices = getBundlePrice(bundle);
                  const bundleItems = accessories.filter(a => bundle.accessories.includes(a.id));
                  
                  return (
                    <div 
                      key={bundle.id}
                      className="relative bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-xl p-5 hover:border-primary/40 transition-colors"
                    >
                      <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                        Save {bundle.discountPercent}%
                      </Badge>
                      
                      <h4 className="font-bold text-foreground mb-1">{bundle.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{bundle.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        {bundleItems.map(item => (
                          <div key={item.id} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">{item.name}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-primary">
                          €{prices.discounted.toFixed(2)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          €{prices.original.toFixed(2)}
                        </span>
                      </div>
                      
                      <Button 
                        className="w-full"
                        onClick={() => handleAddBundleToCart(bundle)}
                        disabled={isAddingBundle === bundle.id}
                      >
                        {isAddingBundle === bundle.id ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <ShoppingCart className="w-4 h-4 mr-2" />
                        )}
                        Add Bundle to Cart
                      </Button>
                    </div>
                  );
                })}
              </div>
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
