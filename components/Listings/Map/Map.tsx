import { AttributionControl, MapContainer, TileLayer } from "react-leaflet";
import { Listing } from "@/lib/types";
import { MAP_ATTRIBUTION, MAP_URL } from "@/lib/constants";
import DraggableMarker from "@/components/Listings/Marker/DraggableMarker";
import MarkerList from "@/components/Listings/Marker/MarkerList";
import "leaflet/dist/leaflet.css";

type MapProps = {
  lat: number;
  lng: number;
  listingsToShow: Listing[] | null;
  showFullScreen: boolean;
  isSmallScreen: boolean;
};

export default function Map({
  lat,
  lng,
  listingsToShow,
  showFullScreen,
  isSmallScreen,
}: MapProps) {
  return (
    <MapContainer
      key={showFullScreen ? "hide-sidebar" : "show-sidebar"}
      center={[lat, lng]}
      zoom={15}
      className="h-full z-10"
      attributionControl={false}
      style={{ cursor: "auto" }}
    >
      <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_URL} />
      <AttributionControl
        position={`${isSmallScreen ? "topright" : "bottomright"}`}
      />
      {listingsToShow ? (
        <MarkerList listingsToShow={listingsToShow} />
      ) : (
        <DraggableMarker />
      )}
    </MapContainer>
  );
}
