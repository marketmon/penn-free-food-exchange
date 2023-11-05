import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { Listing } from "@/lib/types";
import { useListings } from "@/context/ListingsProvider";
import Marker from "@/components/Listings/Marker/Marker";
import Popup from "@/components/Listings/Popup";

type ViewOnlyMarkerProps = {
  listing: Listing;
  showPopup: boolean;
};

export default function ViewOnlyMarker({
  listing,
  showPopup,
}: ViewOnlyMarkerProps) {
  const map = useMap();
  const markerRef = useRef<L.Marker>(null);

  const { setClickedListingCardPosition } = useListings();

  const { lat, lng, icon } = listing;

  useEffect(() => {
    if (showPopup) {
      map.flyTo({ lat, lng }, 18);
      markerRef.current!.openPopup();
      setClickedListingCardPosition(null);
    }
  }, [lat, lng, map, showPopup, setClickedListingCardPosition]);

  const onMarkerClick = {
    click: () => {
      map.flyTo({ lat, lng }, 18);
    },
  };

  return (
    <Marker
      position={{ lat, lng }}
      icon={icon}
      eventHandlers={onMarkerClick}
      markerRef={markerRef}
    >
      <Popup listing={listing} />
    </Marker>
  );
}
