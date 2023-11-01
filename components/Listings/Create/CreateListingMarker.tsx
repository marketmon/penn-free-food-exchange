import { useCreateListing } from "@/context/CreateListingProvider";
import { useRef } from "react";
import { useMapEvents, useMap } from "react-leaflet";
import Marker from "@/components/Listings/Marker";

export default function CreateListingMarker() {
  const {
    position,
    setPosition,
    hasClickedMap,
    setHasClickedMap,
    isPositionBasedOnUserLocation,
    setIsPositionBasedOnUserLocation,
    icon,
  } = useCreateListing();

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
