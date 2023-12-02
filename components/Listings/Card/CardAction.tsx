import { useListings } from "@/context/ListingsProvider";
import { Listing } from "@/lib/types";
import ThankListing from "@/components/Listings/Actions/ThankListing";
import ShowEditListingForm from "@/components/Listings/Actions/ShowEditListingForm";
import DeleteListing from "@/components/Listings/Actions/DeleteListing";

type CardActionProps = {
  listing: Listing;
};

export default function CardAction({ listing }: CardActionProps) {
  const { dashboardFor } = useListings();

  return dashboardFor === "view" ? (
    <div className="h-10">
      <ThankListing
        listingId={listing.id}
        usersThankedIds={listing.usersThankedIds}
      />
    </div>
  ) : (
    <div className="space-x-2">
      <ShowEditListingForm listing={listing} />
      <DeleteListing listingId={listing.id} />
    </div>
  );
}
