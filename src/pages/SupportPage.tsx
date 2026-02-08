import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  HelpCircle, 
  FileText, 
  Shield, 
  Mail, 
  Phone, 
  MessageCircle,
  Download,
  ExternalLink
} from "lucide-react";
import { glassIconClass } from "@/lib/utils";

const supportCategories = [
  {
    icon: HelpCircle,
    title: "Help Center",
    description: "Find answers to frequently asked questions about our products, installation, and maintenance.",
    link: "#faq",
  },
  {
    icon: FileText,
    title: "Downloads",
    description: "Access product datasheets, user manuals, installation guides, and certification documents.",
    link: "#downloads",
  },
  {
    icon: Shield,
    title: "Warranty",
    description: "Learn about our 5-year warranty coverage and how to make a claim if needed.",
    link: "#warranty",
  },
  {
    icon: MessageCircle,
    title: "Contact Support",
    description: "Get in touch with our technical support team. Response within 24-48 hours.",
    link: "#contact",
  },
];

const quickLinks = [
  { name: "Bluetooth Setup Guide", href: "/bluetooth-guide", description: "5-step app connection guide" },
  { name: "Register Warranty", href: "/warranty", description: "Activate your 5-year coverage" },
  { name: "Battery Selector", href: "/battery-selector", description: "Find the right battery for you" },
];

const faqs = [
  {
    question: "How long do Sentorise batteries last?",
    answer: "Our LiFePO4 batteries are rated for 4000+ cycles at 80% depth of discharge. With typical RV use, this translates to 10+ years of reliable service.",
  },
  {
    question: "Can I use Sentorise batteries in cold weather?",
    answer: "Yes, all our batteries include low-temperature charge protection that prevents charging below 0°C to protect cell integrity. Our Plus series includes self-heating for operation down to -20°C.",
  },
  {
    question: "Are your batteries compatible with my existing solar setup?",
    answer: "Sentorise batteries work with most solar charge controllers and inverters. We recommend using a LiFePO4-compatible charge controller for optimal performance.",
  },
  {
    question: "What does the 5-year warranty cover?",
    answer: "Our warranty covers manufacturing defects and premature capacity loss. Batteries that fall below 80% capacity within 5 years of purchase are eligible for replacement.",
  },
  {
    question: "How do I connect the Bluetooth app?",
    answer: "Download the Sentorise app from the App Store or Google Play. Turn on Bluetooth on your phone, open the app, and it will automatically detect nearby Sentorise batteries. See our complete Bluetooth Setup Guide for step-by-step instructions."
  },
  {
    question: "Can I connect multiple batteries in parallel?",
    answer: "Yes, our Core and Plus series batteries can be connected in parallel to increase capacity. We recommend connecting up to 4 batteries in parallel for optimal performance. Always match batteries of the same model and state of charge."
  },
  {
    question: "What's the difference between Lite, Core, and Plus series?",
    answer: "Lite series (6-50Ah) is for portable and backup applications. Core series (100Ah) is our standard RV/solar battery in various formats (Standard, MINI, DIN H8). Plus series (200Ah) includes self-heating for cold climates down to -20°C."
  },
  {
    question: "Do I need a special charger for LiFePO4 batteries?",
    answer: "We recommend using a charger with a LiFePO4 profile (14.4V-14.6V charge voltage). Many modern RV converters have a lithium mode. Never use a charger above 14.6V as this can damage the cells."
  },
  {
    question: "What happens if I try to charge below 0°C?",
    answer: "The built-in BMS will prevent charging below 0°C to protect cell health. For cold-weather charging, use our Plus 200Ah Heated model which activates self-heating at -10°C. Discharging works down to -20°C on all models."
  },
  {
    question: "How do I make a warranty claim?",
    answer: "Contact support@sentorise.de with your registration email and describe the issue. We'll guide you through diagnosis. If replacement is needed, we ship a new unit before you return the old one (in most EU countries)."
  }
];

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Support Center" 
        description="Get help with Sentorise batteries. FAQs, downloads, warranty information, and contact support." 
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
              <span className="text-foreground">Support</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Support Center
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Get help with your Sentorise products. Find answers, download resources, 
              or contact our support team.
            </p>
          </div>
        </section>

        {/* Support Categories - Glass Icons */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportCategories.map((category) => (
                <a
                  key={category.title}
                  href={category.link}
                  className="group p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className={`${glassIconClass} mb-4 group-hover:border-primary`}>
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </a>
              ))}
            </div>

            {/* Quick Links */}
            <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickLinks.map((link) => (
                  <Link 
                    key={link.name}
                    to={link.href}
                    className="flex items-center justify-between p-3 bg-card rounded-lg border hover:border-primary/30 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{link.name}</p>
                      <p className="text-xs text-muted-foreground">{link.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section with Accordion */}
        <section id="faq" className="section-padding bg-muted/30 border-y border-border">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Quick answers to common questions about Sentorise batteries.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="bg-card rounded-xl border border-border px-6 data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Downloads */}
        <section id="downloads" className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Downloads
              </h2>
              <p className="text-muted-foreground">
                Access product documentation and resources.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {["Product Datasheets", "Installation Guides", "Certification Documents"].map((doc) => (
                <div key={doc} className="p-6 bg-card rounded-xl border border-border text-center hover:border-primary/30 transition-colors">
                  <div className={`${glassIconClass} mx-auto mb-4`}>
                    <Download className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-4">{doc}</h3>
                  <Button variant="outline" size="sm">
                    Download
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Warranty Section */}
        <section id="warranty" className="section-padding bg-muted/30 border-y border-border">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className={`${glassIconClass} mx-auto mb-6`}>
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                5-Year Warranty
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                All Sentorise batteries come with a comprehensive 5-year warranty. We stand behind 
                our products with a guarantee that covers manufacturing defects and premature capacity 
                loss. If your battery falls below 80% capacity within the warranty period, we'll 
                replace it free of charge.
              </p>
              <Button>Register Your Product</Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-padding bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Contact Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Need personalized help? Fill out the form below or reach us directly.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Form */}
              <div className="bg-card p-6 md:p-8 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">Send us a message</h3>
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="p-6 bg-card rounded-xl border border-border">
                  <Mail className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Email Support</h3>
                  <p className="text-muted-foreground">support@sentorise.com</p>
                  <p className="text-sm text-muted-foreground mt-2">We typically respond within 24 hours</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <Phone className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Phone Support</h3>
                  <p className="text-muted-foreground">+49 123 456 7890</p>
                  <p className="text-sm text-muted-foreground mt-2">Mon-Fri, 9:00 - 18:00 CET</p>
                </div>
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

export default SupportPage;
