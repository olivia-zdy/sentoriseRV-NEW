import { Link } from "react-router-dom";
import { ArrowLeft, Check, X, Bluetooth, Flame, Trash2 } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/context/CompareContext";

const specRows = [
  { key: "voltage", label: "Voltage" },
  { key: "capacity", label: "Capacity" },
  { key: "energy", label: "Energy" },
  { key: "bms", label: "BMS Rating" },
  { key: "dimensions", label: "Dimensions" },
  { key: "weight", label: "Weight" },
];

const ComparePage = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  const getSpec = (product: any, key: string) => {
    const spec = product.specs?.find((s: any) => 
      s.label.toLowerCase().includes(key.toLowerCase())
    );
    return spec?.value || product[key] || "—";
  };

  const getCycleLife = (product: any) => {
    const spec = product.specs?.find((s: any) => 
      s.label.toLowerCase().includes("cycle")
    );
    return spec?.value || "4000+ cycles";
  };

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <Header />
        <main className="section-padding">
          <div className="container-custom text-center py-20">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              No Products to Compare
            </h1>
            <p className="text-muted-foreground mb-6">
              Add products to compare by clicking the compare button on product cards.
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Compare Batteries | Sentorise"
        description="Compare Sentorise LiFePO₄ battery specifications side by side. Find the best battery for your needs."
      />
      <AnnouncementBar />
      <Header />
      <main>
        {/* Header */}
        <section className="py-8 bg-muted/50 border-b border-border">
          <div className="container-custom">
            <div className="flex items-center justify-between">
              <div>
                <Link
                  to="/products"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Products
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Compare Products
                </h1>
              </div>
              <Button variant="outline" size="sm" onClick={clearCompare}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                {/* Product Headers */}
                <thead>
                  <tr>
                    <th className="w-48 p-4 text-left text-sm font-semibold text-muted-foreground">
                      Specification
                    </th>
                    {compareList.map((product) => (
                      <th key={product.id} className="p-4 text-center min-w-[200px]">
                        <div className="relative">
                          <button
                            onClick={() => removeFromCompare(product.id)}
                            className="absolute -top-2 right-0 w-6 h-6 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <div className="w-32 h-32 mx-auto mb-3 rounded-lg overflow-hidden bg-muted">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-xs text-primary font-semibold uppercase mb-1">
                            {product.series} Series
                          </p>
                          <Link
                            to={`/product/${product.id}`}
                            className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {product.name}
                          </Link>
                          <p className="text-lg font-bold text-primary mt-2">
                            €{product.salePrice?.toFixed(2) || product.price.toFixed(2)}
                          </p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Basic Specs */}
                  {specRows.map((row) => (
                    <tr key={row.key} className="border-t border-border">
                      <td className="p-4 text-sm font-medium text-muted-foreground">
                        {row.label}
                      </td>
                      {compareList.map((product) => (
                        <td key={product.id} className="p-4 text-center text-sm text-foreground">
                          {getSpec(product, row.key)}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Cycle Life */}
                  <tr className="border-t border-border">
                    <td className="p-4 text-sm font-medium text-muted-foreground">
                      Cycle Life
                    </td>
                    {compareList.map((product) => (
                      <td key={product.id} className="p-4 text-center text-sm text-foreground">
                        {getCycleLife(product)}
                      </td>
                    ))}
                  </tr>

                  {/* Bluetooth */}
                  <tr className="border-t border-border">
                    <td className="p-4 text-sm font-medium text-muted-foreground">
                      Bluetooth Monitoring
                    </td>
                    {compareList.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        {product.hasBluetooth ? (
                          <div className="inline-flex items-center gap-1 text-primary">
                            <Bluetooth className="w-4 h-4" />
                            <Check className="w-4 h-4" />
                          </div>
                        ) : (
                          <X className="w-4 h-4 text-muted-foreground mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Self-Heating */}
                  <tr className="border-t border-border">
                    <td className="p-4 text-sm font-medium text-muted-foreground">
                      Self-Heating
                    </td>
                    {compareList.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        {product.hasHeating ? (
                          <div className="inline-flex items-center gap-1 text-orange-500">
                            <Flame className="w-4 h-4" />
                            <Check className="w-4 h-4" />
                          </div>
                        ) : (
                          <X className="w-4 h-4 text-muted-foreground mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Use Cases */}
                  <tr className="border-t border-border">
                    <td className="p-4 text-sm font-medium text-muted-foreground">
                      Recommended For
                    </td>
                    {compareList.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {product.useCases.slice(0, 3).map((useCase, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
                            >
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* CTA */}
                  <tr className="border-t border-border">
                    <td className="p-4"></td>
                    {compareList.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <Button asChild size="sm" className="w-full max-w-[160px]">
                          <Link to={`/product/${product.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ComparePage;
