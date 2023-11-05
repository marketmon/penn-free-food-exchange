import { useListings } from "@/context/ListingsProvider";
import { SignedIn } from "@clerk/nextjs";
import ButtonThank from "@/components/Listings/Button/ButtonThank";
import ButtonEdit from "@/components/Listings/Button/ButtonEdit";
import ButtonDelete from "@/components/Listings/Button/ButtonDelete";

type CardActionProps = {
  listingId: string;
  usersThankedIds: string[];
};

export default function CardAction({
  listingId,
  usersThankedIds,
}: CardActionProps) {
  const { dashboardFor } = useListings();

  return dashboardFor === "view" ? (
    <div className="h-10">
      <SignedIn>
        <ButtonThank listingId={listingId} usersThankedIds={usersThankedIds} />
      </SignedIn>
    </div>
  ) : (
    <div className="space-x-2">
      <ButtonEdit />
      <ButtonDelete listingId={listingId} />
    </div>
  );
}
