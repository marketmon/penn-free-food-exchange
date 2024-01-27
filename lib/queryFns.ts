import { SignUpResource } from "@clerk/types";
import { BASE_URL } from "@/lib/constants";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from "@/lib/errors";

export async function createUserToDb(signUpResult: SignUpResource) {
  const { createdUserId, firstName, lastName, emailAddress } = signUpResult;

  const res = await fetch(`${BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
    },
    body: JSON.stringify({
      id: createdUserId,
      firstName,
      lastName,
      primaryEmail: emailAddress,
    }),
  });
  const newUserOrError = await res.json();
  if (res.status === 201) {
    return newUserOrError;
  } else if (res.status === 400) {
    throw new BadRequestError(newUserOrError);
  } else {
    throw new ServerError(newUserOrError);
  }
}

export async function deleteUserFromDb(id: string, token: string) {
  const res = await fetch(`${BASE_URL}/api/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      mode: "cors",
    },
  });

  const deletedUserOrError = await res.json();
  if (res.status === 200) {
    return deletedUserOrError;
  } else if (res.status === 401) {
    throw new UnauthorizedError(deletedUserOrError);
  } else if (res.status === 403) {
    throw new ForbiddenError(deletedUserOrError);
  } else if (res.status === 404) {
    throw new NotFoundError(deletedUserOrError);
  } else {
    throw new ServerError(deletedUserOrError);
  }
}

export async function updateUserToDb(
  {
    id,
    firstName,
    lastName,
    phoneNumber,
  }: {
    id: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string | null;
  },
  token: string
) {
  const res = await fetch(`${BASE_URL}/api/users/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      mode: "cors",
    },
    body: JSON.stringify({
      id,
      firstName,
      lastName,
      primaryPhone: phoneNumber,
    }),
  });

  const updatedUserOrError = await res.json();
  if (res.status === 200) {
    return updatedUserOrError;
  } else if (res.status === 401) {
    throw new UnauthorizedError(updatedUserOrError);
  } else if (res.status === 403) {
    throw new ForbiddenError(updatedUserOrError);
  } else if (res.status === 404) {
    throw new NotFoundError(updatedUserOrError);
  } else {
    throw new ServerError(updatedUserOrError);
  }
}

export async function getListings() {
  const res = await fetch(`${BASE_URL}/api/listings`);
  const listingsOrError = await res.json();
  if (res.status === 200) {
    return listingsOrError;
  } else {
    throw new ServerError(listingsOrError);
  }
}