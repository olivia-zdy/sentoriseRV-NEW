import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, productSeries } from "@/data/products";
import { Button } from "@/components/ui/button";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const seriesFilter = searchParams.get("series");
  const [selectedSeries, setSelectedSeries] = useState<string | null>(seriesFilter);

  const filteredProducts = selectedSeries
    ? products.filter(p => p.series.toLowerCase() === selectedSeries.toLowerCase())
    : products;

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-muted/50 border-b border-border">
          <div className="container-custom">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Products</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              LiFePO₄ Battery Range
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              From compact 6Ah emergency backups to powerful 200Ah heated systems — 
              find the perfect battery for your adventure.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-6 border-b border-border">
          <div className="container-custom">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground mr-2">Series:</span>
              <Button
                variant={selectedSeries === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSeries(null)}
              >
                All ({products.length})
              </Button>
              {productSeries.map((series) => (
                <Button
                  key={series.name}
                  variant={selectedSeries?.toLowerCase() === series.name.toLowerCase() ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSeries(series.name)}
                >
                  {series.name} ({series.products.length})
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No products found in this series.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
