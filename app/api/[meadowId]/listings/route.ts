import { auth } from "@clerk/nextjs";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from "@/lib/errors";
import { createListingService } from "@/server/service/listings";

export async function POST(
  req: Request,
  { params }: { params: { meadowId: string } }
) {
  const { userId } = auth();

  try {
    const payload = await req.json();
    const meadowId = params.meadowId;

    const newListing = await createListingService({
      listing: {
        ...payload.listing,
        creatorId: userId,
        meadowId,
      },
    });

    return new Response(JSON.stringify(newListing), {
      status: 201,
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
