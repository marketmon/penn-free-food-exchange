import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapMeadowToDomain(meadow: string) {
  const meadowDomainMappings: {
    [key: string]: string;
  } = {
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

export function getLastUpdatedTimeAgo(updatedTime: string, displayFor: string) {
  const currentTime = new Date();
  const updateTime = new Date(updatedTime);
  const timeDifference = currentTime.getTime() - updateTime.getTime();

  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (displayFor === "badge") {
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hr ago`;
    } else if (minutes >= 0) {
      return `${minutes} min ago`;
    }
  } else {
    if (days > 0) {
      return `Updated ${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `Updated ${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `Updated ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `Updated just now`;
    }
  }
}
