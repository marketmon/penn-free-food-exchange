import { MAP_ATTRIBUTION, MAP_URL } from "@/lib/constants";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({
  lat,
  lng,
  children,
}: {
  lat: number;
  lng: number;
  children: React.ReactNode;
}) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      className="h-full"
      style={{ cursor: "auto" }}
    >
      <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_URL} />
      {children}
    </MapContainer>
  );
}
