import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getMeadowById } from "@/lib/apiCalls";
import AllListings from "@/components/Listings/AllListings";
import ListingsMapDisplay from "@/components/Listings/Map/ListingsMapDisplay";
import ListingDashboard from "@/components/Listings/ListingDashboard";

export default async function Page({
  params,
}: {
  params: { meadowId: string };
}) {
  const meadowId = params.meadowId;
  const queryClient = new QueryClient();
  const queryKey = `$meadow-${meadowId}`;
  await queryClient.prefetchQuery({
    queryKey: [queryKey],
    queryFn: () => getMeadowById(meadowId),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ListingDashboard
        mapcomponent={<ListingsMapDisplay meadowId={meadowId} />}
        sidebarComponent={<AllListings meadowId={meadowId} />}
      />
    </HydrationBoundary>
  );
}
