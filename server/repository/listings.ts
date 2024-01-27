import { prisma } from "@/lib/db";
import { COUNTRY_CODES } from "@/lib/constants";

export async function getListings() {
  const listings = await prisma.listing.findMany();
  return listings;
}

export async function getListingById(listingId: string) {
  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
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
  imageUrl: string,
  userId: string
) {
  const data: {
    lat: number;
    lng: number;
    location: string;
    icon: string;
    caption: string;
    contact: string | null;
    imageUrl: string | null;
  } = {
    lat,
    lng,
    location,
    icon,
    caption,
    contact: !COUNTRY_CODES.includes(contact) ? contact : null,
    imageUrl: imageUrl !== "" ? imageUrl : null,
  };

  const newListing = await prisma.listing.create({
    data: {
      ...data,
      creator: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return newListing;
}

export async function updateListing(listing: any) {
  const { id, lat, lng, location, icon, caption, contact, imageUrl } = listing;

  const data: {
    lat: number;
    lng: number;
    location: string;
    icon: string;
    caption: string;
    contact: string | null;
    imageUrl: string | null;
  } = {
    lat,
    lng,
    location,
    icon,
    caption,
    contact: !COUNTRY_CODES.includes(contact) ? contact : null,
    imageUrl: imageUrl !== "" ? imageUrl : null,
  };

  const updatedListing = await prisma.listing.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });

  return updatedListing;
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

  const updatedListing = await prisma.listing.update({
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
    },
  });

  return updatedListing;
}

export async function deleteListing(listingId: string, creatorId: string) {
  await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      usersThanked: {
        disconnect: {
          id: creatorId,
        },
      },
    },
  });
  const deletedListing = await prisma.listing.delete({
    where: {
      id: listingId,
    },
  });

  return deletedListing;
}
