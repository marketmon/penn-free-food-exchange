import { auth } from "@clerk/nextjs";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from "@/lib/errors";
import { deleteUserService, updateUserService } from "@/server/service/users";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId: userIdFromSession } = auth();
  const userIdFromURL = params.userId;

  try {
    const payload = await req.json();

    const updatedUser = await updateUserService({
      ...payload,
      userIdFromSession,
      userIdFromURL,
    });

    return new Response(JSON.stringify(updatedUser), {
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
  { params }: { params: { userId: string } }
) {
  const { userId: userIdFromSession } = auth();
  const userIdFromURL = params.userId;

  try {
    const deletedUser = await deleteUserService({
      userIdFromSession,
      userIdFromURL,
    });

    return new Response(JSON.stringify(deletedUser), {
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
