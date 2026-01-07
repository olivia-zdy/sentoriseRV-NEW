import { useState } from "react";
import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

// Import real images
import heroImage from "@/assets/hero-battery.jpg";
import rvImage from "@/assets/product-rv-battery.jpg";
import portableImage from "@/assets/product-portable.jpg";
import wallImage from "@/assets/product-wall-battery.jpg";
import industrialImage from "@/assets/product-industrial.jpg";
import product100ahStd from "@/assets/product-100ah-std.png";
import product200ahHeated from "@/assets/product-200ah-heated.png";

const blogPosts = [
  {
    id: "1",
    title: "Complete Guide to Choosing the Right RV Battery",
    excerpt: "Learn how to select the perfect LiFePO4 battery for your motorhome or caravan based on your energy needs, space constraints, and budget.",
    category: "Guides",
    tags: ["RV", "LiFePO4", "Buying Guide"],
    author: "Sentorise Team",
    date: "2025-01-15",
    readTime: 8,
    image: rvImage,
  },
  {
    id: "2",
    title: "Winter Camping: How to Keep Your Batteries Warm",
    excerpt: "Cold weather can significantly impact battery performance. Discover strategies to maintain optimal charging in sub-zero temperatures.",
    category: "Tips",
    tags: ["Winter", "Cold Weather", "Maintenance"],
    author: "Technical Team",
    date: "2025-01-10",
    readTime: 5,
    image: product200ahHeated,
  },
  {
    id: "3",
    title: "Solar + Battery: Sizing Your Off-Grid System",
    excerpt: "A step-by-step calculator and guide to determine the right solar panel and battery capacity for your off-grid adventures.",
    category: "Guides",
    tags: ["Solar", "Off-Grid", "DIY"],
    author: "Sentorise Team",
    date: "2025-01-05",
    readTime: 10,
    image: wallImage,
  },
  {
    id: "4",
    title: "LiFePO4 vs Lead-Acid: The Complete Comparison",
    excerpt: "Understand the key differences between lithium iron phosphate and traditional lead-acid batteries for RV and solar applications.",
    category: "Education",
    tags: ["LiFePO4", "Lead-Acid", "Comparison"],
    author: "Technical Team",
    date: "2024-12-28",
    readTime: 7,
    image: heroImage,
  },
  {
    id: "5",
    title: "Understanding Battery Management Systems (BMS)",
    excerpt: "What is a BMS and why is it critical for your lithium battery's safety and longevity? A deep dive into smart protection.",
    category: "Education",
    tags: ["BMS", "Safety", "Technology"],
    author: "Technical Team",
    date: "2024-12-20",
    readTime: 6,
    image: product100ahStd,
  },
  {
    id: "6",
    title: "Van Life Power Setup: Real Customer Builds",
    excerpt: "Explore how Sentorise customers have installed their battery systems in Sprinters, Transits, and other popular van conversions.",
    category: "Stories",
    tags: ["Van Life", "Customer Stories", "Installations"],
    author: "Community",
    date: "2024-12-15",
    readTime: 12,
    image: portableImage,
  },
  {
    id: "7",
    title: "Marine Battery Installation: Best Practices",
    excerpt: "Essential tips for installing lithium batteries on boats, including ventilation, mounting, and saltwater protection.",
    category: "Guides",
    tags: ["Marine", "Installation", "Boats"],
    author: "Technical Team",
    date: "2024-12-10",
    readTime: 9,
    image: industrialImage,
  },
  {
    id: "8",
    title: "Extending Battery Lifespan: Charging Tips",
    excerpt: "Learn the optimal charging practices that can help your LiFePO4 battery last even longer than its 4000+ cycle rating.",
    category: "Tips",
    tags: ["Charging", "Maintenance", "Lifespan"],
    author: "Sentorise Team",
    date: "2024-12-05",
    readTime: 5,
    image: wallImage,
  },
];

const categories = ["All", "Guides", "Tips", "Education", "Stories"];

const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filteredPosts = blogPosts.filter(post => {
    const categoryMatch = activeCategory === "All" || post.category === activeCategory;
    const tagMatch = activeTags.length === 0 || activeTags.some(tag => post.tags.includes(tag));
    return categoryMatch && tagMatch;
  });

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

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
              <span className="text-foreground">Blog</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Knowledge Hub
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Guides, tips, and insights for RV owners, vanlifers, and off-grid enthusiasts. 
              Learn how to get the most from your power system.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 border-b border-border">
          <div className="container-custom">
            <div className="flex flex-wrap gap-3 mb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                    activeTags.includes(tag)
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-background text-muted-foreground border-border hover:border-primary/30"
                  }`}
                >
                  {tag}
                </button>
              ))}
              {activeTags.length > 0 && (
                <button
                  onClick={() => setActiveTags([])}
                  className="text-xs text-muted-foreground hover:text-foreground underline ml-2"
                >
                  Clear tags
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="section-padding">
          <div className="container-custom">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No posts found matching your filters.</p>
                <button
                  onClick={() => { setActiveCategory("All"); setActiveTags([]); }}
                  className="text-primary hover:underline mt-2"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all"
                  >
                    {/* Image - 16:9 aspect ratio */}
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {post.readTime} min read
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
