import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Factory, 
  Award, 
  Globe, 
  Rocket, 
  Target 
} from "lucide-react";

const milestones = [
  {
    year: "2018",
    title: "The Spark",
    description: "Sentorise was founded with a vision to revolutionize portable energy for outdoor enthusiasts.",
    icon: Lightbulb,
  },
  {
    year: "2019",
    title: "First Production Line",
    description: "Established our first LiFePO4 battery manufacturing facility with Grade-A cell sourcing.",
    icon: Factory,
  },
  {
    year: "2020",
    title: "CE & UN38.3 Certified",
    description: "Achieved international safety certifications, opening doors to European markets.",
    icon: Award,
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Expanded to 15+ countries across Europe and North America with localized support.",
    icon: Globe,
  },
  {
    year: "2024",
    title: "Smart BMS Launch",
    description: "Introduced Bluetooth-enabled smart monitoring across our product lineup.",
    icon: Rocket,
  },
  {
    year: "2026",
    title: "Carbon Neutral Goal",
    description: "Committed to achieving carbon-neutral manufacturing by the end of the year.",
    icon: Target,
  },
];

const BrandTimeline = () => {
  return (
    <div className="relative">
      {/* Center line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 md:-translate-x-px" />
      
      <div className="space-y-8 md:space-y-12">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex items-start gap-6 md:gap-0 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 flex items-center justify-center z-10">
              <motion.div 
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-4 ring-background"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <milestone.icon className="w-4 h-4 text-primary-foreground" />
              </motion.div>
            </div>

            {/* Content card */}
            <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
              index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
            }`}>
              <motion.div 
                className="p-5 md:p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <span className="inline-block px-3 py-1 text-xs font-bold text-primary bg-primary/10 rounded-full mb-3">
                  {milestone.year}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {milestone.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {milestone.description}
                </p>
              </motion.div>
            </div>

            {/* Spacer for alternating layout */}
            <div className="hidden md:block md:w-[calc(50%-2rem)]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BrandTimeline;
