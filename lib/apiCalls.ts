import type { User } from "@clerk/nextjs/api";
import { getCurrentUser } from "./utils";

const BASE_URL = "https://friendly-eureka-x6jxvj44qgcvwwx-3000.app.github.dev";

export async function getListOfMeadows() {
  const res = await fetch(`${BASE_URL}/api/meadows`);
  const meadows = await res.json();
  return meadows;
}

export async function getMeadowForCurrentUser() {
  const user: User | null = await getCurrentUser();
  const meadowId = user!.unsafeMetadata.meadowId;

  const res = await fetch(`${BASE_URL}/api/meadows/${meadowId}`);
  const data = await res.json();
  return data;
}
