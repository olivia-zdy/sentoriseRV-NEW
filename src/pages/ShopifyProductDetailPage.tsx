import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore, ShopifyProduct } from "@/stores/cartStore";
import { useMarket } from "@/context/MarketContext";
import { products as localProducts } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import PageMeta from "@/components/PageMeta";
import ServicePromises from "@/components/ServicePromises";
import ProductFAQ from "@/components/ProductFAQ";
import ProductComparisonTable from "@/components/ProductComparisonTable";
import ProductReviews from "@/components/ProductReviews";
import ProductAccessories from "@/components/ProductAccessories";
import InstallationGuide from "@/components/InstallationGuide";
import VideoShowcase from "@/components/VideoShowcase";
import SeriesComparisonTable from "@/components/SeriesComparisonTable";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  ShoppingCart, 
  Loader2, 
  ArrowLeft, 
  Bluetooth, 
  Thermometer, 
  Shield, 
  Truck,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Zap,
  Snowflake,
  AlertTriangle,
  Check,
  Award,
  Info
} from "lucide-react";
import { toast } from "sonner";

const ShopifyProductDetailPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  const { formatPrice: formatMarketPrice } = useMarket();

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [handle]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <Header />
        <main className="container-custom py-20">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading product...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <Header />
        <main className="container-custom py-20">
          <div className="text-center py-20">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <p className="text-destructive mb-4">{error || 'Product not found'}</p>
            <Button asChild variant="outline">
              <Link to="/products">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currencyCode = product.priceRange.minVariantPrice.currencyCode;
  const image = product.images?.edges?.[0]?.node;
  const variant = product.variants?.edges?.[0]?.node;

  // Discount logic: Shopify compareAtPrice first, then local fallback
  const handleToLocalId: Record<string, string> = {
    "lite-12v-6ah-ultra-compact-lifepo-battery": "lite-12v6",
    "lite-12v-50ah-bluetooth-lifepo-battery": "lite-12v50",
    "core-12v-100ah-standard-lifepo-battery": "core-12v100-std",
    "core-12v-100ah-mini-compact-lifepo-battery": "core-12v100-mini",
    "core-12v-100ah-din-h8-under-seat-lifepo-battery": "core-12v100-din",
    "plus-12v-200ah-heated-arctic-lifepo-battery": "plus-12v200-heated",
  };
  const shopifyCompareAtAmt = product.compareAtPriceRange?.minVariantPrice?.amount;
  const shopifyCompareAt = shopifyCompareAtAmt ? parseFloat(shopifyCompareAtAmt) : null;
  const localProduct = handle ? localProducts.find(p => p.id === handleToLocalId[handle]) : null;
  const hasLocalDiscount = localProduct?.price && localProduct?.salePrice && localProduct.salePrice < localProduct.price;
  const compareAtPrice = (shopifyCompareAt && shopifyCompareAt > price)
    ? shopifyCompareAt
    : hasLocalDiscount ? localProduct!.price : null;
  const hasDiscount = compareAtPrice !== null && compareAtPrice > price;
  const discountPercent = hasDiscount ? Math.round((1 - price / compareAtPrice) * 100) : 0;

  const hasBluetooth = product.title.toLowerCase().includes('bluetooth') || 
                       product.description?.toLowerCase().includes('bluetooth');
  const hasHeating = product.title.toLowerCase().includes('heated') || 
                     product.description?.toLowerCase().includes('self-heating');

  // Extract capacity from title (e.g., "100Ah" from "Core 12V 100Ah")
  const capacityMatch = product.title.match(/(\d+)Ah/i);
  const capacity = capacityMatch ? `${capacityMatch[1]}Ah` : "100Ah";

  const displayPrice = formatMarketPrice(price);
  const displayCompareAtPrice = hasDiscount ? formatMarketPrice(compareAtPrice) : null;

  const handleAddToCart = async () => {
    if (!variant) return;
    
    setIsAdding(true);
    try {
      const shopifyProduct: ShopifyProduct = { node: product };
      await addItem({
        product: shopifyProduct,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity,
        selectedOptions: variant.selectedOptions || []
      });
      toast.success("Added to cart", {
        description: `${quantity}x ${product.title}`,
      });
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title={product.title}
        description={product.description?.slice(0, 155) || `${product.title} - Sentorise LiFePO₄ Battery`}
      />
      <AnnouncementBar />
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <section className="py-4 border-b border-border bg-muted/30">
          <div className="container-custom">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/products" className="hover:text-primary">Shop</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">{product.title}</span>
            </nav>
          </div>
        </section>

        {/* Product Hero */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square bg-muted/30 rounded-2xl overflow-hidden border p-8">
                  {image && (
                    <img 
                      src={image.url} 
                      alt={image.altText || product.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                
                {/* Feature Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {hasBluetooth && (
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      <Bluetooth className="w-4 h-4 mr-2" />
                      Bluetooth Monitoring
                    </Badge>
                  )}
                  {hasHeating && (
                    <Badge className="bg-orange-500/90 text-white text-sm px-3 py-1">
                      <Thermometer className="w-4 h-4 mr-2" />
                      Self-Heating
                    </Badge>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {product.title}
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price */}
                <div className="py-4 border-y">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-primary">
                      {displayPrice}
                    </span>
                    {displayCompareAtPrice && (
                      <span className="text-xl text-muted-foreground line-through">
                        {displayCompareAtPrice}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">incl. VAT</span>
                  </div>
                  {hasDiscount && discountPercent > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <Badge className="bg-destructive text-destructive-foreground text-sm font-bold">
                        -{discountPercent}%
                      </Badge>
                      <span className="text-sm text-destructive font-medium">
                        Save {discountPercent}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Quantity & Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium">Quantity:</label>
                    <div className="flex items-center border rounded-lg">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3"
                      >
                        -
                      </Button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full text-lg py-6"
                    onClick={handleAddToCart}
                    disabled={isAdding || !variant?.availableForSale}
                  >
                    {isAdding ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <ShoppingCart className="w-5 h-5 mr-2" />
                    )}
                    Add to Cart — {formatMarketPrice(price * quantity)}
                  </Button>
                </div>

                {/* Key Guarantees */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <Link 
                    to="/warranty" 
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <Shield className="w-4 h-4 text-primary" />
                    5-Year Warranty
                    <span className="text-xs text-primary">→ Register</span>
                  </Link>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-primary" />
                    4000+ Cycles
                  </span>
                  {hasBluetooth && (
                    <Link 
                      to="/bluetooth-guide" 
                      className="flex items-center gap-1.5 hover:text-primary transition-colors"
                    >
                      <Bluetooth className="w-4 h-4 text-primary" />
                      Bluetooth
                      <span className="text-xs text-primary">→ Setup Guide</span>
                    </Link>
                  )}
                </div>

                {/* Trust Signals */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Link 
                    to="/warranty" 
                    className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-primary/10 transition-colors group"
                  >
                    <Shield className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm group-hover:text-primary transition-colors">5-Year Warranty</p>
                      <p className="text-xs text-muted-foreground">Register now →</p>
                    </div>
                  </Link>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                    <Truck className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Free Shipping €199+</p>
                      <p className="text-xs text-muted-foreground">EU orders, 2-5 business days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">4000+ Cycles</p>
                      <p className="text-xs text-muted-foreground">Long lifespan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">-20°C to 60°C</p>
                      <p className="text-xs text-muted-foreground">Operating range</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Low Temperature Module */}
        <section className="section-padding bg-muted/30 border-y border-border">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Snowflake className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Low-Temperature Behavior</h2>
                  <p className="text-sm text-muted-foreground">How this battery handles cold weather</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-5">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Charging in Cold
                  </h3>
                  {hasHeating ? (
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><span className="text-foreground font-medium">Self-heating activates at -10°C.</span> The battery warms itself before accepting charge.</p>
                      <p>Wait time: ~15-30 minutes depending on ambient temp.</p>
                      <p className="text-xs bg-muted p-2 rounded">Note: Self-heating uses battery power (~5% capacity for warm-up).</p>
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><span className="text-foreground font-medium">Charging blocked below 0°C</span> to protect cell health.</p>
                      <p>If you need to charge in freezing temps, use an external battery heater or choose the 200Ah Heated model.</p>
                      <p className="text-xs bg-muted p-2 rounded">This is a safety feature, not a limitation.</p>
                    </div>
                  )}
                </div>

                <div className="bg-card border border-border rounded-lg p-5">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Discharging in Cold
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><span className="text-foreground font-medium">Works down to -20°C.</span> You can use stored power even in deep cold.</p>
                    <p>Capacity may temporarily decrease by 10-20% at extreme cold.</p>
                    <p className="text-xs bg-muted p-2 rounded">Full capacity restores when battery warms up.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bluetooth Module */}
        {hasBluetooth && (
          <section className="section-padding">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bluetooth className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Bluetooth Monitoring</h2>
                    <p className="text-sm text-muted-foreground">Real-time battery status on your phone</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2">What You See</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Voltage, current, temperature</li>
                      <li>• State of charge (%)</li>
                      <li>• Cycle count</li>
                      <li>• Cell balance status</li>
                    </ul>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2">Compatibility</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• iOS 12 or later</li>
                      <li>• Android 8.0 or later</li>
                      <li>• Range: ~10 meters</li>
                      <li>• Free Sentorise app</li>
                    </ul>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2">Setup</h3>
                    <p className="text-sm text-muted-foreground">
                      Download app → Enable Bluetooth → Auto-detect battery. No pairing code needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Installation Guide */}
        <InstallationGuide
          productName={product.title}
          capacity={capacity}
          hasHeating={hasHeating}
          hasBluetooth={hasBluetooth}
        />

        {/* Series Comparison Table */}
        <SeriesComparisonTable
          currentProductId={localProduct?.id || handle || ""}
          series={localProduct?.series}
        />

        {/* LiFePO4 vs Lead-Acid Comparison */}
        <ProductComparisonTable 
          capacity={capacity}
          cycleLife="4000+ cycles"
        />

        {/* Product FAQ */}
        <ProductFAQ
          productId={handle || ""}
          productName={product.title}
          hasHeating={hasHeating}
          hasBluetooth={hasBluetooth}
          capacity={capacity}
        />

        {/* Recommended Accessories & Bundles */}
        <ProductAccessories
          productId={handle || ""}
          productName={product.title}
        />

        {/* Video Guides */}
        <VideoShowcase
          productName={product.title}
          capacity={capacity}
          hasBluetooth={hasBluetooth}
          hasHeating={hasHeating}
        />

        {/* Customer Reviews */}
        <ProductReviews
          productId={handle || ""}
          productName={product.title}
        />

        {/* Warranty & Support Module */}
        <section className="section-padding bg-muted/30 border-y border-border">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">5-Year Warranty</h2>
                  <p className="text-sm text-muted-foreground">Clear terms, Berlin-based support</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-5">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    What's Covered
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Cell failure or premature capacity loss (&lt;80%)</li>
                    <li>• BMS malfunction</li>
                    <li>• Manufacturing defects</li>
                    <li>• Full replacement within warranty period</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-5">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-muted-foreground" />
                    What's Not Covered
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Physical damage or water exposure</li>
                    <li>• Incorrect installation</li>
                    <li>• Use with incompatible chargers</li>
                    <li>• Bypass of BMS protection circuits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Service Promises */}
        <section className="py-8 border-t border-border">
          <div className="container-custom">
            <ServicePromises />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopifyProductDetailPage;
