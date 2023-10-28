import { useViewListings } from "@/context/ViewListingsProvider";
import { Listing } from "@/lib/types";
import { getLastUpdatedTimeAgo } from "@/lib/utils";

export default function ListingCard({ listing }: { listing: Listing }) {
  const { setClickedListingCardPosition } = useViewListings();

  function onListingCardClicked() {
    setClickedListingCardPosition({ lat: listing.lat, lng: listing.lng });
  }

  return (
    <li
      onClick={onListingCardClicked}
      className="border-solid border-2 border-black mb-2"
    >
      <h1>{listing.location}</h1>
      <span>{getLastUpdatedTimeAgo(listing.updatedAt!)}</span>
    </li>
  );
}
