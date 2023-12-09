import { useQueryClient } from "@tanstack/react-query";
import { useListingImage } from "@/context/ListingImageProvider";
import { useListings } from "@/context/ListingsProvider";
import { useMutateData } from "@/hooks/useMutateData";
import { Listing } from "@/lib/types";
import ButtonOnClick from "@/components/common/Button/ButtonOnClick";

type DeleteListingProps = {
  listingId: string;
  imageUrl: string | null;
};

export default function DeleteListing({
  listingId,
  imageUrl,
}: DeleteListingProps) {
  const { onDeleteImage } = useListingImage();

  const { meadowId } = useListings();

  const queryClient = useQueryClient();

  const { mutate } = useMutateData({
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

  function deleteListing(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    mutate(null);
    if (imageUrl) {
      onDeleteImage(imageUrl);
    }
  }

  return <ButtonOnClick variant="destructive" btnText="Delete" onClick={deleteListing} />;
}
