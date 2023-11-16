import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import { Listing } from "@/lib/types";

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

export function filterListings(currFilter: string, listings: Listing[]) {
  if (currFilter === "new") {
    return filterListingsByNew(listings);
  } else if (currFilter === "old") {
    return filterListingsByOld(listings);
  } else if (currFilter === "still-there") {
    return filterListingsByStillThere(listings);
  } else if (currFilter === "most-thanked") {
    return filterListingsByMostThanked(listings);
  } else {
    return filterListingsByLeastThanked(listings);
  }
}

function filterListingsByNew(listings: Listing[]) {
  listings.sort((listingA, listingB) => {
    const dateForListingA = new Date(listingA.updatedAt);
    const dateForListingB = new Date(listingB.updatedAt);
    return +dateForListingB - +dateForListingA;
  });

  return listings;
}

function filterListingsByOld(listings: Listing[]) {
  listings.sort((listingA, listingB) => {
    const dateForListingA = new Date(listingA.updatedAt);
    const dateForListingB = new Date(listingB.updatedAt);
    return +dateForListingA - +dateForListingB;
  });

  return listings;
}

function filterListingsByStillThere(listings: Listing[]) {
  listings.sort((listingA, listingB) => {
    if (listingA.stillThere !== listingB.stillThere) {
      // sort by "stillThere" (true first)
      return listingA.stillThere ? -1 : 1;
    }

    // if "stillThere" values are the same, sort by updatedAt
    const dateForListingA = new Date(listingA.updatedAt);
    const dateForListingB = new Date(listingB.updatedAt);
    return +dateForListingB - +dateForListingA;
  });

  return listings;
}

function filterListingsByMostThanked(listings: Listing[]) {
  listings.sort((listingA, listingB) => {
    // Compare the length of usersThankedIds
    const numThanksForListingA = listingA.usersThankedIds.length;
    const numThanksForListingB = listingB.usersThankedIds.length;

    if (numThanksForListingA !== numThanksForListingB) {
      return numThanksForListingB - numThanksForListingA;
    }

    // if the number of usersThankedIds is the same, sort by updatedAt
    const dateForListingA = new Date(listingA.updatedAt);
    const dateForListingB = new Date(listingB.updatedAt);
    return +dateForListingB - +dateForListingA;
  });

  return listings;
}

function filterListingsByLeastThanked(listings: Listing[]) {
  listings.sort((listingA, listingB) => {
    const numThanksForListingA = listingA.usersThankedIds.length;
    const numThanksForListingB = listingB.usersThankedIds.length;

    if (numThanksForListingA !== numThanksForListingB) {
      return numThanksForListingA - numThanksForListingB;
    }

    // if the number of usersThankedIds is the same, sort by updatedAt
    const dateForListingA = new Date(listingA.updatedAt);
    const dateForListingB = new Date(listingB.updatedAt);
    return +dateForListingB - +dateForListingA;
  });

  return listings;
}
