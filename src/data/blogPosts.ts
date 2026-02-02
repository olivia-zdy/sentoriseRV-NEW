// Import real images
import heroImage from "@/assets/hero-battery.jpg";
import rvImage from "@/assets/product-rv-battery.jpg";
import portableImage from "@/assets/product-portable.jpg";
import wallImage from "@/assets/product-wall-battery.jpg";
import industrialImage from "@/assets/product-industrial.jpg";
import product100ahStd from "@/assets/product-100ah-std.png";
import product200ahHeated from "@/assets/product-200ah-heated.png";
import heroMarine from "@/assets/hero-marine.jpg";

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
    image: rvImage,
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
    image: product200ahHeated,
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
    image: wallImage,
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
    image: heroImage,
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
    image: product100ahStd,
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
    image: portableImage,
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
    image: heroMarine,
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
    image: wallImage,
  },
];

export const categories = ["All", "Guides", "Tips", "Education", "Stories"];

export const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));
