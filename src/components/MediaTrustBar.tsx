const certifications = [
  { name: "TÜV Rheinland", abbr: "TÜV" },
  { name: "SGS Certified", abbr: "SGS" },
  { name: "CE Mark", abbr: "CE" },
  { name: "RoHS Compliant", abbr: "RoHS" },
  { name: "UN38.3 Tested", abbr: "UN38.3" },
  { name: "IEC 62619", abbr: "IEC" },
  { name: "FCC Certified", abbr: "FCC" },
  { name: "UL Listed", abbr: "UL" },
];

const MediaTrustBar = () => {
  return (
    <section className="py-6 bg-muted/30 border-y border-border overflow-hidden">
      <div className="container-custom">
        <p className="text-xs text-muted-foreground text-center mb-4 uppercase tracking-wider">
          Certified & Tested by Leading Organizations
        </p>
      </div>
      <div className="relative">
        <div className="flex animate-scroll">
          {[...certifications, ...certifications].map((cert, index) => (
            <div
              key={`${cert.abbr}-${index}`}
              className="flex items-center justify-center min-w-[140px] px-6 py-2"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg border border-border">
                <span className="text-lg font-bold text-primary">{cert.abbr}</span>
                <span className="text-xs text-muted-foreground hidden sm:inline">{cert.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaTrustBar;
