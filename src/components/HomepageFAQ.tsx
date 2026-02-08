import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Focused FAQ - only the 4 most critical questions for purchase decision
const faqs = [
  {
    id: "cold-charging",
    question: "Can I charge the battery in freezing temperatures?",
    answer: "No — and that's by design. The BMS automatically blocks charging below 0°C to protect cell health. You can still discharge down to -20°C. For the 200Ah Heated model, self-heating activates at -10°C and allows charging after warm-up. If you regularly charge in sub-zero conditions, choose the Heated model or use an external battery heater.",
  },
  {
    id: "installation",
    question: "Is it a drop-in replacement for my lead-acid battery?",
    answer: "In most cases, yes. Our 100Ah Standard (Group 31) and 100Ah DIN H8 are designed as direct replacements. However, you may need to adjust your charger settings: LiFePO₄ requires different voltage profiles (14.4-14.6V charge, 13.8V float). If you use a Victron or similar smart charger, simply select the 'LiFePO₄' preset.",
  },
  {
    id: "bluetooth-app",
    question: "How does Bluetooth monitoring work?",
    answer: "Download the free Sentorise app (iOS/Android), turn on Bluetooth, and it auto-detects nearby batteries. You'll see real-time voltage, current, temperature, state of charge, and cycle count. Range is about 10 meters. Note: The 6Ah model does not include Bluetooth.",
  },
  {
    id: "warranty",
    question: "What does the 5-year warranty cover?",
    answer: "Full replacement for manufacturing defects. This includes cell failure, BMS malfunction, and premature capacity loss (below 80% within warranty period under normal use). It does not cover physical damage, incorrect installation, or charging with a non-compatible charger. Our Berlin support team handles all claims directly — no third-party runaround.",
  },
];

const HomepageFAQ = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Common Questions
            </h2>
            <p className="text-muted-foreground">
              Quick answers to the things people ask most before buying.
            </p>
          </div>

          {/* FAQ Accordion */}
          <ScrollReveal>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          </ScrollReveal>

          {/* Link to Full Support */}
          <div className="text-center mt-8">
            <Link
              to="/support"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              View all support topics
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageFAQ;
