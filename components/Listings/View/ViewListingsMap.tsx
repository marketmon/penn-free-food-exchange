import dynamic from "next/dynamic";
import { useViewListings } from "@/context/ViewListingsProvider";
import { Listing, Meadow } from "@/lib/types";

const ViewListingsMarker = dynamic(
  () => import("@/components/Listings/View/ViewListingsMarker"),
  { ssr: false }
);

const ListingMap = dynamic(
  () => import("@/components/Listings/Map"),
  { ssr: false }
);

export default function ViewListingsMap({
  meadowId,
  data,
}: {
  meadowId: string;
  data: Meadow;
}) {
  const { clickedListingCardPosition } = useViewListings();

  return (
    <ListingMap lat={data.lat} lng={data.lng}>
      {data.listings!.map((listing: Listing) => (
        <ViewListingsMarker
          key={listing.id}
          listing={listing}
          showPopup={
            clickedListingCardPosition?.lat === listing.lat &&
            clickedListingCardPosition?.lng === listing.lng
          }
          meadowId={meadowId}
        />
      ))}
    </ListingMap>
  );
}
