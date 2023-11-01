import { BadRequestError, ServerError } from "@/lib/errors";
import { createListingService } from "@/server/service/listings";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const newListing = await createListingService(payload);
    return new Response(JSON.stringify(newListing), {
      status: 201,
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return new Response(error.message, {
        status: 400,
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

