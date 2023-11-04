import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { z } from "zod";
import { useMutateData } from "@/hooks/useMutateData";
import { useCreateListing } from "@/context/CreateListingProvider";
import { listingFormSchema } from "@/lib/validations";
import ListingForm from "@/components/Listings/ListingForm";

export default function CreateListingSidebar({
  meadowId,
}: {
  meadowId: string;
}) {
  const router = useRouter();

  const { position, setPosition, setIsPositionBasedOnUserLocation } =
    useCreateListing();

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
    if (isSuccess) router.push(`/${meadowId}`);
  }, [isSuccess, meadowId, router]);

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      setPosition({ lat, lng });
      setIsPositionBasedOnUserLocation(true);
    });
  }

  return (
    <div>
      <Link href={`/${meadowId}`}>Back</Link>
      <button onClick={getCurrentLocation}>Find My Location</button>
      {!position ? (
        <div>Click the map at the location where the food is.</div>
      ) : (
        <>
          <div>
            <div>You can drag the marker to change location.</div>
          </div>
          <ListingForm
            schema={listingFormSchema}
            defaultValues={{
              location: "",
              caption: "",
              contact: "",
              icon: "📍",
            }}
            onSubmit={createListing}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
}
