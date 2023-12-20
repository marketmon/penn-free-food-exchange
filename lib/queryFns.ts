import { SignUpResource } from "@clerk/types";
import { BASE_URL } from "@/lib/constants";
import { BadRequestError, NotFoundError, ServerError } from "@/lib/errors";

export async function getListOfMeadows() {
  const res = await fetch(`${BASE_URL}/api/meadows`);
  if (res.status === 200) {
    const meadows = await res.json();
    return meadows;
  } else {
    throw new ServerError("Server error");
  }
}

export async function getMeadowById(id: string) {
  const res = await fetch(`${BASE_URL}/api/meadows/${id}`, {
    cache: "no-store",
  });
  if (res.status === 200) {
    const meadow = await res.json();
    return meadow;
  } else if (res.status === 404) {
    throw new NotFoundError("Meadow not found");
  } else {
    throw new ServerError("Server error");
  }
}

export async function createUserToDb(signUpResult: SignUpResource) {
  const { createdUserId, firstName, lastName, emailAddress, unsafeMetadata } =
    signUpResult;
  const res = await fetch(`${BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
    },
    body: JSON.stringify({
      createdUserId,
      firstName,
      lastName,
      primaryEmail: emailAddress,
      meadowId: unsafeMetadata.initialMeadowId,
    }),
  });
  if (res.status === 201) {
    const newUser = await res.json();
    return newUser;
  } else if (res.status === 400) {
    throw new BadRequestError("MESSAGE");
  } else {
    throw new ServerError("Server error");
  }
}
