import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getMeadowById } from "@/lib/queryFns";
import { getClerkCurrentUser } from "@/lib/utils";
import Dashboard from "@/components/Listings/Dashboard";

export default async function Page({
  params,
}: {
  params: { meadowId: string };
}) {
  const user = await getClerkCurrentUser();

  const meadowId = params.meadowId;
  const queryClient = new QueryClient();

  let meadow;
  try {
    meadow = await queryClient.fetchQuery({
      queryKey: [`meadow-${meadowId}`],
      queryFn: () => getMeadowById(meadowId),
    });
  } catch (error: any) {
    const errorMessage =
      "message" in error ? error.message : "Something went wrong";
    return <div>{errorMessage}</div>;
  }

  const dehydratedState = dehydrate(queryClient);
  
  if (!meadow.userIds.includes(user!.id)) {
    return <div>Access forbidden</div>;
  } else {
    return (
      <HydrationBoundary state={dehydratedState}>
        <Dashboard
          queryKey={`meadow-${meadowId}`}
          meadowId={meadowId}
          dashboardFor="create"
        />
      </HydrationBoundary>
    );
  }
}
