import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type ListingMapProps = {
  children?: React.ReactNode;
  latitude: number;
  longitude: number;
  zoom: number;
};

export default function ListingMap({ children, latitude, longitude, zoom }: ListingMapProps) {
  return (
    <MapContainer center={[latitude, longitude]} zoom={zoom} className="h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
