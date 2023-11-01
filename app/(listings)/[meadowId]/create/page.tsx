import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/apiCalls";
import Dashboard from "@/components/Listings/Dashboard";

export default async function Page({
  params,
}: {
  params: { meadowId: string };
}) {
  const meadowId = params.meadowId;
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
        <Dashboard queryKey="currentUser" meadowId={meadowId} />
      </HydrationBoundary>
    );
  }
}
