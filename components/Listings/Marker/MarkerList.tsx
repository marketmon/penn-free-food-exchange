import { useListings } from "@/context/ListingsProvider";
import { Listing } from "@/lib/types";
import ViewOnlyMarker from "@/components/Listings/Marker/ViewOnlyMarker";

type MarkerListProps = {
  listingsToShow: Listing[];
};

export default function MarkerList({ listingsToShow }: MarkerListProps) {
  const { clickedListingCardPosition } = useListings();

  return listingsToShow.map((listing: Listing) => (
    <ViewOnlyMarker
      key={listing.id}
      listing={listing}
      showPopup={
        clickedListingCardPosition?.lat === listing.lat &&
        clickedListingCardPosition?.lng === listing.lng
      }
    />
  ));
}
