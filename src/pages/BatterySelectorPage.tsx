import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BatterySelector from "@/components/BatterySelector";
import PageMeta from "@/components/PageMeta";
import { ArrowLeft } from "lucide-react";

const BatterySelectorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Find Your Perfect Battery | Sentorise Battery Selector" 
        description="Answer a few questions to find the ideal LiFePO4 battery for your RV, van, solar system, or marine application. Personalized recommendations based on your needs." 
      />
      <AnnouncementBar />
      <Header />
      <main className="section-padding">
        <div className="container-custom max-w-4xl">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Page Header */}
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
              Battery Finder
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl headline-clean text-foreground mb-4">
              Find Your Perfect Battery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Answer 4 quick questions and we'll recommend the best Sentorise battery for your needs.
            </p>
          </div>

          {/* Battery Selector */}
          <BatterySelector />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BatterySelectorPage;
