import { useListings } from "@/context/ListingsProvider";
import { Listing } from "@/lib/types";
import { Card } from "@/components/ui/card";
import Badge from "@/components/Listings/Badge";
import CardTitle from "@/components/Listings/Card/CardTitle";
import CardDescritpion from "@/components/Listings/Card/CardDescritpion";
import CardAction from "@/components/Listings/Card/CardAction";
import CardFooter from "@/components/Listings/Card/CardFooter";

export default function ListingCard({ listing }: { listing: Listing }) {
  const { setClickedListingCardPosition } = useListings();

  function onListingCardClicked() {
    setClickedListingCardPosition({ lat: listing.lat, lng: listing.lng });
  }

  return (
    <div onClick={onListingCardClicked} className="mb-2">
      <Card>
        <div className="flex justify-between px-5 pt-6">
          <div className="space-y-3">
            <CardTitle icon={listing.icon} location={listing.location} />
            <Badge
              stillThere={listing.stillThere}
              stillThereUpdatedAt={listing.stillThereUpdatedAt}
            />
            <CardDescritpion caption={listing.location} />
          </div>
          <CardAction
            listingId={listing.id}
            usersThankedIds={listing.usersThankedIds}
          />
        </div>
        <CardFooter
          updatedAt={listing.updatedAt}
          numThanks={listing.usersThankedIds.length}
          contact={listing.contact}
        />
      </Card>
    </div>
  );
}
