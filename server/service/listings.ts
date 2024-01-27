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
  updateListing,
  toggleThank,
  toggleStillThere,
  deleteListing,
  getListingById,
  getListings,
} from "@/server/repository/listings";

export async function createListingService(payload: { listing: Listing }) {
  const { lat, lng, location, icon, caption, contact, imageUrl, creatorId } =
    payload.listing;

  if (!creatorId) {
    throw new UnauthorizedError(
      "Unauthorized: log in required to create listing"
    );
  } else if (!location || location.length === 0) {
    throw new BadRequestError("Location is required");
  } else if (location.length > 30) {
    throw new BadRequestError("Location must be less than 30 characters");
  } else if (!caption || caption.length === 0) {
    throw new BadRequestError("Caption is required");
  } else if (caption.length > 300) {
    throw new BadRequestError("Caption must be less than 300 characters");
  } else if (!icon) {
    throw new BadRequestError("Icon is required");
  } else if (!isPhoneValid(contact)) {
    throw new BadRequestError("Invalid phone number");
  }

  try {
    const newListing = createListing(
      lat,
      lng,
      location,
      icon,
      caption,
      contact,
      imageUrl,
      creatorId
    );
    return newListing;
  } catch (error) {
    throw new ServerError("Server error");
  }
}

export async function updateListingService(payload: {
  action: string;
  userId: string | null;
  listing: Listing;
}) {
  const { action, userId, listing } = payload;
  const { id } = listing;

  // unauthenticated user can't thank or edit listing
  if (!userId && (action === "toggleThank" || action === "edit")) {
    throw new UnauthorizedError("Unauthorized: log in required");
  }

  if (action === "edit") {
    const { location, caption, contact, icon } = listing;

    if (!location || location.length === 0) {
      throw new BadRequestError("Location is required");
    } else if (location.length > 30) {
      throw new BadRequestError("Location must be less than 30 characters");
    } else if (!caption || caption.length === 0) {
      throw new BadRequestError("Caption is required");
    } else if (caption.length > 300) {
      throw new BadRequestError("Caption must be less than 300 characters");
    } else if (!icon) {
      throw new BadRequestError("Icon is required");
    } else if (!isPhoneValid(contact)) {
      throw new BadRequestError("Invalid phone number");
    }
  }

  try {
    const updatedListing =
      action === "edit"
        ? await updateListing(listing)
        : action === "toggleThank"
        ? await toggleThank(userId!, id)
        : await toggleStillThere(id);

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

export async function getListingsService() {
  try {
    const listings = await getListings();
    return listings;
  } catch (error) {
    throw new ServerError("Server error");
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
