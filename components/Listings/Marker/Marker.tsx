import { RefObject } from "react";
import { Marker as MarkerLeaflet } from "react-leaflet";
import { DivIcon } from "leaflet";
import { Position } from "@/lib/types";

type MarkerProps = {
  children?: React.ReactNode;
  draggable?: boolean;
  position: Position;
  markerRef?: RefObject<L.Marker>;
  icon: string;
  eventHandlers?: any;
};

export default function Marker({
  children,
  draggable,
  position,
  markerRef,
  icon,
  eventHandlers,
}: MarkerProps) {
  const markerDivIcon = (emoji: string) =>
    new DivIcon({
      html: `<h1 style="font-size: 1.8rem">
      ${emoji}
    </h1>`,
      className: "test--marker--icon",
      iconSize: [24, 46],
    });

  return (
    <MarkerLeaflet
      draggable={draggable}
      eventHandlers={eventHandlers && eventHandlers}
      position={position!}
      ref={markerRef}
      icon={markerDivIcon(icon)}
    >
      {children}
    </MarkerLeaflet>
  );
}
