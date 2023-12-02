import { useEditListing } from "@/context/EditListingProvider";
import { useDraggableMarker } from "@/context/DraggableMarkerProvider";
import { useListings } from "@/context/ListingsProvider";
import { Listing } from "@/lib/types";
import ButtonSecondary from "@/components/common/Button/ButtonSecodary";

type ShowEditListingFormProps = {
  listing: Listing;
};

export default function ShowEditListingForm({
  listing,
}: ShowEditListingFormProps) {
  const { setDashboardFor } = useListings();

  const { setPosition, setIcon } = useDraggableMarker();

  const { setCurrentListing } = useEditListing();

  function onEditListing(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setDashboardFor("edit");
    setPosition({ lat: listing.lat, lng: listing.lng });
    setIcon(listing.icon);
    setCurrentListing({
      id: listing.id,
      location: listing.location,
      caption: listing.caption,
      contact: listing.contact,
      icon: listing.icon,
    });
  }

  return <ButtonSecondary btnText="Edit" onClick={onEditListing} />;
}
