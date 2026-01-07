import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Terms of Service" 
        description="Read the terms and conditions for using Sentorise products and services." 
      />
      <AnnouncementBar />
      <Header />
      <main className="section-padding">
        <div className="container-custom">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Terms of Service</span>
          </nav>

          <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
            <p className="text-muted-foreground mb-6">Last updated: January 2026</p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using the Sentorise website and purchasing our products, you agree 
                to be bound by these Terms of Service. If you do not agree to these terms, please 
                do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Products and Orders</h2>
              <p className="text-muted-foreground mb-4">
                All product descriptions, specifications, and prices are subject to change without 
                notice. We reserve the right to limit quantities and refuse orders at our discretion.
              </p>
              <p className="text-muted-foreground">
                Orders are subject to availability. We will notify you if a product is out of stock 
                and offer alternatives or a refund.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Pricing and Payment</h2>
              <p className="text-muted-foreground">
                All prices are displayed in Euros (€) and include applicable VAT for EU customers. 
                Payment must be made at the time of order through our accepted payment methods.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Shipping and Delivery</h2>
              <p className="text-muted-foreground mb-4">
                We offer free shipping on orders over €99 within the European Union. Standard 
                delivery takes 2-5 business days. Delivery times may vary based on location and 
                carrier availability.
              </p>
              <p className="text-muted-foreground">
                Risk of loss and title for products pass to you upon delivery to the carrier.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Returns and Refunds</h2>
              <p className="text-muted-foreground mb-4">
                We offer a 30-day money-back guarantee on all products. To be eligible for a return:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Product must be unused and in original packaging</li>
                <li>Return must be initiated within 30 days of delivery</li>
                <li>Customer is responsible for return shipping costs (unless defective)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Warranty</h2>
              <p className="text-muted-foreground mb-4">
                All Sentorise batteries come with a 5-year manufacturer warranty covering:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Manufacturing defects</li>
                <li>Premature capacity loss (below 80% within warranty period)</li>
                <li>BMS failures under normal use</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Warranty does not cover damage from misuse, improper installation, or modifications.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, Sentorise shall not be liable for any 
                indirect, incidental, special, or consequential damages arising from the use or 
                inability to use our products.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms shall be governed by and construed in accordance with the laws of 
                Germany, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">9. Contact</h2>
              <p className="text-muted-foreground">
                For questions about these Terms, please contact us at:{" "}
                <a href="mailto:legal@sentorise.com" className="text-primary hover:underline">
                  legal@sentorise.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
