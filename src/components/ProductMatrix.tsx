import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMarket } from "@/context/MarketContext";
import ScrollReveal from "@/components/ScrollReveal";

const ProductMatrix = () => {
  const { t } = useTranslation();
  const { formatPrice } = useMarket();

  const capacityOptions = [
    {
      capacity: "6Ah",
      energy: "76.8Wh",
      typical: t('productMatrix.typical6', 'Portable devices, fish finders'),
      productId: "lite-12v6",
      price: 39.99,
      badge: null,
    },
    {
      capacity: "50Ah",
      energy: "640Wh",
      typical: t('productMatrix.typical50', 'Weekend trips, small systems'),
      productId: "lite-12v50",
      price: 129.99,
      badge: null,
    },
    {
      capacity: "100Ah",
      energy: "1280Wh",
      typical: t('productMatrix.typical100', 'Daily RV/van use, most popular'),
      productId: "core-12v100-std",
      price: 279.99,
      badge: t('productMatrix.mostPopular', 'Most Popular'),
    },
    {
      capacity: "100Ah",
      energy: "1280Wh",
      typical: t('productMatrix.typical100mini', 'Compact spaces, DIN H8 fit'),
      productId: "core-12v100-mini",
      price: 299.99,
      badge: t('productMatrix.compact', 'Compact'),
      label: "Mini",
    },
    {
      capacity: "200Ah",
      energy: "2560Wh",
      typical: t('productMatrix.typical200', 'Heavy use, cold climates, off-grid'),
      productId: "plus-12v200-heated",
      price: 699.99,
      badge: t('productMatrix.selfHeating', 'Self-Heating'),
    },
  ];

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
          {capacityOptions.map((option, index) => (
            <ScrollReveal key={option.productId} delay={index * 0.08}>
              <Link
                to={`/product/${option.productId}`}
                className="group relative bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-lg transition-all flex flex-col h-full"
              >
                {/* Badge */}
                {option.badge && (
                  <span className="absolute -top-3 left-4 px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                    {option.badge}
                  </span>
                )}

                {/* Capacity Display */}
                <div className="text-center mb-3 pt-2">
                  <span className="text-3xl md:text-4xl font-bold text-foreground">
                    {option.capacity.replace("Ah", "")}
                  </span>
                  <span className="text-lg text-muted-foreground">Ah</span>
                  {"label" in option && option.label && (
                    <span className="ml-1 text-sm font-medium text-primary">{option.label}</span>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {option.energy}
                  </p>
                </div>

                {/* Typical Use */}
                <p className="text-xs text-center text-muted-foreground mb-3 flex-1">
                  {option.typical}
                </p>

                {/* Price */}
                <p className="text-center text-lg font-bold text-foreground mb-3">
                  {formatPrice(option.price)}
                </p>

                {/* CTA */}
                <div className="flex items-center justify-center text-xs font-medium text-primary group-hover:underline">
                  {t('productMatrix.viewDetails', 'View Details')}
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
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
