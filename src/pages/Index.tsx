import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Products />
      <Features />
      <Stats />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
