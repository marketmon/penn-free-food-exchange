import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { useListings } from "@/context/ListingsProvider";
import { useMutateData } from "@/hooks/useMutateData";
import { Listing } from "@/lib/types";
import ButtonOnClick from "@/components/common/Button/ButtonOnClick";

type ThankListingProps = {
  listingId: string;
  usersThankedIds: string[];
};

export default function ThankListing({
  listingId,
  usersThankedIds,
}: ThankListingProps) {
  const { meadowId } = useListings();

  const userId = useUser().user?.id;

  const queryClient = useQueryClient();

  const { mutate } = useMutateData({
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

  function thankListing(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    mutate({
      action: "toggleThank",
    });
  }

  return (
    <ButtonOnClick
      variant="secondary"
      btnText="thank"
      btnIcon={
        currentUserLikedListing ? (
          <HeartFilledIcon className="mr-2 h-4 w-4" />
        ) : (
          <HeartIcon className="mr-2 h-4 w-4" />
        )
      }
      onClick={thankListing}
    />
  );
}
