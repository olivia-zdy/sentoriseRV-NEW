import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Battery, Zap, Lightbulb, Plug, Car, Home, Waves, Thermometer, Smartphone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DiagramComponent {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  position: { x: number; y: number };
  size?: "sm" | "md" | "lg";
  highlight?: boolean;
}

interface DiagramConnection {
  from: string;
  to: string;
  label?: string;
}

interface SystemConfig {
  id: string;
  name: string;
  description: string;
  components: DiagramComponent[];
  connections: DiagramConnection[];
}

const systemConfigs: SystemConfig[] = [
  {
    id: "basic-rv",
    name: "Basic RV",
    description: "Solar + Battery + Loads",
    components: [
      { id: "solar", label: "Solar Panels", icon: Sun, description: "100-400W compatible", position: { x: 50, y: 5 }, size: "md" },
      { id: "mppt", label: "MPPT Controller", icon: Zap, description: "Victron, Renogy, EPEver", position: { x: 50, y: 30 } },
      { id: "battery", label: "Sentorise LiFePO₄", icon: Battery, description: "12V 100Ah with BMS", position: { x: 50, y: 55 }, size: "lg", highlight: true },
      { id: "fuse", label: "Fuse Box", icon: Plug, description: "Distribution panel", position: { x: 50, y: 80 } },
      { id: "lights", label: "DC Loads", icon: Lightbulb, description: "Lights, USB, Fridge", position: { x: 25, y: 95 }, size: "sm" },
      { id: "inverter", label: "Inverter", icon: Plug, description: "AC outlets", position: { x: 75, y: 95 }, size: "sm" },
    ],
    connections: [
      { from: "solar", to: "mppt", label: "DC" },
      { from: "mppt", to: "battery", label: "Charge" },
      { from: "battery", to: "fuse", label: "12V DC" },
      { from: "fuse", to: "lights" },
      { from: "fuse", to: "inverter" },
    ],
  },
  {
    id: "full-rv",
    name: "Full RV System",
    description: "Solar + Alternator + Shore + Battery",
    components: [
      { id: "solar", label: "Solar Array", icon: Sun, description: "200-600W panels", position: { x: 25, y: 5 }, size: "md" },
      { id: "mppt", label: "MPPT", icon: Zap, description: "Solar controller", position: { x: 25, y: 25 } },
      { id: "dcdc", label: "DC-DC Charger", icon: Car, description: "Alternator charging", position: { x: 10, y: 50 }, size: "md" },
      { id: "battery", label: "Sentorise LiFePO₄", icon: Battery, description: "100-200Ah capacity", position: { x: 50, y: 50 }, size: "lg", highlight: true },
      { id: "shore", label: "Shore Charger", icon: Plug, description: "AC to DC", position: { x: 90, y: 50 }, size: "md" },
      { id: "app", label: "Bluetooth App", icon: Smartphone, description: "Real-time monitoring", position: { x: 75, y: 25 }, size: "sm" },
      { id: "fuse", label: "Bus Bar", icon: Plug, description: "Power distribution", position: { x: 50, y: 75 } },
      { id: "loads", label: "All Loads", icon: Lightbulb, description: "DC + AC via inverter", position: { x: 50, y: 95 }, size: "md" },
    ],
    connections: [
      { from: "solar", to: "mppt" },
      { from: "mppt", to: "battery" },
      { from: "dcdc", to: "battery", label: "While driving" },
      { from: "shore", to: "battery", label: "When plugged in" },
      { from: "battery", to: "app", label: "BT" },
      { from: "battery", to: "fuse" },
      { from: "fuse", to: "loads" },
    ],
  },
  {
    id: "van-build",
    name: "Van Conversion",
    description: "Compact DC-DC focused system",
    components: [
      { id: "alternator", label: "Vehicle Alternator", icon: Car, description: "Primary charging", position: { x: 20, y: 15 }, size: "md" },
      { id: "dcdc", label: "DC-DC Charger", icon: Zap, description: "30-60A output", position: { x: 20, y: 40 } },
      { id: "solar", label: "Roof Solar", icon: Sun, description: "100-200W panel", position: { x: 80, y: 15 }, size: "sm" },
      { id: "mppt", label: "MPPT", icon: Zap, description: "Built into some DC-DC", position: { x: 80, y: 40 }, size: "sm" },
      { id: "battery", label: "Sentorise MINI", icon: Battery, description: "Compact 100Ah", position: { x: 50, y: 55 }, size: "lg", highlight: true },
      { id: "loads", label: "Van Loads", icon: Lightbulb, description: "Lights, fridge, USB", position: { x: 50, y: 85 }, size: "md" },
    ],
    connections: [
      { from: "alternator", to: "dcdc" },
      { from: "dcdc", to: "battery", label: "Main charge" },
      { from: "solar", to: "mppt" },
      { from: "mppt", to: "battery", label: "Supplement" },
      { from: "battery", to: "loads" },
    ],
  },
  {
    id: "offgrid",
    name: "Off-Grid Cabin",
    description: "Large solar array + heated battery",
    components: [
      { id: "solar1", label: "Solar Array 1", icon: Sun, description: "300-500W", position: { x: 25, y: 5 }, size: "md" },
      { id: "solar2", label: "Solar Array 2", icon: Sun, description: "300-500W", position: { x: 75, y: 5 }, size: "md" },
      { id: "mppt", label: "MPPT Controller", icon: Zap, description: "60-100A capacity", position: { x: 50, y: 25 }, size: "md" },
      { id: "battery", label: "Sentorise 200Ah Heated", icon: Battery, description: "Self-heating for winter", position: { x: 50, y: 50 }, size: "lg", highlight: true },
      { id: "heating", label: "Self-Heating", icon: Thermometer, description: "Activates at -20°C", position: { x: 80, y: 50 }, size: "sm" },
      { id: "inverter", label: "Inverter/Charger", icon: Plug, description: "3000W+ hybrid", position: { x: 50, y: 75 }, size: "md" },
      { id: "loads", label: "Cabin Loads", icon: Home, description: "Full household power", position: { x: 50, y: 95 }, size: "md" },
    ],
    connections: [
      { from: "solar1", to: "mppt" },
      { from: "solar2", to: "mppt" },
      { from: "mppt", to: "battery" },
      { from: "battery", to: "heating", label: "Auto" },
      { from: "battery", to: "inverter" },
      { from: "inverter", to: "loads" },
    ],
  },
];

const SystemDiagram = () => {
  const [activeSystem, setActiveSystem] = useState("basic-rv");
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const currentConfig = systemConfigs.find(c => c.id === activeSystem) || systemConfigs[0];

  const getSizeClasses = (size?: "sm" | "md" | "lg") => {
    switch (size) {
      case "sm": return "w-14 h-14 md:w-16 md:h-16";
      case "lg": return "w-20 h-20 md:w-24 md:h-24";
      default: return "w-16 h-16 md:w-20 md:h-20";
    }
  };

  return (
    <div className="w-full">
      {/* System Selector Tabs */}
      <Tabs value={activeSystem} onValueChange={setActiveSystem} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
          {systemConfigs.map((config) => (
            <TabsTrigger key={config.id} value={config.id} className="text-xs sm:text-sm">
              {config.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {systemConfigs.map((config) => (
          <TabsContent key={config.id} value={config.id}>
            <div className="text-center mb-6">
              <p className="text-muted-foreground">{config.description}</p>
            </div>

            {/* Diagram Container */}
            <div className="relative bg-muted/30 rounded-2xl border border-border p-4 md:p-8 min-h-[400px] md:min-h-[500px]">
              {/* SVG for connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" className="fill-primary/40" />
                  </marker>
                </defs>
                {config.connections.map((conn, idx) => {
                  const fromComp = config.components.find(c => c.id === conn.from);
                  const toComp = config.components.find(c => c.id === conn.to);
                  if (!fromComp || !toComp) return null;

                  const x1 = `${fromComp.position.x}%`;
                  const y1 = `${fromComp.position.y + 8}%`;
                  const x2 = `${toComp.position.x}%`;
                  const y2 = `${toComp.position.y - 2}%`;

                  return (
                    <g key={idx}>
                      <line
                        x1={x1} y1={y1}
                        x2={x2} y2={y2}
                        className="stroke-primary/30"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        markerEnd="url(#arrowhead)"
                      />
                      {conn.label && (
                        <text
                          x={`${(fromComp.position.x + toComp.position.x) / 2}%`}
                          y={`${(fromComp.position.y + toComp.position.y) / 2 + 3}%`}
                          className="fill-muted-foreground text-[8px] md:text-[10px]"
                          textAnchor="middle"
                        >
                          {conn.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Components */}
              {config.components.map((component) => {
                const Icon = component.icon;
                const isHovered = hoveredComponent === component.id;
                const isHighlight = component.highlight;

                return (
                  <motion.div
                    key={component.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${component.position.x}%`,
                      top: `${component.position.y}%`,
                      zIndex: isHovered ? 20 : 10,
                    }}
                    onMouseEnter={() => setHoveredComponent(component.id)}
                    onMouseLeave={() => setHoveredComponent(null)}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className={`
                      ${getSizeClasses(component.size)}
                      rounded-xl flex flex-col items-center justify-center cursor-pointer
                      transition-all duration-200
                      ${isHighlight 
                        ? 'bg-primary/20 border-2 border-primary shadow-lg shadow-primary/20' 
                        : 'bg-background border border-border hover:border-primary/50'
                      }
                    `}>
                      <Icon className={`w-6 h-6 md:w-8 md:h-8 ${isHighlight ? 'text-primary' : 'text-foreground'}`} />
                      <span className="text-[9px] md:text-[10px] font-medium text-center mt-1 px-1 leading-tight text-foreground">
                        {component.label}
                      </span>
                    </div>

                    {/* Tooltip */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-30"
                      >
                        <div className="bg-popover text-popover-foreground border border-border rounded-lg shadow-lg p-3 min-w-[160px] text-center">
                          <p className="font-semibold text-sm">{component.label}</p>
                          <p className="text-xs text-muted-foreground mt-1">{component.description}</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary/20 border-2 border-primary" />
                <span>Sentorise Battery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-background border border-border" />
                <span>Compatible Components</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 border-t-2 border-dashed border-primary/30" />
                <span>Power Flow</span>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SystemDiagram;
