export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  model: string;
  ean: string;
  name: string;
  series: string;
  category: string;
  tagline: string;
  description: string;
  energy: string;
  voltage: string;
  capacity: string;
  bms: string;
  dimensions: string;
  weight?: string;
  useCases: string[];
  features: string[];
  specs: ProductSpec[];
  badge?: string;
  image: string;
  isNew?: boolean;
  isHot?: boolean;
  hasHeating?: boolean;
  hasBluetooth?: boolean;
  price: number;
  salePrice?: number;
  inStock: boolean;
  highlights: string[];
  // Stock tracking fields
  stockQuantity: number;
  lowStockThreshold?: number;
  restockDate?: string;
}

// Import real product images
import product6ah from "@/assets/product-6ah.png?format=webp&quality=85";
import product50ah from "@/assets/product-50ah.png?format=webp&quality=85";
import product100ahStd from "@/assets/product-100ah-std.png?format=webp&quality=85";
import product100ahMini from "@/assets/product-100ah-mini.png?format=webp&quality=85";
import product100ahDin from "@/assets/product-100ah-din.png?format=webp&quality=85";
import product200ahHeated from "@/assets/product-200ah-heated.png?format=webp&quality=85";

export const products: Product[] = [
  {
    id: "lite-12v6",
    model: "SENT-LITE-12V6-BASIC",
    ean: "6979061120016",
    name: "Lite 12V 6Ah Ultra-Compact",
    series: "Lite",
    category: "Ultra-Compact",
    tagline: "Pocket-sized power backup",
    description: "The smallest member of the Sentorise family. Perfect for emergency kits, routers, camping lights, and any situation where reliable power matters but space is limited.",
    energy: "76.8 Wh",
    voltage: "12.8V",
    capacity: "6Ah",
    bms: "6A",
    dimensions: "152×65×95.6 mm",
    weight: "0.8 kg",
    useCases: ["Emergency kits", "Routers & modems", "Camping lights", "Fish finders", "Small electronics"],
    features: ["Ultra-compact design", "Built-in BMS protection", "Lightweight portable", "Drop-in replacement", "4000+ cycles"],
    specs: [
      { label: "Nominal Voltage", value: "12.8V" },
      { label: "Capacity", value: "6Ah" },
      { label: "Energy", value: "76.8Wh" },
      { label: "Max Discharge", value: "6A" },
      { label: "Dimensions", value: "152×65×95.6 mm" },
      { label: "Weight", value: "0.8 kg" },
      { label: "Cycle Life", value: "4000+ cycles" },
      { label: "Operating Temp", value: "-20°C to 60°C" },
    ],
    image: product100ahMini,
    price: 34.99,
    salePrice: 29.99,
    inStock: true,
    highlights: ["Ultra-compact", "BMS Protection", "4000+ Cycles"],
    stockQuantity: 45,
    lowStockThreshold: 15,
  },
  {
    id: "lite-12v50",
    model: "SENT-LITE-12V50-BT",
    ean: "6979061120023",
    name: "Lite 12V 50Ah Lightweight",
    series: "Lite",
    category: "Lightweight",
    tagline: "Portable power, serious capacity",
    description: "The perfect balance between portability and power. Equipped with Bluetooth monitoring for real-time status updates on your smartphone.",
    energy: "640 Wh",
    voltage: "12.8V",
    capacity: "50Ah",
    bms: "50A",
    dimensions: "223×150×175 mm",
    weight: "6.2 kg",
    useCases: ["Small RV systems", "Portable solar kits", "DIY battery boxes", "Kayak trolling motors", "Backup power"],
    features: ["Bluetooth monitoring", "Smart BMS protection", "Low-temperature cutoff", "Lightweight design", "5-year warranty"],
    specs: [
      { label: "Nominal Voltage", value: "12.8V" },
      { label: "Capacity", value: "50Ah" },
      { label: "Energy", value: "640Wh" },
      { label: "Max Discharge", value: "50A" },
      { label: "Dimensions", value: "223×150×175 mm" },
      { label: "Weight", value: "6.2 kg" },
      { label: "Cycle Life", value: "4000+ cycles" },
      { label: "Bluetooth", value: "Yes" },
    ],
    badge: "Bluetooth",
    image: product6ah,
    hasBluetooth: true,
    price: 149.99,
    salePrice: 129.99,
    inStock: true,
    highlights: ["Bluetooth App", "Lightweight", "5-Year Warranty"],
    stockQuantity: 28,
    lowStockThreshold: 10,
  },
  {
    id: "core-12v100-std",
    model: "SENT-CORE-12V100-BSTD",
    ean: "6979061120009",
    name: "Core 12V 100Ah Standard",
    series: "Core",
    category: "Group 31",
    tagline: "The RV workhorse",
    description: "Our flagship RV battery in the popular Group 31 format. Direct drop-in replacement for lead-acid batteries with 4x the cycle life and half the weight.",
    energy: "1280 Wh",
    voltage: "12.8V",
    capacity: "100Ah",
    bms: "100A",
    dimensions: "332×172×217.5 mm",
    weight: "11.8 kg",
    useCases: ["RV main power", "Off-grid cabins", "Solar home systems", "Marine auxiliary", "Trolling motors"],
    features: ["Bluetooth monitoring", "100A continuous discharge", "Group 31 standard", "Low-temp protection", "5-year warranty"],
    specs: [
      { label: "Nominal Voltage", value: "12.8V" },
      { label: "Capacity", value: "100Ah" },
      { label: "Energy", value: "1280Wh" },
      { label: "Max Discharge", value: "100A" },
      { label: "Dimensions", value: "332×172×217.5 mm" },
      { label: "Weight", value: "11.8 kg" },
      { label: "Cycle Life", value: "4000+ cycles" },
      { label: "Format", value: "BCI Group 31" },
    ],
    badge: "Best Seller",
    image: product50ah,
    isHot: true,
    hasBluetooth: true,
    price: 299.99,
    salePrice: 279.99,
    inStock: true,
    highlights: ["Best Seller", "Group 31", "100A Continuous"],
    stockQuantity: 8,
    lowStockThreshold: 10,
  },
  {
    id: "core-12v100-mini",
    model: "SENT-CORE-12V100-XTRAMINI",
    ean: "6979061120030",
    name: "Core 12V 100Ah MINI",
    series: "Core",
    category: "Compact",
    tagline: "Full power, minimal footprint",
    description: "Same 100Ah capacity as the standard Core, but in a significantly smaller package. Ideal for vans and RVs with tight battery compartments.",
    energy: "1280 Wh",
    voltage: "12.8V",
    capacity: "100Ah",
    bms: "100A",
    dimensions: "227.6×137.2×211.4 mm",
    weight: "10.5 kg",
    useCases: ["Van conversions", "Compact RVs", "Tight battery bays", "Under-seat mounting", "Custom installations"],
    features: ["Ultra-compact 100Ah", "Bluetooth monitoring", "Space-efficient design", "Same Core performance", "5-year warranty"],
    specs: [
      { label: "Nominal Voltage", value: "12.8V" },
      { label: "Capacity", value: "100Ah" },
      { label: "Energy", value: "1280Wh" },
      { label: "Max Discharge", value: "100A" },
      { label: "Dimensions", value: "227.6×137.2×211.4 mm" },
      { label: "Weight", value: "10.5 kg" },
      { label: "Cycle Life", value: "4000+ cycles" },
      { label: "Bluetooth", value: "Yes" },
    ],
    badge: "Compact",
    image: product100ahStd,
    hasBluetooth: true,
    price: 329.99,
    salePrice: 299.99,
    inStock: true,
    highlights: ["Ultra-Compact", "100Ah Power", "Space Saver"],
    stockQuantity: 22,
    lowStockThreshold: 8,
  },
  {
    id: "core-12v100-din",
    model: "SENT-CORE-12V100-DINH8",
    ean: "6979061120047",
    name: "Core 12V 100Ah DIN H8",
    series: "Core",
    category: "Under-Seat",
    tagline: "European standard fitment",
    description: "Designed specifically for European RV under-seat battery compartments. The DIN H8 format ensures perfect fitment in most European motorhomes and caravans.",
    energy: "1280 Wh",
    voltage: "12.8V",
    capacity: "100Ah",
    bms: "100A",
    dimensions: "359×182.8×187.7 mm",
    weight: "12.2 kg",
    useCases: ["European motorhomes", "Under-seat bays", "Caravan systems", "OEM replacements", "Fleet vehicles"],
    features: ["DIN H8 standard", "Perfect EU RV fit", "Bluetooth monitoring", "OEM replacement", "5-year warranty"],
    specs: [
      { label: "Nominal Voltage", value: "12.8V" },
      { label: "Capacity", value: "100Ah" },
      { label: "Energy", value: "1280Wh" },
      { label: "Max Discharge", value: "100A" },
      { label: "Dimensions", value: "359×182.8×187.7 mm" },
      { label: "Weight", value: "12.2 kg" },
      { label: "Cycle Life", value: "4000+ cycles" },
      { label: "Format", value: "DIN H8 (EN)" },
    ],
    badge: "DIN H8",
    image: product100ahDin,
    hasBluetooth: true,
    price: 349.99,
    salePrice: 319.99,
    inStock: true,
    highlights: ["DIN H8 Format", "EU RV Perfect Fit", "OEM Compatible"],
    stockQuantity: 15,
    lowStockThreshold: 10,
  },
  {
    id: "plus-12v200-heated",
    model: "SENT-PLUS-12V200-STD-HEAT",
    ean: "6979061120054",
    name: "Plus 12V 200Ah Heated",
    series: "Plus",
    category: "Cold Climate",
    tagline: "Arctic-ready power station",
    description: "Our most capable battery for demanding applications. Features integrated self-heating for reliable operation in sub-zero temperatures, perfect for Nordic climates and winter camping.",
    energy: "2560 Wh",
    voltage: "12.8V",
    capacity: "200Ah",
    bms: "200A",
    dimensions: "531×206×217 mm",
    weight: "24.5 kg",
    useCases: ["Cold-climate off-grid", "Nordic RVs", "Winter camping", "Large solar systems", "Heavy-duty applications"],
    features: ["Self-heating system", "200A continuous", "Bluetooth monitoring", "Arctic-rated cells", "5-year warranty"],
    specs: [
      { label: "Nominal Voltage", value: "12.8V" },
      { label: "Capacity", value: "200Ah" },
      { label: "Energy", value: "2560Wh" },
      { label: "Max Discharge", value: "200A" },
      { label: "Dimensions", value: "531×206×217 mm" },
      { label: "Weight", value: "24.5 kg" },
      { label: "Cycle Life", value: "4000+ cycles" },
      { label: "Self-Heating", value: "Yes (-20°C activation)" },
    ],
    badge: "Heated",
    image: product200ahHeated,
    isNew: true,
    hasHeating: true,
    hasBluetooth: true,
    price: 749.99,
    salePrice: 699.99,
    inStock: true,
    highlights: ["Self-Heating", "200Ah Capacity", "Arctic-Ready"],
    stockQuantity: 3,
    lowStockThreshold: 5,
  },
];

export const productSeries = [
  {
    name: "Lite",
    description: "Compact & portable solutions",
    products: products.filter(p => p.series === "Lite"),
  },
  {
    name: "Core",
    description: "Standard RV & solar batteries",
    products: products.filter(p => p.series === "Core"),
  },
  {
    name: "Plus",
    description: "High-capacity & heated systems",
    products: products.filter(p => p.series === "Plus"),
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};
