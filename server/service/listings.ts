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
  deleteListing,
  getListingById,
} from "@/server/repository/listings";
import { getMeadowByIdService } from "@/server/service/meadow";

export async function createListingService(payload: Listing) {
  const { lat, lng, location, icon, caption, contact, creatorId, meadowId } =
    payload;

  if (!creatorId) {
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

  const userHasWriteAccessToMeadow = meadow.userIds.includes(creatorId);
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
      creatorId,
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
  creatorId: string | null;
}) {
  const { action, listingId, creatorId } = payload;

  if (!creatorId && action === "toggleThank") {
    throw new UnauthorizedError(
      "Unauthorized: log in required to thank listing"
    );
  }

  const listing = await getListingByIdService(listingId);

  if (creatorId && action === "toggleThank") {
    const userHasEditAccessToListing =
      listing.meadow.userIds.includes(creatorId);
    if (!userHasEditAccessToListing) {
      throw new ForbiddenError(
        "Forbidden: permission required to thank listing"
      );
    }
  }

  try {
    const updatedListing =
      action === "toggleThank"
        ? await toggleThank(creatorId!, listingId)
        : await toggleStillThere(listingId);

    return updatedListing;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2023"
    ) {
      throw new NotFoundError("No listing found");
    }
    throw new ServerError("Server error");
  }
}

export async function deleteListingService(payload: {
  listingId: string;
  creatorId: string | null;
}) {
  const { listingId, creatorId } = payload;

  if (!creatorId) {
    throw new UnauthorizedError(
      "Unauthorized: log in required to thank listing"
    );
  } else {
    const listing = await getListingByIdService(listingId);
    if (listing.creatorId !== creatorId) {
      throw new ForbiddenError(
        "Forbidden: permission required to thank listing"
      );
    }

    try {
      const deletedListing = await deleteListing(listingId, creatorId);
      return deletedListing;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2023"
      ) {
        throw new NotFoundError("No listing found");
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
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2023"
    ) {
      throw new NotFoundError("No listing found");
    }
    throw new ServerError("Server error");
  }
}
