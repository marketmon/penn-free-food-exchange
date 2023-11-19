import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getListOfMeadows } from "@/lib/queryFns";
import SectionContainer from "@/components/Home/SectionContainer";

export default async function Page() {
  const queryClient = new QueryClient();
  
  await queryClient.fetchQuery({
    queryKey: ["meadows"],
    queryFn: () => getListOfMeadows(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SectionContainer />
    </HydrationBoundary>
  );
}
