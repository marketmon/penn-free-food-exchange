import { prisma } from "@/lib/db";

export async function getMeadows() {
  const meadows = await prisma.meadow.findMany();
  return meadows;
}

export async function getMeadowById(meadowId: string) {
  const meadow = await prisma.meadow.findUnique({
    where: {
      id: meadowId,
    },
    include: {
      listings: true,
    },
  });
  return meadow;
}
