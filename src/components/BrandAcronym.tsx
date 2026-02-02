import { motion } from "framer-motion";
import { useState } from "react";

const acronym = [
  { letter: "S", meaning: "Safety", description: "Multi-layer protection, certified components, strict testing.", color: "from-emerald-500 to-teal-600" },
  { letter: "E", meaning: "Endurance", description: "Long cycle life, stable performance across years.", color: "from-blue-500 to-cyan-600" },
  { letter: "N", meaning: "Nature", description: "Lower-impact materials, responsible lifecycle.", color: "from-green-500 to-emerald-600" },
  { letter: "T", meaning: "Technology", description: "Real-time monitoring for smarter energy control.", color: "from-violet-500 to-purple-600" },
  { letter: "O", meaning: "Optimized", description: "Efficiency and reliability across applications.", color: "from-orange-500 to-amber-600" },
  { letter: "R", meaning: "Reliability", description: "Tested under demanding environments.", color: "from-red-500 to-rose-600" },
  { letter: "I", meaning: "Intelligent", description: "Balanced performance, usability, durability.", color: "from-indigo-500 to-blue-600" },
  { letter: "S", meaning: "Service", description: "Responsive support, long-term warranty.", color: "from-pink-500 to-rose-600" },
  { letter: "E", meaning: "Excellence", description: "Precision and continuous improvement.", color: "from-yellow-500 to-orange-600" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

const BrandAcronym = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div 
      className="grid grid-cols-3 md:grid-cols-9 gap-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {acronym.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative cursor-pointer"
        >
          <motion.div
            className="p-3 md:p-4 bg-card rounded-xl border border-border text-center overflow-hidden relative"
            animate={{
              borderColor: hoveredIndex === index ? "hsl(var(--primary))" : "hsl(var(--border))",
              boxShadow: hoveredIndex === index 
                ? "0 10px 40px -10px hsl(var(--primary) / 0.3)" 
                : "0 0 0 0 transparent",
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient background on hover */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0`}
              animate={{
                opacity: hoveredIndex === index ? 0.1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Letter */}
            <motion.span
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary block mb-1 relative z-10"
              animate={{
                scale: hoveredIndex === index ? 1.1 : 1,
                opacity: hoveredIndex === index ? 0.15 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {item.letter}
            </motion.span>
            
            {/* Meaning */}
            <motion.span
              className="text-xs font-semibold text-foreground block relative z-10"
              animate={{
                opacity: hoveredIndex === index ? 0 : 0.8,
              }}
              transition={{ duration: 0.2 }}
            >
              {item.meaning}
            </motion.span>
            
            {/* Description - slides up on hover */}
            <motion.div
              className="absolute inset-x-0 bottom-0 bg-card px-2 pb-3 pt-6"
              initial={{ y: "100%", opacity: 0 }}
              animate={{
                y: hoveredIndex === index ? 0 : "100%",
                opacity: hoveredIndex === index ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <span className="text-xs text-foreground leading-tight block font-medium">
                {item.description}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BrandAcronym;
