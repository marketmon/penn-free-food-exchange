import { BadRequestError, ServerError } from "@/lib/errors";
import { createUserService } from "@/server/service/users";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const newUser = await createUserService(payload);

    return new Response(JSON.stringify(newUser), {
      status: 201,
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return new Response(JSON.stringify(error.message), {
        status: 400,
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
