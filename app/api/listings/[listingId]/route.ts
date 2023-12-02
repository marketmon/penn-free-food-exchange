import { auth } from "@clerk/nextjs";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from "@/lib/errors";
import {
  updateListingService,
  deleteListingService,
} from "@/server/service/listings";

export async function PATCH(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  const { userId } = auth();

  try {
    const payload = await req.json();
    const listingId = params.listingId;

    const updatedListing = await updateListingService({
      action: payload.action || "edit",
      userId: userId,
      listing: { ...payload.listing, id: listingId },
    });

    return new Response(JSON.stringify(updatedListing), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return new Response(JSON.stringify(error.message), {
        status: 400,
      });
    } else if (error instanceof UnauthorizedError) {
      return new Response(JSON.stringify(error.message), {
        status: 401,
      });
    } else if (error instanceof ForbiddenError) {
      return new Response(JSON.stringify(error.message), {
        status: 403,
      });
    } else if (error instanceof NotFoundError) {
      return new Response(JSON.stringify(error.message), {
        status: 404,
      });
    } else {
      const errorMessage =
        (error as ServerError).message || (error as Error).toString();
      return new Response(JSON.stringify(errorMessage), {
        status: 500,
      });
    }
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { listingId: string } }
) {
  const { userId } = auth();

  try {
    const listingId = params.listingId;

    const deletedListing = await deleteListingService({
      listingId,
      creatorId: userId,
    });

    return new Response(JSON.stringify(deletedListing), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return new Response(JSON.stringify(error.message), {
        status: 401,
      });
    } else if (error instanceof ForbiddenError) {
      return new Response(JSON.stringify(error.message), {
        status: 403,
      });
    } else if (error instanceof NotFoundError) {
      return new Response(JSON.stringify(error.message), {
        status: 404,
      });
    } else {
      const errorMessage =
        (error as ServerError).message || (error as Error).toString();
      return new Response(JSON.stringify(errorMessage), {
        status: 500,
      });
    }
  }
}
