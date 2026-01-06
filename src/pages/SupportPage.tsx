import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
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
    description: "Get in touch with our technical support team for personalized assistance.",
    link: "#contact",
  },
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
    answer: "Download the Sentorise app from the App Store or Google Play. Turn on Bluetooth on your phone, open the app, and it will automatically detect nearby Sentorise batteries.",
  },
];

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
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

        {/* Support Categories */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportCategories.map((category) => (
                <a
                  key={category.title}
                  href={category.link}
                  className="group p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
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
                <div key={doc} className="p-6 bg-card rounded-xl border border-border text-center">
                  <Download className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{doc}</h3>
                  <Button variant="outline" size="sm">
                    Download
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-padding bg-primary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Contact Us
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                Need personalized help? Our support team is here for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="p-6 bg-primary-foreground/10 rounded-xl text-center">
                <Mail className="w-8 h-8 text-primary-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-primary-foreground mb-2">Email Support</h3>
                <p className="text-primary-foreground/80">support@sentorise.com</p>
              </div>
              <div className="p-6 bg-primary-foreground/10 rounded-xl text-center">
                <Phone className="w-8 h-8 text-primary-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-primary-foreground mb-2">Phone Support</h3>
                <p className="text-primary-foreground/80">+49 123 456 7890</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;
