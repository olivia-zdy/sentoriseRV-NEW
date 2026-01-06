import { Link, useParams } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProductById, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bluetooth, Shield, Thermometer, Battery, Zap, Flame, Download, Check } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = getProductById(productId || "");

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

  // Get related products (same series, excluding current)
  const relatedProducts = products
    .filter(p => p.series === product.series && p.id !== product.id)
    .slice(0, 3);

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
              {/* Image */}
              <div className="relative">
                <div className="aspect-square bg-muted rounded-xl overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
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

        {/* Specifications */}
        <section className="section-padding">
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
          <section className="section-padding bg-muted/50 border-t border-border">
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
