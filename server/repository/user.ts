import { prisma } from "@/lib/db";

export async function createUser(
  id: string,
  firstName: string,
  lastName: string,
  meadowId: string,
  primaryEmail: string
): Promise<void> {
  const meadow = await prisma.meadow.findUnique({
    where: {
      id: meadowId,
    },
  });

  await prisma.user.create({
    data: {
      id,
      firstName,
      lastName,
      primaryEmail,
      meadows: {
        connect: {
          id: meadow!.id,
        },
      },
    },
  });
}

export async function updateUser(
  id: string,
  firstName: string,
  lastName: string,
  primaryEmail: string,
  primaryPhone: string | undefined
): Promise<void> {
  const data: {
    firstName: string;
    lastName: string;
    primaryEmail: string;
    primaryPhone?: string;
  } = {
    firstName,
    lastName,
    primaryEmail,
  };

  if (primaryPhone) {
    data.primaryPhone = primaryPhone;
  }

  await prisma.user.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteUser(id: string): Promise<void> {
  const userToBeDeleted = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  await prisma.user.delete({
    where: {
      id,
    },
  });

  const meadowsWithDeletedUser = userToBeDeleted!.meadowIds;
  for (const meadowId of meadowsWithDeletedUser) {
    const meadow = await prisma.meadow.findUnique({
      where: {
        id: meadowId,
      },
    });

    const userIdsWithoutDeletedUser = meadow!.userIds.filter(
      (userId) => userId !== id
    );

    await prisma.meadow.update({
      where: {
        id: meadowId,
      },
      data: {
        userIds: userIdsWithoutDeletedUser,
      },
    });
  }
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      meadows: true,
      thankedListings: true,
    },
  });
  return user;
}
