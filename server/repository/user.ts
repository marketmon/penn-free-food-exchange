import { prisma } from "@/lib/db";

export async function createUser(
  id: string,
  firstName: string,
  lastName: string,
  domain: string,
  primaryEmail: string
): Promise<void> {
  const meadow = await prisma.meadow.findUnique({
    where: {
      domain,
    },
  });

  await prisma.user.create({
    data: {
      id,
      firstName,
      lastName,
      primaryEmail,
      primaryPhone: null,
      meadow: {
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
    primaryPhone: string | null;
  } = {
    firstName,
    lastName,
    primaryEmail,
    primaryPhone: null,
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
