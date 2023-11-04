import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getMeadowById } from "@/lib/queryFns";
import Dashboard from "@/components/Listings/Dashboard";

export default async function Page({
  params,
}: {
  params: { meadowId: string };
}) {
  const meadowId = params.meadowId;
  const queryClient = new QueryClient();
  try {
    await queryClient.fetchQuery({
      queryKey: [`meadow-${meadowId}`],
      queryFn: () => getMeadowById(meadowId),
    });
  } catch (error: any) {
    const errorMessage =
      "message" in error ? error.message : "Something went wrong";
    return <div>{errorMessage}</div>;
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Dashboard
        queryKey={`meadow-${meadowId}`}
        meadowId={meadowId}
        dashboardFor="view"
      />
    </HydrationBoundary>
  );
}
