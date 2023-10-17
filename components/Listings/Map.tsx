"use client";

import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Page() {
  return (
    <div className="flex">
      <MapContainer center={[39.95295329909881, -75.1935820978563]} zoom={16} className="h-screen w-2/3">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <div>
        Menu
      </div>
    </div>
  );
}
