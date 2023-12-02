import { Popup as PopupLeaflet } from "react-leaflet";
import { Listing } from "@/lib/types";
import { getLastUpdatedTimeAgo } from "@/lib/helpers";
import ToggleStillThere from "@/components/Listings/Actions/ToggleStillThere";

type PopupProps = {
  listing: Listing;
};

export default function Popup({ listing }: PopupProps) {
  return (
    <PopupLeaflet autoPan={false}>
      <div className="flex justify-between space-x-4">
        <div className="text-3xl mb-2">{listing.icon}</div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@{listing.location}</h4>
          {listing.caption && <p className="text-sm">{listing.caption}</p>}
          <ToggleStillThere
            stillThere={listing.stillThere}
            listingId={listing.id}
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
