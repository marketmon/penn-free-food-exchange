"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useCreateListing } from "@/context/CreateListingProvider";
import { getCurrentUser } from "@/lib/apiCalls";
import { listingFormSchema } from "@/lib/validations";
import ListingForm from "@/components/Listings/ListingForm";


export default function CreateListingSidebar({
  meadowId,
}: {
  meadowId: string;
}) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { user } = useUser();
  
  const userId = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(user?.id),
  }).data.id;

  const { position, setPosition, setIsPositionBasedOnUserLocation } =
    useCreateListing();

  const {
    mutate,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async (values: z.infer<typeof listingFormSchema>) => {
      const newListing = { ...values, ...position, userId, meadowId };
      const response = await fetch("/api/listings", {
        method: "POST",
        body: JSON.stringify(newListing),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`meadow-${meadowId}`] });
    },
  });

  function onSubmit(values: z.infer<typeof listingFormSchema>) {
    mutate(values);
  }

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      setPosition({ lat, lng });
      setIsPositionBasedOnUserLocation(true);
    });
  }

  useEffect(() => {
    if (isSuccess) router.push(`/${meadowId}`);
  }, [isSuccess, meadowId, router]);

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
              icon: "Default pin",
            }}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
}
