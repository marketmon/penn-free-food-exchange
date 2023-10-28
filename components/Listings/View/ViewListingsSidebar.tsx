"use client";

import Link from "next/link";
import { SignedIn, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { getMeadowById } from "@/lib/apiCalls";
import { Listing } from "@/lib/types";
import ListingCard from "@/components/Listings/ListingCard";

export default function ViewListingsSidebar({ meadowId }: { meadowId: string }) {
  const { user } = useUser();
  const { data } = useQuery({
    queryKey: [`meadow-${meadowId}`],
    queryFn: () => getMeadowById(meadowId),
  });

  const userMeadowId = user?.id;

  return (
    <div className="h-full overflow-y-hidden">
      {data.userIds.includes(userMeadowId) && (
        <SignedIn>
          <div className="flex justify-between sticky top-0 px-3">
            <Link href={`/${meadowId}/create`}>Create</Link>
            <Link href={`/${meadowId}/manage`}>Manage Your Listings</Link>
          </div>
        </SignedIn>
      )}
      <div className="h-full overflow-y-scroll">
        {data.listings.length === 0 ? (
          <div>No food in this area:&#40;</div>
        ) : (
          <ul>
            {data.listings.map((listing: Listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
