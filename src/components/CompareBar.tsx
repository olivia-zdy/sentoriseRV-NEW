import { Link } from "react-router-dom";
import { X, ArrowRight, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/context/CompareContext";

const CompareBar = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border shadow-lg animate-slide-up">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Label */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Compare Products
              </p>
              <p className="text-xs text-muted-foreground">
                {compareList.length}/3 selected
              </p>
            </div>
          </div>

          {/* Center: Product Thumbnails */}
          <div className="flex items-center gap-3 flex-1 justify-center">
            {compareList.map((product) => (
              <div
                key={product.id}
                className="relative group"
              >
                <div className="w-16 h-16 rounded-lg border border-border overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {/* Empty slots */}
            {Array.from({ length: 3 - compareList.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="w-16 h-16 rounded-lg border border-dashed border-border bg-muted/50 flex items-center justify-center"
              >
                <span className="text-xs text-muted-foreground">+</span>
              </div>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCompare}
              className="text-muted-foreground"
            >
              Clear
            </Button>
            <Button
              asChild
              size="sm"
              disabled={compareList.length < 2}
              className={compareList.length < 2 ? "opacity-50 pointer-events-none" : ""}
            >
              <Link to="/compare">
                Compare
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
