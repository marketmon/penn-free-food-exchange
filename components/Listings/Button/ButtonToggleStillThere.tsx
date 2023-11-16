import { useQueryClient } from "@tanstack/react-query";
import { useListings } from "@/context/ListingsProvider";
import { useMutateData } from "@/hooks/useMutateData";
import { Listing } from "@/lib/types";
import { Button } from "@/components/ui/button";

type ButtonToggleStillThereProps = {
  stillThere: boolean;
  listingId: string;
};

export default function ButtonToogleStillThere({
  stillThere,
  listingId,
}: ButtonToggleStillThereProps) {
  const { meadowId } = useListings();

  const queryClient = useQueryClient();

  const { mutate: updateStillThereForListing } = useMutateData({
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

      const updatedListing = {
        ...listingToUpdate,
        stillThere: !listingToUpdate!.stillThere,
        updatedAt: new Date().toISOString(),
      };

      const updatedListingsForMeadow = prevListings.map((listingFromQuery) =>
        listingFromQuery.id === listingId ? updatedListing : listingFromQuery
      );

      return {
        updatedDataKey: "listings",
        updatedData: updatedListingsForMeadow,
      };
    },
  });

  function onClick() {
    updateStillThereForListing({
      action: "toggleStillThere",
    })
  }

  return (
    <Button
      variant="secondary"
      className={`${
        stillThere
          ? "border-red-500 text-red-500"
          : "border-green-500 text-green-500"
      } border bg-transparent text-[10px] h-6 py-0"`}
      onClick={onClick}
    >
      {stillThere ? "Not there?" : "Still there?"}
    </Button>
  );
}
