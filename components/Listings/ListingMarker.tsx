import { Position } from "@/lib/types";
import { MutableRefObject } from "react";
import { Marker } from "react-leaflet";
import { DivIcon, Icon } from "leaflet";

type ListingMarkerProps = {
  draggable?: boolean;
  position: Position;
  markerRef?: MutableRefObject<any>;
  icon: string;
  eventHandlers?: any;
};

export default function ListingMarker({
  draggable,
  position,
  markerRef,
  icon,
  eventHandlers,
}: ListingMarkerProps) {
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

  return (
    <Marker
      attribution='<a href="https://www.flaticon.com/free-icons/location" title="location icons">Location icons created by IconMarketPK - Flaticon</a>'
      draggable={draggable}
      eventHandlers={eventHandlers && eventHandlers}
      position={position!}
      ref={markerRef}
      icon={icon === "Default pin" ? markerDefaultIcon : markerDivIcon(icon)}
    />
  );
}
