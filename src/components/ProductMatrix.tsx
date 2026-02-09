import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMarket } from "@/context/MarketContext";
import { products } from "@/data/products";
import ScrollReveal from "@/components/ScrollReveal";

// Select representative products for the capacity matrix
const matrixProductIds = [
  "lite-12v6",
  "lite-12v50",
  "core-12v100-std",
  "core-12v100-mini",
  "plus-12v200-heated",
];

const ProductMatrix = () => {
  const { t } = useTranslation();
  const { formatPrice } = useMarket();

  const matrixProducts = matrixProductIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {t('productMatrix.title', 'Choose Your Capacity')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t('productMatrix.subtitle', 'All models include Bluetooth monitoring, low-temp protection, and 5-year warranty.')}
          </p>
        </div>

        {/* Capacity Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {matrixProducts.map((product, index) => {
            if (!product) return null;
            const discountPercent = product.salePrice
              ? Math.round((1 - product.salePrice / product.price) * 100)
              : null;
            const displayLabel = product.id === "core-12v100-mini" ? "Mini" : null;

            return (
              <ScrollReveal key={product.id} delay={index * 0.08}>
                <Link
                  to={`/product/${product.id}`}
                  className="group relative bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-lg transition-all flex flex-col h-full"
                >
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute -top-3 left-4 px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                      {product.badge}
                    </span>
                  )}

                  {/* Discount Badge */}
                  {discountPercent && (
                    <Badge className="absolute -top-3 right-4 bg-red-500 text-white text-xs font-bold">
                      -{discountPercent}%
                    </Badge>
                  )}

                  {/* Capacity Display */}
                  <div className="text-center mb-3 pt-2">
                    <span className="text-3xl md:text-4xl font-bold text-foreground">
                      {product.capacity.replace("Ah", "")}
                    </span>
                    <span className="text-lg text-muted-foreground">Ah</span>
                    {displayLabel && (
                      <span className="ml-1 text-sm font-medium text-primary">{displayLabel}</span>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {product.energy}
                    </p>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs text-center text-muted-foreground mb-3 flex-1">
                    {t(`productNames.${product.id}.tagline`, { defaultValue: product.tagline })}
                  </p>

                  {/* Price */}
                  <div className="text-center mb-3">
                    {product.salePrice ? (
                      <>
                        <span className="text-lg font-bold text-primary">{formatPrice(product.salePrice)}</span>
                        <span className="text-xs text-muted-foreground line-through ml-2">{formatPrice(product.price)}</span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-center text-xs font-medium text-primary group-hover:underline">
                    {t('productMatrix.viewDetails', 'View Details')}
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Secondary Links */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="outline">
            <Link to="/products">{t('productMatrix.viewAll', 'View All 6 Models')}</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/battery-selector">{t('productMatrix.calculator', 'Not sure? Use capacity calculator →')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductMatrix;
