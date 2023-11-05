import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { useMutateData } from "@/hooks/useMutateData";
import { HeartIcon } from "@radix-ui/react-icons";
import { useListings } from "@/context/ListingsProvider";
import { Listing } from "@/lib/types";
import { Card } from "@/components/ui/card";
import Badge from "@/components/Listings/Badge";
import CardTitle from "@/components/Listings/Card/CardTitle";
import CardDescritpion from "@/components/Listings/Card/CardDescritpion";
import CardAction from "@/components/Listings/Card/CardAction";
import CardFooter from "@/components/Listings/Card/CardFooter";

export default function ListingCard({ listing }: { listing: Listing }) {
  const { meadowId } = useListings();

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
            updateThankCountsForListing={updateThankCountsForListing}
            usersThankedIds={listing.usersThankedIds}
            userId={userId}
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
