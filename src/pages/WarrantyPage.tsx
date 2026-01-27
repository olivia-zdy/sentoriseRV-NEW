import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import WarrantyRegistrationForm from "@/components/WarrantyRegistrationForm";
import WarrantyLookup from "@/components/WarrantyLookup";
import { Shield, CheckCircle2, Clock, Truck, Search, FileEdit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WarrantyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Register Your 5-Year Warranty" 
        description="Register your Sentorise LiFePO₄ battery for 5 years of comprehensive warranty coverage. Quick and easy online registration." 
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container-custom text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              5-Year Warranty Registration
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Protect your investment with our comprehensive 5-year warranty. 
              Register your Sentorise battery in just 2 minutes.
            </p>
          </div>
        </section>

        {/* Benefits Bar */}
        <section className="border-b bg-muted/30">
          <div className="container-custom py-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">5-Year Coverage</p>
                  <p className="text-sm text-muted-foreground">Full warranty protection</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Free Replacement</p>
                  <p className="text-sm text-muted-foreground">For manufacturing defects</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Quick Processing</p>
                  <p className="text-sm text-muted-foreground">Fast claim resolution</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">EU-Wide Service</p>
                  <p className="text-sm text-muted-foreground">Berlin-based support</p>
                </div>
              </div>
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
                    Register Warranty
                  </TabsTrigger>
                  <TabsTrigger value="lookup" className="gap-2">
                    <Search className="w-4 h-4" />
                    Check Status
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
                        Check Your Warranty Status
                      </h2>
                      <p className="text-muted-foreground">
                        Enter the email address you used during registration to view your warranty details.
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
                What's Covered
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Covered
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Manufacturing defects</li>
                    <li>• BMS (Battery Management System) failures</li>
                    <li>• Cell capacity degradation below 80%</li>
                    <li>• Heating system malfunctions (heated models)</li>
                    <li>• Bluetooth module defects</li>
                    <li>• Terminal connection issues</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-destructive">
                    <span className="w-5 h-5 flex items-center justify-center">✕</span>
                    Not Covered
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Physical damage from misuse or accidents</li>
                    <li>• Water damage from improper installation</li>
                    <li>• Damage from incorrect charging voltage</li>
                    <li>• Unauthorized modifications</li>
                    <li>• Normal wear and cosmetic damage</li>
                    <li>• Commercial/industrial use (unless specified)</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> Warranty registration 
                  must be completed within 30 days of purchase. Keep your proof of purchase 
                  (receipt or invoice) for warranty claims. For questions, contact{" "}
                  <a href="mailto:warranty@sentorise.de" className="text-primary hover:underline">
                    warranty@sentorise.de
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WarrantyPage;
