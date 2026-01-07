import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Glass morphism icon circle - reusable across components
export const glassIconClass = 
  "w-12 h-12 rounded-full bg-background/60 backdrop-blur-md border border-border/50 flex items-center justify-center hover:bg-background/80 hover:scale-110 hover:border-primary transition-all duration-300";

export const glassIconClassSm = 
  "w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm border border-border/40 flex items-center justify-center hover:scale-110 hover:border-primary transition-all duration-300";
