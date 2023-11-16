import { MapContainer, TileLayer } from "react-leaflet";
import { Listing } from "@/lib/types";
import { MAP_ATTRIBUTION, MAP_URL } from "@/lib/constants";
import DraggableMarker from "@/components/Listings/Marker/DraggableMarker";
import MarkerList from "@/components/Listings/Marker/MarkerList";
import "leaflet/dist/leaflet.css";

type MapProps = {
  lat: number;
  lng: number;
  listingsToShow: Listing[] | null;
};

export default function Map({ lat, lng, listingsToShow }: MapProps) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      className="h-full"
      style={{ cursor: "auto" }}
    >
      <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_URL} />
      {listingsToShow ? (
        <MarkerList listingsToShow={listingsToShow} />
      ) : (
        <DraggableMarker />
      )}
    </MapContainer>
  );
}
