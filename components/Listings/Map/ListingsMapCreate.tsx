"use client";

import dynamic from "next/dynamic";
import { getCurrentUser } from "@/lib/apiCalls";
import { Meadow } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const Map = dynamic(() => import("@/components/Listings/Map/Map"), {
  ssr: false,
});

const NewListingMarker = dynamic(() => import("../Marker/NewListingMarker"), {
  ssr: false,
});

export default function ListingsMapCreate({ meadowId }: { meadowId: string }) {
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
    <Map latitude={latitude} longitude={longitude} zoom={17}>
      <NewListingMarker />
    </Map>
  );
}
