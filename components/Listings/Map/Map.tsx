import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MapProps = {
  children?: React.ReactNode;
  latitude: number;
  longitude: number;
  zoom: number;
};

export default function Map({ children, latitude, longitude, zoom }: MapProps) {
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
