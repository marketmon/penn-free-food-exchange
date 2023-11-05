import { useListings } from "@/context/ListingsProvider";
import { Listing } from "@/lib/types";
import Card from "@/components/Listings/Card/Card";

type CardListProps = {
  listingsToShow: Listing[];
};

export default function CardList({ listingsToShow }: CardListProps) {
  const { dashboardFor } = useListings();

  return (
    <div className="font-medium">
      {listingsToShow.length === 0 &&
        (dashboardFor === "view"
          ? "No food in this area:("
          : "You don't have any listings:(")}
      {listingsToShow.length > 0 && (
        <ul>
          {listingsToShow.map((listing: Listing) => (
            <Card key={listing.id} listing={listing} />
          ))}
        </ul>
      )}
    </div>
  );
}
