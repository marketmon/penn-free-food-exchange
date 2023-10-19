"use client";

import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getMeadowForCurrentUser } from "@/lib/apiCalls";

export default function Map() {
  const { data } = useQuery({
    queryKey: ["meadowForCurrentUser"],
    queryFn: getMeadowForCurrentUser,
  });

  return (
    <div className="flex">
      <MapContainer
        center={[data.latitude, data.longitude]}
        zoom={16}
        className="h-screen w-2/3"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <div>Menu</div>
    </div>
  );
}
