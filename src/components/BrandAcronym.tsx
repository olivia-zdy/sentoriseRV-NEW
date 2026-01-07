const acronym = [
  { letter: "S", meaning: "Safety First", description: "Multi-layer BMS protection" },
  { letter: "E", meaning: "Endurance", description: "4000+ cycle lifespan" },
  { letter: "N", meaning: "Nature Friendly", description: "Non-toxic, recyclable" },
  { letter: "T", meaning: "Technology", description: "Smart Bluetooth monitoring" },
  { letter: "O", meaning: "Optimized", description: "Peak performance design" },
  { letter: "R", meaning: "Reliability", description: "Tested for real-world use" },
  { letter: "I", meaning: "Innovation", description: "Self-heating technology" },
  { letter: "S", meaning: "Service", description: "5-year warranty support" },
  { letter: "E", meaning: "Excellence", description: "International standards" },
];

const BrandAcronym = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
      {acronym.map((item, index) => (
        <div
          key={index}
          className="group p-3 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 text-center"
        >
          <span className="text-2xl md:text-3xl font-bold text-primary block mb-1">
            {item.letter}
          </span>
          <span className="text-xs font-semibold text-foreground block">
            {item.meaning}
          </span>
          <span className="text-[10px] text-muted-foreground hidden group-hover:block mt-1">
            {item.description}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BrandAcronym;
