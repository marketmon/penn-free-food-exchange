import { COUNTRY_CODES } from "@/lib/constants";
import { prisma } from "@/lib/db";

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
