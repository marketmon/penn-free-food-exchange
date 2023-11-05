import { useAuth } from "@clerk/nextjs";
import { QueryClient, useMutation } from "@tanstack/react-query";
import {
  ToggleAction,
  ListingFromFrom,
  Meadow,
  RequestConfig,
} from "@/lib/types";

type useMutateDataType = {
  requestConfig: RequestConfig;
  queryKey: string[];
  queryClient: QueryClient;
  dataTransformer?: (data: any) => any;
  updateDataOptimistically?: (data: any) => any;
};

export function useMutateData({
  requestConfig,
  queryKey,
  queryClient,
  dataTransformer,
  updateDataOptimistically,
}: useMutateDataType) {
  const { getToken } = useAuth();

  async function mutateData(data?: ToggleAction | ListingFromFrom | null) {
    const token = await getToken();
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      mode: "cors",
    };
    if (!data) {
      headers["Content-Length"] = "0";
    }

    await fetch(requestConfig.url, {
      method: requestConfig.method,
      body:
        data && JSON.stringify(dataTransformer ? dataTransformer(data) : data),
      headers: headers,
    });
  }

  return useMutation({
    mutationFn: mutateData,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousData: Meadow | undefined =
        queryClient.getQueryData(queryKey);

      if (updateDataOptimistically) {
        const { updatedDataKey, updatedData } = updateDataOptimistically!(
          previousData!.listings
        );

        queryClient.setQueryData(queryKey, (old: any) => ({
          ...old,
          [updatedDataKey]: updatedData,
        }));
      }

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context!.previousData);
    },
  });
}
