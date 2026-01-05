import ProductCard from "./ProductCard";
import productWall from "@/assets/product-wall-battery.jpg";
import productPortable from "@/assets/product-portable.jpg";
import productIndustrial from "@/assets/product-industrial.jpg";
import productRV from "@/assets/product-rv-battery.jpg";

const products = [
  {
    image: productWall,
    name: "PowerWall Pro 10kWh",
    category: "Home Storage",
    price: "$4,999",
    originalPrice: "$5,999",
    badge: "Best Seller",
  },
  {
    image: productPortable,
    name: "Explorer 2000W",
    category: "Portable Power",
    price: "$1,899",
    badge: "New",
  },
  {
    image: productIndustrial,
    name: "Industrial BESS 100kWh",
    category: "Commercial",
    price: "$45,000",
  },
  {
    image: productRV,
    name: "RV Freedom 200Ah",
    category: "Mobile Power",
    price: "$899",
    originalPrice: "$1,099",
    badge: "20% OFF",
  },
];

const Products = () => {
  return (
    <section id="products" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 stagger-children">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Products
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Premium Energy
            <br />
            <span className="text-gradient">Storage Solutions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover our range of LiFePO4 batteries designed for every need — 
            from home backup to industrial applications.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300"
          >
            View All Products
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
