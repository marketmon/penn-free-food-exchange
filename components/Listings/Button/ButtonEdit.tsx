import { Button } from "@/components/ui/button";
import { useEditListing } from "@/context/EditListingProvider";
import { useDraggableMarker } from "@/context/DraggableMarkerProvider";
import { useListings } from "@/context/ListingsProvider";
import { Listing } from "@/lib/types";

type ButtonEditProps = {
  listing: Listing;
};

export default function ButtonEdit({ listing }: ButtonEditProps) {
  const { setDashboardFor } = useListings();

  const { setPosition, setIcon, setHasClickedMap } = useDraggableMarker();

  const { setCurrentListing } = useEditListing();

  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setDashboardFor("edit");
    setPosition({ lat: listing.lat, lng: listing.lng });
    setHasClickedMap(true);
    setIcon(listing.icon);
    setCurrentListing({
      id: listing.id,
      location: listing.location,
      caption: listing.caption,
      contact: listing.contact,
      icon: listing.icon,
    });
  }

  return (
    <Button variant="secondary" className="px-3 shadow-none" onClick={onClick}>
      Edit
    </Button>
  );
}
