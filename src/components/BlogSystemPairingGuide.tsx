import { Link } from "react-router-dom";
import { Wrench, Zap, ArrowUpRight, BatteryCharging, Sun, Cable, ThermometerSun } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PairingProfile {
  loadRange: { label: string; min: number; max: number; unit: string };
  chargerRec: { name: string; spec: string; note: string }[];
  mpptRec?: { name: string; spec: string; note: string }[];
  upgradePath: { from: string; to: string; reason: string }[];
  tips: string[];
}

// Map tags to system pairing profiles
const tagToPairing: Record<string, Partial<PairingProfile>> = {
  "Cold Weather": {
    loadRange: { label: "Winter load capacity", min: 500, max: 1500, unit: "W" },
    chargerRec: [
      { name: "DC-DC Charger 30A", spec: "12V 30A", note: "Maintains charge from alternator during cold starts" },
      { name: "Smart Charger 20A", spec: "14.6V / 4-stage", note: "Temperature-compensated charging profile" },
    ],
    upgradePath: [
      { from: "Core 100Ah (unheated)", to: "Plus 200Ah Heated", reason: "Built-in heating enables charging below 0°C" },
      { from: "Single battery", to: "2× 100Ah parallel", reason: "Doubles available current at cold-derated output" },
    ],
    tips: [
      "Insulate battery compartment — even passive insulation keeps cells 10–15°C warmer overnight",
      "Use soft-start inverter to avoid tripping cold-weather BMS limits on startup surge",
    ],
  },
  "Parallel": {
    loadRange: { label: "Parallel system output", min: 1000, max: 4000, unit: "W" },
    chargerRec: [
      { name: "Multi-output charger", spec: "2× 20A outputs", note: "Charge each battery independently for best balance" },
    ],
    upgradePath: [
      { from: "2× 100Ah parallel", to: "3× 100Ah parallel", reason: "Extends runtime by 50% for sustained high loads" },
      { from: "Passive BMS balance", to: "Active balancer module", reason: "Recommended when SOC drift exceeds 5% after 6 months" },
    ],
    tips: [
      "Match battery age and SOC within 5% before connecting in parallel",
      "Use equal-length cables to each battery for balanced current distribution",
    ],
  },
  "Inverter": {
    loadRange: { label: "Continuous inverter load", min: 1000, max: 3000, unit: "W" },
    chargerRec: [
      { name: "Shore Power Charger", spec: "30A / 14.6V", note: "Replenishes battery bank while connected to mains" },
    ],
    upgradePath: [
      { from: "1× 100Ah + 2000W inverter", to: "2× 100Ah + 3000W inverter", reason: "Prevents voltage sag under sustained heavy loads" },
      { from: "Modified sine wave", to: "Pure sine wave inverter", reason: "Required for sensitive electronics and induction cooktops" },
    ],
    tips: [
      "Match inverter continuous rating to battery BMS continuous discharge — not peak",
      "Use ≥35mm² cables for runs over 1.5m to minimize voltage drop",
    ],
  },
  "Solar": {
    loadRange: { label: "Solar harvest window", min: 200, max: 800, unit: "W panels" },
    mpptRec: [
      { name: "MPPT 30A", spec: "12/24V auto-detect", note: "Suitable for up to 400W panel array" },
      { name: "MPPT 50A", spec: "12/24/48V", note: "For 400–800W arrays with higher voltage strings" },
    ],
    chargerRec: [
      { name: "DC-DC Charger 30A", spec: "Alternator backup", note: "Supplements solar on cloudy days during driving" },
    ],
    upgradePath: [
      { from: "200W panels + 100Ah", to: "400W panels + 200Ah", reason: "Achieves full recharge in 4–5 hours of good sun" },
    ],
    tips: [
      "Size MPPT controller to 1.3× your panel array wattage for headroom",
      "Wire panels in series for higher voltage / lower current — reduces cable losses",
    ],
  },
  "Charging": {
    loadRange: { label: "Charging input range", min: 10, max: 50, unit: "A" },
    chargerRec: [
      { name: "Smart LiFePO₄ Charger 20A", spec: "14.6V CC/CV", note: "4-stage profile optimized for LiFePO₄ chemistry" },
      { name: "DC-DC Charger 30A", spec: "From alternator", note: "Isolates starter battery while charging house bank" },
    ],
    upgradePath: [
      { from: "10A basic charger", to: "20A smart charger", reason: "Halves recharge time with proper voltage profile" },
      { from: "Single source", to: "Multi-source (Solar + DC-DC + Shore)", reason: "Ensures charging in any scenario" },
    ],
    tips: [
      "Never use a lead-acid charger — LiFePO₄ requires exact 14.6V cutoff",
      "Verify charger has a LiFePO₄ mode before connecting",
    ],
  },
  "Marine": {
    loadRange: { label: "Marine house load", min: 500, max: 2000, unit: "W" },
    chargerRec: [
      { name: "Marine-grade charger 20A", spec: "IP67 / 14.6V", note: "Corrosion-resistant housing for salt environments" },
    ],
    mpptRec: [
      { name: "Marine MPPT 30A", spec: "Conformal-coated PCB", note: "Humidity-resistant for below-deck installation" },
    ],
    upgradePath: [
      { from: "Single 100Ah", to: "2× 100Ah (bow + stern)", reason: "Distributes weight and provides redundancy" },
    ],
    tips: [
      "Apply dielectric grease to all terminals — prevents corrosion-induced resistance",
      "Use tinned copper lugs and marine-grade heat shrink on all connections",
    ],
  },
  "RV": {
    loadRange: { label: "Typical RV daily consumption", min: 1000, max: 3000, unit: "Wh/day" },
    chargerRec: [
      { name: "DC-DC Charger 30A", spec: "From vehicle alternator", note: "Charges while driving — most convenient for road trips" },
      { name: "Shore Power Charger 20A", spec: "230V AC input", note: "Full recharge overnight at campsite hookup" },
    ],
    mpptRec: [
      { name: "MPPT 30A", spec: "Roof-mount compatible", note: "200–400W roof panels for off-grid days" },
    ],
    upgradePath: [
      { from: "100Ah single", to: "200Ah or 2× 100Ah", reason: "Covers 2+ days off-grid with moderate loads" },
      { from: "12V system", to: "24V system", reason: "Consider if total load regularly exceeds 2000W" },
    ],
    tips: [
      "Calculate daily Wh consumption before sizing battery — oversizing wastes money, undersizing causes frustration",
      "Install a battery monitor to track real consumption patterns over time",
    ],
  },
  "Voltage": {
    loadRange: { label: "System voltage decision point", min: 2000, max: 5000, unit: "W sustained" },
    chargerRec: [
      { name: "24V/48V Smart Charger", spec: "Match system voltage", note: "Ensure exact voltage profile for your configuration" },
    ],
    upgradePath: [
      { from: "12V system < 2000W", to: "24V system", reason: "Halves current draw — smaller cables, less heat" },
      { from: "24V system > 4000W", to: "48V system", reason: "Quarter the current — enables long cable runs with minimal loss" },
    ],
    tips: [
      "12V→24V upgrade requires replacing all 12V-native appliances or adding DC-DC converters",
      "Calculate total rewiring cost before upgrading — sometimes 12V with thicker cables is more practical",
    ],
  },
  "Monitoring": {
    chargerRec: [
      { name: "Battery Monitor (Shunt-based)", spec: "±0.5% accuracy", note: "Most reliable SOC tracking for LiFePO₄" },
    ],
    upgradePath: [
      { from: "BMS-only monitoring", to: "External shunt monitor", reason: "Higher accuracy SOC and historical data logging" },
    ],
    tips: [
      "Bluetooth SOC is estimated — shunt-based monitors are the gold standard",
      "Calibrate your monitor with a full charge cycle every 2–3 months",
    ],
  },
  "Troubleshooting": {
    tips: [
      "Check all terminal torque with a torque wrench — micro-loosening is the #1 hidden failure mode",
      "Measure voltage drop under load at each connection point to find high-resistance joints",
      "Use a thermal camera or IR thermometer to detect hot spots before they become failures",
    ],
  },
};

function buildPairingProfile(tags: string[]): PairingProfile | null {
  const merged: PairingProfile = {
    loadRange: { label: "Recommended load range", min: 0, max: 0, unit: "W" },
    chargerRec: [],
    mpptRec: [],
    upgradePath: [],
    tips: [],
  };

  let hasData = false;
  const seenChargers = new Set<string>();
  const seenMppt = new Set<string>();
  const seenUpgrade = new Set<string>();
  const seenTips = new Set<string>();

  tags.forEach(tag => {
    const profile = tagToPairing[tag];
    if (!profile) return;
    hasData = true;

    if (profile.loadRange && profile.loadRange.max > merged.loadRange.max) {
      merged.loadRange = profile.loadRange;
    }

    profile.chargerRec?.forEach(c => {
      if (!seenChargers.has(c.name)) {
        seenChargers.add(c.name);
        merged.chargerRec.push(c);
      }
    });

    profile.mpptRec?.forEach(m => {
      if (!seenMppt.has(m.name)) {
        seenMppt.add(m.name);
        merged.mpptRec!.push(m);
      }
    });

    profile.upgradePath?.forEach(u => {
      const key = `${u.from}->${u.to}`;
      if (!seenUpgrade.has(key)) {
        seenUpgrade.add(key);
        merged.upgradePath.push(u);
      }
    });

    profile.tips?.forEach(t => {
      if (!seenTips.has(t)) {
        seenTips.add(t);
        merged.tips.push(t);
      }
    });
  });

  if (!hasData) return null;

  // Limit items
  merged.chargerRec = merged.chargerRec.slice(0, 3);
  merged.mpptRec = merged.mpptRec?.slice(0, 2);
  merged.upgradePath = merged.upgradePath.slice(0, 3);
  merged.tips = merged.tips.slice(0, 4);

  return merged;
}

interface BlogSystemPairingGuideProps {
  tags: string[];
  category: string;
}

const BlogSystemPairingGuide = ({ tags, category }: BlogSystemPairingGuideProps) => {
  if (category !== "Engineering") return null;

  const profile = buildPairingProfile(tags);
  if (!profile) return null;

  return (
    <section className="mb-12">
      <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Wrench className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">
              System Pairing Guide
            </h2>
            <p className="text-sm text-muted-foreground">
              Recommended components for this use case
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Load Range */}
          {profile.loadRange.max > 0 && (
            <div className="bg-muted/30 rounded-xl border border-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground text-sm">{profile.loadRange.label}</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary">{profile.loadRange.min}–{profile.loadRange.max}</span>
                <span className="text-sm text-muted-foreground">{profile.loadRange.unit}</span>
              </div>
            </div>
          )}

          {/* Charger Recommendations */}
          {profile.chargerRec.length > 0 && (
            <div className="bg-muted/30 rounded-xl border border-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <BatteryCharging className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground text-sm">Charger Recommendations</h3>
              </div>
              <ul className="space-y-2.5">
                {profile.chargerRec.map((c, i) => (
                  <li key={i} className="text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{c.name}</span>
                      <Badge variant="outline" className="text-xs">{c.spec}</Badge>
                    </div>
                    <p className="text-muted-foreground text-xs mt-0.5">{c.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* MPPT Recommendations */}
          {profile.mpptRec && profile.mpptRec.length > 0 && (
            <div className="bg-muted/30 rounded-xl border border-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sun className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground text-sm">MPPT / Solar Controller</h3>
              </div>
              <ul className="space-y-2.5">
                {profile.mpptRec.map((m, i) => (
                  <li key={i} className="text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{m.name}</span>
                      <Badge variant="outline" className="text-xs">{m.spec}</Badge>
                    </div>
                    <p className="text-muted-foreground text-xs mt-0.5">{m.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Upgrade Path */}
          {profile.upgradePath.length > 0 && (
            <div className="bg-muted/30 rounded-xl border border-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <ArrowUpRight className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground text-sm">Upgrade Path</h3>
              </div>
              <ul className="space-y-3">
                {profile.upgradePath.map((u, i) => (
                  <li key={i} className="text-sm">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">{u.from}</span>
                      <span className="text-primary">→</span>
                      <span className="font-medium text-foreground">{u.to}</span>
                    </div>
                    <p className="text-muted-foreground text-xs mt-0.5">{u.reason}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Tips */}
        {profile.tips.length > 0 && (
          <div className="mt-6 bg-primary/5 rounded-xl border border-primary/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <ThermometerSun className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground text-sm">Engineering Tips</h3>
            </div>
            <ul className="space-y-2">
              {profile.tips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <Cable className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            to="/battery-selector"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Find Your Battery Match
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            to="/accessories"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors border border-border"
          >
            Browse Accessories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSystemPairingGuide;
