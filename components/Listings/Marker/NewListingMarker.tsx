import { Icon } from "leaflet";
import { useRef, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";

export default function NewListingMarker({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const [hasClickedMap, setHasClickedMap] = useState(false);
  const markerRef = useRef<any>(null);
  const [position, setPosition] = useState({
    lat: latitude,
    lng: longitude,
  });

  const onMarkerDrag = {
    dragend() {
      const marker = markerRef.current;
      if (marker !== null) {
        setPosition(marker.getLatLng());
      }
    },
  };

  const markerIcon = new Icon({
    iconUrl: "/marker.png",
    iconSize: [45, 45],
  });

  useMapEvents({
    click(e) {
      if (!hasClickedMap) {
        setPosition(e.latlng);
        setHasClickedMap(true);
      }
    },
  });

  return (
    hasClickedMap && (
      <Marker
        attribution='<a href="https://www.flaticon.com/free-icons/location" title="location icons">Location icons created by IconMarketPK - Flaticon</a>'
        draggable={true}
        eventHandlers={onMarkerDrag}
        position={position}
        ref={markerRef}
        icon={markerIcon}
      />
    )
  );
}
