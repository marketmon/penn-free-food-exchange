"use client";

import dynamic from "next/dynamic";
import { getCurrentUser } from "@/lib/apiCalls";
import { Meadow } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const ListingMap = dynamic(() => import("@/components/Listings/ListingMap"), {
  ssr: false,
});

const CreateListingMarker = dynamic(() => import("@/components/Listings/Create/CreateListingMarker"), {
  ssr: false,
});

export default function CreateListingMap({ meadowId }: { meadowId: string }) {
  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const currentMeadow = data.meadows.find(
    (meadow: Meadow) => meadow.id === meadowId
  );

  const [latitude, longitude] = [
    currentMeadow.latitude,
    currentMeadow.longitude,
  ];

  return (
    <ListingMap latitude={latitude} longitude={longitude} zoom={17}>
      <CreateListingMarker />
    </ListingMap>
  );
}
