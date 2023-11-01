import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getMeadowById } from "@/lib/apiCalls";
import Dashboard from "@/components/Listings/Dashboard";

export default async function Page({
  params,
}: {
  params: { meadowId: string };
}) {
  const meadowId = params.meadowId;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [`meadow-${meadowId}`],
    queryFn: () => getMeadowById(meadowId),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Dashboard queryKey={`meadow-${meadowId}`} meadowId={meadowId} />
    </HydrationBoundary>
  );
}
