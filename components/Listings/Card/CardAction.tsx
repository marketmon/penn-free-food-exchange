import { useListings } from "@/context/ListingsProvider";
import { Listing } from "@/lib/types";
import ButtonThank from "@/components/Listings/Button/ButtonThank";
import ButtonEdit from "@/components/Listings/Button/ButtonEdit";
import ButtonDelete from "@/components/Listings/Button/ButtonDelete";

type CardActionProps = {
  listing: Listing;
};

export default function CardAction({ listing }: CardActionProps) {
  const { dashboardFor } = useListings();

  return dashboardFor === "view" ? (
    <div className="h-10">
      <ButtonThank
        listingId={listing.id}
        usersThankedIds={listing.usersThankedIds}
      />
    </div>
  ) : (
    <div className="space-x-2">
      <ButtonEdit listing={listing} />
      <ButtonDelete listingId={listing.id} />
    </div>
  );
}
