import { MapContainer, TileLayer } from "react-leaflet";
import { MAP_ATTRIBUTION, MAP_URL } from "@/lib/constants";
import "leaflet/dist/leaflet.css";

type MapProps = {
  markers: React.ReactNode[];
};

export default function Map({ markers }: MapProps) {
  return (
    <MapContainer
      center={[39.951689, -75.210782]}
      zoom={15}
      className="h-full z-10"
    >
      <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_URL} />
      {markers.map((marker) => marker)}
      <div className="leaflet-top leaflet-right">
        <div className="leaflet-control bg-white p-2 font-nunito rounded text-xs">
          <b>Legend</b>
          <br></br>
          🎃 - survey participant
        </div>
      </div>
    </MapContainer>
  );
}
