import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import { Listing, Meadow } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Card from "@/components/Listings/Card";
import Filter from "@/components/Listings/Filter";

export default function ViewListingsSidebar({
  meadowId,
  data,
  userId,
}: {
  meadowId: string;
  data: Meadow;
  userId: string;
}) {
  return (
    <div className="h-full overflow-y-hidden">
      {data.userIds!.includes(userId) && (
        <SignedIn>
          <div className="flex justify-between sticky top-0 px-3 mb-2">
            <div>
              <Link href={`/${meadowId}/create`}>
                <Button className="px-3 shadow-none mr-2">Create</Button>
              </Link>
              <Link href={`/${meadowId}/manage`}>
                <Button variant="outline" className="px-3 shadow-none">
                  Manage Your Listings
                </Button>
              </Link>
            </div>
            <Filter />
          </div>
        </SignedIn>
      )}
      <div className="h-[calc(100%-48px)] overflow-y-auto">
        {data.listings!.length === 0 ? (
          <div>No food in this area:&#40;</div>
        ) : (
          <ul>
            {data.listings!.map((listing: Listing) => (
              <Card
                key={listing.id}
                meadowId={meadowId}
                listing={listing}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
