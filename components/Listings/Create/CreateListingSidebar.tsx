"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useCreateListing } from "@/context/CreateListingProvider";
import { getCurrentUser } from "@/lib/apiCalls";
import { listingFormSchema } from "@/lib/validations";
import Link from "next/link";
import ListingForm from "@/components/Listings/ListingForm";

export default function CreateListingSidebar({ meadowId }: { meadowId: string }) {
  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const userId = data.id;

  // const { mutate, isPending } = useMutation({
  //   mutationFn: (values) => {
  //     return fetch("/");
  //   },
  // })

  function onSubmit(values: any) {
    console.log(values);
  }

  const { position, setPosition, setIsPositionBasedOnUserLocation } =
    useCreateListing();

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition({ lat: latitude, lng: longitude });
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
        <div>
          <div>You can drag the marker to change location.</div>
        </div>
      )}
      <ListingForm
        schema={listingFormSchema}
        defaultValues={{
          location: "",
          caption: "",
          contact: "",
          icon: "Default pin",
        }}
        onSubmit={onSubmit}
        isLoading={false}
        formDisabled={!position}
      />
    </div>
  );
}
