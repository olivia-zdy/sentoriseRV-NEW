import { useState } from "react";
import { Shield, Thermometer, Headphones, Puzzle, Battery, Zap, Cable } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import SystemDiagram from "@/components/SystemDiagram";

const Features = () => {
  const [diagramOpen, setDiagramOpen] = useState(false);
  const { t } = useTranslation();

  const featureGroups = [
    {
      title: t('features.group1Title'),
      subtitle: t('features.group1Subtitle'),
      features: [
        { icon: Shield, title: t('features.bms'), description: t('features.bmsDesc'), highlight: t('features.bmsBadge') },
        { icon: Thermometer, title: t('features.coldWeather'), description: t('features.coldWeatherDesc'), highlight: t('features.coldWeatherBadge') },
        { icon: Headphones, title: t('features.warrantySupport'), description: t('features.warrantySupportDesc'), highlight: t('features.warrantySupportBadge') },
      ],
    },
    {
      title: t('features.group2Title'),
      subtitle: t('features.group2Subtitle'),
      features: [
        { icon: Puzzle, title: t('features.compatible'), description: t('features.compatibleDesc'), highlight: t('features.compatibleBadge') },
        { icon: Battery, title: t('features.flexible'), description: t('features.flexibleDesc'), highlight: t('features.flexibleBadge') },
        { icon: Cable, title: t('features.diagram'), description: t('features.diagramDesc'), highlight: t('features.diagramBadge'), action: "diagram" as const },
      ],
    },
    {
      title: t('features.group3Title'),
      subtitle: t('features.group3Subtitle'),
      features: [
        { icon: Zap, title: t('features.cycles'), description: t('features.cyclesDesc'), highlight: t('features.cyclesBadge') },
      ],
    },
  ];

  return (
    <section id="features" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
            {t('features.sectionLabel')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl headline-clean text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="space-y-16">
          {featureGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {groupIndex + 1}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">{group.title}</h3>
                </div>
                <p className="text-muted-foreground ml-11 italic">{group.subtitle}</p>
              </div>

              <div className={`grid grid-cols-1 ${group.features.length === 1 ? 'md:grid-cols-1 max-w-2xl' : group.features.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 md:gap-8 ml-0 md:ml-11`}>
                {group.features.map((feature) => (
                  <div key={feature.title} className="group p-6 md:p-8 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      {feature.highlight && !('action' in feature && feature.action === "diagram") && (
                        <span className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">{feature.highlight}</span>
                      )}
                      {'action' in feature && feature.action === "diagram" && (
                        <Dialog open={diagramOpen} onOpenChange={setDiagramOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-xs">{feature.highlight}</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-bold text-foreground">{t('features.diagramDialogTitle')}</DialogTitle>
                            </DialogHeader>
                            <SystemDiagram />
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
