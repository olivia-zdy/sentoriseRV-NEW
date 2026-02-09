import charger20aImg from "@/assets/accessory-charger-20a.webp";
import batteryMonitorTr24Img from "@/assets/accessory-battery-monitor-tr24.png";
import andersonCableImg from "@/assets/accessory-anderson-cable.png";
import anlFuseImg from "@/assets/accessory-anl-fuse.png";
import terminalKitImg from "@/assets/accessory-terminal-kit.png";

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
  {
    id: "SENT-CBL-SB50-SET",
    slug: "anderson-sb50-cable-set",
    name: "Anderson SB50 Cable Set",
    subtitle: "50A Rated | 8 AWG | Red & Black Pair | Ring Terminals",
    category: "cable",
    price: 24.99,
    image: andersonCableImg,
    badge: "Pre-order",
    inStock: false,
    preOrder: true,
    estimatedShipping: "March 2026",
    description:
      "Professional-grade Anderson SB50 cable set for connecting LiFePO₄ batteries to chargers, inverters, and other equipment. Features heavy-duty 8 AWG silicone wire with pre-crimped ring terminals for secure battery connections.",
    keyFeatures: [
      "50A Rated: Suitable for chargers, inverters, and solar controllers",
      "8 AWG Silicone Wire: Flexible, heat-resistant, and durable",
      "Pre-Crimped Ring Terminals: M8 ring terminals for direct battery connection",
      "Color-Coded: Red (positive) and black (negative) for safe installation",
      "Anderson SB50 Connector: Industry-standard quick-connect/disconnect",
    ],
    specifications: [
      { label: "Connector Type", value: "Anderson SB50" },
      { label: "Current Rating", value: "50A continuous" },
      { label: "Wire Gauge", value: "8 AWG (8.4mm²)" },
      { label: "Wire Type", value: "Silicone insulation" },
      { label: "Terminal Type", value: "M8 ring terminal" },
      { label: "Cable Length", value: "1.0m per cable" },
      { label: "Voltage Rating", value: "600V" },
      { label: "Temperature Range", value: "-40°C to 200°C" },
      { label: "SKU", value: "SENT-CBL-SB50-SET" },
    ],
    sections: [
      {
        title: "Quick & Secure Connections",
        content:
          "The Anderson SB50 connector provides a reliable, genderless quick-connect system that prevents accidental reverse polarity. Simply plug in to connect your battery to chargers, inverters, or solar charge controllers.",
      },
      {
        title: "Heavy-Duty Construction",
        content:
          "Built with 8 AWG silicone-insulated wire that stays flexible even in cold temperatures. The pre-crimped M8 ring terminals ensure a secure, low-resistance connection to your battery terminals.",
      },
    ],
    applications: [
      "Battery-to-charger connections",
      "Battery-to-inverter wiring",
      "Solar charge controller connections",
      "Parallel battery bank wiring",
    ],
    packageContents: [
      "Red Anderson SB50 cable with M8 ring terminal × 1",
      "Black Anderson SB50 cable with M8 ring terminal × 1",
    ],
    faqs: [
      {
        question: "Can I use this cable set with any LiFePO₄ battery?",
        answer: "Yes, the M8 ring terminals are compatible with all Sentorise batteries and most other LiFePO₄ batteries with M8 terminal posts.",
      },
      {
        question: "Is 8 AWG sufficient for a 100Ah battery?",
        answer: "Yes. 8 AWG supports up to 50A continuous, which is suitable for most charger and moderate inverter connections. For high-current inverter setups (>50A), use thicker gauge cables.",
      },
    ],
    seoTitle: "Anderson SB50 Cable Set – 50A 8AWG Battery Cables | Sentorise",
    seoDescription:
      "Anderson SB50 cable set with 8 AWG silicone wire and M8 ring terminals. Quick-connect battery cables for LiFePO₄ chargers, inverters, and solar systems.",
    compatibility: "Compatible with all Sentorise batteries and most 12V LiFePO₄ systems with M8 terminals.",
  },
  {
    id: "SENT-FUSE-ANL-300A",
    slug: "anl-fuse-holder-300a",
    name: "ANL Fuse Holder + 300A Fuse",
    subtitle: "Inline Protection | M8 Studs | Transparent Cover | IP54",
    category: "protection",
    price: 19.99,
    image: anlFuseImg,
    badge: "Pre-order",
    inStock: false,
    preOrder: true,
    estimatedShipping: "March 2026",
    description:
      "Industrial-grade ANL fuse holder with included 300A fuse for protecting your LiFePO₄ battery system. Features a transparent protective cover for visual fuse inspection and M8 stud terminals for secure high-current connections.",
    keyFeatures: [
      "300A ANL Fuse Included: Pre-installed for immediate use",
      "Transparent Cover: Visual inspection without disassembly",
      "M8 Stud Terminals: Secure high-current bolt connections",
      "IP54 Rated Housing: Dust and splash protection",
      "Compact Inline Design: Easy installation in battery circuits",
    ],
    specifications: [
      { label: "Fuse Type", value: "ANL (bolt-down)" },
      { label: "Fuse Rating", value: "300A" },
      { label: "Voltage Rating", value: "32V DC" },
      { label: "Terminal Type", value: "M8 stud" },
      { label: "Protection Rating", value: "IP54" },
      { label: "Housing Material", value: "High-impact ABS" },
      { label: "Cover", value: "Transparent polycarbonate" },
      { label: "Wire Range", value: "Up to 2/0 AWG (70mm²)" },
      { label: "SKU", value: "SENT-FUSE-ANL-300A" },
    ],
    sections: [
      {
        title: "Essential Circuit Protection",
        content:
          "An ANL fuse is a critical safety component in any battery system. It protects your wiring and equipment from overcurrent and short circuits by safely breaking the circuit before damage occurs.",
      },
      {
        title: "Easy Visual Inspection",
        content:
          "The transparent polycarbonate cover allows you to visually verify fuse condition without removing the cover or disconnecting any wiring. A blown fuse is immediately visible.",
      },
    ],
    applications: [
      "Battery-to-inverter main fuse",
      "Battery bank protection",
      "High-current DC circuit protection",
      "RV and marine electrical systems",
    ],
    packageContents: [
      "ANL fuse holder with cover × 1",
      "300A ANL fuse (pre-installed) × 1",
      "M8 mounting hardware × 1 set",
    ],
    faqs: [
      {
        question: "Where should I install the ANL fuse?",
        answer: "Install the fuse on the positive cable, as close to the battery positive terminal as possible. This protects the entire circuit downstream.",
      },
      {
        question: "How do I choose the right fuse rating?",
        answer: "The fuse should be rated slightly above your maximum expected current but below your cable's ampacity. 300A is suitable for most 200Ah battery systems with large inverters.",
      },
    ],
    seoTitle: "ANL Fuse Holder + 300A Fuse – Battery Circuit Protection | Sentorise",
    seoDescription:
      "ANL fuse holder with 300A fuse for LiFePO₄ battery systems. IP54 rated, transparent cover, M8 stud terminals for RV, marine, and off-grid protection.",
    compatibility: "Compatible with all 12V–32V DC battery systems. Recommended for 100Ah+ battery setups.",
  },
  {
    id: "SENT-TERM-KIT-M8",
    slug: "battery-terminal-kit",
    name: "Battery Terminal Kit",
    subtitle: "M8 Copper Lugs | Heat Shrink | Stainless Hardware | 6 Pairs",
    category: "cable",
    price: 14.99,
    image: terminalKitImg,
    inStock: false,
    preOrder: true,
    estimatedShipping: "March 2026",
    badge: "Pre-order",
    description:
      "Complete battery terminal connection kit with tinned copper lugs, adhesive heat shrink tubing, and stainless steel hardware. Everything needed for professional, corrosion-resistant battery connections.",
    keyFeatures: [
      "Tinned Copper Lugs: Corrosion-resistant M8 ring terminals in multiple gauges",
      "Adhesive Heat Shrink: Waterproof seal with built-in adhesive lining",
      "Stainless Steel Hardware: M8 bolts, nuts, and spring washers included",
      "Multi-Gauge Support: Terminals for 6, 8, 10, and 12 AWG cables",
      "6 Pairs Included: Enough for a complete battery system setup",
    ],
    specifications: [
      { label: "Terminal Type", value: "Tinned copper ring lug" },
      { label: "Stud Size", value: "M8 (5/16\")" },
      { label: "Wire Gauges", value: "6, 8, 10, 12 AWG" },
      { label: "Terminal Quantity", value: "12 pcs (6 pairs)" },
      { label: "Heat Shrink", value: "Adhesive-lined, 3:1 ratio" },
      { label: "Hardware", value: "M8 × 16mm stainless bolts, nuts, washers" },
      { label: "Material", value: "Tinned copper / SS304" },
      { label: "SKU", value: "SENT-TERM-KIT-M8" },
    ],
    sections: [
      {
        title: "Professional-Grade Connections",
        content:
          "Tinned copper lugs provide excellent conductivity while resisting corrosion in humid and marine environments. The adhesive-lined heat shrink creates a waterproof seal around each connection.",
      },
      {
        title: "Complete Kit",
        content:
          "Everything you need in one package: ring terminals in multiple gauges, color-coded heat shrink, and stainless steel fasteners. No separate hardware store visits required.",
      },
    ],
    applications: [
      "Battery terminal connections",
      "Inverter and charger wiring",
      "Bus bar connections",
      "Solar charge controller wiring",
    ],
    packageContents: [
      "Tinned copper ring terminals (assorted gauges) × 12",
      "Adhesive heat shrink tubing (red & black) × 12",
      "M8 × 16mm stainless bolts × 6",
      "M8 stainless nylon-lock nuts × 6",
      "M8 stainless spring washers × 6",
    ],
    faqs: [
      {
        question: "Do I need a crimping tool?",
        answer: "Yes, a hydraulic or ratcheting cable crimper is recommended for a proper crimp. Pliers alone will not create a reliable connection.",
      },
      {
        question: "Are these terminals compatible with Sentorise batteries?",
        answer: "Yes. All Sentorise batteries use M8 terminal posts, and these lugs are designed to fit perfectly.",
      },
    ],
    seoTitle: "Battery Terminal Kit – M8 Copper Lugs & Hardware | Sentorise",
    seoDescription:
      "Complete M8 battery terminal kit with tinned copper lugs, adhesive heat shrink, and stainless steel hardware for LiFePO₄ battery installations.",
    compatibility: "Compatible with all M8 battery terminal posts including all Sentorise batteries.",
  },
];
export const getAccessoryBySlug = (slug: string): AccessoryProduct | undefined => {
  return accessoryProducts.find((a) => a.slug === slug);
};
