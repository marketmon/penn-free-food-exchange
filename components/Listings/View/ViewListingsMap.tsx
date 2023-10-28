"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { getMeadowById } from "@/lib/apiCalls";
import { Listing } from "@/lib/types";
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

const ListingMarker = dynamic(
  () => import("@/components/Listings/ListingMarker"),
  { ssr: false }
);

export default function ViewListingsMap({ meadowId }: { meadowId: string }) {
  const { data } = useQuery({
    queryKey: [`meadow-${meadowId}`],
    queryFn: () => getMeadowById(meadowId),
  });

  return (
    <MapContainer center={[data.lat, data.lng]} zoom={15} className="h-full">
      <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_URL} />
      {data.listings.map((listing: Listing) => (
        <ListingMarker
          key={listing.id}
          position={{ lat: listing.lat, lng: listing.lng }}
          icon={listing.icon}
        />
      ))}
    </MapContainer>
  );
}
