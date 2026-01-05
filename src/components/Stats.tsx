const stats = [
  { value: "10K+", label: "Modules Deployed", suffix: "" },
  { value: "45", label: "Countries Active", suffix: "+" },
  { value: "300A", label: "Peak Validated", suffix: "" },
  { value: "10", label: "Year Warranty", suffix: "Y" },
];

const Stats = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-black text-primary-foreground mb-2 headline-italic">
                {stat.value}<span className="text-3xl">{stat.suffix}</span>
              </p>
              <p className="text-primary-foreground/70 text-xs font-bold uppercase tracking-widest">
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
