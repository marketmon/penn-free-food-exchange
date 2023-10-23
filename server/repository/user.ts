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
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      meadows: true,
    }
  });
  return user;
}
