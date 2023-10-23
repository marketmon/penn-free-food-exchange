import { useCreateListing } from "@/context/CreateListingProvider";
import L, { Icon } from "leaflet";
import { useRef } from "react";
import { Marker, useMapEvents, useMap } from "react-leaflet";

export default function NewListingMarker() {
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

  const markerDivIcon = (emoji: string) =>
    L.divIcon({
      html: `<h1 style="font-size: 1.8rem">
      ${emoji}
    </h1>`,
      className: "test--marker--icon",
      iconSize: [24, 46],
    });

  const markerDefaultIcon = new Icon({
    iconUrl: "/marker.png",
    iconSize: [45, 45],
  });

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
        attribution='<a href="https://www.flaticon.com/free-icons/location" title="location icons">Location icons created by IconMarketPK - Flaticon</a>'
        draggable={true}
        eventHandlers={onMarkerDrag}
        position={position!}
        ref={markerRef}
        icon={icon === "Default pin" ? markerDefaultIcon : markerDivIcon(icon)}
      />
    )
  );
}
