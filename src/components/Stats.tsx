const stats = [
  { value: "4000+", label: "Cycle Life", suffix: "" },
  { value: "5", label: "Year Warranty", suffix: "Y" },
  { value: "10K+", label: "Happy Customers", suffix: "" },
  { value: "25", label: "Countries", suffix: "+" },
];

const Stats = () => {
  return (
    <section className="py-12 md:py-16 bg-primary">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-2">
                {stat.value}<span className="text-2xl md:text-3xl">{stat.suffix}</span>
              </p>
              <p className="text-primary-foreground/80 text-sm font-medium">
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
