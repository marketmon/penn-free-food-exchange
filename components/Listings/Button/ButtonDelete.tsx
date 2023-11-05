import { useQueryClient } from "@tanstack/react-query";
import { useListings } from "@/context/ListingsProvider";
import { useMutateData } from "@/hooks/useMutateData";
import { Listing } from "@/lib/types";
import { Button } from "@/components/ui/button";

type ButtonDeleteProps = {
  listingId: string;
};

export default function ButtonDelete({ listingId }: ButtonDeleteProps) {
  const { meadowId } = useListings();

  const queryClient = useQueryClient();

  const { mutate: deleteListing } = useMutateData({
    requestConfig: {
      url: `/api/listings/${listingId}`,
      method: "DELETE",
    },
    queryKey: [`meadow-${meadowId}`],
    queryClient: queryClient,
    updateDataOptimistically: (prevListings: Listing[]) => {
      const updatedListings = prevListings.filter(
        (listingFromQuery) => listingFromQuery.id !== listingId
      );

      return {
        updatedDataKey: "listings",
        updatedData: updatedListings,
      };
    },
  });

  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    deleteListing(null);
  }

  return (
    <Button
      variant="destructive"
      className="px-3 shadow-none"
      onClick={onClick}
    >
      Delete
    </Button>
  );
}
