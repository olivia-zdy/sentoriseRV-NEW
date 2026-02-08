import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Page Not Found | Sentorise"
        description="The page you're looking for doesn't exist. Browse our LiFePO₄ batteries or contact support."
      />
      <AnnouncementBar />
      <Header />
      <main className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center py-16 md:py-24">
            {/* Large 404 */}
            <h1 className="text-8xl md:text-9xl font-bold text-primary/20 mb-4 select-none">
              404
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Page Not Found
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              Let us help you find what you need.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button asChild size="lg">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/products">
                  <Search className="w-4 h-4 mr-2" />
                  Browse Products
                </Link>
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <Link 
                to="/support" 
                className="p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
              >
                <p className="font-semibold text-foreground mb-1">Support Center</p>
                <p className="text-muted-foreground">FAQs & contact</p>
              </Link>
              <Link 
                to="/battery-selector" 
                className="p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
              >
                <p className="font-semibold text-foreground mb-1">Battery Selector</p>
                <p className="text-muted-foreground">Find the right battery</p>
              </Link>
              <Link 
                to="/blog" 
                className="p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
              >
                <p className="font-semibold text-foreground mb-1">Knowledge Hub</p>
                <p className="text-muted-foreground">Guides & tips</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
