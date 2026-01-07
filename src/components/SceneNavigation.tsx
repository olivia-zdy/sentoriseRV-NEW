import { Link } from "react-router-dom";
import { Caravan, Truck, Sun, Ship, Tent, Home } from "lucide-react";
import rvScene from "@/assets/product-rv-battery.jpg";
import vanScene from "@/assets/product-portable.jpg";
import solarScene from "@/assets/product-industrial.jpg";
import marineScene from "@/assets/hero-battery.jpg";
import campScene from "@/assets/product-portable.jpg";
import cabinScene from "@/assets/product-wall-battery.jpg";

const scenes = [
  {
    id: "rv",
    name: "RV & Motorhome",
    icon: Caravan,
    image: rvScene,
    description: "Full-time living power",
  },
  {
    id: "vanlife",
    name: "Van Life",
    icon: Truck,
    image: vanScene,
    description: "Compact van solutions",
  },
  {
    id: "solar",
    name: "Off-Grid Solar",
    icon: Sun,
    image: solarScene,
    description: "Solar storage systems",
  },
  {
    id: "marine",
    name: "Marine & Boat",
    icon: Ship,
    image: marineScene,
    description: "Waterproof reliability",
  },
  {
    id: "camping",
    name: "Camping",
    icon: Tent,
    image: campScene,
    description: "Portable outdoor power",
  },
  {
    id: "cabin",
    name: "Off-Grid Cabin",
    icon: Home,
    image: cabinScene,
    description: "Cabin power backup",
  },
];

const SceneNavigation = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Find Your Perfect Fit
          </h2>
          <p className="text-muted-foreground">
            Choose your adventure — we'll match you with the right battery
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {scenes.map((scene) => (
            <Link
              key={scene.id}
              to={`/products?application=${scene.id}`}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${scene.image})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-primary/80 group-hover:via-primary/40 transition-all duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3 group-hover:bg-primary/30 group-hover:border-primary/50 transition-all duration-300">
                  <scene.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {scene.name}
                </h3>
                <p className="text-xs text-white/70">
                  {scene.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SceneNavigation;
