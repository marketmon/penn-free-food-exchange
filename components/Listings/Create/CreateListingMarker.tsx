import { useCreateListing } from "@/context/CreateListingProvider";
import { DivIcon, Icon } from "leaflet";
import { useRef } from "react";
import { Marker, useMapEvents, useMap } from "react-leaflet";
import ListingMarker from "../ListingMarker";

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

  const markerDivIcon = (emoji: string) =>
    new DivIcon({
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
      <ListingMarker
        draggable={true}
        position={position!}
        markerRef={markerRef}
        icon={icon === "Default pin" ? markerDefaultIcon : markerDivIcon(icon)}
        eventHandlers={onMarkerDrag}
      />
    )
  );
}
