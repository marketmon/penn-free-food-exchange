import { useUser } from "@clerk/nextjs";
import { useListings } from "@/context/ListingsProvider";
import { Listing } from "@/lib/types";
import Card from "@/components/Listings/Card/Card";

type CardListProps = {
  listingsToShow: Listing[];
};

export default function CardList({ listingsToShow }: CardListProps) {
  const { user } = useUser();
  const { dashboardFor } = useListings();

  if (listingsToShow.length === 0) {
    let message = "No food in this area:(";

    if (dashboardFor !== "view" && user) {
      message = "You don't have any listings:(";
    }

    return <div className="font-medium">{message}</div>;
  }

  return (
    <div className="font-medium">
      <ul>
        {listingsToShow.map((listing: Listing) => (
          <Card key={listing.id} listing={listing} />
        ))}
      </ul>
    </div>
  );
}
