import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import { Listing, WestPhillyHalloweenDataProject } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapMeadowToDomain(meadow: string): string {
  const meadowDomainMappings: Record<string, string> = {
    "University of Pennsylvania": "upenn.edu",
    "University of Florida": "ufl.edu",
    // Add more college mappings as needed
  };

  return meadowDomainMappings[meadow];
}

export async function getClerkCurrentUser() {
  const user: User | null = await currentUser();
  return user;
}

export function getLastUpdatedTimeAgo(
  updatedTime: string,
  displayFor: string
): string {
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
    } else if (minutes > 0) {
      return `${minutes} min ago`;
    } else {
      return "just now";
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

export function filterListings(
  currFilter: string,
  listings: Listing[]
): Listing[] {
  function sortingFunction(a: Listing, b: Listing) {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);
    const numThanksA = a.usersThankedIds.length;
    const numThanksB = b.usersThankedIds.length;

    switch (currFilter) {
      case "new":
        return +dateB - +dateA;
      case "old":
        return +dateA - +dateB;
      case "still-there":
        if (a.stillThere !== b.stillThere) {
          return a.stillThere ? -1 : 1;
        }
        return +dateB - +dateA;
      case "most-thanked":
        if (numThanksA !== numThanksB) {
          return numThanksB - numThanksA;
        }
        return +dateB - +dateA;
      default:
        if (numThanksA !== numThanksB) {
          return numThanksA - numThanksB;
        }
        return +dateB - +dateA;
    }
  }

  return [...listings].sort(sortingFunction);
}

export function getListingsToShow(
  isLoading: boolean,
  error: Error | null,
  dashboardFor: string,
  listings: Listing[] | undefined,
  userId: string | undefined
): Listing[] | null {
  if (isLoading || error) return null;

  if (dashboardFor === "view") return listings!;

  if (dashboardFor === "manage") {
    return listings!.filter((listing: Listing) => listing.creatorId === userId);
  }

  return null;
}

function getCountsAndSortData<T>(
  data: T[],
  keyExtractor: (item: T) => string,
  categoryKey: string
) {
  const counts: Record<string, number> = {};

  data.forEach((item) => {
    const key = keyExtractor(item);
    if (counts[key]) {
      counts[key]++;
    } else {
      counts[key] = 1;
    }
  });

  return Object.entries(counts)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([key, count]) => ({ [categoryKey]: key, count }));
}

export function getFavoriteCandies(
  halloweenData: WestPhillyHalloweenDataProject[]
) {
  return getCountsAndSortData(halloweenData, (item) => item.favorite, "name");
}

export function getLeastFavoriteCandies(
  halloweenData: WestPhillyHalloweenDataProject[]
) {
  return getCountsAndSortData(halloweenData, (item) => item.worst, "name");
}

export function getCostumeCategories(
  halloweenData: WestPhillyHalloweenDataProject[]
) {
  return getCountsAndSortData(
    halloweenData,
    (item) => item.costume_category,
    "costume"
  );
}

function getPeopleByCostumeCategories(
  halloweenData: WestPhillyHalloweenDataProject[],
  categories: string[]
) {
  return halloweenData.filter((item) =>
    categories.includes(item.costume_category)
  );
}

export function getFavoriteFlavorsByCategories(
  halloweenData: WestPhillyHalloweenDataProject[],
  categories: string[]
) {
  return getCountsAndSortData(
    getPeopleByCostumeCategories(halloweenData, categories),
    (item) => item.flavor_fav,
    "flavor"
  );
}

export function getFavoriteFormsOfCandyByCategories(
  halloweenData: WestPhillyHalloweenDataProject[],
  categories: string[]
) {
  const peopleByCostumeCategories = getPeopleByCostumeCategories(
    halloweenData,
    categories
  );

  if (peopleByCostumeCategories.length === 0) {
    return [];
  }

  const result = [
    { formOfCandy: "bar", count: 0 },
    { formOfCandy: "hard", count: 0 },
    { formOfCandy: "pieces", count: 0 },
  ];

  peopleByCostumeCategories.forEach((person) => {
    result[0].count += person.fav_bar;
    result[1].count += person.fav_hard;
    result[2].count += person.fav_pieces;
  });

  return result;
}

export function getFavoriteTypesOfChocolateByCategories(
  halloweenData: WestPhillyHalloweenDataProject[],
  categories: string[]
) {
  const peopleByCostumeCategories = getPeopleByCostumeCategories(
    halloweenData,
    categories
  );

  if (peopleByCostumeCategories.length === 0) {
    return [];
  }

  const result = [
    { typeOfChocolate: "pure chocolate", count: 0 },
    { typeOfChocolate: "peanut", count: 0 },
    { typeOfChocolate: "carmel", count: 0 },
    { typeOfChocolate: "wafer", count: 0 },
  ];

  peopleByCostumeCategories.forEach((person) => {
    result[0].count += person.fav_pure;
    result[1].count += person.fav_peanut;
    result[2].count += person.fav_caramel;
    result[3].count += person.fav_wafer;
  });

  return result;
}
