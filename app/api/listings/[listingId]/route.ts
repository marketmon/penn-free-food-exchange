import { auth } from "@clerk/nextjs";
import { ForbiddenError, NotFoundError, ServerError, UnauthorizedError } from "@/lib/errors";
import { updateListingService } from "@/server/service/listings";

export async function PATCH(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  const { userId } = auth();
  
  try {
    const payload = await req.json();
    const listingId = params.listingId;
    
    const updatedListing = await updateListingService({
      ...payload,
      listingId,
      creatorId: userId,
    });

    return new Response(JSON.stringify(updatedListing), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return new Response(error.message, {
        status: 401,
      });
    } else if (error instanceof ForbiddenError) {
      return new Response(error.message, {
        status: 403,
      });
    } else if (error instanceof NotFoundError) {
      return new Response(error.message, {
        status: 404,
      });
    } else {
      const errorMessage =
        (error as ServerError).message || (error as Error).toString();
      return new Response(errorMessage, {
        status: 500,
      });
    }
  }
}
