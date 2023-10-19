import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getMeadowForCurrentUser } from "@/lib/apiCalls";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Listings/Map"), { ssr: false });

export default async function Page() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["meadowForCurrentUser"],
    queryFn: getMeadowForCurrentUser,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Map />
    </HydrationBoundary>
  );
}
