import { useQueryClient } from "@tanstack/react-query";
import { Popup as PopupLeaflet } from "react-leaflet";
import { useMutateData } from "@/hooks/useMutateData";
import { useListings } from "@/context/ListingsProvider";
import { Listing } from "@/lib/types";
import { getLastUpdatedTimeAgo } from "@/lib/utils";
import ButtonToggleStillThere from "@/components/Listings/Button/ButtonToggleStillThere";

type PopupProps = {
  listing: Listing;
};

export default function Popup({ listing }: PopupProps) {
  const { meadowId } = useListings();

  const queryClient = useQueryClient();

  const { mutate: updateStillThereForListing } = useMutateData({
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

      const updatedListing = {
        ...listingToUpdate,
        stillThere: !listingToUpdate!.stillThere,
        stillThereUpdatedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updatedListingsForMeadow = prevListings.map((listingFromQuery) =>
        listingFromQuery.id === listing.id ? updatedListing : listingFromQuery
      );

      return {
        updatedDataKey: "listings",
        updatedData: updatedListingsForMeadow,
      };
    },
  });

  return (
    <PopupLeaflet autoPan={false}>
      <div className="flex justify-between space-x-4">
        <div className="text-3xl mb-2">{listing.icon}</div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@{listing.location}</h4>
          {listing.caption && <p className="text-sm">{listing.caption}</p>}
          <ButtonToggleStillThere
            stillThere={listing.stillThere}
            onClick={() =>
              updateStillThereForListing({
                action: "toggleStillThere",
              })
            }
          />
          <div className="flex items-center pt-2">
            <span className="text-xs text-muted-foreground">
              {getLastUpdatedTimeAgo(listing.updatedAt!, "popup")}
            </span>
          </div>
        </div>
      </div>
    </PopupLeaflet>
  );
}
