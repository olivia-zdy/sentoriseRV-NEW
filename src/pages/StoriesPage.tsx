import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Quote } from "lucide-react";
import { customerStories } from "@/data/customerStories";
import { glassIconClass } from "@/lib/utils";

// Import dedicated scene images
import rvScene from "@/assets/scene-rv.jpg";
import vanScene from "@/assets/scene-vanlife.jpg";
import solarScene from "@/assets/scene-solar.jpg";
import marineScene from "@/assets/scene-marine.jpg";
import campScene from "@/assets/scene-camping.jpg";
import cabinScene from "@/assets/scene-cabin.jpg";

const sceneImages: Record<string, string> = {
  rv: rvScene,
  vanlife: vanScene,
  solar: solarScene,
  marine: marineScene,
  camping: campScene,
  cabin: cabinScene,
};

const StoriesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Customer Stories | Sentorise"
        description="Discover how adventurers across Europe power their journeys with Sentorise LiFePO₄ batteries. Real stories from RV, van life, solar, and marine users."
      />
      <AnnouncementBar />
      <Header />
      <PageTransition>
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-muted/50 border-b border-border">
          <div className="container-custom">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Customer Stories</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Real Stories from Our Community
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover how adventurers across Europe and beyond power their journeys 
              with Sentorise batteries.
            </p>
          </div>
        </section>

        {/* Featured Story */}
        <section className="relative min-h-[60vh] flex items-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${rvScene})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          
          <div className="container-custom relative z-10 py-16">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-primary text-sm font-medium mb-6">
                Featured Story
              </span>
              
              <div className={`${glassIconClass} mb-6`}>
                <Quote className="w-6 h-6 text-primary" />
              </div>
              
              <blockquote className="text-2xl md:text-3xl text-white font-medium leading-relaxed mb-8">
                "{customerStories[0].quote}"
              </blockquote>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {customerStories[0].name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold">{customerStories[0].name}</p>
                  <p className="text-white/70 text-sm">{customerStories[0].scenarioLabel} • {customerStories[0].location}</p>
                </div>
                <div className="flex gap-1 ml-auto">
                  {[...Array(customerStories[0].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {customerStories[0].productsUsed.map((product) => (
                  <span key={product} className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm">
                    {product}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Stories Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                More Stories from Our Users
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From Nordic van lifers to Mediterranean sailors, our community spans the continent.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customerStories.slice(1).map((story) => (
                <article 
                  key={story.id}
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  {/* Story Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={sceneImages[story.scenario]}
                      alt={story.scenarioLabel}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 px-2 py-1 bg-primary/90 rounded text-xs font-medium text-primary-foreground">
                      {story.scenarioLabel}
                    </span>
                  </div>

                  {/* Story Content */}
                  <div className="p-6">
                    {/* Rating */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-foreground leading-relaxed mb-4 line-clamp-4">
                      "{story.quote}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">
                          {story.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{story.name}</p>
                        <p className="text-xs text-muted-foreground">{story.location}</p>
                      </div>
                    </div>

                    {/* Products Used */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {story.productsUsed.slice(0, 2).map((product) => (
                        <span key={product} className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Share Your Story
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Are you a Sentorise user? We'd love to hear about your adventures and how 
              our batteries power your journey. Share your story and inspire others.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg">
                Submit Your Story
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/products">
                  Explore Products
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default StoriesPage;
