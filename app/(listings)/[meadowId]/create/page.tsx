import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/apiCalls";
import CreateListingSidebar from "@/components/Listings/Create/CreateListingSidebar";
import CreateListingMap from "@/components/Listings/Create/CreateListingMap";
import ListingDashboard from "@/components/Listings/ListingDashboard";

export default async function Page({
  params,
}: {
  params: { meadowId: string };
}) {
  const queryClient = new QueryClient();
  const user = await queryClient.fetchQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
  });
  const dehydratedState = dehydrate(queryClient);

  if (!user.meadowIds.includes(params.meadowId)) {
    return <div>Access forbidden</div>;
  } else {
    return (
      <HydrationBoundary state={dehydratedState}>
        <ListingDashboard
          mapcomponent={<CreateListingMap meadowId={params.meadowId} />}
          sidebarComponent={<CreateListingSidebar meadowId={params.meadowId} />}
        />
      </HydrationBoundary>
    );
  }
}
