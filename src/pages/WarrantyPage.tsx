import { useTranslation } from "react-i18next";
import PageTransition from "@/components/PageTransition";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import WarrantyRegistrationForm from "@/components/WarrantyRegistrationForm";
import WarrantyLookup from "@/components/WarrantyLookup";
import { Shield, CheckCircle2, Clock, Truck, Search, FileEdit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WarrantyPage = () => {
  const { t } = useTranslation();

  const coveredItems = t('warranty.coveredItems', { returnObjects: true }) as string[];
  const notCoveredItems = t('warranty.notCoveredItems', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title={t('warranty.pageTitle')} 
        description={t('warranty.pageSubtitle')} 
      />
      <AnnouncementBar />
      <Header />
      
      <PageTransition>
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container-custom text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('warranty.pageTitle')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('warranty.pageSubtitle')}
            </p>
          </div>
        </section>

        {/* Benefits Bar */}
        <section className="border-b bg-muted/30">
          <div className="container-custom py-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, titleKey: "warranty.coverage", descKey: "warranty.coverageDesc" },
                { icon: CheckCircle2, titleKey: "warranty.freeReplacement", descKey: "warranty.freeReplacementDesc" },
                { icon: Clock, titleKey: "warranty.quickProcessing", descKey: "warranty.quickProcessingDesc" },
                { icon: Truck, titleKey: "warranty.euService", descKey: "warranty.euServiceDesc" },
              ].map((item) => (
                <div key={item.titleKey} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t(item.titleKey)}</p>
                    <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Form & Lookup Tabs */}
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <Tabs defaultValue="register" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="register" className="gap-2">
                    <FileEdit className="w-4 h-4" />
                    {t('warranty.registerTab')}
                  </TabsTrigger>
                  <TabsTrigger value="lookup" className="gap-2">
                    <Search className="w-4 h-4" />
                    {t('warranty.lookupTab')}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="register">
                  <div className="bg-card rounded-2xl border shadow-sm p-6 md:p-10">
                    <WarrantyRegistrationForm />
                  </div>
                </TabsContent>
                
                <TabsContent value="lookup">
                  <div className="bg-card rounded-2xl border shadow-sm p-6 md:p-10">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-foreground mb-2">
                        {t('warranty.lookupTitle')}
                      </h2>
                      <p className="text-muted-foreground">
                        {t('warranty.lookupSubtitle')}
                      </p>
                    </div>
                    <WarrantyLookup />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Warranty Info */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t('warranty.coveredTitle')}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {t('warranty.covered')}
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {Array.isArray(coveredItems) && coveredItems.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-destructive">
                    <span className="w-5 h-5 flex items-center justify-center">✕</span>
                    {t('warranty.notCovered')}
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {Array.isArray(notCoveredItems) && notCoveredItems.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> {t('warranty.registrationNote')}{" "}
                  <a href="mailto:support@sentorise.com" className="text-primary hover:underline">
                    support@sentorise.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      </PageTransition>
      
      <Footer />
    </div>
  );
};

export default WarrantyPage;