import { useAuth } from "@clerk/nextjs";
import { QueryClient, useMutation } from "@tanstack/react-query";
import {
  ToggleAction,
  ListingFromForm,
  RequestConfig,
  Listing,
} from "@/lib/types";

type useMutateDataType = {
  requestConfig: RequestConfig;
  queryClient: QueryClient;
  dataTransformer?: (data: any) => any;
  updateDataOptimistically?: (data: any) => any;
};

export function useMutateData({
  requestConfig,
  queryClient,
  dataTransformer,
  updateDataOptimistically,
}: useMutateDataType) {
  const { getToken } = useAuth();

  async function mutateData(data?: ToggleAction | ListingFromForm | null) {
    const token = await getToken();
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      mode: "cors",
    };
    if (!data) {
      headers["Content-Length"] = "0";
    }

    const res = await fetch(requestConfig.url, {
      method: requestConfig.method,
      body:
        data && JSON.stringify(dataTransformer ? dataTransformer(data) : data),
      headers: headers,
    });
    if (res.status !== 200 && res.status !== 201) {
      const error = await res.json();
      throw new Error(error);
    }
  }

  return useMutation({
    mutationFn: mutateData,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["listings"] });

      const previousData: Listing[] | undefined = queryClient.getQueryData([
        "listings",
      ]);

      if (updateDataOptimistically) {
        const updatedData =
          updateDataOptimistically!(previousData);
          
        queryClient.setQueryData(["listings"], () => updatedData);
      }

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["listings"], context!.previousData);
    },
  });
}
