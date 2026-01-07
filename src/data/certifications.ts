export interface Certification {
  id: string;
  name: string;
  description: string;
}

export const certifications: Certification[] = [
  { id: "ce", name: "CE", description: "European Conformity" },
  { id: "rohs", name: "RoHS", description: "Restriction of Hazardous Substances" },
  { id: "un38.3", name: "UN38.3", description: "Transport Safety Certified" },
  { id: "ul", name: "UL", description: "Underwriters Laboratories" },
  { id: "iec62619", name: "IEC62619", description: "Secondary Lithium Cells Safety" },
  { id: "fcc", name: "FCC", description: "Federal Communications Commission" },
];

export const productCertifications: Record<string, string[]> = {
  "lite-12v6": ["ce", "rohs", "un38.3"],
  "lite-12v50": ["ce", "rohs", "un38.3", "fcc"],
  "core-12v100-std": ["ce", "rohs", "un38.3", "ul", "iec62619", "fcc"],
  "core-12v100-mini": ["ce", "rohs", "un38.3", "ul", "iec62619", "fcc"],
  "core-12v100-din": ["ce", "rohs", "un38.3", "ul", "iec62619", "fcc"],
  "plus-12v200-heated": ["ce", "rohs", "un38.3", "ul", "iec62619", "fcc"],
};

export const getCertificationsForProduct = (productId: string): Certification[] => {
  const certIds = productCertifications[productId] || [];
  return certifications.filter(c => certIds.includes(c.id));
};
