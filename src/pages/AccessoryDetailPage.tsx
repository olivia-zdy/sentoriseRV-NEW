import { useParams, Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { getAccessoryBySlug, accessoryProducts } from "@/data/accessories";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Zap,
  Gauge,
  Check,
  AlertTriangle,
  Package,
  Clock,
  Shield,
  Truck,
  ArrowLeft,
} from "lucide-react";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";

const AccessoryDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getAccessoryBySlug(slug) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <Header />
        <main className="container-custom py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The accessory you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/accessories">Back to Accessories</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const breadcrumbs = [
    { name: "Home", url: "https://sentorise.lovable.app/" },
    { name: "Accessories", url: "https://sentorise.lovable.app/accessories" },
    { name: product.name, url: `https://sentorise.lovable.app/accessory/${product.slug}` },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title={product.seoTitle} description={product.seoDescription} />
      <BreadcrumbSchema items={breadcrumbs} />
      <AnnouncementBar />
      <Header />
      <PageTransition>
        <main>
          {/* Breadcrumb */}
          <section className="py-4 border-b border-border">
            <div className="container-custom">
              <nav className="text-sm text-muted-foreground flex items-center gap-2">
                <Link to="/" className="hover:text-primary">Home</Link>
                <span>/</span>
                <Link to="/accessories" className="hover:text-primary">Accessories</Link>
                <span>/</span>
                <span className="text-foreground">{product.name}</span>
              </nav>
            </div>
          </section>

          {/* Hero Section */}
          <section className="section-padding">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                {/* Image */}
                <ScrollReveal>
                  <div className="relative aspect-square bg-muted/30 rounded-2xl p-8 flex items-center justify-center border border-border">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain"
                    />
                    {product.badge && (
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm px-3 py-1">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                </ScrollReveal>

                {/* Product Info */}
                <ScrollReveal delay={0.1}>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {product.name}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-6">
                      {product.subtitle}
                    </p>

                    {/* Price & Status */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-3xl font-bold text-primary">
                        €{(product.salePrice ?? product.price).toFixed(2)}
                      </span>
                      {product.salePrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          €{product.price.toFixed(2)}
                        </span>
                      )}
                      {product.preOrder ? (
                        <div className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-lg">
                          <Clock className="w-4 h-4" />
                          Pre-order · Est. {product.estimatedShipping}
                        </div>
                      ) : product.inStock ? (
                        <Badge variant="outline" className="text-primary border-primary">
                          In Stock
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-destructive border-destructive">
                          Out of Stock
                        </Badge>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-6">{product.description}</p>

                    {/* Key Features */}
                    <div className="space-y-2 mb-6">
                      <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                        Key Features
                      </h3>
                      <ul className="space-y-2">
                        {product.keyFeatures.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-foreground">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Compatibility */}
                    <div className="bg-muted/50 rounded-lg p-4 mb-6">
                      <p className="text-sm">
                        <span className="font-medium text-foreground">Compatibility: </span>
                        <span className="text-muted-foreground">{product.compatibility}</span>
                      </p>
                    </div>

                    {/* Trust bar */}
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-primary" />
                        Free EU Shipping
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-primary" />
                        CE Compliant
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Package className="w-4 h-4 text-primary" />
                        Complete Install Kit
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Detail Sections */}
          <section className="section-padding bg-muted/30 border-y border-border">
            <div className="container-custom max-w-4xl">
              {product.sections.map((section, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.05}>
                  <div className="mb-10 last:mb-0">
                    <h2 className="text-xl font-bold text-foreground mb-3">{section.title}</h2>
                    <p className="text-muted-foreground mb-3">{section.content}</p>
                    {section.bullets && (
                      <ul className="space-y-1.5 ml-1">
                        {section.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-0.5">•</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Specifications Table */}
          <section className="section-padding">
            <div className="container-custom max-w-4xl">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-foreground mb-6">Technical Specifications</h2>
                <div className="border border-border rounded-xl overflow-hidden">
                  {product.specifications.map((spec, i) => (
                    <div
                      key={i}
                      className={`flex justify-between px-5 py-3 text-sm ${
                        i % 2 === 0 ? "bg-muted/30" : "bg-background"
                      }`}
                    >
                      <span className="font-medium text-foreground">{spec.label}</span>
                      <span className="text-muted-foreground text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Applications & Package */}
          <section className="section-padding bg-muted/30 border-y border-border">
            <div className="container-custom max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ScrollReveal>
                  <h3 className="text-lg font-bold text-foreground mb-4">Ideal Applications</h3>
                  <ul className="space-y-2">
                    {product.applications.map((app, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <h3 className="text-lg font-bold text-foreground mb-4">Package Contents</h3>
                  <ul className="space-y-2">
                    {product.packageContents.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Package className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Warnings */}
          {product.warnings && product.warnings.length > 0 && (
            <section className="py-6">
              <div className="container-custom max-w-4xl">
                <ScrollReveal>
                  <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        {product.warnings.map((w, i) => (
                          <p key={i} className="text-sm text-foreground">{w}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </section>
          )}

          {/* FAQ */}
          {product.faqs.length > 0 && (
            <section className="section-padding border-t border-border">
              <div className="container-custom max-w-3xl">
                <ScrollReveal>
                  <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                    Frequently Asked Questions
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <Accordion type="single" collapsible className="space-y-3">
                    {product.faqs.map((faq, i) => (
                      <AccordionItem
                        key={i}
                        value={`faq-${i}`}
                        className="border border-border rounded-xl px-5 bg-card"
                      >
                        <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollReveal>
              </div>
            </section>
          )}

          {/* Back to Accessories */}
          <section className="py-8 border-t border-border">
            <div className="container-custom text-center">
              <Button variant="outline" asChild>
                <Link to="/accessories">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Accessories
                </Link>
              </Button>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default AccessoryDetailPage;
