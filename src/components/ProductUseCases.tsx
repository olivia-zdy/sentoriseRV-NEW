import { 
  Caravan, 
  Sun, 
  Tent, 
  Ship, 
  Home, 
  Truck,
  Battery,
  Wifi,
  Lightbulb,
  Wrench
} from "lucide-react";

interface UseCase {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProductUseCasesProps {
  productId: string;
  series: string;
  capacity: string;
}

const useCasesByProduct: Record<string, UseCase[]> = {
  "lite-12v6": [
    { icon: <Wifi className="w-6 h-6" />, title: "Router Backup", description: "Keep your home internet running during power outages. Provides 4-8 hours of router power." },
    { icon: <Tent className="w-6 h-6" />, title: "Camping Lights", description: "Power LED lights for an entire weekend camping trip without recharge." },
    { icon: <Battery className="w-6 h-6" />, title: "Emergency Kit", description: "Compact enough to fit in any emergency bag. Always ready when you need it." },
    { icon: <Lightbulb className="w-6 h-6" />, title: "Small Electronics", description: "Fish finders, portable fans, phone charging stations and more." },
  ],
  "lite-12v50": [
    { icon: <Caravan className="w-6 h-6" />, title: "Small RV Systems", description: "Perfect for weekend RV trips. Powers lights, water pump, and phone charging." },
    { icon: <Sun className="w-6 h-6" />, title: "Portable Solar", description: "Pair with a 100W panel for a complete off-grid charging solution." },
    { icon: <Ship className="w-6 h-6" />, title: "Kayak Trolling", description: "Light enough for kayak mounting. Powers small trolling motors for 4-6 hours." },
    { icon: <Wrench className="w-6 h-6" />, title: "DIY Battery Box", description: "Build your own portable power station with integrated Bluetooth monitoring." },
  ],
  "core-12v100-std": [
    { icon: <Caravan className="w-6 h-6" />, title: "RV Main Power", description: "Drop-in replacement for Group 31 lead-acid. Powers full RV systems daily." },
    { icon: <Home className="w-6 h-6" />, title: "Off-Grid Cabin", description: "Complete daily power for lights, fridge, and electronics in small cabins." },
    { icon: <Sun className="w-6 h-6" />, title: "Solar Home System", description: "Store 1.28kWh of solar energy for evening and night use." },
    { icon: <Ship className="w-6 h-6" />, title: "Marine Auxiliary", description: "Reliable house battery for boats and yachts. Saltwater resistant housing." },
  ],
  "core-12v100-mini": [
    { icon: <Truck className="w-6 h-6" />, title: "Van Conversions", description: "Full 100Ah capacity fits in tight van battery compartments." },
    { icon: <Caravan className="w-6 h-6" />, title: "Compact RVs", description: "Perfect for smaller European caravans where space is at a premium." },
    { icon: <Wrench className="w-6 h-6" />, title: "Custom Installs", description: "Flexible mounting options for unique DIY configurations." },
    { icon: <Battery className="w-6 h-6" />, title: "Under-Seat Mount", description: "Low profile design fits under seats and in storage compartments." },
  ],
  "core-12v100-din": [
    { icon: <Caravan className="w-6 h-6" />, title: "European Motorhomes", description: "DIN H8 format fits factory battery bays in EU motorhomes." },
    { icon: <Truck className="w-6 h-6" />, title: "OEM Replacement", description: "Direct swap for original equipment batteries with no modifications." },
    { icon: <Home className="w-6 h-6" />, title: "Caravan Systems", description: "Standard fitment for European caravans and travel trailers." },
    { icon: <Wrench className="w-6 h-6" />, title: "Fleet Vehicles", description: "Easy standardization across commercial vehicle fleets." },
  ],
  "plus-12v200-heated": [
    { icon: <Tent className="w-6 h-6" />, title: "Winter Camping", description: "Self-heating allows charging even at -20°C. Perfect for Nordic adventures." },
    { icon: <Home className="w-6 h-6" />, title: "Cold-Climate Off-Grid", description: "2.56kWh capacity for demanding mountain cabin and remote installations." },
    { icon: <Sun className="w-6 h-6" />, title: "Large Solar Systems", description: "Store energy from 600W+ solar arrays for multi-day autonomy." },
    { icon: <Caravan className="w-6 h-6" />, title: "Nordic RVs", description: "Year-round RV power in Scandinavia and alpine regions." },
  ],
};

const ProductUseCases = ({ productId, series, capacity }: ProductUseCasesProps) => {
  const useCases = useCasesByProduct[productId] || useCasesByProduct[`${series.toLowerCase()}-12v${capacity.replace('Ah', '').toLowerCase()}`] || [];

  if (useCases.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Ideal Applications</h2>
            <p className="text-muted-foreground">
              See how the {capacity} fits into real-world scenarios
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="group p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {useCase.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductUseCases;
