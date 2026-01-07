import { Link, useParams } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProductById, products } from "@/data/products";
import { getCertificationsForProduct } from "@/data/certifications";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bluetooth, Shield, Thermometer, Battery, Zap, Flame, Download, Check, Award, Truck, Home, Sun, Anchor } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import { glassIconClass } from "@/lib/utils";

const applicationScenes = [
  { id: "rv", name: "RV & Motorhome", icon: Truck, href: "/applications#rv" },
  { id: "vanlife", name: "Van Life", icon: Truck, href: "/applications#vanlife" },
  { id: "solar", name: "Off-Grid Solar", icon: Sun, href: "/applications#solar" },
  { id: "marine", name: "Marine & Boat", icon: Anchor, href: "/applications#marine" },
  { id: "cabin", name: "Off-Grid Cabin", icon: Home, href: "/applications#cabin" },
];

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = getProductById(productId || "");
  const certifications = getCertificationsForProduct(productId || "");

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

  // Create gallery images array (main image + additional angles if available)
  const galleryImages = [product.image];

  // Get related products (same series, excluding current)
  const relatedProducts = products
    .filter(p => p.series === product.series && p.id !== product.id)
    .slice(0, 3);

  // Determine recommended scenes based on use cases
  const recommendedScenes = applicationScenes.filter(scene => 
    product.useCases.some(uc => 
      uc.toLowerCase().includes(scene.id) || 
      uc.toLowerCase().includes(scene.name.toLowerCase().split(" ")[0])
    )
  ).slice(0, 4);

  // Fallback to first 3 if no matches
  const displayScenes = recommendedScenes.length > 0 ? recommendedScenes : applicationScenes.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        {/* Breadcrumb */}
        <section className="py-4 border-b border-border bg-muted/30">
          <div className="container-custom">
            <nav className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/products" className="hover:text-primary">Products</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>
        </section>

        {/* Product Detail */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <div className="relative">
                <ProductGallery images={galleryImages} productName={product.name} />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.badge && (
                    <span className="badge-glow">{product.badge}</span>
                  )}
                  {product.isNew && (
                    <span className="px-3 py-1 text-xs font-semibold uppercase rounded-full bg-primary text-primary-foreground">
                      New
                    </span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Products
                </Link>

                <span className="text-sm font-semibold text-primary uppercase tracking-wider block mb-2">
                  {product.series} Series • {product.category}
                </span>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>

                <p className="text-lg text-muted-foreground mb-6">
                  {product.description}
                </p>

                {/* Quick Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <Battery className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Capacity</p>
                    <p className="font-semibold text-foreground">{product.capacity}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <Zap className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Energy</p>
                    <p className="font-semibold text-foreground">{product.energy}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <Shield className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">BMS</p>
                    <p className="font-semibold text-foreground">{product.bms}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <Thermometer className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Voltage</p>
                    <p className="font-semibold text-foreground">{product.voltage}</p>
                  </div>
                </div>

                {/* Feature Icons */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {product.hasBluetooth && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                      <Bluetooth className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Bluetooth</span>
                    </div>
                  )}
                  {product.hasHeating && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium">Self-Heating</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">5-Year Warranty</span>
                  </div>
                </div>

                {/* Certifications */}
                {certifications.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary" />
                      Certifications & Safety
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {certifications.map((cert) => (
                        <div
                          key={cert.id}
                          className="group relative px-3 py-1.5 bg-muted border border-border rounded-lg text-sm font-mono font-medium text-foreground hover:border-primary/50 transition-colors cursor-help"
                          title={cert.description}
                        >
                          {cert.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button size="lg">
                    Request Quote
                  </Button>
                  <Button variant="outline" size="lg">
                    <Download className="w-4 h-4 mr-2" />
                    Datasheet
                  </Button>
                </div>

                {/* Model Info */}
                <div className="p-4 bg-muted rounded-lg text-sm">
                  <p><span className="text-muted-foreground">Model:</span> <span className="font-mono">{product.model}</span></p>
                  <p><span className="text-muted-foreground">EAN:</span> <span className="font-mono">{product.ean}</span></p>
                  <p><span className="text-muted-foreground">Dimensions:</span> {product.dimensions}</p>
                  {product.weight && <p><span className="text-muted-foreground">Weight:</span> {product.weight}</p>}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Use Cases */}
        <section className="section-padding bg-muted/30 border-y border-border">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Features */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">Key Features</h2>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use Cases */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">Perfect For</h2>
                <ul className="space-y-3">
                  {product.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-muted-foreground">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Scenes */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-foreground mb-8">Recommended Applications</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayScenes.map((scene) => (
                <Link
                  key={scene.id}
                  to={scene.href}
                  className="group flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className={glassIconClass}>
                    <scene.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {scene.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="section-padding bg-muted/30 border-t border-border">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-foreground mb-8">Technical Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {product.specs.map((spec, index) => (
                <div key={index} className="p-4 bg-card rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">{spec.label}</p>
                  <p className="font-semibold text-foreground">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="section-padding border-t border-border">
            <div className="container-custom">
              <h2 className="text-2xl font-bold text-foreground mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
