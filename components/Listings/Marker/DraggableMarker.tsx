import { useRef } from "react";
import { useMapEvents, useMap } from "react-leaflet";
import { useDraggableMarker } from "@/context/DraggableMarkerProvider";
import Marker from "@/components/Listings/Marker/Marker";

export default function DraggableMarker() {
  const {
    position,
    setPosition,
    hasClickedMap,
    setHasClickedMap,
    isPositionBasedOnUserLocation,
    setIsPositionBasedOnUserLocation,
    icon,
  } = useDraggableMarker();

  const map = useMap();

  const markerRef = useRef<any>(null);

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
      if (!hasClickedMap) {
        setPosition(e.latlng);
        setHasClickedMap(true);
      }
    },
  });

  if (isPositionBasedOnUserLocation) {
    map.flyTo(position!, map.getZoom());
  }

  return (
    (hasClickedMap || position) && (
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
