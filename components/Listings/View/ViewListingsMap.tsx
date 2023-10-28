"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { useViewListings } from "@/context/ViewListingsProvider";
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

const MarkerClusterGroup = dynamic(() => import("react-leaflet-cluster/lib"), {
  ssr: false,
});

const ViewListingsMarker = dynamic(
  () => import("@/components/Listings/View/ViewListingsMarker"),
  { ssr: false }
);

export default function ViewListingsMap({ meadowId }: { meadowId: string }) {
  const { data } = useQuery({
    queryKey: [`meadow-${meadowId}`],
    queryFn: () => getMeadowById(meadowId),
  });

  const { clickedListingCardPosition } = useViewListings();

  return (
    <MapContainer
      center={[data.lat, data.lng]}
      zoom={15}
      className="h-full"
      style={{ cursor: "auto" }}
    >
      <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_URL} />
      <MarkerClusterGroup chunckedLoading maxClusterRadius={15}>
        {data.listings.map((listing: Listing) => (
          <ViewListingsMarker
            key={listing.id}
            lat={listing.lat}
            lng={listing.lng}
            icon={listing.icon}
            showPopup={
              clickedListingCardPosition?.lat === listing.lat &&
              clickedListingCardPosition?.lng === listing.lng
            }
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
