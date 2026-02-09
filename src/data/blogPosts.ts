// Import dedicated blog cover images
import blogRvGuide from "@/assets/blog-rv-guide.jpg";
import blogWinterCamping from "@/assets/blog-winter-camping.jpg";
import blogSolarSystem from "@/assets/blog-solar-system.jpg";
import blogBatteryComparison from "@/assets/blog-battery-comparison.jpg";
import blogBmsTechnology from "@/assets/blog-bms-technology.jpg";
import blogVanlifeBuilds from "@/assets/blog-vanlife-builds.jpg";
import blogMarineInstall from "@/assets/blog-marine-install.jpg";
import blogChargingTips from "@/assets/blog-charging-tips.jpg";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readTime: number;
  image: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Complete Guide to Choosing the Right RV Battery",
    excerpt: "Learn how to select the perfect LiFePO4 battery for your motorhome or caravan based on your energy needs, space constraints, and budget.",
    content: `
## Why LiFePO4 for RV Applications?

Lithium Iron Phosphate (LiFePO4) batteries have revolutionized the RV industry, offering significant advantages over traditional lead-acid batteries. Understanding these benefits will help you make an informed decision for your mobile power needs.

### Key Advantages

1. **Weight Reduction**: LiFePO4 batteries weigh approximately 50% less than equivalent lead-acid batteries, crucial for RV weight management.

2. **Longer Lifespan**: With 4000+ charge cycles, these batteries last 4-5 times longer than lead-acid alternatives.

3. **Deeper Discharge**: You can safely use 80-100% of the rated capacity, compared to only 50% with lead-acid.

4. **Faster Charging**: LiFePO4 batteries accept higher charge currents, reducing charging time significantly.

### Sizing Your RV Battery System

To determine the right battery capacity for your RV, calculate your daily energy consumption:

- **Lights**: LED lights use approximately 5-15W each
- **Refrigerator**: 12V compressor fridges use 30-60W
- **Water Pump**: 4-8A when running
- **Devices**: Laptops, phones, and other electronics

**Formula**: Total Daily Wh ÷ 0.8 (usable capacity) = Minimum Battery Capacity

### Installation Considerations

- Ensure proper ventilation around the battery
- Use appropriately sized cables for your current requirements
- Install a Battery Management System (BMS) for protection
- Consider temperature extremes if you travel in winter

### Recommended Products for RV Use

For most RV applications, we recommend starting with a 100Ah battery for basic needs or 200Ah for full-time living. Consider our heated models if you frequently camp in cold weather.
    `,
    category: "Guides",
    tags: ["RV", "LiFePO4", "Buying Guide"],
    author: "Sentorise Team",
    date: "2025-01-15",
    readTime: 8,
    image: blogRvGuide,
    featured: true,
  },
  {
    id: "2",
    title: "Winter Camping: How to Keep Your Batteries Warm",
    excerpt: "Cold weather can significantly impact battery performance. Discover strategies to maintain optimal charging in sub-zero temperatures.",
    content: `
## Understanding Cold Weather Battery Performance

Lithium batteries are sensitive to temperature, particularly during charging. Understanding how cold affects your battery system is essential for safe winter camping.

### Temperature Effects on LiFePO4 Batteries

- **Discharging**: LiFePO4 batteries can discharge safely down to -20°C, though capacity is reduced
- **Charging**: Most LiFePO4 batteries should NOT be charged below 0°C without heating

### Why Cold Charging is Dangerous

Charging a lithium battery below freezing can cause lithium plating on the anode, permanently damaging the battery and creating safety risks. This is why proper thermal management is critical.

### Solutions for Winter Camping

1. **Self-Heating Batteries**: Our 200Ah heated model includes an integrated heating system that automatically warms the cells before charging begins.

2. **Insulated Battery Boxes**: Keep your battery in an insulated enclosure to retain heat during cold nights.

3. **Charge During Daytime**: When solar charging, the battery naturally warms as it charges during warmer daylight hours.

4. **Battery Blankets**: External heating pads can be used with a temperature controller.

### Best Practices

- Monitor battery temperature before initiating charging
- Park in sunny locations when possible
- Use a BMS with low-temperature charging protection
- Consider upgrading to a heated battery model for frequent winter use
    `,
    category: "Tips",
    tags: ["Winter", "Cold Weather", "Maintenance"],
    author: "Technical Team",
    date: "2025-01-10",
    readTime: 5,
    image: blogWinterCamping,
  },
  {
    id: "3",
    title: "Solar + Battery: Sizing Your Off-Grid System",
    excerpt: "A step-by-step calculator and guide to determine the right solar panel and battery capacity for your off-grid adventures.",
    content: `
## Building Your Off-Grid Power System

Designing an effective off-grid solar and battery system requires careful planning. This guide walks you through the process step by step.

### Step 1: Calculate Daily Energy Needs

List all your devices and their power consumption:

| Device | Watts | Hours/Day | Daily Wh |
|--------|-------|-----------|----------|
| LED Lights (x4) | 20 | 4 | 80 |
| Fridge | 50 | 24 | 400* |
| Laptop | 60 | 3 | 180 |
| Phone Charging | 10 | 2 | 20 |
| Water Pump | 60 | 0.5 | 30 |

*Fridges cycle on/off, so use 30-40% of rated power

### Step 2: Size Your Battery Bank

For reliable off-grid power, size your battery to cover 2-3 days of autonomy:

**Daily Use × Days of Autonomy ÷ Depth of Discharge = Battery Capacity**

Example: 700Wh × 2 days ÷ 0.8 = 1,750Wh = ~140Ah at 12V

### Step 3: Size Your Solar Array

Solar panels should fully recharge your battery in 4-5 peak sun hours:

**Daily Use ÷ Peak Sun Hours × 1.25 (system losses) = Solar Watts**

Example: 700Wh ÷ 4h × 1.25 = 220W of solar panels

### Step 4: Choose Your Components

- **Charge Controller**: MPPT controllers are 20-30% more efficient than PWM
- **Inverter**: Size for your largest AC load plus 20% headroom
- **Cables**: Use appropriate gauge for current and distance

### Pro Tips

- Start with more battery than you think you need
- Panel orientation and shading significantly impact output
- Monitor your system to understand real-world performance
    `,
    category: "Guides",
    tags: ["Solar", "Off-Grid", "DIY"],
    author: "Sentorise Team",
    date: "2025-01-05",
    readTime: 10,
    image: blogSolarSystem,
  },
  {
    id: "4",
    title: "LiFePO4 vs Lead-Acid: The Complete Comparison",
    excerpt: "Understand the key differences between lithium iron phosphate and traditional lead-acid batteries for RV and solar applications.",
    content: `
## LiFePO4 vs Lead-Acid: Making the Right Choice

When choosing a battery for your RV, boat, or solar system, understanding the fundamental differences between LiFePO4 and lead-acid is essential.

### Comparison Overview

| Feature | LiFePO4 | Lead-Acid |
|---------|---------|-----------|
| Weight | 50% lighter | Heavier |
| Cycle Life | 4000+ cycles | 300-500 cycles |
| Usable Capacity | 80-100% | 50% |
| Charge Time | 2-4 hours | 8-12 hours |
| Maintenance | None | Regular |
| Upfront Cost | Higher | Lower |

### Total Cost of Ownership

While LiFePO4 batteries cost more upfront, they last 8-10 times longer:

**Lead-Acid**: $200 × 10 replacements = $2,000 over 10 years
**LiFePO4**: $800 × 1 purchase = $800 over 10 years

### When to Choose LiFePO4

- You need weight savings
- You want maintenance-free operation
- You need deep cycle capability
- You value long-term cost savings
- You need fast charging

### When Lead-Acid May Be Suitable

- Limited upfront budget
- Occasional use applications
- Cold storage without charging
- Simple backup power needs

### Making the Switch

If you're upgrading from lead-acid to LiFePO4, you may need to update your charging system to match the different charging profile requirements.
    `,
    category: "Education",
    tags: ["LiFePO4", "Lead-Acid", "Comparison"],
    author: "Technical Team",
    date: "2024-12-28",
    readTime: 7,
    image: blogBatteryComparison,
  },
  {
    id: "5",
    title: "Understanding Battery Management Systems (BMS)",
    excerpt: "What is a BMS and why is it critical for your lithium battery's safety and longevity? A deep dive into smart protection.",
    content: `
## The Brain of Your Battery: Understanding BMS

Every quality LiFePO4 battery includes a Battery Management System (BMS). This critical component ensures safe operation and maximizes battery lifespan.

### What Does a BMS Do?

The BMS monitors and protects your battery by:

1. **Overcharge Protection**: Prevents charging above safe voltage limits
2. **Over-discharge Protection**: Cuts off power before cells are damaged
3. **Overcurrent Protection**: Limits current to safe levels
4. **Short Circuit Protection**: Instantly disconnects in case of shorts
5. **Temperature Monitoring**: Prevents operation outside safe temperatures
6. **Cell Balancing**: Keeps all cells at equal charge levels

### Why Cell Balancing Matters

In a multi-cell battery, slight manufacturing variations cause cells to charge and discharge at different rates. Without balancing:

- Some cells reach full charge early, limiting total capacity
- Weak cells are stressed more, reducing lifespan
- Capacity diminishes over time

A good BMS actively balances cells during each charge cycle.

### Smart BMS Features

Modern BMS systems include Bluetooth connectivity for:

- Real-time voltage and current monitoring
- Cell-by-cell voltage display
- Charge/discharge history
- Temperature readings
- Fault code diagnostics

### Our BMS Technology

Sentorise batteries include a 100A continuous BMS with:
- Bluetooth monitoring via mobile app
- Active cell balancing
- Low-temperature charging protection
- Multiple layers of safety protection
    `,
    category: "Education",
    tags: ["BMS", "Safety", "Technology"],
    author: "Technical Team",
    date: "2024-12-20",
    readTime: 6,
    image: blogBmsTechnology,
  },
  {
    id: "6",
    title: "Van Life Power Setup: Real Customer Builds",
    excerpt: "Explore how Sentorise customers have installed their battery systems in Sprinters, Transits, and other popular van conversions.",
    content: `
## Real Van Builds Powered by Sentorise

See how our customers have integrated Sentorise batteries into their van conversions. Each build offers unique insights and inspiration for your own project.

### Build #1: Mercedes Sprinter 144"

**Owner**: Marcus & Jana, Germany
**Battery**: 2× 100Ah LiFePO4
**Solar**: 400W roof-mounted panels

"We chose Sentorise for the compact size and Bluetooth monitoring. Being able to check our battery status from bed is incredibly convenient."

**Key Features**:
- Under-bed battery installation
- Victron MPPT charge controller
- 2000W inverter for coffee machine
- Full-time European travel

### Build #2: Ford Transit Custom

**Owner**: Tom, UK
**Battery**: 1× 200Ah Heated LiFePO4
**Solar**: 200W flexible panels

"As a winter camper in Scotland, the heated battery was non-negotiable. I've charged at -10°C without any issues."

**Key Features**:
- Compact installation behind driver seat
- Heated battery for cold climate
- Diesel heater integration
- Weekend warrior setup

### Build #3: VW Crafter

**Owner**: Sophie, Netherlands
**Battery**: 2× 200Ah LiFePO4
**Solar**: 600W rigid panels

"With 400Ah of lithium, we can work remotely for weeks. The batteries have been flawless for 18 months."

**Key Features**:
- Mobile office setup
- Dual battery for redundancy
- Starlink for internet
- Full-time digital nomad life

### Share Your Build

Have a Sentorise-powered van? We'd love to feature your build. Contact us with photos and details!
    `,
    category: "Stories",
    tags: ["Van Life", "Customer Stories", "Installations"],
    author: "Community",
    date: "2024-12-15",
    readTime: 12,
    image: blogVanlifeBuilds,
  },
  {
    id: "7",
    title: "Marine Battery Installation: Best Practices",
    excerpt: "Essential tips for installing lithium batteries on boats, including ventilation, mounting, and saltwater protection.",
    content: `
## Installing LiFePO4 Batteries on Your Boat

Marine environments present unique challenges for battery installations. Follow these best practices to ensure safe, reliable operation at sea.

### Marine-Specific Considerations

1. **Saltwater Corrosion**: All connections must be protected from salt spray
2. **Vibration**: Boats experience constant motion requiring secure mounting
3. **Moisture**: Battery compartments must be ventilated but protected from water ingress
4. **Safety Regulations**: Marine installations may require specific certifications

### Installation Best Practices

**Mounting**:
- Use marine-grade stainless steel hardware
- Mount in a dedicated battery box
- Secure against movement in all directions
- Position away from bilge water

**Wiring**:
- Use tinned marine cable only
- Apply dielectric grease to all terminals
- Install accessible battery disconnect switches
- Route cables away from heat sources

**Protection**:
- Install appropriate fusing at the battery
- Use a battery monitor for early warning
- Consider a bilge pump backup power circuit
- Add ventilation to prevent gas accumulation

### Charging at Sea

- Shore power charging: Use marine-rated chargers
- Engine alternator: May require external regulators for lithium
- Solar: Ideal for extended anchoring

### Recommended Products

For marine use, we recommend our standard 100Ah or 200Ah batteries with their IP-rated housings and corrosion-resistant terminals. The Bluetooth monitoring is especially useful for checking battery status from the helm.
    `,
    category: "Guides",
    tags: ["Marine", "Installation", "Boats"],
    author: "Technical Team",
    date: "2024-12-10",
    readTime: 9,
    image: blogMarineInstall,
  },
  {
    id: "8",
    title: "Extending Battery Lifespan: Charging Tips",
    excerpt: "Learn the optimal charging practices that can help your LiFePO4 battery last even longer than its 4000+ cycle rating.",
    content: `
## Maximize Your Battery Investment

While LiFePO4 batteries are rated for 4000+ cycles, proper charging practices can extend this even further. Learn the science behind optimal charging.

### Understanding Charge Cycles

A charge cycle is one complete discharge and recharge. However:
- Partial cycles count proportionally (2× 50% discharges = 1 cycle)
- Depth of discharge affects cycle life
- Extreme temperatures accelerate aging

### Optimal Charging Practices

1. **Avoid Full Discharges**: Regularly discharging to 0% stresses cells. Aim to recharge at 20-30% remaining.

2. **Don't Always Charge to 100%**: For longest life, charge to 80-90% for daily use. Only fully charge before extended trips.

3. **Use Appropriate Charge Rates**: While LiFePO4 can handle fast charging, moderate rates (0.3-0.5C) minimize stress.

4. **Avoid Temperature Extremes**: Charge between 0-45°C for optimal results.

### Storage Guidelines

If storing your battery for extended periods:

- Charge to 50-60%
- Store in a cool, dry location
- Recharge every 3-6 months
- Avoid storing fully charged or fully depleted

### Charging Equipment

Use chargers designed for LiFePO4 with proper voltage settings:
- Charge voltage: 14.2-14.6V for 12V batteries
- Float voltage: 13.4-13.6V
- Avoid lead-acid chargers with desulfation modes

### Real-World Expectations

With good practices, expect:
- 4000+ cycles to 80% capacity
- 10+ years of service life
- Consistent performance throughout lifespan
    `,
    category: "Tips",
    tags: ["Charging", "Maintenance", "Lifespan"],
    author: "Sentorise Team",
    date: "2024-12-05",
    readTime: 5,
    image: blogChargingTips,
  },
  {
    id: "9",
    title: "LiFePO₄ Real-World Power Output in Cold Weather: What the Specs Don't Tell You",
    excerpt: "Beyond the '0°C charging cutoff' — how BMS current limiting, voltage sag, and inverter compatibility actually affect your winter camping experience.",
    content: `
## The Gap Between Spec Sheets and Reality

Most LiFePO₄ content tells you: "Don't charge below 0°C, discharging works down to -20°C." That's technically correct — but dangerously incomplete for anyone relying on their battery in winter.

### What Actually Happens Below 0°C

LiFePO₄ cells don't suddenly stop working at a specific temperature. Instead, performance degrades progressively:

| Temperature | Approx. Usable Capacity | Max Continuous Discharge Rate |
|-------------|------------------------|-------------------------------|
| 25°C | 100% | 1C (full rated) |
| 0°C | ~90% | 0.8C |
| -10°C | ~70–75% | 0.5–0.6C |
| -20°C | ~50–60% | 0.3C |

These numbers vary by cell manufacturer, but the pattern is consistent: **both capacity and discharge rate drop simultaneously**.

### The Real Problem: BMS Current Limiting + Inverter Startup

Here's what catches people off guard. At -10°C, your BMS may limit continuous output to 50–60A on a 100Ah battery. Now consider this chain:

1. You turn on a 2000W inverter to run a coffee machine
2. The inverter draws ~170A at 12V during startup (inrush current)
3. BMS peak allowance may handle 200A for 5 seconds
4. But the voltage sag under load drops to ~11.2V
5. The inverter's low-voltage protection triggers at 11.0V
6. **Result: the inverter shuts down, even though the battery isn't empty**

This is not a battery defect. It's a system-level mismatch that only appears in cold conditions.

### How to Calculate Real Cold-Weather Capacity

**Step 1**: Check your BMS specs for "low-temperature discharge derating." Most quality BMS units reduce allowed current by 20–50% below -5°C.

**Step 2**: Calculate your load's actual current draw (not just wattage):

**Current (A) = Power (W) ÷ Voltage (V)**

For a 2000W load at 12V: 2000 ÷ 12 = 167A

**Step 3**: Compare this to your derated BMS limit. If your BMS allows only 80A continuous at -10°C, you physically cannot run that load — regardless of battery capacity.

### Practical Solutions

1. **Pre-heat strategy**: If your battery has integrated heating (like our Plus 200Ah Heated model), the heater activates before charging AND can improve discharge performance by keeping cells above 0°C.

2. **Reduce startup loads**: Use a soft-start inverter or avoid simultaneous high-draw appliances in cold weather.

3. **Parallel batteries**: Two 100Ah batteries in parallel double your available current, making cold-weather loads more manageable.

4. **Insulated battery compartment**: Even passive insulation can keep battery temperature 10–15°C warmer than ambient overnight.

### Who Needs to Care About This

- **Nordic / Alpine campers**: Regular sub-zero overnight temperatures
- **Canadian / Northern European RV users**: Extended winter touring
- **Boat owners in cold-water regions**: Cabin heating demands in cold weather

If your winter use case involves loads over 1000W, you need to plan for cold-weather derating — not just cold-weather charging protection.
    `,
    category: "Engineering",
    tags: ["Cold Weather", "BMS", "System Design", "RV"],
    author: "Technical Team",
    date: "2025-02-08",
    readTime: 10,
    image: blogWinterCamping,
    featured: true,
  },
  {
    id: "10",
    title: "Parallel LiFePO₄ Batteries: When Passive Balancing Fails and Active Balancing Becomes Necessary",
    excerpt: "Same batch, same SOC, same model — but after 3 months, your parallel pack drifts. Here's the engineering reality of multi-battery systems.",
    content: `
## The Standard Advice — and Where It Breaks Down

Every forum says: "Match brand, batch, SOC before paralleling." That's necessary but not sufficient.

### Why SOC Drift Happens

Even identical batteries develop differences over time due to:

- **Internal resistance variation**: Manufacturing tolerances of ±5% mean cells age at different rates
- **Temperature gradient**: A battery near the engine runs warmer than one under the bed. Higher temperature = faster calendar aging = capacity divergence
- **Load distribution**: The battery with lower cable resistance draws more current, cycling faster

After 100–200 cycles, a 3–5% SOC mismatch is common. After 500 cycles, it can reach 10–15%.

### What Happens When Parallel Batteries Drift

When two batteries at different SOC levels are connected in parallel:

1. The higher-SOC battery dumps current into the lower-SOC battery (equalization current)
2. This happens uncontrolled, limited only by cable resistance
3. The BMS on either battery may interpret this as a fault condition
4. **Result**: One BMS trips, disconnecting that battery. The remaining battery now handles full load alone — potentially triggering its own overcurrent protection.

This is the "cascade disconnect" failure mode that causes mysterious system shutdowns in multi-battery setups.

### When Passive Balancing Is Sufficient

Passive balancing (built into every quality BMS) works by bleeding excess charge from stronger cells during the absorption phase. This is adequate when:

- All batteries experience similar temperature environments (±5°C)
- The system is regularly charged to 100% (allowing top-balance)
- Total parallel count is ≤ 2 batteries
- Batteries are from the same production batch and age

### When You Need Active Balancing

Active balancing transfers energy between cells (or batteries) rather than wasting it. Consider it when:

- **3+ batteries in parallel**: Drift compounds with more units
- **Mixed temperature zones**: Boat installations where batteries sit in different hull locations
- **Expanding existing systems**: Adding new batteries to an existing bank
- **Seasonal use patterns**: Batteries that sit at different SOC for months between uses

### Can You Mix Old and New Batteries?

The short answer: not recommended. The engineering answer: possible with constraints.

- New LiFePO₄ cells have ~3–5 mΩ internal resistance
- After 2000 cycles, this rises to ~8–12 mΩ
- The new battery will consistently "outperform" the old one, creating permanent imbalance

**If you must expand**: Add a DC-DC isolator between old and new banks. This decouples them electrically while allowing both to serve loads through a common bus.

### System-Level Recommendations

| Configuration | Balancing Method | Risk Level |
|---------------|-----------------|------------|
| 2× same batch, same location | Passive (BMS built-in) | Low |
| 3–4× same batch, same location | External active balancer recommended | Medium |
| 2× different locations (e.g., bow/stern) | DC-DC isolation | Medium |
| Mixed old + new batteries | DC-DC isolation required | High |
| 4+ batteries, mixed age | Active balancer + monitoring | High |
    `,
    category: "Engineering",
    tags: ["Parallel", "BMS", "System Design", "DIY"],
    author: "Technical Team",
    date: "2025-02-06",
    readTime: 11,
    image: blogBmsTechnology,
  },
  {
    id: "11",
    title: "12V to 24V or 48V: When Voltage Upgrades Make Engineering Sense — and When They Don't",
    excerpt: "Everyone says higher voltage is more efficient. But the real calculation involves DC-DC loss chains, device compatibility, wiring costs, and fault complexity.",
    content: `
## Beyond the Efficiency Argument

Yes, higher voltage means lower current for the same power, which means less resistive loss (I²R). But that's only one variable in a complex system decision.

### The Real Efficiency Chain

Consider powering a 1200W load from batteries:

| System | Battery Current | Cable Loss (2m, 35mm²) | DC-DC Conversion Loss | Net Efficiency |
|--------|----------------|----------------------|----------------------|----------------|
| 12V | 100A | ~3.2% | None (native 12V loads) | ~96.8% |
| 24V | 50A | ~0.8% | 3–5% (24V→12V for devices) | ~94.5–96% |
| 48V | 25A | ~0.2% | 5–8% (48V→12V for devices) | ~92–95% |

**Key insight**: If most of your loads are native 12V (lights, fans, water pump, USB), the DC-DC conversion loss of a higher-voltage system can negate the cable efficiency gains.

### When 24V/48V Makes Sense

1. **High total power demand** (>3000W continuous): Air conditioning, induction cooktops, large inverters
2. **Long cable runs** (>5m): Larger boats, trucks, or distributed systems
3. **Solar array optimization**: Higher voltage strings with MPPT controllers
4. **Professional/commercial vehicles**: Where the entire system is designed from scratch

### When 12V Is Still the Right Choice

1. **Existing vehicle with 12V infrastructure**: Retrofitting means replacing every device or adding converters
2. **Moderate power needs** (<2000W): Weekend camping, standard RV appliances
3. **Simplicity priority**: Fewer conversion stages = fewer failure points
4. **Parts availability**: 12V components are universally available and cheaper

### The Hidden Costs of Voltage Upgrades

**Cable harness replacement**: Every cable, fuse, and connector must be rated for the new voltage. On a typical RV, this is 20–40 hours of labor.

**Device compatibility**: 12V fridges, fans, pumps, and lighting don't run on 24V. You need DC-DC converters for each circuit or replace all devices.

**Fault complexity**: A short circuit at 48V delivers much more energy than at 12V. Arc flash risk increases. Fusing and disconnect requirements become more stringent.

**Diagnostic complexity**: Multi-voltage systems require more instrumentation and understanding to troubleshoot.

### Decision Framework

Ask yourself:

1. What is my peak continuous load? (If <2000W → stay 12V)
2. How long are my cable runs? (If <3m → voltage advantage is negligible)
3. Am I building from scratch or retrofitting? (Retrofit → usually stay 12V)
4. Do I have 24V/48V-native loads? (If not → conversion losses apply)

### Our Recommendation

For 90% of RV and small marine applications, a well-designed 12V system with proper cable sizing is the most practical, reliable, and cost-effective solution.
    `,
    category: "Engineering",
    tags: ["System Design", "Voltage", "RV", "DIY"],
    author: "Technical Team",
    date: "2025-02-04",
    readTime: 9,
    image: blogSolarSystem,
  },
  {
    id: "12",
    title: "Inverter + Battery Matching: The Engineering Calculation Most People Skip",
    excerpt: "Can a 200Ah battery run a 3000W inverter? The answer requires understanding discharge rates, voltage sag, cable losses, and BMS limits.",
    content: `
## The Question Everyone Asks Wrong

"Can my 200Ah battery handle a 3000W inverter?" This question is incomplete. The real question is: "For how long, at what temperature, with what cable run, and what happens at startup?"

### Step 1: Calculate Actual Current Draw

**Continuous current**: 3000W ÷ 12V = 250A

But wait — inverters aren't 100% efficient. At 90% efficiency:

**Battery-side current**: 3000W ÷ (12V × 0.9) = 278A

### Step 2: Check Your BMS Limits

| Battery | Continuous BMS Limit | Peak (5s) | Can Handle 3000W? |
|---------|---------------------|-----------|-------------------|
| 100Ah / 100A BMS | 100A | 200A | No — trips instantly |
| 100Ah / 200A BMS | 200A | 400A | No — exceeds continuous |
| 200Ah / 200A BMS | 200A | 400A | No — 278A > 200A |
| 2×100Ah parallel / 200A each | 400A total | 800A | Yes — with margin |

**Key insight**: A single 200Ah battery with a 200A BMS cannot continuously supply a 3000W inverter. You need parallel batteries or a higher-rated BMS.

### Step 3: Account for Voltage Sag

Under heavy load, battery voltage drops due to internal resistance. A 12.8V nominal battery might sag to:

- 12.2V at 100A
- 11.6V at 200A
- 11.0V at 300A

Most inverters trigger low-voltage protection at 10.5–11.0V. This means your inverter may shut down even though the battery has 60% capacity remaining.

### Step 4: Calculate Cable Losses

Cable resistance causes additional voltage drop. For a 1.5m cable run:

| Cable Size | Resistance (1.5m) | Voltage Drop at 250A | Acceptable? |
|------------|-------------------|---------------------|-------------|
| 25mm² | 2.6 mΩ | 0.65V | Marginal |
| 35mm² | 1.8 mΩ | 0.45V | Acceptable |
| 50mm² | 1.3 mΩ | 0.33V | Good |
| 70mm² | 0.9 mΩ | 0.23V | Excellent |

### Step 5: Startup Inrush

Motor-driven appliances (AC units, compressors, power tools) can draw 3–6× their rated current for 0.5–2 seconds at startup.

A 1500W air conditioner may draw 4500W (375A at 12V) for 1–2 seconds. Your battery system needs to handle this peak without triggering BMS protection.

### The Matching Formula

**Minimum battery capacity = (Inverter max power ÷ system voltage ÷ inverter efficiency) ÷ max safe C-rate**

For a 3000W inverter: (3000 ÷ 12 ÷ 0.9) ÷ 0.5C = 556Ah minimum

This means you need at least 500–600Ah of battery capacity to comfortably run a 3000W inverter continuously.

### Practical Recommendations

| Inverter Size | Minimum Battery | Recommended Battery | Cable Size |
|---------------|----------------|--------------------| -----------|
| 1000W | 100Ah | 200Ah | 25mm² |
| 2000W | 200Ah | 2×200Ah | 35mm² |
| 3000W | 400Ah | 3×200Ah | 50mm² |

These assume 12V systems. At 24V, current is halved and requirements are more manageable.
    `,
    category: "Engineering",
    tags: ["Inverter", "System Design", "DIY", "Sizing"],
    author: "Technical Team",
    date: "2025-02-02",
    readTime: 12,
    image: blogBatteryComparison,
    featured: true,
  },
  {
    id: "13",
    title: "Salt, Humidity, and Time: How Marine Environments Actually Degrade BMS and Bluetooth Modules",
    excerpt: "No one talks about what fails first on a boat. The answer is almost always: Bluetooth, then MOS transistors, then terminal connections.",
    content: `
## The Failure Sequence No One Documents

Marine battery installations face a unique degradation path that's almost entirely absent from manufacturer literature. Here's what we've learned from warranty returns and field reports.

### Failure Mode #1: Bluetooth Module (6–18 months)

The Bluetooth Low Energy (BLE) module is typically the first casualty in marine environments.

**Why it fails**:
- BLE antenna impedance shifts due to salt crystal formation on PCB traces
- Moisture ingress through the antenna window or cable glands
- Condensation cycles cause micro-corrosion on signal pins

**Symptoms**:
- Intermittent connection → frequent disconnects → complete failure
- Range reduction from 10m to <1m before failure
- App shows "device not found" while battery works normally

**Prevention**:
- Conformal coating on BLE PCB (not all manufacturers do this)
- Sealed antenna design vs. exposed PCB antenna
- Regular inspection of cable gland seals

### Failure Mode #2: MOSFET Thermal Drift (12–36 months)

The power MOSFETs in the BMS are the main current-carrying switches. In marine environments:

**What happens**:
- Salt-laden humidity accelerates gate oxide degradation
- Thermal cycling (engine room heat → cold nights) fatigues solder joints
- On-resistance (RDS(on)) gradually increases, causing more heat generation
- This creates a thermal runaway spiral: more heat → more resistance → more heat

**Symptoms**:
- Battery runs warm at loads that previously caused no heating
- BMS trips at lower current thresholds than rated
- Capacity appears to decrease (BMS limiting current earlier)

### Failure Mode #3: Terminal Oxidation (6–24 months)

**The mechanism**:
- Copper or brass terminals develop oxide layers in salt air
- Oxide has 10–100× higher resistance than clean metal
- Contact resistance increases gradually
- Under high current, the terminal becomes a heat source

**Symptoms**:
- Warm or hot terminals during normal operation
- Voltage readings at the terminal differ from readings at the BMS
- Discoloration of terminal hardware

**Prevention**:
- Stainless steel hardware with dielectric grease
- Torque terminals to spec and re-check every 6 months
- Anti-oxidation terminal spray after installation

### Marine Installation Best Practices

1. **Conformal coating verification**: Ask your battery manufacturer if the BMS PCB has conformal coating. This is the single biggest predictor of marine longevity.

2. **IP rating context**: IP67 means "survives submersion." IP68 means "survives prolonged submersion." Neither means "resists salt fog corrosion over 3 years." Look for salt spray test ratings (IEC 60068-2-11).

3. **Ventilation paradox**: You need airflow for heat management but want to minimize salt air exposure. Use filtered ventilation or a sealed compartment with a small fan and desiccant packs.

4. **Terminal maintenance schedule**: Every 6 months: disconnect, clean with contact cleaner, inspect for discoloration, re-apply dielectric grease, torque to spec.
    `,
    category: "Engineering",
    tags: ["Marine", "BMS", "Maintenance", "Corrosion"],
    author: "Technical Team",
    date: "2025-01-30",
    readTime: 11,
    image: blogMarineInstall,
  },
  {
    id: "14",
    title: "Multi-Source Charging Without Conflicts: Solar, Alternator, and Shore Power on One Battery Bank",
    excerpt: "MPPT backfeed, alternator voltage spikes, and charger reverse current — why DIY systems fail after 6 months and how to prevent it.",
    content: `
## The Problem: Multiple Chargers, One Battery

A typical RV or boat has three charging sources:
1. Solar panels via MPPT controller
2. Vehicle alternator via DC-DC charger or direct connection
3. Shore power via AC-DC charger

Each source "sees" the battery voltage and tries to regulate accordingly. When two or more sources operate simultaneously, conflicts arise.

### Conflict #1: MPPT Backfeed

**What happens**: When the battery is nearly full and the MPPT controller enters float mode, a second charging source (e.g., alternator) raises the battery voltage above the MPPT's expected range. The MPPT may:

- Interpret high voltage as a full battery and shut down prematurely
- Attempt to "absorb" current from the other source through its output stage
- In rare cases, feed current backward through the solar string

**Solution**: Use an MPPT controller with proper reverse-current protection and configure absorption voltages identically across all charging sources (within 0.1V).

### Conflict #2: Alternator Voltage Spikes

**What happens**: Vehicle alternators produce voltage regulated by the engine ECU, typically 14.2–14.8V. But during load dumps (e.g., turning off headlights), transient spikes of 18–25V can occur for milliseconds.

LiFePO₄ BMS overvoltage protection typically triggers at 15.6–16V. These spikes can:

- Trigger BMS disconnect, leaving the alternator without a load
- An alternator without a load can self-destruct

**Solution**: Always use a DC-DC charger between the alternator and lithium batteries. Never connect directly. The DC-DC charger absorbs transients and provides clean, regulated output.

### Conflict #3: Shore Power Charger Reverse Current

**What happens**: When you disconnect from shore power, some chargers don't immediately isolate their output. The battery can briefly push current backward through the charger, potentially damaging its output stage.

**Solution**: Use chargers with built-in reverse polarity diodes, or install an external blocking diode on the charger output.

### Conflict #4: Charging Priority Confusion

When solar and shore power are both available, which source should charge the battery?

**Best practice**: Configure a priority hierarchy:

1. Solar first (free energy, reduces grid dependence)
2. Alternator second (available while driving)
3. Shore power third (when parked with hookup)

Most quality MPPT controllers and chargers support this through voltage setpoint configuration. Set solar absorption voltage 0.1V higher than shore power to give it natural priority.

### The Safe Multi-Source Architecture

\`\`\`
Solar Panels → MPPT Controller → Battery Bus (+)
                                      ↑
Alternator → DC-DC Charger ──────────┘
                                      ↑  
Shore Power → AC-DC Charger ─────────┘
                                      ↑
                              Battery Bank
                                      ↓
                              Fuse Panel → Loads
\`\`\`

**Critical rules**:
- Each source must have its own fused connection to the battery bus
- Never daisy-chain chargers through each other
- Use a battery monitor downstream of all sources to track net current
- Match all charging profiles to LiFePO₄ specifications (14.2–14.6V absorption, 13.6V float)
    `,
    category: "Engineering",
    tags: ["Charging", "Solar", "System Design", "DIY"],
    author: "Technical Team",
    date: "2025-01-28",
    readTime: 10,
    image: blogChargingTips,
  },
  {
    id: "15",
    title: "High-Current Appliance Surges: What Coffee Machines and Air Conditioners Really Do to Your Battery",
    excerpt: "The impact of frequent inrush currents on MOSFET fatigue, solder joint stress, and real-world cycle life — beyond the theoretical 4000-cycle number.",
    content: `
## Theory vs. Reality: Cycle Life Under Stress

LiFePO₄ cells are rated for 4000+ cycles at 0.5C discharge to 80% DoD. But real-world usage often includes repeated high-current surges that accelerate specific failure modes not captured in standard cycle testing.

### What Happens During a Surge

When you start a coffee machine, air conditioner compressor, or microwave via an inverter:

1. **Inrush current**: 3–6× the steady-state draw for 0.5–3 seconds
2. **Voltage sag**: Battery voltage drops sharply, then recovers
3. **BMS stress**: MOSFETs handle the peak current through their on-resistance
4. **Thermal pulse**: Localized heating at cell tabs, bus bars, and MOSFET junctions

### The Three Fatigue Mechanisms

**1. MOSFET Thermal Fatigue**

Each surge heats the MOSFET junction by 20–40°C in milliseconds. The junction then cools over seconds. This thermal cycling causes:

- Die-attach solder fatigue (micro-cracks develop over thousands of cycles)
- Bond wire lift-off (wire bonds flex with thermal expansion)
- Gradual increase in on-resistance

After 10,000–50,000 surge events, MOSFET performance degrades noticeably. For a user running a coffee machine twice daily, that's 5–7 years — but it's accelerated if combined with other high-current loads.

**2. Cell Tab and Bus Bar Stress**

The cell tabs (thin nickel or copper strips connecting cells to the bus bar) carry the full surge current. Repeated high-current pulses cause:

- Resistive heating at spot-weld joints
- Thermal expansion/contraction cycling
- Gradual increase in contact resistance

This is rarely visible from outside but shows up as increased internal resistance in battery health monitoring.

**3. Cell-Level Effects**

At the electrochemical level, high-rate discharge:

- Creates larger concentration gradients in the electrolyte
- Accelerates SEI layer growth on the anode
- Can cause localized lithium depletion near the current collector

However, LiFePO₄ chemistry is remarkably tolerant of high-rate discharge. The cell-level impact is typically the smallest contributor to degradation.

### How Much Does It Really Matter?

Under realistic conditions (2–4 surge events per day, 100A peaks, 200Ah battery):

| Factor | Expected Impact on Cycle Life |
|--------|------------------------------|
| Cell electrochemistry | -2 to -5% |
| MOSFET / BMS fatigue | -5 to -15% |
| Connection point degradation | -3 to -8% |
| **Total estimated reduction** | **-10 to -25%** |

So a battery rated for 4000 cycles might deliver 3000–3600 cycles under regular surge loading. Still excellent — but worth understanding.

### Mitigation Strategies

1. **Soft-start inverters**: Reduce inrush current by 50–70%
2. **Oversized battery bank**: Lower C-rate per surge event
3. **Proper torque on all connections**: Prevents gradual loosening
4. **Annual connection inspection**: Catch resistance increases early
5. **Monitor BMS temperature trends**: Rising temps at same loads indicate degradation
    `,
    category: "Engineering",
    tags: ["BMS", "Cycle Life", "System Design", "Maintenance"],
    author: "Technical Team",
    date: "2025-01-25",
    readTime: 10,
    image: blogBatteryComparison,
  },
  {
    id: "16",
    title: "Storage SOC vs. Cycling: Which Actually Degrades Your LiFePO₄ Battery Faster?",
    excerpt: "Long-term shore power at 100% SOC vs. regular cycling — the science of calendar aging, float voltage effects, and optimal storage practices.",
    content: `
## The Two Aging Mechanisms

Every battery ages through two independent mechanisms:

1. **Cycle aging**: Degradation from repeated charge/discharge cycles
2. **Calendar aging**: Degradation from time, regardless of use

For LiFePO₄, the relative contribution of each depends on how you use (or don't use) your battery.

### Calendar Aging: The Silent Killer

Calendar aging occurs through slow chemical reactions in the cell, primarily:

- SEI (Solid Electrolyte Interphase) layer growth on the anode
- Electrolyte decomposition
- Cathode surface film formation

These reactions are accelerated by:
- **Higher SOC**: More reactive electrode surfaces
- **Higher temperature**: Arrhenius relationship (roughly 2× faster per 10°C increase)

### The SOC Storage Experiment

Research data on LiFePO₄ calendar aging at different SOC levels (25°C, 12 months):

| Storage SOC | Capacity Loss | Internal Resistance Increase |
|-------------|--------------|------------------------------|
| 100% | 2.5–3.5% | 8–12% |
| 80% | 1.5–2.0% | 4–6% |
| 60% | 0.8–1.2% | 2–3% |
| 50% | 0.5–1.0% | 1–2% |
| 20% | 0.3–0.5% | 1–2% |

**Key finding**: The difference between 100% and 50% storage is significant. Storing at 100% SOC for a year costs roughly 3× more capacity than storing at 50%.

### The Shore Power Problem

Many RV and boat owners leave their batteries on shore power indefinitely. This means:

- Battery sits at 100% SOC for months
- Float charge continuously compensates for self-discharge
- Temperature may be elevated (engine compartment, sunny dock)

**Combined effect**: A battery stored at 100% SOC at 35°C (common in Southern European marinas) can lose 5–7% capacity per year from calendar aging alone.

### Cycling vs. Calendar: Which Is Worse?

For a typical weekend user (100 cycles/year):

| Aging Source | Annual Capacity Loss |
|-------------|---------------------|
| 100 cycles at 80% DoD | ~2.0% |
| Calendar aging at 50% SOC | ~1.0% |
| Calendar aging at 100% SOC | ~3.0% |

**Paradox**: A battery that sits on shore power at 100% SOC all year (and rarely cycles) can age faster than one that's actively used but stored properly between uses.

### Optimal Storage Practices

**For seasonal use** (stored 4–6 months):
1. Charge to 50–60% SOC
2. Disconnect all loads and chargers
3. Store in a cool, dry location (ideally 10–20°C)
4. Check and top up to 50% every 3 months

**For intermittent use** (weekends, with shore power available):
1. Set your charger's float voltage to 13.2V instead of 13.6V — this keeps SOC at ~70% rather than 100%
2. Only charge to 100% the day before departure
3. Return and let the battery settle to 70% float

**For full-time use**:
1. Regular cycling is actually beneficial — it prevents long high-SOC periods
2. Avoid leaving the battery at 100% for more than 48 hours when not in use
3. If using solar, a properly configured MPPT controller naturally provides good SOC management

### The Bottom Line

LiFePO₄ is exceptionally tolerant compared to other lithium chemistries — NMC batteries lose 2–3× more capacity from the same storage conditions. But "tolerant" doesn't mean "immune." The optimal long-term storage SOC for LiFePO₄ is **50–60%** at **15–25°C**.
    `,
    category: "Engineering",
    tags: ["Maintenance", "Lifespan", "Storage", "Tips"],
    author: "Technical Team",
    date: "2025-01-22",
    readTime: 9,
    image: blogChargingTips,
  },
  {
    id: "17",
    title: "Why DIY Battery Systems Develop 'Random Shutdowns' After 6 Months — and How to Find the Real Cause",
    excerpt: "Everything tests fine on the multimeter, but the system randomly drops power. The problem is almost always a combination of slow-developing connection failures.",
    content: `
## The Mystery Shutdown Pattern

You've built a DIY battery system. It works perfectly for 3–6 months. Then it starts: random power drops lasting 1–5 seconds, sometimes longer. You check everything:

- Battery voltage: normal
- BMS app: no fault codes
- Fuses: intact
- Inverter: resets and works again

Everything "tests fine." But the shutdowns continue and gradually get worse.

### Why Standard Testing Misses the Problem

A multimeter measures **static** resistance. But the failures causing random shutdowns are **dynamic** — they only manifest under load, at specific temperatures, or after thermal cycling.

### The Five Most Common Root Causes

**1. Terminal Micro-Loosening**

Bolt-type terminals gradually loosen due to:
- Thermal cycling (expansion/contraction of dissimilar metals)
- Vibration (especially in vehicles and boats)
- Copper cold flow (copper deforms under sustained pressure)

**Detection**: Measure voltage drop across each connection point while under load (>50A). A healthy connection shows <10mV. A failing connection shows 50–200mV.

**Fix**: Re-torque all terminals to manufacturer specifications. Use Belleville (spring) washers to maintain pressure. Apply anti-seize compound.

**2. Crimp Joint Degradation**

Cable lugs crimped onto battery cables develop high resistance over time:
- Initial resistance: <0.1 mΩ
- After 6 months of thermal cycling: 0.5–2 mΩ
- A 2 mΩ joint at 200A generates 80W of heat — enough to melt insulation

**Detection**: Thermal camera or IR thermometer during heavy loads. Any connection over 40°C warmer than ambient is suspect.

**Fix**: Re-crimp with hydraulic crimper (not pliers). Use tinned copper lugs. Apply heat shrink over the crimp.

**3. BMS MOSFET Thermal Drift**

As described in our marine article, MOSFETs develop increased on-resistance over time. But in a DIY context, poor thermal management accelerates this:

- BMS mounted in an unventilated enclosure
- Battery and BMS in direct sunlight
- No thermal pad between MOSFET and heatsink

**Detection**: Monitor BMS temperature during normal loads. If it's climbing over weeks/months at the same load level, MOSFET degradation is occurring.

**4. Cable Resistance Creep**

Undersized cables don't fail immediately. They heat up, which increases resistance, which increases heating further. Over months:

- Insulation softens and deforms
- Internal oxidation develops at hot spots
- Effective cross-section decreases

**Detection**: Measure cable temperature along its length during heavy loads. Hot spots indicate problem areas.

**5. Fuse Holder Contact Degradation**

Blade fuses and ANL fuses rely on spring contact pressure. Over time:

- Contact surfaces oxidize
- Spring tension relaxes
- Vibration causes intermittent contact

**Detection**: Measure voltage drop across the fuse holder (not just the fuse) during load. Should be <50mV. If >100mV, replace the holder.

### The Diagnostic Workflow

1. **Load test**: Apply a known heavy load (>50% of system rating)
2. **Thermal scan**: Check every connection point with IR thermometer
3. **Voltage drop mapping**: Measure voltage at battery terminal, then at each connection point down to the load. Any drop >20mV per connection indicates a problem.
4. **Torque check**: Re-torque every bolt connection to spec
5. **Visual inspection**: Look for discoloration, melted insulation, green/white corrosion

### Prevention Checklist

- [ ] All connections torqued to spec with Belleville washers
- [ ] Hydraulic-crimped cable lugs with heat shrink
- [ ] Cables sized for 125% of maximum expected current
- [ ] BMS has adequate ventilation
- [ ] Fuse holders rated for continuous current (not just fuse rating)
- [ ] Annual inspection and re-torque schedule
    `,
    category: "Engineering",
    tags: ["DIY", "Troubleshooting", "System Design", "Maintenance"],
    author: "Technical Team",
    date: "2025-01-20",
    readTime: 13,
    image: blogRvGuide,
  },
  {
    id: "18",
    title: "Bluetooth Battery Monitor Data: What You Can Trust and What's Just an Estimate",
    excerpt: "SOC algorithms, current sampling rates, temperature compensation — understanding the real accuracy limits of your battery app.",
    content: `
## Your Battery App Is Not a Lab Instrument

Battery monitoring apps connected via Bluetooth display impressive-looking data: voltage to two decimal places, current to the amp, SOC as a percentage. But the accuracy behind these numbers varies enormously.

### What's Accurate: Voltage

Battery voltage measurement is straightforward and reliable:

- **Typical accuracy**: ±0.5–1% (±0.05V on a 12.8V system)
- **Why it's reliable**: Direct ADC measurement with voltage divider
- **Limitation**: Voltage under load ≠ resting voltage. For accurate SOC estimation from voltage, you need to measure after 30+ minutes of rest.

### What's Mostly Accurate: Current

Current measurement via a shunt resistor is reasonably accurate, but with caveats:

- **Typical accuracy**: ±1–2% at mid-range currents
- **At low currents** (<1A): Accuracy drops to ±5–10% due to ADC resolution limits
- **At very high currents** (>80% of shunt rating): Shunt heating changes its resistance, introducing error
- **Sampling rate matters**: A BMS sampling at 1Hz can miss short transients. A 500ms surge may not be captured.

### What's an Estimate: State of Charge (SOC)

SOC is the number everyone watches — and it's the least accurate measurement on your screen.

**Coulomb counting method** (most common):
- Integrates current over time: SOC = initial SOC + ∫(current × dt)
- **Drift problem**: Small current measurement errors accumulate. A 1% current error becomes a 5% SOC error after 5 hours of use.
- **Requires full-charge calibration**: The algorithm resets to 100% when absorption voltage is reached. If you never fully charge, SOC accuracy degrades over weeks.

**Voltage-based method** (simpler BMS units):
- Maps voltage to SOC using a lookup table
- **Problem**: LiFePO₄ has a very flat voltage curve (12.8–13.2V covers 20–80% SOC)
- A 0.1V measurement error translates to a 15–30% SOC error in the middle range

**Combined (Kalman filter) method** (advanced BMS):
- Fuses voltage and current data with a state model
- Most accurate, but depends on correct cell model parameters
- Still ±3–5% under real-world conditions

### What's Unreliable: Remaining Time Estimates

"Estimated remaining: 4h 23m" — this is calculated by dividing remaining capacity by current load. Problems:

- Assumes constant load (unrealistic)
- Based on potentially inaccurate SOC
- Doesn't account for voltage sag at low SOC triggering early shutdown
- Doesn't factor in temperature effects on available capacity

**Treat remaining time as ±30% at best.**

### What's Missing: Cell-Level Data

Most Bluetooth monitors show **pack-level** data. But critical information is at the cell level:

- **Cell voltage imbalance**: If one cell in a 4S pack is 50mV lower, the pack will hit low-voltage cutoff earlier than SOC suggests
- **Cell temperature variance**: One hot cell can trigger protection while average temperature looks normal
- **Cell impedance**: Rising impedance in one cell indicates degradation

Only BMS systems with cell-level Bluetooth reporting (like those showing individual cell voltages) provide this data.

### Practical Guidance

| Data Point | Trust Level | Use For |
|-----------|-------------|---------|
| Voltage (resting) | High (±1%) | Rough SOC check, system health |
| Voltage (under load) | Medium | Identifying voltage sag issues |
| Current | Medium-High (±2%) | Load monitoring, charge rate |
| SOC (after recent full charge) | Medium (±5%) | Trip planning |
| SOC (no full charge in 2+ weeks) | Low (±10–15%) | General awareness only |
| Remaining time | Low (±30%) | Rough guidance only |
| Temperature | Medium-High (±2°C) | Safety decisions |

### How to Maximize Accuracy

1. **Fully charge once per week**: This recalibrates the Coulomb counter
2. **Set correct battery capacity in the monitor**: If your monitor thinks you have 200Ah but you have 100Ah, every reading is wrong
3. **Don't trust SOC below 20%**: Error compounds at the extremes
4. **Use voltage as a sanity check**: If SOC says 60% but voltage is 12.0V under light load, SOC is wrong
5. **Monitor trends, not absolutes**: A gradual increase in cell voltage spread over weeks is more informative than any single reading
    `,
    category: "Engineering",
    tags: ["Bluetooth", "Monitoring", "BMS", "Tips"],
    author: "Technical Team",
    date: "2025-01-18",
    readTime: 11,
    image: blogBmsTechnology,
  },
];

export const categories = ["All", "Guides", "Tips", "Education", "Stories", "Engineering"];

export const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));
