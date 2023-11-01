import { useQueryClient } from "@tanstack/react-query";
import { SignedIn, useUser } from "@clerk/nextjs";
import { useMutateData } from "@/hooks/useMutateData";
import { HeartIcon } from "@radix-ui/react-icons";
import { useViewListings } from "@/context/ViewListingsProvider";
import { Listing } from "@/lib/types";
import { getLastUpdatedTimeAgo } from "@/lib/utils";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Badge from "@/components/Listings/Badge";
import ButtonThank from "./Button/ButtonThank";

export default function ListingCard({
  listing,
  meadowId,
}: {
  listing: Listing;
  meadowId: string;
}) {
  const userId = useUser().user?.id;

  const queryClient = useQueryClient();

  const { mutate: updateThankCountsForListing } = useMutateData({
    requestConfig: {
      url: `/api/listings/${listing.id}`,
      method: "PATCH",
    },
    queryKey: [`meadow-${meadowId}`],
    queryClient: queryClient,
    updateDataOptimistically: (prevListings: Listing[]) => {
      const listingToUpdate = prevListings.find(
        (listingFromQuery) => listingFromQuery.id === listing.id
      );

      const hasUserAlreadyThankedListing =
        listingToUpdate!.usersThankedIds!.includes(userId!);

      const updatedListOfUsersThanked = hasUserAlreadyThankedListing
        ? listingToUpdate!.usersThankedIds!.filter((id) => id !== userId)
        : [...listingToUpdate!.usersThankedIds!, userId];

      const updatedListings = prevListings.map((listingFromQuery) =>
        listingFromQuery.id === listing.id
          ? {
              ...listingFromQuery,
              usersThankedIds: updatedListOfUsersThanked,
            }
          : listingFromQuery
      );

      return {
        updatedDataKey: "listings",
        updatedData: updatedListings,
      };
    },
  });

  const { setClickedListingCardPosition } = useViewListings();

  function onListingCardClicked() {
    setClickedListingCardPosition({ lat: listing.lat, lng: listing.lng });
  }

  function onThankClicked(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    updateThankCountsForListing({
      action: "toggleThank",
      userId: userId,
    });
  }

  const currentUserLikedListing = listing.usersThankedIds?.includes(userId!);

  const lastUpdatedTime = getLastUpdatedTimeAgo(listing.updatedAt!, "card");

  const numThanks = listing.usersThankedIds!.length;

  return (
    <div onClick={onListingCardClicked} className="mb-2 px-3">
      <Card>
        <div className="flex justify-between px-5 pt-6">
          <div className="space-y-3">
            <CardTitle className="flex">
              <div className="mr-2">{listing.icon}</div>
              <div>{listing.location}</div>
            </CardTitle>
            <Badge
              stillThere={listing.stillThere}
              stillThereUpdatedAt={listing.stillThereUpdatedAt}
            />
            {listing.caption && (
              <CardDescription>{listing.caption}</CardDescription>
            )}
          </div>
          <div className="flex items-center space-x-1 h-4 rounded-md bg-secondary text-secondary-foreground">
            <SignedIn>
              <ButtonThank
                onClick={onThankClicked}
                currentUserLikedListing={currentUserLikedListing}
              />
            </SignedIn>
          </div>
        </div>
        <div className="flex space-x-4 text-xs text-muted-foreground px-5 py-6">
          <div>{lastUpdatedTime}</div>
          <div className="flex items-center">
            <HeartIcon className="mr-1 h-3 w-3" />
            {numThanks}
          </div>
          {listing.contact && (
            <a href={`tel:${listing.contact}`}>{listing.contact}</a>
          )}
        </div>
      </Card>
    </div>
  );
}
