import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { Listing } from "@/lib/types";
import { useViewListings } from "@/context/ViewListingsProvider";
import Marker from "@/components/Listings/Marker";
import Popup from "@/components/Listings/Popup";

type ViewListingsMarkerProps = {
  listing: Listing;
  showPopup: boolean;
  meadowId: string;
};

export default function ViewListingsMarker({
  listing,
  showPopup,
  meadowId,
}: ViewListingsMarkerProps) {
  const map = useMap();
  const markerRef = useRef<L.Marker>(null);

  const { setClickedListingCardPosition } = useViewListings();

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
      <Popup listing={listing} meadowId={meadowId} />
    </Marker>
  );
}
