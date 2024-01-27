import { Prisma } from "@prisma/client";
import { isEmailValid } from "@/lib/validations";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from "@/lib/errors";
import { createUser, deleteUser, updateUser } from "@/server/repository/users";

export async function createUserService(payload: {
  id: string;
  firstName: string;
  lastName: string;
  primaryEmail: string;
}) {
  const { id, firstName, lastName, primaryEmail } = payload;

  if (!firstName || firstName.length === 0) {
    throw new BadRequestError("First name is required");
  } else if (!lastName || lastName.length === 0) {
    throw new BadRequestError("Last name is required");
  } else if (!primaryEmail || primaryEmail.length === 0) {
    throw new BadRequestError("Email is required");
  } else if (!isEmailValid(primaryEmail)) {
    throw new BadRequestError("Invalid email");
  }

  try {
    const newUser = await createUser(id, firstName, lastName, primaryEmail);
    return newUser;
  } catch (error) {
    throw new ServerError("Server error");
  }
}

export async function updateUserService(payload: {
  id: string;
  firstName?: string;
  lastName?: string;
  primaryPhone?: string;
  userIdFromSession: string;
  userIdFromURL: string;
}) {
  const {
    id,
    firstName,
    lastName,
    primaryPhone,
    userIdFromSession,
    userIdFromURL,
  } = payload;

  if (!userIdFromSession) {
    throw new UnauthorizedError("Unauthorized: log in required to update user");
  } else if (userIdFromSession !== userIdFromURL) {
    throw new ForbiddenError("Forbidden: permission required update user");
  }

  if (primaryPhone === undefined) {
    if (!firstName || firstName.length === 0) {
      throw new BadRequestError("First name is required");
    } else if (!lastName || lastName.length === 0) {
      throw new BadRequestError("Last name is required");
    }
  }

  try {
    const updatedUser = await updateUser(id, firstName, lastName, primaryPhone);
    return updatedUser;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2023"
    ) {
      throw new NotFoundError("No user found");
    }
    throw new ServerError("Server error");
  }
}

export async function deleteUserService(payload: {
  userIdFromSession: string | null;
  userIdFromURL: string;
}) {
  const { userIdFromSession, userIdFromURL } = payload;

  if (!userIdFromSession) {
    throw new UnauthorizedError("Unauthorized: log in required to delete user");
  } else if (userIdFromSession !== userIdFromURL) {
    throw new ForbiddenError("Forbidden: permission required delete user");
  }

  try {
    const deletedUser = await deleteUser(userIdFromURL);
    return deletedUser;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2023"
    ) {
      throw new NotFoundError("No user found");
    }
    throw new ServerError("Server error");
  }
}
