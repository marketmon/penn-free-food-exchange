import { Prisma } from "@prisma/client";
import { NotFoundError, ServerError } from "@/lib/errors";
import { getMeadows, getMeadowById } from "@/server/repository/meadow";

export async function getMeadowsService() {
  try {
    const meadows = await getMeadows();
    return meadows;
  } catch (error) {
    throw new ServerError("Server error");
  }
}

export async function getMeadowByIdService(meadowId: string) {
  try {
    const meadow = await getMeadowById(meadowId);
    if (!meadow) {
      throw new NotFoundError("No meadow found");
    }
    return meadow;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2023") {
        throw new NotFoundError("No meadow found");
      }
    }
    throw new ServerError("Server error");
  }
}

