import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Bluetooth, 
  Smartphone, 
  Download, 
  Wifi, 
  Battery, 
  Settings,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Mail,
  ChevronRight,
  Apple,
  PlayCircle,
  MapPin,
  RefreshCw,
  XCircle,
  Zap
} from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Download the App",
    description: "Get the Sentorise Battery Monitor app from your app store.",
    icon: Download,
    details: [
      "Search 'Sentorise Battery' in App Store or Google Play",
      "Or scan the QR code on your battery label",
      "App is free with no subscription required"
    ]
  },
  {
    step: 2,
    title: "Enable Bluetooth & Location",
    description: "Grant the necessary permissions for the app to find your battery.",
    icon: Settings,
    details: [
      "Turn on Bluetooth in your phone settings",
      "Allow Location access (required for Bluetooth scanning on Android)",
      "Keep the app open during initial setup"
    ]
  },
  {
    step: 3,
    title: "Approach Your Battery",
    description: "Move within 10 meters of your Sentorise battery.",
    icon: Wifi,
    details: [
      "The Bluetooth module activates when battery is powered",
      "Range: approximately 10 meters (30 feet)",
      "Metal enclosures may reduce range slightly"
    ]
  },
  {
    step: 4,
    title: "Auto-Detect & Connect",
    description: "The app will automatically find and connect to your battery.",
    icon: Bluetooth,
    details: [
      "Tap 'Scan for Batteries' in the app",
      "Your battery will appear as 'SENT-XXXX' (last 4 digits of serial)",
      "Tap to connect - no pairing code needed"
    ]
  },
  {
    step: 5,
    title: "View Real-Time Data",
    description: "Monitor voltage, current, temperature, and state of charge.",
    icon: Battery,
    details: [
      "Dashboard shows live voltage and current",
      "State of charge (%) updates in real-time",
      "View cell balance status and cycle count",
      "Temperature monitoring with alerts"
    ]
  }
];

const compatibility = {
  ios: {
    version: "iOS 12.0 or later",
    devices: "iPhone 6s and newer, iPad (5th gen+)",
    permissions: ["Bluetooth", "Local Network (optional)"]
  },
  android: {
    version: "Android 8.0 (Oreo) or later",
    devices: "Most smartphones with Bluetooth 4.0+",
    permissions: ["Bluetooth", "Location (for BLE scanning)", "Nearby devices (Android 12+)"]
  }
};

const troubleshooting = [
  {
    code: "E001",
    issue: "Battery not found",
    causes: ["Battery not powered on", "Out of Bluetooth range", "Bluetooth disabled on phone"],
    solution: "Ensure battery has load/charger connected. Move within 10m. Check phone Bluetooth is ON."
  },
  {
    code: "E002",
    issue: "Connection keeps dropping",
    causes: ["Interference from other devices", "Low phone battery", "App running in background"],
    solution: "Keep app in foreground. Move away from WiFi routers. Ensure phone battery > 20%."
  },
  {
    code: "E003",
    issue: "Data not updating",
    causes: ["Connection lost", "App needs refresh", "BMS in sleep mode"],
    solution: "Pull down to refresh. Reconnect if needed. Apply small load to wake BMS."
  },
  {
    code: "E004",
    issue: "Can't find app in store",
    causes: ["Region restriction", "Device incompatibility", "Old OS version"],
    solution: "Update your phone OS. Search 'Sentorise' (not 'Sentorise Battery'). Contact support."
  },
  {
    code: "E005",
    issue: "Permission denied error",
    causes: ["Bluetooth permission blocked", "Location permission denied"],
    solution: "Go to phone Settings > Apps > Sentorise > Permissions. Enable all required permissions."
  }
];

const appFeatures = [
  { label: "Live Voltage", description: "Real-time voltage reading (12.0V - 14.6V)" },
  { label: "Current Flow", description: "Charge (+) and discharge (-) current in Amps" },
  { label: "State of Charge", description: "Battery percentage (0-100%)" },
  { label: "Temperature", description: "Internal temperature with high/low alerts" },
  { label: "Cell Balance", description: "Individual cell voltages and balance status" },
  { label: "Cycle Count", description: "Total charge/discharge cycles recorded" },
  { label: "History", description: "Usage logs and performance trends" },
  { label: "Alerts", description: "Push notifications for critical events" }
];

const BluetoothGuidePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Bluetooth Monitoring Guide" 
        description="Complete guide to setting up and using Bluetooth monitoring on your Sentorise LiFePO₄ battery. 5-step setup, troubleshooting, and app features." 
      />
      <AnnouncementBar />
      <Header />
      
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16 border-b">
          <div className="container-custom">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="w-4 h-4 inline mx-2" />
              <Link to="/support" className="hover:text-primary">Support</Link>
              <ChevronRight className="w-4 h-4 inline mx-2" />
              <span className="text-foreground">Bluetooth Guide</span>
            </nav>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Bluetooth className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Bluetooth Monitoring Guide
                </h1>
                <p className="text-lg text-muted-foreground">
                  Set up in 5 minutes • No account required • Free app
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" asChild>
                <a href="#setup">Setup Guide</a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="#compatibility">Compatibility</a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="#troubleshooting">Troubleshooting</a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="#contact">Get Help</a>
              </Button>
            </div>
          </div>
        </section>

        {/* 5-Step Setup Guide */}
        <section id="setup" className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-2">5-Step Quick Setup</h2>
              <p className="text-muted-foreground mb-8">
                Get your Bluetooth monitoring running in under 5 minutes.
              </p>

              <div className="space-y-6">
                {steps.map((step) => (
                  <div 
                    key={step.step}
                    className="relative flex gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
                  >
                    {/* Step number */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                        {step.step}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <step.icon className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-3">{step.description}</p>
                      <ul className="space-y-1">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* App Download Buttons */}
              <div className="mt-8 p-6 bg-muted/50 rounded-xl text-center">
                <p className="font-semibold text-foreground mb-4">Download the App</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" variant="outline" className="gap-2" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Apple className="w-5 h-5" />
                      App Store
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <PlayCircle className="w-5 h-5" />
                      Google Play
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You Can Monitor */}
        <section className="section-padding bg-muted/30 border-y">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-2">What You Can Monitor</h2>
              <p className="text-muted-foreground mb-8">
                Real-time battery data at your fingertips.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {appFeatures.map((feature) => (
                  <div key={feature.label} className="p-4 bg-card rounded-lg border">
                    <p className="font-semibold text-foreground mb-1">{feature.label}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Compatibility */}
        <section id="compatibility" className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-2">Device Compatibility</h2>
              <p className="text-muted-foreground mb-8">
                Check if your phone is compatible.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* iOS */}
                <div className="p-6 bg-card rounded-xl border">
                  <div className="flex items-center gap-3 mb-4">
                    <Apple className="w-8 h-8 text-foreground" />
                    <h3 className="text-lg font-semibold text-foreground">iOS (iPhone/iPad)</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Minimum Version</p>
                      <p className="font-medium text-foreground">{compatibility.ios.version}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Supported Devices</p>
                      <p className="font-medium text-foreground">{compatibility.ios.devices}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Required Permissions</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {compatibility.ios.permissions.map((perm) => (
                          <span key={perm} className="px-2 py-1 bg-muted rounded text-xs">{perm}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Android */}
                <div className="p-6 bg-card rounded-xl border">
                  <div className="flex items-center gap-3 mb-4">
                    <Smartphone className="w-8 h-8 text-foreground" />
                    <h3 className="text-lg font-semibold text-foreground">Android</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Minimum Version</p>
                      <p className="font-medium text-foreground">{compatibility.android.version}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Supported Devices</p>
                      <p className="font-medium text-foreground">{compatibility.android.devices}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Required Permissions</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {compatibility.android.permissions.map((perm) => (
                          <span key={perm} className="px-2 py-1 bg-muted rounded text-xs">{perm}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Permission Note */}
              <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">Why Location Permission?</p>
                    <p className="text-muted-foreground">
                      Android requires Location permission for Bluetooth Low Energy (BLE) scanning. 
                      This is a system requirement - our app does NOT track or store your location.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section id="troubleshooting" className="section-padding bg-muted/30 border-y">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-2">Troubleshooting</h2>
              <p className="text-muted-foreground mb-8">
                Quick fixes for common issues.
              </p>

              <Accordion type="single" collapsible className="space-y-3">
                {troubleshooting.map((item) => (
                  <AccordionItem 
                    key={item.code}
                    value={item.code}
                    className="bg-card rounded-lg border px-4"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3 text-left">
                        <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-mono rounded">
                          {item.code}
                        </span>
                        <span className="font-medium text-foreground">{item.issue}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="space-y-3 pl-14">
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">Possible Causes:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {item.causes.map((cause, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                                {cause}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">Solution:</p>
                          <p className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            {item.solution}
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section id="contact" className="section-padding">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Still Need Help?</h2>
              <p className="text-muted-foreground mb-6">
                Our technical support team responds within 24-48 hours.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-card rounded-lg border text-left">
                  <Mail className="w-6 h-6 text-primary mb-2" />
                  <p className="font-semibold text-foreground">Email Support</p>
                  <a href="mailto:support@sentorise.de" className="text-primary text-sm hover:underline">
                    support@sentorise.de
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">Response: 24-48 hours</p>
                </div>
                <div className="p-4 bg-card rounded-lg border text-left">
                  <Zap className="w-6 h-6 text-primary mb-2" />
                  <p className="font-semibold text-foreground">Priority Support</p>
                  <p className="text-sm text-muted-foreground">Include "BLUETOOTH" in subject line</p>
                  <p className="text-xs text-muted-foreground mt-1">Faster routing to tech team</p>
                </div>
              </div>

              {/* Support Form Template */}
              <div className="p-6 bg-muted/50 rounded-xl text-left">
                <p className="font-semibold text-foreground mb-3">When contacting support, please include:</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    Battery model and serial number (on label)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    Phone model and OS version
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    App version (found in app settings)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    Error code (if shown) and steps to reproduce
                  </li>
                </ul>
              </div>

              <Button asChild className="mt-6">
                <Link to="/support#contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BluetoothGuidePage;
