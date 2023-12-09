import { useEditListing } from "@/context/EditListingProvider";
import { useDraggableMarker } from "@/context/DraggableMarkerProvider";
import { useListings } from "@/context/ListingsProvider";
import { Listing } from "@/lib/types";
import ButtonOnClick from "@/components/common/Button/ButtonOnClick";

type ShowEditListingFormProps = {
  listing: Listing;
};

export default function ShowEditListingForm({
  listing,
}: ShowEditListingFormProps) {
  const { setDashboardFor } = useListings();

  const { setPosition, setIcon } = useDraggableMarker();

  const { setCurrentListing } = useEditListing();

  function editListing(e: React.MouseEvent<HTMLButtonElement>) {
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
      imageUrl: listing.imageUrl,
    });
  }

  return (
    <ButtonOnClick variant="secondary" btnText="Edit" onClick={editListing} />
  );
}
