import type { User } from "@clerk/nextjs/api";
import { getClerkCurrentUser } from "@/lib/utils";

const BASE_URL = "https://friendly-eureka-x6jxvj44qgcvwwx-3000.app.github.dev";

export async function getListOfMeadows() {
  const res = await fetch(`${BASE_URL}/api/meadows`);
  const meadows = await res.json();
  return meadows;
}

export async function getMeadowById(id: string) {
  const res = await fetch(`${BASE_URL}/api/meadows/${id}`);
  const data = await res.json();
  return data;
}

export async function getCurrentUser() {
  const user: User | null = await getClerkCurrentUser();
  const userId = user!.id;
  
  const res = await fetch(`${BASE_URL}/api/user/${userId}`);
  const data = await res.json();
  return data;
}