import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Products = () => {
  // Show featured products (first 4)
  const featuredProducts = products.slice(0, 4);

  return (
    <section id="products" className="section-padding bg-muted/50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
              Our Products
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl headline-clean text-foreground">
              LiFePO₄ Battery Range
            </h2>
          </div>
          
          <Button asChild variant="outline" className="group w-fit">
            <Link to="/products">
              View All Products
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
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
