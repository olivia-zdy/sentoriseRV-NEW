import { Link } from "react-router-dom";
import { Star, Quote, ArrowRight, MapPin } from "lucide-react";
import { customerStories, CustomerStory } from "@/data/customerStories";
import { Button } from "@/components/ui/button";

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

// Map product IDs to product names used in stories
const productNameMap: Record<string, string[]> = {
  "lite-12v6": ["Lite 12V 6Ah"],
  "lite-12v50": ["Lite 12V 50Ah", "Lite 12V 50Ah Lightweight"],
  "core-12v100-std": ["Core 12V 100Ah", "Core 12V 100Ah Standard"],
  "core-12v100-mini": ["Core 12V 100Ah MINI"],
  "core-12v100-din": ["Core 12V 100Ah DIN H8", "Core 12V 100Ah DIN"],
  "plus-12v200-heated": ["Plus 12V 200Ah", "Plus 12V 200Ah Heated"],
};

const getRelevantStories = (productId: string): CustomerStory[] => {
  const productNames = productNameMap[productId] || [];
  
  // Find stories that mention this product
  const directMatches = customerStories.filter(story =>
    story.productsUsed.some(product =>
      productNames.some(name => product.toLowerCase().includes(name.toLowerCase()))
    )
  );

  // If no direct matches, return stories from similar use cases
  if (directMatches.length === 0) {
    // Return 2 random stories as general social proof
    return customerStories.slice(0, 2);
  }

  return directMatches.slice(0, 3);
};

const ProductReviews = ({ productId, productName }: ProductReviewsProps) => {
  const relevantStories = getRelevantStories(productId);

  if (relevantStories.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Customer Experiences
              </h2>
              <p className="text-muted-foreground">
                Real stories from Sentorise users across Europe
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link to="/stories" className="gap-2">
                All Stories
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relevantStories.map((story) => (
              <div
                key={story.id}
                className="group relative bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Quote className="w-4 h-4 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < story.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-4">
                  "{story.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  {/* Avatar Placeholder */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-semibold">
                    {story.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">
                      {story.name}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {story.location} • {story.scenarioLabel}
                    </p>
                  </div>
                </div>

                {/* Products Used */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {story.productsUsed.slice(0, 2).map((product, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground"
                    >
                      {product}
                    </span>
                  ))}
                </div>

                {/* Read More Link */}
                <Link
                  to={`/stories#${story.id}`}
                  className="mt-4 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  Read full story
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-6 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link to="/stories" className="gap-2">
                View All Customer Stories
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Trust Summary */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {customerStories.slice(0, 4).map((story, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-xs font-semibold text-primary"
                  >
                    {story.name.charAt(0)}
                  </div>
                ))}
              </div>
              <span>Join {customerStories.length}+ verified users</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-medium text-foreground">4.9/5</span>
              <span>average rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
