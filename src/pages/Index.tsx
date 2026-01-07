import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StandardsBar from "@/components/StandardsBar";
import SceneNavigation from "@/components/SceneNavigation";
import Products from "@/components/Products";
import Features from "@/components/Features";
import TrustStats from "@/components/TrustStats";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <StandardsBar />
        <SceneNavigation />
        <Features />
        <Products />
        <TrustStats />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
