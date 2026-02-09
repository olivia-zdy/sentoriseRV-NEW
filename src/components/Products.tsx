import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Products = () => {
  const { t } = useTranslation();
  const featuredProducts = products.slice(0, 4);

  return (
    <section id="products" className="section-padding bg-muted/50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
              {t('products.ourProducts')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl headline-clean text-foreground">
              {t('products.range')}
            </h2>
          </div>
          
          <Button asChild variant="outline" className="group w-fit">
            <Link to="/products">
              {t('products.viewAll')}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
