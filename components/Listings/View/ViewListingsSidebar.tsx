"use client";

import Link from "next/link";
import { getMeadowById } from "@/lib/apiCalls";
import { SignedIn, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export default function ViewListingsSidebar({ meadowId }: { meadowId: string }) {
  const { user } = useUser();
  const { data } = useQuery({
    queryKey: [`$meadow-${meadowId}`],
    queryFn: () => getMeadowById(meadowId),
  });

  const userMeadowId = user?.id;

  return (
    <div className="h-full overflow-y-hidden">
      {data.userIds.includes(userMeadowId) && (
        <SignedIn>
          <div className="flex justify-between sticky top-0">
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
            {data.listings.map((listing: any) => (
              <li key={listing.id}>{listing.id}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
