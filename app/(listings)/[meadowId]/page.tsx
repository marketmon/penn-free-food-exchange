import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getMeadowById } from "@/lib/apiCalls";
import AllListings from "@/components/Listings/AllListings";
import ListingsMapDisplay from "@/components/Listings/Map/ListingsMapDisplay";


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
      <div className="flex h-full">
        <div className="w-2/3">
          <ListingsMapDisplay meadowId={meadowId} />
        </div>
        <div className="w-1/3">
          <AllListings meadowId={meadowId} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
