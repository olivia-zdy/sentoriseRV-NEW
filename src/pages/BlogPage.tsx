import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    title: "Complete Guide to Choosing the Right RV Battery",
    excerpt: "Learn how to select the perfect LiFePO4 battery for your motorhome or caravan based on your energy needs, space constraints, and budget.",
    category: "Guides",
    author: "Sentorise Team",
    date: "2025-01-15",
    readTime: "8 min read",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Winter Camping: How to Keep Your Batteries Warm",
    excerpt: "Cold weather can significantly impact battery performance. Discover strategies to maintain optimal charging in sub-zero temperatures.",
    category: "Tips",
    author: "Technical Team",
    date: "2025-01-10",
    readTime: "5 min read",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    title: "Solar + Battery: Sizing Your Off-Grid System",
    excerpt: "A step-by-step calculator and guide to determine the right solar panel and battery capacity for your off-grid adventures.",
    category: "Guides",
    author: "Sentorise Team",
    date: "2025-01-05",
    readTime: "10 min read",
    image: "/placeholder.svg",
  },
  {
    id: "4",
    title: "LiFePO4 vs Lead-Acid: The Complete Comparison",
    excerpt: "Understand the key differences between lithium iron phosphate and traditional lead-acid batteries for RV and solar applications.",
    category: "Education",
    author: "Technical Team",
    date: "2024-12-28",
    readTime: "7 min read",
    image: "/placeholder.svg",
  },
  {
    id: "5",
    title: "Understanding Battery Management Systems (BMS)",
    excerpt: "What is a BMS and why is it critical for your lithium battery's safety and longevity? A deep dive into smart protection.",
    category: "Education",
    author: "Technical Team",
    date: "2024-12-20",
    readTime: "6 min read",
    image: "/placeholder.svg",
  },
  {
    id: "6",
    title: "Van Life Power Setup: Real Customer Builds",
    excerpt: "Explore how Sentorise customers have installed their battery systems in Sprinters, Transits, and other popular van conversions.",
    category: "Stories",
    author: "Community",
    date: "2024-12-15",
    readTime: "12 min read",
    image: "/placeholder.svg",
  },
];

const categories = ["All", "Guides", "Tips", "Education", "Stories"];

const BlogPage = () => {
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
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    category === "All"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  {/* Image */}
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {post.category}
                    </span>
                    <h2 className="text-lg font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
