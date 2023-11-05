import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { z } from "zod";
import { useListings } from "@/context/ListingsProvider";
import { useMutateData } from "@/hooks/useMutateData";
import { useCreateListing } from "@/context/CreateListingProvider";
import { listingFormSchema } from "@/lib/validations";
import Form from "@/components/Listings/Form";

export default function CreateListingSidebar() {
  const { meadowId, setDashboardFor } = useListings();

  const { position, setPosition, setHasClickedMap } = useCreateListing();

  const queryClient = useQueryClient();

  const {
    mutate: createListing,
    isPending: isLoading,
    isSuccess,
  } = useMutateData({
    requestConfig: {
      url: `/api/${meadowId}/listings`,
      method: "POST",
    },
    queryKey: [`meadow-${meadowId}`],
    queryClient: queryClient,
    dataTransformer: (values: z.infer<typeof listingFormSchema>) => ({
      ...values,
      ...position,
    }),
  });

  useEffect(() => {
    if (isSuccess) {
      setDashboardFor("view");
      setPosition(null);
      setHasClickedMap(false);
    }
  }, [isSuccess, setDashboardFor, setPosition, setHasClickedMap]);

  return (
    <div>
      {!position ? (
        <div className="font-medium text-red-600">
          Click the map at the location where the food is.
        </div>
      ) : (
        <div className="font-medium text-green-500">
          <div>You can drag the marker to change location.</div>
        </div>
      )}
      <Form
        schema={listingFormSchema}
        defaultValues={{
          location: "",
          caption: "",
          contact: "",
          icon: "📍",
        }}
        onSubmit={createListing}
        isLoading={isLoading}
        disabled={!position}
      />
    </div>
  );
}
