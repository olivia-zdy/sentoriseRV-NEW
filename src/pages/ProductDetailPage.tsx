import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useMarket } from "@/context/MarketContext";
import PageTransition from "@/components/PageTransition";
import { Link, useParams } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import ServicePromises from "@/components/ServicePromises";
import ShareButtons from "@/components/ShareButtons";
import PageMeta from "@/components/PageMeta";
import StockStatus from "@/components/StockStatus";
import ProductSchema from "@/components/SEO/ProductSchema";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import ProductUseCases from "@/components/ProductUseCases";
import ProductFAQ from "@/components/ProductFAQ";
import ProductComparisonTable from "@/components/ProductComparisonTable";
import ProductReviews from "@/components/ProductReviews";
import ProductMediaShowcase from "@/components/ProductMediaShowcase";
import InstallationGuide from "@/components/InstallationGuide";
import VideoShowcase from "@/components/VideoShowcase";
import SeriesComparisonTable from "@/components/SeriesComparisonTable";
import { Button } from "@/components/ui/button";
import { getProductById, products } from "@/data/products";
import { getCertificationsForProduct } from "@/data/certifications";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Bluetooth, 
  Shield, 
  Thermometer, 
  Battery, 
  Zap, 
  Flame, 
  Download, 
  Check, 
  X,
  Award, 
  ChevronRight,
  Snowflake,
  AlertTriangle,
  Info,
  ShoppingCart,
  Loader2
} from "lucide-react";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore, ShopifyProduct } from "@/stores/cartStore";

// Generate suitable/unsuitable based on product characteristics
const getSuitabilityInfo = (product: ReturnType<typeof getProductById>) => {
  if (!product) return { suitable: [], unsuitable: [] };
  
  const suitable: string[] = [];
  const unsuitable: string[] = [];

  // Common suitable
  suitable.push("RV, van, or off-grid solar systems needing 12V power");
  
  if (product.hasHeating) {
    suitable.push("Regular winter charging in freezing conditions");
    suitable.push("Nordic or alpine climate users");
  } else {
    suitable.push("Users who can avoid charging below 0°C");
  }

  if (product.hasBluetooth) {
    suitable.push("Want real-time battery monitoring via smartphone");
  }

  // Unsuitable based on capacity
  if (parseInt(product.capacity) >= 200) {
    unsuitable.push("Limited installation space (24.5kg, 531mm length)");
    unsuitable.push("Budget-focused buyers seeking lowest cost per Ah");
  } else if (parseInt(product.capacity) >= 100) {
    unsuitable.push("Need sub-zero charging without external heating (choose 200Ah Heated)");
  } else {
    unsuitable.push("Heavy daily power consumption (consider 100Ah or 200Ah)");
  }

  if (!product.hasHeating) {
    unsuitable.push("Frequent winter charging without external battery heater");
  }

  return { suitable: suitable.slice(0, 3), unsuitable: unsuitable.slice(0, 2) };
};

// Get judgment sentence based on product type
const getJudgmentSentence = (product: ReturnType<typeof getProductById>) => {
  if (!product) return "";
  
  if (product.hasHeating) {
    return "Designed for sub-zero charging and cold-climate off-grid use.";
  }
  if (product.series === "Core") {
    return "For RV and off-grid daily use with low-temp discharge protection.";
  }
  if (product.series === "Lite") {
    return "Lightweight and portable for weekend trips and small systems.";
  }
  return "Reliable 12V LiFePO₄ power with smart BMS protection.";
};
// Map static product IDs to Shopify handles
const productToShopifyHandle: Record<string, string> = {
  "lite-12v6": "lite-12v-6ah-ultra-compact-lifepo4",
  "lite-12v50": "lite-12v-50ah-lightweight-lifepo4",
  "core-12v100-std": "core-12v-100ah-standard-lifepo4",
  "core-12v100-mini": "core-12v-100ah-mini-lifepo4",
  "core-12v100-din": "core-12v-100ah-din-h8-lifepo4",
  "plus-12v200-heated": "plus-12v-200ah-heated-lifepo4",
};

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [isAdding, setIsAdding] = useState(false);
  const [shopifyVariantId, setShopifyVariantId] = useState<string | null>(null);
  const [shopifyProduct, setShopifyProduct] = useState<ShopifyProduct | null>(null);
  const addItem = useCartStore(state => state.addItem);
  const { t } = useTranslation();
  const { formatPrice } = useMarket();
  
  const product = getProductById(productId || "");
  const certifications = getCertificationsForProduct(productId || "");
  const { recentlyViewed, trackView } = useRecentlyViewed(productId);

  // Track this product view
  useEffect(() => {
    if (productId) trackView(productId);
  }, [productId, trackView]);

  // Fetch Shopify product for Add to Cart
  useEffect(() => {
    const handle = productToShopifyHandle[productId || ""];
    if (!handle) return;
    fetchProductByHandle(handle).then(sp => {
      if (sp) {
        const variant = sp.variants?.edges?.[0]?.node;
        if (variant) setShopifyVariantId(variant.id);
        setShopifyProduct({ node: sp });
      }
    });
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <Header />
        <main className="section-padding">
          <div className="container-custom text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/products">Back to Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { suitable, unsuitable } = getSuitabilityInfo(product);
  const judgmentSentence = getJudgmentSentence(product);

  // Create gallery images array
  const galleryImages = [product.image];

  // Get related products (same series, excluding current)
  const relatedProducts = products
    .filter(p => p.series === product.series && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = async () => {
    if (!shopifyVariantId || !shopifyProduct) {
      toast.error("This product is not available for purchase yet.");
      return;
    }
    setIsAdding(true);
    try {
      const variant = shopifyProduct.node.variants.edges[0].node;
      await addItem({
        product: shopifyProduct,
        variantId: shopifyVariantId,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions || [],
      });
      toast.success(`${product.name} added to cart`);
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDatasheetClick = () => {
    toast.info("Datasheet will be available soon. Contact us for specifications.");
  };

  // Breadcrumb data for schema
  const breadcrumbItems = [
    { name: "Home", url: "https://sentorise.lovable.app/" },
    { name: "Products", url: "https://sentorise.lovable.app/products" },
    { name: product.capacity, url: `https://sentorise.lovable.app/product/${product.id}` },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title={t(`productNames.${product.id}.name`, { defaultValue: product.name })} 
        description={`${t(`productNames.${product.id}.name`, { defaultValue: product.name })} - ${judgmentSentence} ${product.voltage} ${product.capacity} LiFePO4 battery with 5-year warranty.`}
        canonical={`/product/${product.id}`}
        ogType="product"
      />
      
      <ProductSchema
        name={t(`productNames.${product.id}.name`, { defaultValue: product.name })}
        description={t(`productNames.${product.id}.description`, { defaultValue: product.description })}
        image={product.image}
        sku={product.model}
        price={product.price}
        salePrice={product.salePrice}
        inStock={product.inStock}
        category="Batteries > LiFePO4"
        weight={product.weight?.replace('kg', '')}
        url={`https://sentorise.lovable.app/product/${product.id}`}
      />
      
      <BreadcrumbSchema items={breadcrumbItems} />

      <AnnouncementBar />
      <Header />
      <PageTransition>
      <main>
        {/* Breadcrumb */}
        <section className="py-4 border-b border-border bg-muted/30">
          <div className="container-custom">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/products" className="hover:text-primary">Products</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">{product.capacity}</span>
            </nav>
          </div>
        </section>

        {/* Above The Fold - PRD Compliant */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
              {/* Image Gallery */}
              <div className="relative">
                <ProductGallery images={galleryImages} productName={product.name} />
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.hasHeating && (
                    <span className="px-3 py-1.5 text-xs font-semibold uppercase rounded-full bg-orange-500 text-white flex items-center gap-1">
                      <Flame className="w-3 h-3" /> Self-Heating
                    </span>
                  )}
                  {product.badge && !product.hasHeating && (
                    <span className="badge-glow">{product.badge}</span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div>
                {/* Series Tag */}
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {product.series} Series • {product.voltage}
                </span>

                {/* Product Name */}
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-2">
                  {t(`productNames.${product.id}.name`, { defaultValue: product.name })}
                </h1>

                {/* Judgment Sentence - PRD Required */}
                <p className="text-muted-foreground mb-4">
                  {judgmentSentence}
                </p>

                {/* Suitable / Unsuitable - PRD Required */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-muted/50 rounded-lg border border-border">
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Good Fit
                    </p>
                    <ul className="space-y-1.5">
                      {suitable.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                      <X className="w-3 h-3" /> Not Ideal For
                    </p>
                    <ul className="space-y-1.5">
                      {unsuitable.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price & Stock */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-3">
                    {product.salePrice ? (
                      <>
                        <span className="text-3xl font-bold text-primary">{formatPrice(product.salePrice)}</span>
                        <span className="text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>
                        <span className="px-2 py-0.5 text-xs font-bold bg-destructive text-destructive-foreground rounded">
                          -{Math.round((1 - product.salePrice / product.price) * 100)}%
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
                    )}
                  </div>
                  <StockStatus 
                    stockQuantity={product.stockQuantity}
                    lowStockThreshold={product.lowStockThreshold}
                    restockDate={product.restockDate}
                    showDelivery={true}
                  />
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <Button size="lg" onClick={handleAddToCart} disabled={isAdding} className="flex-1 sm:flex-none">
                    {isAdding ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Adding...</>
                    ) : (
                      <><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</>
                    )}
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleDatasheetClick}>
                    <Download className="w-4 h-4 mr-2" />
                    Datasheet
                  </Button>
                </div>

                {/* Key Guarantees */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
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
                  {product.hasBluetooth && (
                    <span className="flex items-center gap-1.5">
                      <Bluetooth className="w-4 h-4 text-primary" />
                      Bluetooth
                    </span>
                  )}
                </div>

                {/* Dimensions Quick Access - Collapsible */}
                <Accordion type="single" collapsible className="border border-border rounded-lg">
                  <AccordionItem value="dimensions" className="border-none">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline text-sm">
                      <span className="flex items-center gap-2">
                        <Battery className="w-4 h-4 text-muted-foreground" />
                        Dimensions & Weight
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Dimensions</p>
                          <p className="font-medium text-foreground">{product.dimensions}</p>
                        </div>
                        {product.weight && (
                          <div>
                            <p className="text-muted-foreground">Weight</p>
                            <p className="font-medium text-foreground">{product.weight}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-muted-foreground">Model</p>
                          <p className="font-mono text-xs text-foreground">{product.model}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* LOW TEMPERATURE MODULE - PRD: Must be first after fold */}
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
                {/* Charging */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Charging in Cold
                  </h3>
                  {product.hasHeating ? (
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

                {/* Discharging */}
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

        {/* Bluetooth & App Module */}
        {product.hasBluetooth && (
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

        {/* Use Cases Section */}
        <ProductUseCases 
          productId={product.id} 
          series={product.series} 
          capacity={product.capacity} 
        />

        {/* Installation Guide */}
        <InstallationGuide
          productName={product.name}
          capacity={product.capacity}
          hasHeating={product.hasHeating}
          hasBluetooth={product.hasBluetooth}
        />

        {/* Series Comparison Table */}
        <SeriesComparisonTable
          currentProductId={product.id}
          series={product.series}
        />

        {/* LiFePO4 vs Lead-Acid Comparison */}
        <ProductComparisonTable 
          capacity={product.capacity}
          weight={product.weight}
          cycleLife="4000+ cycles"
        />

        {/* Product FAQ */}
        <ProductFAQ
          productId={product.id}
          productName={product.name}
          hasHeating={product.hasHeating}
          hasBluetooth={product.hasBluetooth}
          capacity={product.capacity}
        />

        {/* Product Media Showcase */}
        <ProductMediaShowcase
          productId={product.id}
          productName={product.name}
          primaryImage={product.image}
        />

        {/* Video Guides */}
        <VideoShowcase
          productName={product.name}
          capacity={product.capacity}
          hasBluetooth={product.hasBluetooth}
          hasHeating={product.hasHeating}
        />

        {/* Customer Reviews */}
        <ProductReviews
          productId={product.id}
          productName={product.name}
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

        {/* Technical Specifications - Collapsed by default */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-foreground mb-6">Technical Specifications</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.specs.slice(0, 8).map((spec, index) => (
                  <div key={index} className="p-4 bg-card rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground mb-1">{spec.label}</p>
                    <p className="font-medium text-foreground">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              {certifications.length > 0 && (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-3">Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {certifications.map((cert) => (
                      <span
                        key={cert.id}
                        className="px-3 py-1.5 bg-card border border-border rounded text-sm font-mono text-foreground"
                        title={cert.description}
                      >
                        {cert.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Share & Service */}
        <section className="py-8 border-t border-border">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center gap-4">
              <ShareButtons title={`Check out ${product.name} from Sentorise`} />
              <ServicePromises />
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="section-padding bg-muted/30 border-t border-border">
            <div className="container-custom">
              <h2 className="text-xl font-bold text-foreground mb-6">Other {product.series} Series Models</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="section-padding border-t border-border">
            <div className="container-custom">
              <h2 className="text-xl font-bold text-foreground mb-6">{t('product.recentlyViewed', { defaultValue: 'Recently Viewed' })}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {recentlyViewed.slice(0, 4).map((id) => {
                  const p = getProductById(id);
                  return p ? <ProductCard key={p.id} product={p} /> : null;
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      </PageTransition>
      <Footer />

    </div>
  );
};

export default ProductDetailPage;
