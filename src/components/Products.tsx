import ProductCard from "./ProductCard";
import productWall from "@/assets/product-wall-battery.jpg";
import productPortable from "@/assets/product-portable.jpg";
import productIndustrial from "@/assets/product-industrial.jpg";
import productRV from "@/assets/product-rv-battery.jpg";
import { ArrowRight } from "lucide-react";

const products = [
  {
    image: productWall,
    name: "DIN H8 100Ah Module",
    category: "Chassis Mount",
    specs: "12.8V • 100Ah • 1280Wh",
    badge: "IN STOCK",
  },
  {
    image: productPortable,
    name: "BCI 31 200Ah Module",
    category: "Drop-In Replacement",
    specs: "12.8V • 200Ah • 2560Wh",
    badge: "NEW",
  },
  {
    image: productIndustrial,
    name: "48V Rack System",
    category: "Industrial BESS",
    specs: "48V • 100Ah • 5120Wh",
  },
  {
    image: productRV,
    name: "Dual Purpose Marine",
    category: "Marine Grade",
    specs: "12.8V • 150Ah • 1920Wh",
    badge: "VALIDATED",
  },
];

const Products = () => {
  return (
    <section id="products" className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">02. Module Catalogue</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl headline-italic">
            <span className="text-foreground">Validated</span>
            <br />
            <span className="text-primary">Hardware.</span>
          </h2>
          
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider hover:gap-4 transition-all"
          >
            View Full Catalogue
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
