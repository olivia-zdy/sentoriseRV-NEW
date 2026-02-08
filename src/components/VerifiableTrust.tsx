import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ScrollReveal from "@/components/ScrollReveal";
import { 
  Shield, 
  Clock, 
  FileCheck, 
  Mail, 
  Phone,
  Download,
  ExternalLink,
  CheckCircle2,
  XCircle,
  MapPin,
  Building2
} from "lucide-react";

// Certification documents
const certifications = [
  {
    name: "UN38.3",
    description: "Transport Safety Certification",
    details: "Required for air/sea/road transport of lithium batteries. Verified by accredited testing laboratory.",
    downloadUrl: "#", // Replace with actual PDF URL
    icon: FileCheck
  },
  {
    name: "CE Mark",
    description: "European Conformity",
    details: "Confirms compliance with EU health, safety, and environmental requirements.",
    downloadUrl: "#",
    icon: Shield
  },
  {
    name: "RoHS",
    description: "Restriction of Hazardous Substances",
    details: "Free from lead, mercury, cadmium, and other hazardous materials.",
    downloadUrl: "#",
    icon: FileCheck
  },
  {
    name: "REACH",
    description: "EU Chemical Safety",
    details: "Compliant with EU regulations on chemical substances and their safe use.",
    downloadUrl: "#",
    icon: Shield
  },
  {
    name: "IEC 62619",
    description: "Battery Safety Standard",
    details: "Safety requirements for secondary lithium cells and batteries.",
    downloadUrl: "#",
    icon: FileCheck
  }
];

const VerifiableTrust = () => {
  const [openCert, setOpenCert] = useState<string | null>(null);

  return (
    <section className="section-padding bg-muted/30 border-y border-border">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Verifiable Trust
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We don't just make claims — we back them with documentation, clear policies, and responsive support.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            
            {/* Pillar 1: Contact & SLA */}
            <ScrollReveal delay={0}>
            <div className="bg-card rounded-xl border p-6 h-full">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                We Can Be Found
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <a href="mailto:support@sentorise.de" className="text-foreground hover:text-primary font-medium">
                      support@sentorise.de
                    </a>
                    <p className="text-muted-foreground text-xs">Response within 24-48 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <span className="text-foreground font-medium">+49 30 1234 5678</span>
                    <p className="text-muted-foreground text-xs">Mon–Fri, 9:00–18:00 CET</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <span className="text-foreground font-medium">Berlin, Germany</span>
                    <p className="text-muted-foreground text-xs">EU-based company</p>
                  </div>
                </div>
              </div>
            </div>

            </ScrollReveal>

            {/* Pillar 2: Warranty & Returns */}
            <ScrollReveal delay={0.1}>
            <div className="bg-card rounded-xl border p-6 h-full">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                We Stand Behind It
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <span className="text-foreground font-medium">5-Year Warranty</span>
                    <p className="text-muted-foreground text-xs">Full coverage, no questions asked*</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <span className="text-foreground font-medium">30-Day Returns</span>
                    <p className="text-muted-foreground text-xs">Hassle-free, full refund</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground mb-2">
                    *Covers: BMS failure, capacity &lt;80%, manufacturing defects
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild className="text-xs h-7">
                      <Link to="/warranty">Register Warranty</Link>
                    </Button>
                    <Button size="sm" variant="ghost" asChild className="text-xs h-7">
                      <Link to="/support#warranty">Full Policy →</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            </ScrollReveal>

            {/* Pillar 3: Certifications */}
            <ScrollReveal delay={0.2}>
            <div className="bg-card rounded-xl border p-6 h-full">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                We Have Proof
              </h3>
              <div className="space-y-2 text-sm">
                {certifications.slice(0, 4).map((cert) => (
                  <Dialog key={cert.name}>
                    <DialogTrigger asChild>
                      <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors text-left">
                        <div className="flex items-center gap-2">
                          <cert.icon className="w-4 h-4 text-primary" />
                          <span className="font-medium text-foreground">{cert.name}</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <cert.icon className="w-5 h-5 text-primary" />
                          {cert.name} — {cert.description}
                        </DialogTitle>
                        <DialogDescription className="pt-4">
                          {cert.details}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="pt-4">
                        <Button className="w-full gap-2" asChild>
                          <a href={cert.downloadUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4" />
                            Download Certificate (PDF)
                          </a>
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
                <Button variant="ghost" size="sm" asChild className="w-full text-xs mt-2">
                  <Link to="/support#downloads">View All Certificates →</Link>
                </Button>
              </div>
            </div>

            </ScrollReveal>
          </div>

          {/* Company Info Bar */}
          <ScrollReveal>
          <div className="bg-card rounded-xl border p-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Sentorise Energy GmbH
              </span>
              <span>Friedrichstraße 123, 10117 Berlin</span>
              <span>VAT: DE123456789</span>
              <span>HRB 12345 B</span>
              <a href="mailto:support@sentorise.de" className="text-primary hover:underline">
                support@sentorise.de
              </a>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default VerifiableTrust;
