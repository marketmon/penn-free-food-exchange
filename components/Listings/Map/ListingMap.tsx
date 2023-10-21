"use client";

import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer } from "react-leaflet";
import { getCurrentUser, getMeadowById } from "@/lib/apiCalls";
import NewListingMarker from "../Marker/NewListingMarker";
import "leaflet/dist/leaflet.css";

interface QueryKeyToFunctionType {
  [key: string]: (id: string) => Promise<any>;
}

const QUERY_KEY_TO_FUNCTION: QueryKeyToFunctionType = {
  "meadow": getMeadowById,
};

export default function Map({
  mode,
  queryKey,
}: {
  mode: string;
  queryKey: string;
}) {
  const { data } = useQuery({
    queryKey: [queryKey],
    queryFn: QUERY_KEY_TO_FUNCTION[queryKey],
  });
  
  const [latitude, longitude] =
    mode === "view all"
      ? [data.latitude, data.longitude]
      : [data.meadow.latitude, data.meadow.longitude];

  return (
    <MapContainer center={[latitude, longitude]} zoom={15} className="h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <NewListingMarker latitude={latitude} longitude={longitude} />
    </MapContainer>
  );
}
