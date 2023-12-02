import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { useListings } from "@/context/ListingsProvider";
import { useMutateData } from "@/hooks/useMutateData";
import { Button } from "@/components/ui/button";
import { Listing } from "@/lib/types";

type ButtonThankProps = {
  listingId: string;
  usersThankedIds: string[];
};

export default function ButtonThank({
  listingId,
  usersThankedIds,
}: ButtonThankProps) {
  const { meadowId } = useListings();

  const userId = useUser().user?.id;

  const queryClient = useQueryClient();

  const { mutate: thankListing } = useMutateData({
    requestConfig: {
      url: `/api/listings/${listingId}`,
      method: "PATCH",
    },
    queryKey: [`meadow-${meadowId}`],
    queryClient: queryClient,
    updateDataOptimistically: (prevListings: Listing[]) => {
      const listingToUpdate = prevListings.find(
        (listingFromQuery) => listingFromQuery.id === listingId
      );

      const hasUserAlreadyThankedListing =
        listingToUpdate!.usersThankedIds!.includes(userId!);

      const updatedListOfUsersThanked = hasUserAlreadyThankedListing
        ? listingToUpdate!.usersThankedIds!.filter((id) => id !== userId)
        : [...listingToUpdate!.usersThankedIds!, userId];

      const updatedListings = prevListings.map((listingFromQuery) =>
        listingFromQuery.id === listingId
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

  const currentUserLikedListing = usersThankedIds.includes(userId!);

  function onThankListing(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    thankListing({
      action: "toggleThank",
    });
  }

  return (
    <Button
      variant="secondary"
      className="px-3 shadow-none"
      onClick={onThankListing}
    >
      {currentUserLikedListing ? (
        <HeartFilledIcon className="mr-2 h-4 w-4" />
      ) : (
        <HeartIcon className="mr-2 h-4 w-4" />
      )}
      thank
    </Button>
  );
}
