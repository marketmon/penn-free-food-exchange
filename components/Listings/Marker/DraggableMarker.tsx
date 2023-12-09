import { useRef } from "react";
import { useMapEvents, useMap } from "react-leaflet";
import { useDraggableMarker } from "@/context/DraggableMarkerProvider";
import { useListings } from "@/context/ListingsProvider";
import Marker from "@/components/Listings/Marker/Marker";

export default function DraggableMarker() {
  const { dashboardFor } = useListings();

  const {
    position,
    setPosition,
    isPositionBasedOnUserLocation,
    setIsPositionBasedOnUserLocation,
    icon,
  } = useDraggableMarker();

  const map = useMap();

  const markerRef = useRef<L.Marker>(null);

  const onMarkerDrag = {
    dragend() {
      if (isPositionBasedOnUserLocation) {
        setIsPositionBasedOnUserLocation(false);
      }
      const marker = markerRef.current;
      if (marker !== null) {
        setPosition(marker.getLatLng());
      }
    },
  };

  useMapEvents({
    click(e) {
      if (!position) {
        setPosition(e.latlng);
      }
    },
  });

  if (isPositionBasedOnUserLocation || dashboardFor === "edit") {
    map.flyTo(position!, 18);
  }

  return (
    position && (
      <Marker
        draggable={true}
        position={position!}
        markerRef={markerRef}
        icon={icon}
        eventHandlers={onMarkerDrag}
      />
    )
  );
}
