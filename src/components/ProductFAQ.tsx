import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  productId: string;
  productName: string;
  hasHeating?: boolean;
  hasBluetooth?: boolean;
  capacity: string;
}

const getProductFAQs = (productId: string, hasHeating?: boolean, hasBluetooth?: boolean, capacity?: string): FAQItem[] => {
  const baseFAQs: FAQItem[] = [
    {
      question: "Can I replace my lead-acid battery with this LiFePO₄ battery?",
      answer: "Yes, Sentorise LiFePO₄ batteries are designed as drop-in replacements for lead-acid batteries. However, you may need to adjust your charging voltage settings. Lead-acid chargers set to 14.4-14.6V for absorption are compatible. If your charger has an AGM setting, use that. Avoid chargers with desulfation modes or those exceeding 14.8V."
    },
    {
      question: "What charger should I use?",
      answer: "Use a LiFePO₄-specific charger or a programmable charger set to: Bulk/Absorption voltage 14.2-14.6V, Float voltage 13.6V. Most solar charge controllers with LiFePO₄ profiles work perfectly. Avoid chargers with automatic equalization or those designed only for flooded lead-acid."
    },
    {
      question: "How long will this battery last?",
      answer: "Sentorise LiFePO₄ batteries are rated for 4000+ cycles at 80% depth of discharge. If you cycle the battery once per day, that's over 10 years of service. At 50% DoD, cycle life increases significantly. Real-world lifespan is typically 8-15 years depending on usage patterns."
    },
    {
      question: "Is it safe to mount the battery in any orientation?",
      answer: "Yes, LiFePO₄ batteries are completely sealed and can be mounted in any orientation—horizontal, vertical, or even upside down. There's no liquid electrolyte to spill, and no gassing under normal operation."
    },
    {
      question: "What happens if the battery gets too cold?",
      answer: hasHeating 
        ? "This model features integrated self-heating. When the temperature drops below -10°C, the heating system automatically activates before charging begins. The battery uses about 5% of its capacity to warm up, then charges normally. Discharging works down to -20°C without heating."
        : "The built-in BMS will prevent charging below 0°C to protect the cells—this is a safety feature. Discharging still works down to -20°C. If you need to charge in freezing temperatures, consider the 200Ah Heated model or use an external battery heater pad."
    },
  ];

  const bluetoothFAQs: FAQItem[] = hasBluetooth ? [
    {
      question: "How does Bluetooth monitoring work?",
      answer: "Download the free Sentorise app (iOS/Android), enable Bluetooth on your phone, and the battery will be automatically detected within 10 meters. No pairing code needed. The app shows real-time voltage, current, temperature, state of charge, cycle count, and cell balance status."
    },
  ] : [];

  const capacityFAQs: FAQItem[] = [];
  
  if (capacity && parseInt(capacity) >= 100) {
    capacityFAQs.push({
      question: "Can I connect multiple batteries in parallel?",
      answer: "Yes, you can connect up to 4 batteries in parallel for increased capacity. Use identical batteries and ensure equal cable lengths to each battery. The BMS systems will work together to balance the load. For series connections (24V/48V), contact our support team for guidance."
    });
  }

  const warrantyFAQ: FAQItem = {
    question: "How does the 5-year warranty work?",
    answer: "Register your battery within 30 days of purchase on our warranty page. The warranty covers cell failure, premature capacity loss (below 80%), and BMS malfunction. It does not cover physical damage, water exposure, or use with incompatible chargers. If a valid claim is made, we provide a full replacement shipped from our European warehouse."
  };

  return [...baseFAQs, ...bluetoothFAQs, ...capacityFAQs, warrantyFAQ];
};

const ProductFAQ = ({ productId, productName, hasHeating, hasBluetooth, capacity }: ProductFAQProps) => {
  const faqs = getProductFAQs(productId, hasHeating, hasBluetooth, capacity);

  return (
    <section className="section-padding bg-muted/30 border-y border-border">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
              <p className="text-sm text-muted-foreground">Common questions about the {productName}</p>
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="bg-card border border-border rounded-lg px-4"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ProductFAQ;
