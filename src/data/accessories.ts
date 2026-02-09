import charger20aImg from "@/assets/accessory-charger-20a.webp";
import batteryMonitorTr24Img from "@/assets/accessory-battery-monitor-tr24.png";

export interface AccessoryProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: "charger" | "monitor" | "cable" | "protection" | "mounting";
  price: number;
  salePrice?: number;
  image: string;
  badge?: string;
  inStock: boolean;
  preOrder?: boolean;
  estimatedShipping?: string;
  description: string;
  keyFeatures: string[];
  specifications: { label: string; value: string }[];
  sections: {
    title: string;
    content: string;
    bullets?: string[];
  }[];
  applications: string[];
  packageContents: string[];
  faqs: { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
  compatibility: string;
  warnings?: string[];
}

export const accessoryProducts: AccessoryProduct[] = [
  {
    id: "SENT-CHG-14V6-20A-WP",
    slug: "lifepo4-charger-20a",
    name: "20A LiFePO₄ Battery Charger",
    subtitle: "14.6V Fast Charging, Fully Potted & Water-Resistant Design",
    category: "charger",
    price: 99.99,
    salePrice: 89.99,
    image: charger20aImg,
    badge: "Pre-order",
    inStock: false,
    preOrder: true,
    estimatedShipping: "March 2026",
    description:
      "The Sentorise 14.6V 20A LiFePO₄ charger is engineered for demanding environments where reliability and durability are non-negotiable. With a fully potted, water-resistant enclosure and advanced charging algorithms, this charger is built to perform in RVs, boats, off-grid systems, and industrial applications.",
    keyFeatures: [
      "High-Power Output: 280W / 20A fast charging for 12V LiFePO₄ battery systems",
      "0V Wake-Up Function: Recovers deeply discharged batteries from 0V",
      "Fully Potted Design: Water-resistant protection, resistant to moisture, dust, and vibration",
      "Wide Operating Range: -20°C to 50°C ambient temperature tolerance",
      "Anderson Connector: Secure, high-current connection with polarity protection",
      "EU Plug: Schuko Type F plug for European markets",
      "Smart Charging: CC-CV algorithm with automatic cutoff to prevent overcharging",
    ],
    specifications: [
      { label: "Model", value: "SENT-CHG-14V6-20A-WP" },
      { label: "Rated Power", value: "280W" },
      { label: "Input Voltage", value: "100–240V AC (single phase)" },
      { label: "Input Frequency", value: "50/60Hz" },
      { label: "Max Input Current", value: "3.5A @115V AC / 2.0A @230V AC" },
      { label: "Power Factor", value: "≥0.95 typical @230V AC" },
      { label: "Efficiency", value: "83% @230V AC, full load" },
      { label: "Output Voltage (CV)", value: "14.6V ± 0.2V" },
      { label: "Max Output Current", value: "20A (19–21A range)" },
      { label: "Over-Voltage Protection", value: "Triggered at >17V" },
      { label: "Turn-on Delay", value: "≤5 seconds" },
      { label: "Cooling", value: "High-efficiency internal fan" },
      { label: "Status Indicator", value: "LED charging status" },
      { label: "Operating Temperature", value: "-20°C to 50°C" },
      { label: "Storage Temperature", value: "-25°C to 85°C" },
      { label: "Dimensions", value: "176 × 124.5 × 59 mm (6.93 × 4.90 × 2.32 in)" },
      { label: "Packaging", value: "270 × 195 × 132 mm" },
      { label: "Input Cable", value: "3 × 0.75mm², 1.2m" },
      { label: "Output Cable", value: "2 × 2.5mm², 1.1m" },
      { label: "Connector", value: "50A Anderson + terminal rings" },
      { label: "Plug Type", value: "EU Standard (Schuko)" },
      { label: "Weight", value: "1.45 kg (shipping: 1.9 kg)" },
      { label: "Certifications", value: "CE compliant" },
      { label: "SKU", value: "SENT-CHG-14V6-20A-WP" },
      { label: "Barcode", value: "6979061120085" },
      { label: "HS Code", value: "8504.40.9990" },
      { label: "Origin", value: "CN" },
    ],
    sections: [
      {
        title: "Fast & Powerful 20A Charging",
        content:
          "Built specifically for 12.8V LiFePO₄ batteries, the SENT-CHG-14V6-20A-WP delivers a stable 14.6V output at up to 20A, enabling fast, efficient, and reliable charging. It can fully charge a 100Ah battery in approximately 5 hours — up to 4× faster than a standard 5A charger.",
        bullets: [
          "50Ah battery: ~2.5 hours",
          "100Ah battery: ~5 hours",
          "200Ah battery: ~10 hours",
        ],
      },
      {
        title: "0V Wake-Up & Over-Discharge Recovery",
        content:
          "The integrated 0V activation function helps recover deeply discharged LiFePO₄ batteries that have dropped below normal operating voltage. This feature supports battery recovery, extends overall battery lifespan, and reduces the risk of premature battery replacement.",
      },
      {
        title: "Advanced Safety & Battery Protection",
        content:
          "Designed for long-term and demanding use, the charger incorporates multi-layer protection:",
        bullets: [
          "Over-temperature protection",
          "Short-circuit protection",
          "Reverse polarity protection",
          "Intelligent fail-safe shutdown and automatic recovery",
        ],
      },
      {
        title: "Fully Potted & Sealed, Water-Resistant Design",
        content:
          "The charger features a fully potted internal structure, with critical electronic components encapsulated in potting compound and protected by a durable all-aluminum housing. This construction significantly enhances resistance to moisture, dust, vibration, and mechanical stress.",
        bullets: [
          "Designed to handle rain, humidity, and splashes during outdoor use",
          "Not intended for long-term water immersion",
        ],
      },
      {
        title: "Wide Operating Temperature Range",
        content:
          "Engineered to perform in challenging environments, the charger operates reliably across a wide temperature range from -20°C to 50°C (-4°F to 122°F).",
      },
    ],
    applications: [
      "RV and camper van house battery systems",
      "Marine and boat auxiliary power",
      "Off-grid solar + battery setups",
      "Industrial and backup power systems",
    ],
    packageContents: [
      "AC power input cable",
      "DC output cable with 50A Anderson connector & terminal rings",
      "User manual",
      "Professional-grade connectors for multiple wiring scenarios",
    ],
    faqs: [
      {
        question: "Can I use this charger with lead-acid batteries?",
        answer:
          "The charger also supports 12V lead-acid batteries, though it is primarily optimized for 12.8V LiFePO₄ chemistry.",
      },
      {
        question: "Is it safe to leave the charger connected overnight?",
        answer:
          "Yes. The CC-CV algorithm includes automatic cutoff to prevent overcharging, along with multi-layer safety protections.",
      },
      {
        question: "What does 0V Wake-Up mean?",
        answer:
          "If a LiFePO₄ battery has been deeply discharged below its normal operating voltage, the 0V activation function can gently recover it, potentially saving the battery from replacement.",
      },
    ],
    seoTitle: "20A LiFePO₄ Battery Charger – 14.6V Fast Charging | Sentorise",
    seoDescription:
      "Sentorise 20A LiFePO₄ charger with fully potted water-resistant design, 0V wake-up function, and CC-CV smart charging for RV, marine, and off-grid systems.",
    compatibility:
      "Optimized for 12.8V LiFePO₄ batteries. Also supports 12V lead-acid batteries.",
    warnings: [
      "This charger is designed specifically for LiFePO₄ (LFP) chemistry. Do not use with lithium-ion (NMC/NCA) or other non-compatible battery types.",
    ],
  },
  {
    id: "SENT-METER-500A-BT-WP",
    slug: "battery-monitor-tr24",
    name: "TR24 IP68 Battery Monitor",
    subtitle: "500A M8 Shunt | 8–100V | Bluetooth | High-Precision Coulomb Counter",
    category: "monitor",
    price: 90.99,
    salePrice: 79.99,
    image: batteryMonitorTr24Img,
    inStock: false,
    preOrder: true,
    estimatedShipping: "March 2025",
    badge: "Pre-order",
    description:
      "500A high-current battery monitoring solution with M8 bolt-type shunt, suitable for RV, marine, energy storage, and industrial power systems.",
    keyFeatures: [
      "500A High-Current Measurement: Covers heavy-duty power scenarios",
      "M8 Bolt-Type Shunt: Supports thicker cables, stable contact, lower heat generation",
      "8–100V Wide Voltage Range: Compatible with various lithium and lead-acid systems",
      "Real-Time Multi-Parameter Display: Voltage / Current / Power / Capacity (Ah) / SOC / Remaining Time",
      "IP68 Protection Rating: Suitable for outdoor, humid, and harsh environments",
      "Bluetooth Communication: Read data and configure basic parameters via APP",
    ],
    specifications: [
      { label: "Working Voltage", value: "8–100V" },
      { label: "Max Measurement Current", value: "500A" },
      { label: "Shunt Terminal", value: "M8" },
      { label: "Measurement Accuracy", value: "±1%" },
      { label: "Capacity Range", value: "0.1–9999Ah" },
      { label: "Protection Rating", value: "IP68" },
      { label: "Operating Temperature", value: "-10°C to 60°C" },
      { label: "Panel Size", value: "72.5 × 72.5 mm (2.85 × 2.85 in)" },
      { label: "Panel Depth", value: "20.75 mm (0.82 in)" },
      { label: "Mounting Cutout", value: "Ø67 ±0.3 mm" },
      { label: "SKU", value: "SENT-METER-500A-BT-WP" },
      { label: "Barcode", value: "6979061120078" },
    ],
    sections: [
      {
        title: "Precision Battery Monitoring",
        content:
          "The TR24 provides real-time monitoring of all critical battery parameters including voltage, current, power, capacity (Ah), state of charge (SOC), and estimated remaining usage time. The high-precision Coulomb counting ensures accurate tracking over time.",
      },
      {
        title: "500A M8 Shunt Design",
        content:
          "The M8 bolt-type shunt terminal supports thicker cable connections, providing more stable contact with lower heat generation compared to smaller terminal designs. This makes it ideal for high-current applications in RV, marine, and industrial settings.",
      },
      {
        title: "IP68 Waterproof Construction",
        content:
          "With IP68-rated protection, the TR24 is built to withstand outdoor, humid, and harsh operating environments. The sealed design prevents moisture and dust ingress, ensuring reliable long-term operation.",
      },
      {
        title: "Bluetooth Connectivity",
        content:
          "Connect via Bluetooth to read real-time data and configure basic parameters through a companion mobile app. Monitor your battery system remotely without needing to physically access the display panel.",
      },
    ],
    applications: [
      "RV / Motorhome battery systems",
      "Marine / Boat electrical systems",
      "Energy Storage Systems (ESS)",
      "Industrial equipment & backup power",
      "High-power lithium battery packs",
    ],
    packageContents: [
      "TR24 Battery Monitor × 1",
      "500A Shunt (M8 terminals) × 1",
      "Wiring harness & mounting hardware × 1 set",
      "User manual × 1",
    ],
    faqs: [
      {
        question: "What size system is the 500A shunt suitable for?",
        answer:
          "It is suitable for high-current, high-power systems commonly found in RV inverter circuits, marine electrical systems, and energy storage applications.",
      },
      {
        question: "Can the shunt be installed on the positive terminal only?",
        answer:
          "No. The shunt must be installed in the negative circuit. Installing on the positive side will result in inaccurate readings.",
      },
      {
        question: "What is the difference between M8 and M10 terminals?",
        answer:
          "M8 is more common for systems under 500A, offering a good balance of installation convenience and reliability. Selection should be based on cable size and circuit current requirements.",
      },
    ],
    seoTitle: "TR24 500A Battery Monitor | M8 Shunt | IP68 | 8–100V | Sentorise",
    seoDescription:
      "TR24 500A battery monitor with M8 shunt, IP68 waterproof, 8–100V wide voltage range. Suitable for RV, marine, energy storage, and industrial battery systems.",
    compatibility:
      "Compatible with all 8–100V battery systems including LiFePO₄, lead-acid, and other chemistries.",
    warnings: [
      "Shunt must be installed in the negative battery circuit. All load and charging current must pass through the shunt.",
      "Set the correct battery capacity (Ah) on first use, otherwise SOC readings will be inaccurate.",
      "Do not extend the shielded cable between shunt and display unit.",
      "For high-current systems, use properly sized cables with secure crimped connections.",
    ],
  },
];

export const getAccessoryBySlug = (slug: string): AccessoryProduct | undefined => {
  return accessoryProducts.find((a) => a.slug === slug);
};
