import { prisma } from "@/lib/db";

export async function getMeadows() {
  const meadows = await prisma.meadow.findMany();
  return meadows;
}
