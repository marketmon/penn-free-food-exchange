import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/apiCalls";
import CreateListing from "@/components/Listings/CreateListing";
import ListingsMapCreate from "@/components/Listings/Map/ListingsMapCreate";

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

  if (user.meadow.id !== params.meadowId) {
    return <div>Forbidden</div>;
  } else {
    return (
      <HydrationBoundary state={dehydratedState}>
        <div className="flex h-full">
          <div className="w-2/3">
            <ListingsMapCreate />
          </div>
          <div className="w-1/3">
            <CreateListing meadowId={params.meadowId} />
          </div>
        </div>
      </HydrationBoundary>
    );
  }
}
