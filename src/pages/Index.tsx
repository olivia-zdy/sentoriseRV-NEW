import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StandardsBar from "@/components/StandardsBar";
import MediaTrustBar from "@/components/MediaTrustBar";
import SceneNavigation from "@/components/SceneNavigation";
import Products from "@/components/Products";
import Features from "@/components/Features";
import TrustStats from "@/components/TrustStats";
import Testimonials from "@/components/Testimonials";
import InstagramFeed from "@/components/InstagramFeed";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import PageMeta from "@/components/PageMeta";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Stay Powered. Stay Free." 
        description="Premium LiFePO4 batteries for RV, vanlife and off-grid adventures. 5-year warranty, Bluetooth monitoring, 4000+ cycle life." 
      />
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <StandardsBar />
        <MediaTrustBar />
        <SceneNavigation />
        <Features />
        <Products />
        <TrustStats />
        <Testimonials />
        <InstagramFeed />
        <Newsletter />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
