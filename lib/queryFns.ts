import { BASE_URL } from "@/lib/constants";
import { NotFoundError, ServerError } from "./errors";

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
