import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";

import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/components/Listings/Map"), { ssr:false })

export default async function Page() {
  const user: User | null = await currentUser();

  console.log(user);

  return <Map />;
}
