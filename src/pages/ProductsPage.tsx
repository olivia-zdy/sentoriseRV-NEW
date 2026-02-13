import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PageTransition from "@/components/PageTransition";
import { Link, useSearchParams } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, productSeries } from "@/data/products";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal, X, Battery, Wrench } from "lucide-react";

type SortOption = "price-asc" | "price-desc" | "capacity-asc" | "capacity-desc" | "newest";

const capacityRanges = [
  { id: "small", label: "< 50Ah", min: 0, max: 49 },
  { id: "medium", label: "50-100Ah", min: 50, max: 100 },
  { id: "large", label: "> 100Ah", min: 101, max: Infinity },
];

const priceRanges = [
  { id: "budget", label: "< €200", min: 0, max: 199.99 },
  { id: "mid", label: "€200-400", min: 200, max: 400 },
  { id: "premium", label: "> €400", min: 400.01, max: Infinity },
];

const ProductsPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const seriesFilter = searchParams.get("series");
  const appFilter = searchParams.get("application");

  const [selectedSeries, setSelectedSeries] = useState<string | null>(seriesFilter);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [hasBluetooth, setHasBluetooth] = useState(false);
  const [hasHeating, setHasHeating] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");
  const [showFilters, setShowFilters] = useState(false);

  const parseCapacity = (capacity: string): number => {
    return parseInt(capacity.replace(/[^0-9]/g, "")) || 0;
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedSeries) {
      result = result.filter(p => p.series.toLowerCase() === selectedSeries.toLowerCase());
    }

    if (appFilter) {
      const appKeywords: Record<string, string[]> = {
        rv: ["rv", "motorhome", "caravan"],
        vanlife: ["van", "conversion", "compact"],
        solar: ["solar", "off-grid", "grid"],
        marine: ["marine", "boat", "waterproof"],
        camping: ["camping", "portable", "outdoor"],
        cabin: ["cabin", "home", "backup"],
      };
      const keywords = appKeywords[appFilter] || [];
      if (keywords.length > 0) {
        result = result.filter(p =>
          p.useCases.some(uc => keywords.some(kw => uc.toLowerCase().includes(kw)))
        );
      }
    }

    if (selectedCapacity) {
      const range = capacityRanges.find(r => r.id === selectedCapacity);
      if (range) {
        result = result.filter(p => {
          const cap = parseCapacity(p.capacity);
          return cap >= range.min && cap <= range.max;
        });
      }
    }

    if (selectedPrice) {
      const range = priceRanges.find(r => r.id === selectedPrice);
      if (range) {
        result = result.filter(p => {
          const price = p.salePrice || p.price;
          return price >= range.min && price <= range.max;
        });
      }
    }

    if (hasBluetooth) result = result.filter(p => p.hasBluetooth);
    if (hasHeating) result = result.filter(p => p.hasHeating);

    result.sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;
      const capA = parseCapacity(a.capacity);
      const capB = parseCapacity(b.capacity);

      switch (sortBy) {
        case "price-asc": return priceA - priceB;
        case "price-desc": return priceB - priceA;
        case "capacity-asc": return capA - capB;
        case "capacity-desc": return capB - capA;
        case "newest": return a.isNew ? -1 : b.isNew ? 1 : 0;
        default: return 0;
      }
    });

    return result;
  }, [selectedSeries, selectedCapacity, selectedPrice, hasBluetooth, hasHeating, sortBy, appFilter]);

  const clearFilters = () => {
    setSelectedSeries(null);
    setSelectedCapacity(null);
    setSelectedPrice(null);
    setHasBluetooth(false);
    setHasHeating(false);
    setSearchParams({});
  };

  const hasActiveFilters = selectedSeries || selectedCapacity || selectedPrice || hasBluetooth || hasHeating || appFilter;

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <PageTransition>
      <main>
        {/* Hero Section */}
        <section className="py-10 md:py-14 bg-muted/50 border-b border-border">
          <div className="container-custom">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary">{t('common.home')}</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{t('products.pageTitle')}</span>
              {appFilter && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-foreground capitalize">{appFilter.replace("-", " ")}</span>
                </>
              )}
            </nav>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              {t('products.pageTitle')}
            </h1>
            
            <p className="text-muted-foreground max-w-xl mb-6">
              {t('products.pageSubtitle')}
            </p>

            {/* Category Tabs */}
            <div className="flex gap-2">
              <Link to="/products">
                <Button 
                  variant="default"
                  size="sm" 
                  className="gap-2"
                >
                  <Battery className="w-4 h-4" />
                  {t('products.batteries')}
                </Button>
              </Link>
              <Link to="/accessories">
                <Button 
                  variant="outline"
                  size="sm" 
                  className="gap-2"
                >
                  <Wrench className="w-4 h-4" />
                  {t('products.accessories')}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-6 border-b border-border">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-4 md:hidden">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                {t('products.filters')}
              </Button>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder={t('products.sortBy')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">{t('products.priceLowHigh')}</SelectItem>
                  <SelectItem value="price-desc">{t('products.priceHighLow')}</SelectItem>
                  <SelectItem value="capacity-asc">{t('products.capacitySmall')}</SelectItem>
                  <SelectItem value="capacity-desc">{t('products.capacityLarge')}</SelectItem>
                  <SelectItem value="newest">{t('products.newestFirst')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className={`space-y-4 ${showFilters ? "block" : "hidden md:block"}`}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground mr-2">{t('products.series')}:</span>
                <Button variant={selectedSeries === null ? "default" : "outline"} size="sm" onClick={() => setSelectedSeries(null)}>
                  {t('products.all')} ({products.length})
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

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground mr-2">{t('products.capacity')}:</span>
                <Button variant={selectedCapacity === null ? "default" : "outline"} size="sm" onClick={() => setSelectedCapacity(null)}>
                  {t('products.all')}
                </Button>
                {capacityRanges.map((range) => (
                  <Button key={range.id} variant={selectedCapacity === range.id ? "default" : "outline"} size="sm" onClick={() => setSelectedCapacity(range.id)}>
                    {range.label}
                  </Button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground mr-2">{t('products.series')}:</span>
                <Button variant={selectedPrice === null ? "default" : "outline"} size="sm" onClick={() => setSelectedPrice(null)}>
                  {t('products.all')}
                </Button>
                {priceRanges.map((range) => (
                  <Button key={range.id} variant={selectedPrice === range.id ? "default" : "outline"} size="sm" onClick={() => setSelectedPrice(range.id)}>
                    {range.label}
                  </Button>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Checkbox id="bluetooth" checked={hasBluetooth} onCheckedChange={(checked) => setHasBluetooth(checked as boolean)} />
                    <label htmlFor="bluetooth" className="text-sm text-foreground cursor-pointer">{t('products.bluetooth')}</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="heating" checked={hasHeating} onCheckedChange={(checked) => setHasHeating(checked as boolean)} />
                    <label htmlFor="heating" className="text-sm text-foreground cursor-pointer">{t('products.selfHeating')}</label>
                  </div>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                      <X className="w-4 h-4 mr-1" />
                      {t('products.clearFilters')}
                    </Button>
                  )}
                </div>

                <div className="hidden md:flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{t('products.sortBy')}:</span>
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t('products.sortBy')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">{t('products.priceLowHigh')}</SelectItem>
                      <SelectItem value="price-desc">{t('products.priceHighLow')}</SelectItem>
                      <SelectItem value="capacity-asc">{t('products.capacitySmall')}</SelectItem>
                      <SelectItem value="capacity-desc">{t('products.capacityLarge')}</SelectItem>
                      <SelectItem value="newest">{t('products.newestFirst')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <p className="text-sm text-muted-foreground mb-6">
              {t('products.showing', { count: filteredProducts.length })}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">{t('products.noProducts')}</p>
                <Button variant="outline" onClick={clearFilters}>
                  {t('products.clearAll')}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default ProductsPage;