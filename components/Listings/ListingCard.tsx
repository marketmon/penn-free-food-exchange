import { useViewListings } from "@/context/ViewListingsProvider";
import { Listing } from "@/lib/types";
import { getLastUpdatedTimeAgo } from "@/lib/utils";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarIcon, StarFilledIcon } from "@radix-ui/react-icons";

export default function ListingCard({ listing }: { listing: Listing }) {
  const { setClickedListingCardPosition } = useViewListings();

  function onListingCardClicked() {
    setClickedListingCardPosition({ lat: listing.lat, lng: listing.lng });
  }

  function onThankClicked(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
  }

  return (
    <li onClick={onListingCardClicked} className="mb-2 px-3">
      <Card>
        <div className="flex justify-between px-5 pt-6">
          <div className="space-y-3">
            <CardTitle className="flex">
              {listing.icon} {listing.location}
            </CardTitle>
            {listing.caption && (
              <CardDescription>{listing.caption}</CardDescription>
            )}
          </div>
          <div className="flex items-center space-x-1 h-4 rounded-md bg-secondary text-secondary-foreground">
            <Button
              variant="secondary"
              className="px-3 shadow-none"
              onClick={onThankClicked}
            >
              <StarIcon className="mr-2 h-4 w-4" />
              Thank
            </Button>
          </div>
        </div>
        <div className="flex space-x-4 text-xs text-muted-foreground px-5 py-6">
          <div>{getLastUpdatedTimeAgo(listing.updatedAt!)}</div>
          <div className="flex items-center">
            <StarIcon className="mr-1 h-3 w-3" />
            {listing.usersThankedIds!.length}
          </div>
          {listing.contact && (
            <a href={`tel:${listing.contact}`}>{listing.contact}</a>
          )}
        </div>
      </Card>
    </li>
  );
}
