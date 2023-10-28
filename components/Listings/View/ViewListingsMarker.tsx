import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { useViewListings } from "@/context/ViewListingsProvider";
import ListingMarker from "@/components/Listings/ListingMarker";
import ListingPopup from "@/components/Listings/ListingPopup";

type ViewListingsMarkerProps = {
  lat: number;
  lng: number;
  icon: string;
  showPopup: boolean;
};

export default function ViewListingsMarker ({
  lat,
  lng,
  icon,
  showPopup,
}: ViewListingsMarkerProps) {
  const { setClickedListingCardPosition } = useViewListings();

  const map = useMap();
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (showPopup) {
      markerRef.current?.openPopup();
      map.flyTo({ lat, lng }, 18);
      setClickedListingCardPosition(null);
    }
  }, [lat, lng, map, showPopup, setClickedListingCardPosition]);

  const onMarkerClick = {
    click: () => {
      map.flyTo({ lat, lng }, 18);
    },
  };

  return (
    <ListingMarker
      position={{ lat, lng }}
      icon={icon}
      eventHandlers={onMarkerClick}
      markerRef={markerRef}
    >
      <ListingPopup />
    </ListingMarker>
  );
};

