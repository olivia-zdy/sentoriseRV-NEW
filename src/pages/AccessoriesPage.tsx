import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { accessoryProducts } from "@/data/accessories";
import { useMarket } from "@/context/MarketContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Gauge, ArrowRight, Clock, Cable, Shield } from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  charger: Zap,
  monitor: Gauge,
  cable: Cable,
  protection: Shield,
};

const AccessoriesPage = () => {
  const { formatPrice } = useMarket();
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Accessories – Chargers & Monitors | Sentorise"
        description="Professional LiFePO₄ battery accessories: chargers, battery monitors, and installation components for RV, marine, and off-grid systems."
      />
      <AnnouncementBar />
      <Header />
      <PageTransition>
        <main>
          {/* Hero */}
          <section className="py-10 md:py-14 bg-muted/50 border-b border-border">
            <div className="container-custom">
              <nav className="text-sm text-muted-foreground mb-6">
                <Link to="/" className="hover:text-primary">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-foreground">Accessories</span>
              </nav>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Battery Accessories
              </h1>
              <p className="text-muted-foreground max-w-xl">
                Professional chargers, monitors, and installation components designed to complement your Sentorise battery system.
              </p>
            </div>
          </section>

          {/* Products Grid */}
          <section className="section-padding">
            <div className="container-custom">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {accessoryProducts.map((product, index) => {
                  const Icon = categoryIcons[product.category] || Zap;
                  return (
                    <ScrollReveal key={product.id} delay={index * 0.1}>
                      <Card className="overflow-hidden border-border hover:border-primary/30 transition-all group h-full">
                        {/* Image */}
                        <div className="relative aspect-square bg-muted/30 p-6 flex items-center justify-center overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                          {product.badge && (
                            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                              {product.badge}
                            </Badge>
                          )}
                          {product.preOrder && (
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 text-sm">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="text-muted-foreground">
                                  Est. shipping: <strong className="text-foreground">{product.estimatedShipping}</strong>
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <CardContent className="p-6">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground text-lg leading-tight">
                                {product.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {product.subtitle}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            {product.description}
                          </p>

                          {/* Key features preview */}
                          <ul className="space-y-1.5 mb-6">
                            {product.keyFeatures.slice(0, 3).map((feat, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>{feat.split(":")[0]}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-primary">
                                {formatPrice(product.salePrice ?? product.price)}
                              </span>
                              {product.salePrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  {formatPrice(product.price)}
                                </span>
                              )}
                            </div>
                            <Button asChild>
                              <Link to={`/accessory/${product.slug}`}>
                                View Details
                                <ArrowRight className="w-4 h-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default AccessoriesPage;
