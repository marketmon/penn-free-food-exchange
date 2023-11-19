import { SignedIn, useUser } from "@clerk/nextjs";
import { useListings } from "@/context/ListingsProvider";
import { Listing } from "@/lib/types";
import { Card as CardShadcn } from "@/components/ui/card";
import Badge from "@/components/Listings/Badge";
import CardTitle from "@/components/Listings/Card/CardTitle";
import CardDescritpion from "@/components/Listings/Card/CardDescritpion";
import CardAction from "@/components/Listings/Card/CardAction";
import CardFooter from "@/components/Listings/Card/CardFooter";

type CardProps = {
  listing: Listing;
};

export default function Card({ listing }: CardProps) {
  const { user } = useUser();

  const { setClickedListingCardPosition } = useListings();

  function onListingCardClicked() {
    setClickedListingCardPosition({ lat: listing.lat, lng: listing.lng });
  }

  return (
    <div onClick={onListingCardClicked} className="mb-2">
      <CardShadcn>
        <div className="flex justify-between px-5 pt-6">
          <div className={`space-y-3 ${user && "w-[calc(100%-135px)]"}`}>
            <CardTitle icon={listing.icon} location={listing.location} />
            <Badge
              stillThere={listing.stillThere}
              updatedAt={listing.updatedAt}
            />
            <CardDescritpion caption={listing.caption} />
          </div>
          <SignedIn>
            <CardAction listing={listing} />
          </SignedIn>
        </div>
        <CardFooter
          updatedAt={listing.updatedAt}
          numThanks={listing.usersThankedIds.length}
          contact={listing.contact}
        />
      </CardShadcn>
    </div>
  );
}
