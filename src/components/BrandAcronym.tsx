import { motion } from "framer-motion";
import { useState } from "react";

const acronym = [
  { letter: "S", meaning: "Safety First", description: "Multi-layer BMS protection", color: "from-emerald-500 to-teal-600" },
  { letter: "E", meaning: "Endurance", description: "4000+ cycle lifespan", color: "from-blue-500 to-cyan-600" },
  { letter: "N", meaning: "Nature Friendly", description: "Non-toxic, recyclable", color: "from-green-500 to-emerald-600" },
  { letter: "T", meaning: "Technology", description: "Smart Bluetooth monitoring", color: "from-violet-500 to-purple-600" },
  { letter: "O", meaning: "Optimized", description: "Peak performance design", color: "from-orange-500 to-amber-600" },
  { letter: "R", meaning: "Reliability", description: "Tested for real-world use", color: "from-red-500 to-rose-600" },
  { letter: "I", meaning: "Innovation", description: "Self-heating technology", color: "from-indigo-500 to-blue-600" },
  { letter: "S", meaning: "Service", description: "5-year warranty support", color: "from-pink-500 to-rose-600" },
  { letter: "E", meaning: "Excellence", description: "International standards", color: "from-yellow-500 to-orange-600" },
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
            className="p-3 md:p-4 bg-muted/80 dark:bg-card/80 backdrop-blur-sm rounded-xl border-2 border-border/50 text-center overflow-hidden relative shadow-sm"
            animate={{
              borderColor: hoveredIndex === index ? "hsl(var(--primary))" : "hsl(var(--border) / 0.5)",
              boxShadow: hoveredIndex === index 
                ? "0 10px 40px -10px hsl(var(--primary) / 0.4)" 
                : "0 2px 8px -2px hsl(var(--foreground) / 0.08)",
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
                scale: hoveredIndex === index ? 1.2 : 1,
                y: hoveredIndex === index ? -2 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {item.letter}
            </motion.span>
            
            {/* Meaning */}
            <motion.span
              className="text-xs font-semibold text-foreground block relative z-10"
              animate={{
                opacity: hoveredIndex === index ? 1 : 0.8,
              }}
            >
              {item.meaning}
            </motion.span>
            
            {/* Description - slides up on hover */}
            <motion.div
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-card via-card to-transparent px-2 pb-3 pt-8"
              initial={{ y: "100%", opacity: 0 }}
              animate={{
                y: hoveredIndex === index ? 0 : "100%",
                opacity: hoveredIndex === index ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <span className="text-[10px] md:text-xs text-muted-foreground leading-tight block">
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
