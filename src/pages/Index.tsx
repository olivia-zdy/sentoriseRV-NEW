import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import CoreValueModules from "@/components/CoreValueModules";
import ProductMatrix from "@/components/ProductMatrix";
import HomepageFAQ from "@/components/HomepageFAQ";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import PageMeta from "@/components/PageMeta";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Cold-Weather Ready 12V LiFePO₄ Batteries | Sentorise" 
        description="12V LiFePO4 batteries with low-temperature protection for RV, vanlife, and off-grid solar. 5-year warranty, Bluetooth monitoring, Berlin-based support." 
      />
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero: Category + Differentiator + CTAs */}
        <Hero />
        
        {/* Trust Badges: Immediate credibility */}
        <TrustBadges />
        
        {/* Core Values: 3 modules with scenario-risk-solution-boundary */}
        <CoreValueModules />
        
        {/* Product Matrix: Quick capacity selection */}
        <ProductMatrix />
        
        {/* FAQ: 4 key purchase decision questions */}
        <HomepageFAQ />
        
        {/* Social Proof */}
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
