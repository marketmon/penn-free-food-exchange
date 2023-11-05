import { useListings } from "@/context/ListingsProvider";
import { SignedIn } from "@clerk/nextjs";
import ButtonThank from "@/components/Listings/Button/ButtonThank";
import ButtonEditDelete from "@/components/Listings/Button/ButtonEditDelete";

type CardActionProps = {
  updateThankCountsForListing: ({ action }: { action: string }) => void;
  usersThankedIds: string[];
  userId: string | undefined;
};

export default function CardAction({
  updateThankCountsForListing,
  usersThankedIds,
  userId,
}: CardActionProps) {
  const { dashboardFor } = useListings();

  const currentUserLikedListing = usersThankedIds.includes(userId!);

  function onThankClicked(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    updateThankCountsForListing({
      action: "toggleThank",
    });
  }

  return dashboardFor === "view" ? (
    <div className="h-10">
      <SignedIn>
        <ButtonThank
          onClick={onThankClicked}
          currentUserLikedListing={currentUserLikedListing}
        />
      </SignedIn>
    </div>
  ) : (
    <div className="space-x-2">
      <ButtonEditDelete btnTxt="Edit" />
      <ButtonEditDelete btnTxt="Delete" />
    </div>
  );
}
