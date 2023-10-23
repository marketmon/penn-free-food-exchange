import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getMeadowById } from "@/lib/apiCalls";
import ViewListingsSidebar from "@/components/Listings/View/ViewListingsSidebar";
import ViewListingsMap from "@/components/Listings/View/ViewListingsMap";
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
        mapcomponent={<ViewListingsMap meadowId={meadowId} />}
        sidebarComponent={<ViewListingsSidebar meadowId={meadowId} />}
      />
    </HydrationBoundary>
  );
}
