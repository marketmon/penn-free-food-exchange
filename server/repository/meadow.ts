import { prisma } from "@/lib/db";

export async function getMeadows() {
  const meadows = await prisma.meadow.findMany({
    select: {
      id: true,
      name: true,
      domain: true,
      lat: true,
      lng: true,
    },
  });
  return meadows;
}

export async function getMeadowById(meadowId: string) {
  console.log("getMeadowById")
  const meadow = await prisma.meadow.findUnique({
    where: {
      id: meadowId,
    },
    include: {
      listings: true,
      users: true,
    },
  });
  console.log(meadow);
  return meadow;
}
