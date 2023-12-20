import { prisma } from "@/lib/db";

export async function createUser(
  id: string,
  firstName: string,
  lastName: string,
  meadowId: string,
  primaryEmail: string
) {
  //console.log(id, firstName, lastName, meadowId, primaryEmail);
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
  firstName: string,
  lastName: string,
  primaryEmail: string,
  primaryPhone: string | undefined
) {
  const data: {
    firstName: string;
    lastName: string;
    primaryEmail: string;
    primaryPhone: string | null;
  } = {
    firstName,
    lastName,
    primaryEmail,
    primaryPhone: primaryPhone ? primaryPhone : null,
  };

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return updatedUser;
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
