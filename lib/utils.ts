import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type MeadowDomainMappings = {
  [key: string]: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapMeadowToDomain(meadow: string) {
  const meadowDomainMappings: MeadowDomainMappings = {
    "University of Pennsylvania": "upenn.edu",
    "University of Florida": "ufl.edu",
    // Add more college mappings as needed
  };
  return meadowDomainMappings[meadow];
}