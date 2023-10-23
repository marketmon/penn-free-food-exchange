import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getListOfMeadows } from "@/lib/apiCalls";
import SelectMeadow from "@/components/Home/SelectMeadow";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["meadows"],
    queryFn: getListOfMeadows,
    staleTime: Infinity,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SelectMeadow />
    </HydrationBoundary>
  );
}
