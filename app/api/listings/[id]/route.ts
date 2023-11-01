import { ServerError } from "@/lib/errors";
import {
  toggleThankService,
  toggleStillThereService,
} from "@/server/service/listings";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await req.json();
    const listingId = params.id;

    const updatedListing = await (async () => {
      if (payload.action === "toggleThank") {
        return await toggleThankService(payload.userId, listingId);
      } else if (payload.action === "toggleStillThere") {
        return await toggleStillThereService(listingId);
      }
    })();

    return new Response(JSON.stringify(updatedListing), {
      status: 200,
    });
  } catch (error) {
    const errorMessage =
      (error as ServerError).message || (error as Error).toString();
    return new Response(errorMessage, {
      status: 500,
    });
  }
}
