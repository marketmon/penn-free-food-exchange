"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { getCurrentUser } from "@/lib/apiCalls";
import { Meadow } from "@/lib/types";
import { MAP_ATTRIBUTION, MAP_URL } from "@/lib/constants";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((module) => module.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((module) => module.TileLayer),
  { ssr: false }
);

const CreateListingMarker = dynamic(
  () => import("@/components/Listings/Create/CreateListingMarker"),
  { ssr: false }
);

export default function CreateListingMap({ meadowId }: { meadowId: string }) {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(user?.id),
  });

  const currentMeadow = data.meadows.find(
    (meadow: Meadow) => meadow.id === meadowId
  );

  return (
    <MapContainer
      center={[currentMeadow.lat, currentMeadow.lng]}
      zoom={17}
      className="h-full"
    >
      <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_URL} />
      <CreateListingMarker />
    </MapContainer>
  );
}
