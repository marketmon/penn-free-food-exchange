import { getMeadowsService } from "@/server/service/meadow";

export async function GET() {
  try {
    const meadows = await getMeadowsService();
    return new Response(JSON.stringify(meadows), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return new Response(error.message, {
        status: 404,
      });
    } else if (error instanceof ServerError) {
      return new Response(error.message, {
        status: 500,
      });
    }
  }
}
