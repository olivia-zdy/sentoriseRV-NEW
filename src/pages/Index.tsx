import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StandardsBar from "@/components/StandardsBar";
import SceneNavigation from "@/components/SceneNavigation";
import Features from "@/components/Features";
import DecisionSupport from "@/components/DecisionSupport";
import Products from "@/components/Products";
import TrustStats from "@/components/TrustStats";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import PageMeta from "@/components/PageMeta";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Premium LiFePO₄ Batteries for RV, Vanlife & Off-Grid | Sentorise" 
        description="5-year warranty, 4000+ cycles, CE certified. Premium LiFePO4 batteries designed for European RV, vanlife, and off-grid solar users. Berlin-based support." 
      />
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero: Clear audience + differentiation + decision-oriented CTAs */}
        <Hero />
        
        {/* Trust Bar: Immediate credibility after hero */}
        <StandardsBar />
        
        {/* Scene Navigation: "Find Your Battery" pathway */}
        <SceneNavigation />
        
        {/* Features: Reordered - Trust → Compatibility → Performance */}
        <Features />
        
        {/* Decision Support: Who is this NOT for, comparisons, risk handling */}
        <DecisionSupport />
        
        {/* Products: Now user is ready to look at specific products */}
        <Products />
        
        {/* Social Proof */}
        <TrustStats />
        <Testimonials />
        
        {/* Conversion */}
        <Newsletter />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
