import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";

type MeadowDomainMappings = {
  [key: string]: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapMeadowToDomain(meadow: string) {
  const meadowDomainMappings: MeadowDomainMappings = {
    "University of Pennsylvania": "upenn.edu",
    "University of Florida": "ufl.edu",
    // Add more college mappings as needed
  };
  return "gmail.com";
  return meadowDomainMappings[meadow];
}

export async function getClerkCurrentUser() {
  const user: User | null = await currentUser();
  return user;
}
