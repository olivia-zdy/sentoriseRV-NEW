import { useState, useEffect } from "react";
import { fetchShopifyProducts, ShopifyProduct } from "@/lib/shopify";
import ShopifyProductCard from "./ShopifyProductCard";
import LocalProductCard from "./LocalProductCard";
import { products as localProducts } from "@/data/products";
import { Loader2 } from "lucide-react";

interface ShopifyProductGridProps {
  limit?: number;
  title?: string;
  subtitle?: string;
}

export const ShopifyProductGrid = ({ 
  limit = 10, 
  title = "Our Batteries",
  subtitle = "LiFePO₄ batteries designed for European winters"
}: ShopifyProductGridProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  const loadProducts = async () => {
    setIsLoading(true);
    setUseFallback(false);
    try {
      const data = await fetchShopifyProducts(limit);
      if (data.length === 0) {
        setUseFallback(true);
      } else {
        setProducts(data);
      }
    } catch {
      setUseFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [limit]);

  if (isLoading) {
    return (
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading products...</span>
          </div>
        </div>
      </section>
    );
  }

  const displayProducts = useFallback ? localProducts.slice(0, limit) : [];

  return (
    <section id="shop" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
            Shop
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useFallback
            ? displayProducts.map((product) => (
                <LocalProductCard key={product.id} product={product} />
              ))
            : products.map((product) => (
                <ShopifyProductCard key={product.node.id} product={product} />
              ))
          }
        </div>
      </div>
    </section>
  );
};

export default ShopifyProductGrid;
