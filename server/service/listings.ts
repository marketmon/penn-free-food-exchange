import { BadRequestError, ServerError } from "@/lib/errors";
import { Listing } from "@/lib/types";
import { isPhoneValid } from "@/lib/validations";
import { createListing } from "@/server/repository/listings";

export async function createListingService(payload: Listing) {
  try {
    const {
      lat,
      lng,
      location,
      icon,
      caption,
      contact,
      userId,
      meadowId,
    } = payload;
    if (!location || location.length === 0) {
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
