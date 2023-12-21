import { prisma } from "@/lib/db";

export async function createUser(
  id: string,
  firstName: string,
  lastName: string,
  primaryEmail: string,
  meadowId: string
) {
  const meadow = await prisma.meadow.findUnique({
    where: {
      id: meadowId,
    },
  });

  const newUser = await prisma.user.create({
    data: {
      id,
      firstName,
      lastName,
      primaryEmail,
      primaryPhone: null,
      meadows: {
        connect: {
          id: meadow!.id,
        },
      },
    },
  });
  return newUser;
}

export async function updateUser(
  id: string,
  firstName: string | undefined,
  lastName: string | undefined,
  primaryPhone: string | undefined
) {
  if (firstName && lastName) {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
      },
    });
    return updatedUser;
  }
  if (primaryPhone || primaryPhone === null) {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        primaryPhone,
      },
    });
    return updatedUser;
  }
}

export async function deleteUser(id: string) {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      meadows: {
        set: [],
      },
      thankedListings: {
        set: [],
      },
    },
  });

  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
  });
  return deletedUser;
}
