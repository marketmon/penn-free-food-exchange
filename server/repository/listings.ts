import { COUNTRY_CODES } from "@/lib/constants";
import { prisma } from "@/lib/db";

export async function getListingById(listingId: string) {
  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    include: {
      meadow: true,
    },
  });
  return listing;
}

export async function createListing(
  lat: number,
  lng: number,
  location: string,
  icon: string,
  caption: string,
  contact: string,
  userId: string,
  meadowId: string
) {
  const data: {
    lat: number;
    lng: number;
    location: string;
    icon: string;
    caption?: string;
    contact?: string;
  } = {
    lat,
    lng,
    location,
    icon,
  };
  if (caption.length > 0) {
    data.caption = caption;
  }
  if (!COUNTRY_CODES.includes(contact)) {
    data.contact = contact;
  }

  const newListing = await prisma.listing.create({
    data: {
      ...data,
      creator: {
        connect: {
          id: userId,
        },
      },
      meadow: {
        connect: {
          id: meadowId,
        },
      },
    },
  });
  return newListing;
}

export async function toggleThank(userId: string, listingId: string) {
  const listingToBeUpdated = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    include: {
      usersThanked: true,
    },
  });
  const userThanked = listingToBeUpdated!.usersThanked.find(
    (user) => user.id === userId
  );
  await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      usersThanked: userThanked
        ? {
            disconnect: {
              id: userId,
            },
          }
        : {
            connect: {
              id: userId,
            },
          },
    },
  });
  const updatedListing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    include: {
      usersThanked: true,
    },
  });
  return updatedListing;
}

export async function toggleStillThere(listingId: string) {
  const listingToBeUpdated = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  });

  const updatedListing = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      stillThere: !listingToBeUpdated!.stillThere,
      stillThereUpdatedAt: new Date(),
    },
  });

  return updatedListing;
}
