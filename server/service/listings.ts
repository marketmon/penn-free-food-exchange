import { Prisma } from "@prisma/client";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from "@/lib/errors";
import { Listing } from "@/lib/types";
import { isPhoneValid } from "@/lib/validations";
import {
  createListing,
  toggleThank,
  toggleStillThere,
  getListingById,
} from "@/server/repository/listings";
import { getMeadowByIdService } from "@/server/service/meadow";

export async function createListingService(payload: Listing) {
  const { lat, lng, location, icon, caption, contact, userId, meadowId } =
    payload;

  if (!userId) {
    throw new UnauthorizedError(
      "Unauthorized: log in required to create listing"
    );
  } else if (!location || location.length === 0) {
    throw new BadRequestError("Location is required");
  } else if (location.length > 30) {
    throw new BadRequestError("Location must be less than 30 characters");
  } else if (caption.length > 300) {
    throw new BadRequestError("Caption must be less than 300 characters");
  } else if (!icon) {
    throw new BadRequestError("Icon is required");
  } else if (!isPhoneValid(contact)) {
    throw new BadRequestError("Invalid phone number");
  }

  const meadow = await getMeadowByIdService(meadowId);
  
  const userHasWriteAccessToMeadow = meadow.userIds.includes(userId);
  if (!userHasWriteAccessToMeadow) {
    throw new ForbiddenError(
      "Forbidden: permission required to create listing"
    );
  }

  try {
    const newListing = createListing(
      lat,
      lng,
      location,
      icon,
      caption,
      contact,
      userId,
      meadowId
    );
    return newListing;
  } catch (error) {
    throw new ServerError("Server error");
  }
}

export async function updateListingService(payload: {
  action: string;
  listingId: string;
  userId: string;
}) {
  const { action, listingId, userId } = payload;

  if (!userId && action === "toggleThank") {
    throw new UnauthorizedError(
      "Unauthorized: log in required to thank listing"
    );
  } else if (userId && action === "toggleThank") {
    const listing = await getListingByIdService(listingId);
    const meadowWithListing = listing!.meadow;
    
    const userHasWriteAccessToMeadow =
      meadowWithListing.userIds.includes(userId);
    if (!userHasWriteAccessToMeadow) {
      throw new ForbiddenError(
        "Forbidden: permission required to thank listing"
      );
    }

    try {
      const updatedListing = await toggleThank(userId, listingId);
      return updatedListing;
    } catch (error) {
      throw new ServerError("Server error");
    }
  } else {
    try {
      const updatedListing = await toggleStillThere(listingId);
      return updatedListing;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2023") {
          throw new NotFoundError("No listing found");
        }
      }
      throw new ServerError("Server error");
    }
  }
}

export async function getListingByIdService(listingId: string) {
  try {
    const listing = await getListingById(listingId);
    if (!listing) {
      throw new NotFoundError("No listing found");
    }
    return listing;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2023") {
        throw new NotFoundError("No listing found");
      }
    }
    throw new ServerError("Server error");
  }
}
