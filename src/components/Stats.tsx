const stats = [
  { value: "50K+", label: "Units Sold" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "45+", label: "Countries Served" },
  { value: "10Y", label: "Warranty Coverage" },
];

const Stats = () => {
  return (
    <section className="py-16 bg-energy-gradient">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-primary-foreground/80 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
