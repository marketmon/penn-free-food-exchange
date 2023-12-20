import { ServerError } from "@/lib/errors";
import { getMeadowsService } from "@/server/service/meadow";

export async function GET() {
  try {
    const meadows = await getMeadowsService();
    return new Response(JSON.stringify(meadows), {
      status: 200,
    });
  } catch (error) {
    const errorMessage =
      (error as ServerError).message || (error as Error).toString();
    return new Response(JSON.stringify(errorMessage), {
      status: 500,
    });
  }
}
