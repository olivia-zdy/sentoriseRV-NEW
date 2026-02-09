import PageTransition from "@/components/PageTransition";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import CoreValueModules from "@/components/CoreValueModules";
import VerifiableTrust from "@/components/VerifiableTrust";
import ProductMatrix from "@/components/ProductMatrix";
import MediaCoverageBar from "@/components/MediaCoverageBar";
import ShopifyProductGrid from "@/components/ShopifyProductGrid";

import HomepageFAQ from "@/components/HomepageFAQ";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import PageMeta from "@/components/PageMeta";
import OrganizationSchema from "@/components/SEO/OrganizationSchema";
import FAQSchema from "@/components/SEO/FAQSchema";

const homepageFaqs = [
  {
    question: "How long does a LiFePO4 battery last?",
    answer: "LiFePO4 batteries typically last 3000-5000 charge cycles, which translates to 10-15 years of regular use. This is significantly longer than traditional lead-acid batteries which only last 300-500 cycles."
  },
  {
    question: "Can I use LiFePO4 batteries in cold weather?",
    answer: "Yes, Sentorise batteries feature built-in low-temperature protection that prevents charging below freezing to protect battery cells. Our heated models can safely charge down to -20°C."
  },
  {
    question: "Are LiFePO4 batteries safe?",
    answer: "LiFePO4 is the safest lithium battery chemistry available. Unlike other lithium types, they don't catch fire or explode, even under extreme conditions. All Sentorise batteries include BMS protection against overcharge, over-discharge, and short circuits."
  },
  {
    question: "What size battery do I need for my RV?",
    answer: "Battery size depends on your power consumption. For basic RV use (lights, phone charging, small appliances), 100Ah is sufficient. For full-time living with larger loads, 200-400Ah is recommended. Use our battery selector tool for personalized recommendations."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Cold-Weather Ready 12V LiFePO₄ Batteries" 
        description="12V LiFePO4 batteries with low-temperature protection for RV, vanlife, and off-grid solar. 5-year warranty, Bluetooth monitoring, Berlin-based support."
        canonical="/"
      />
      <OrganizationSchema />
      <FAQSchema faqs={homepageFaqs} />
      
      <AnnouncementBar />
      <Header />
      <PageTransition>
      <main>
        {/* Hero: Category + Differentiator + CTAs */}
        <Hero />
        
        {/* Trust Badges: Immediate credibility */}
        <TrustBadges />
        
        {/* Core Values: 3 modules with scenario-risk-solution-boundary */}
        <CoreValueModules />
        
        {/* Verifiable Trust: Contact SLA, Warranty, Certifications */}
        <VerifiableTrust />
        
        {/* Product Matrix: Quick capacity selection */}
        <ProductMatrix />
        
        
        
        
        {/* FAQ: 4 key purchase decision questions */}
        <HomepageFAQ />
        
        {/* Media Coverage */}
        <MediaCoverageBar />
        
        {/* Social Proof */}
        <Testimonials />
        
        {/* Conversion */}
        <Newsletter />
      </main>
      </PageTransition>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
