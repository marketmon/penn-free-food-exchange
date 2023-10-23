import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/apiCalls";
import CreateListing from "@/components/Listings/CreateListing";
import ListingsMapCreate from "@/components/Listings/Map/ListingsMapCreate";
import ListingDashboard from "@/components/Listings/ListingDashboard";

export default async function Page({
  params,
}: {
  params: { meadowId: string };
}) {
  const queryClient = new QueryClient();
  const user = await queryClient.fetchQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
  const dehydratedState = dehydrate(queryClient);

  if (!user.meadowIds.includes(params.meadowId)) {
    return <div>Access forbidden</div>;
  } else {
    return (
      <HydrationBoundary state={dehydratedState}>
        <ListingDashboard
          mapcomponent={<ListingsMapCreate meadowId={params.meadowId} />}
          sidebarComponent={<CreateListing meadowId={params.meadowId} />}
        />
      </HydrationBoundary>
    );
  }
}
