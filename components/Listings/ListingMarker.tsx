import { Position } from "@/lib/types";
import { MutableRefObject } from "react";
import { Marker } from "react-leaflet";
import { DivIcon, Icon } from "leaflet";

type ListingMarkerProps = {
  draggable: boolean;
  position: Position;
  markerRef: MutableRefObject<any>;
  icon: DivIcon | Icon;
  eventHandlers?: any;
};

export default function ListingMarker({
  draggable,
  position,
  markerRef,
  icon,
  eventHandlers,
}: ListingMarkerProps) {
  return (
    <Marker
      attribution='<a href="https://www.flaticon.com/free-icons/location" title="location icons">Location icons created by IconMarketPK - Flaticon</a>'
      draggable={draggable}
      eventHandlers={eventHandlers && eventHandlers}
      position={position!}
      ref={markerRef}
      icon={icon}
    />
  );
}
