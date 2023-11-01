import { Meadow, RequestConfig } from "@/lib/types";
import { QueryClient, useMutation } from "@tanstack/react-query";

type useMutateDataType = {
  requestConfig: RequestConfig;
  queryKey: string[];
  queryClient: QueryClient;
  dataTransformer?: (data: any) => any;
  updateDataOptimistically?: (data: any) => any;
};

type MutationOptionsType = {
  mutationFn: (data: any) => Promise<void>;
  onSuccess: () => void;
  onMutate?: () => void;
  onError?: (error: Error, variables: any, context: any) => void;
};

export function useMutateData({
  requestConfig,
  queryKey,
  queryClient,
  dataTransformer,
  updateDataOptimistically,
}: useMutateDataType) {
  async function mutateData(data?: { userId: string }) {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
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

  const mutationOptions: MutationOptionsType = {
    mutationFn: mutateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  };

  if (updateDataOptimistically) {
    mutationOptions.onMutate = async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousData: Meadow | undefined =
        queryClient.getQueryData(queryKey);

      const { updatedDataKey, updatedData } = updateDataOptimistically!(
        previousData!.listings
      );

      queryClient.setQueryData(queryKey, (old: any) => ({
        ...old,
        [updatedDataKey]: updatedData,
      }));

      return { previousData };
    };
    mutationOptions.onError = (_err, _, context) => {
      queryClient.setQueryData(queryKey, context!.previousData);
    };
  }

  return useMutation(mutationOptions);
}
