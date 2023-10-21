"use client";

import { getMeadowById } from "@/lib/apiCalls";
import { SignedIn, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const dummyList = Array.from({ length: 300 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
}));

export default function AllListings({ meadowId }: { meadowId: string }) {
  const { user } = useUser();
  const { data } = useQuery({
    queryKey: [`$meadow-${meadowId}`],
    queryFn: () => getMeadowById(meadowId),
  });

  const userMeadowId = user?.unsafeMetadata.meadowId;

  return (
    <div className="h-full overflow-y-hidden">
      {userMeadowId === meadowId && (
        <SignedIn>
          <div className="flex justify-between sticky top-0">
            <Link href={`/${meadowId}/create`}>Create</Link>
            <Link href={`/${meadowId}/manage`}>Manage Your Listings</Link>
          </div>
        </SignedIn>
      )}
      <div className="h-full overflow-y-scroll">
        {data.listings.length !== 0 ? (
          <div>No food in this area:&#40;</div>
        ) : (
          <ul>
            {dummyList.map((item) => (
              <li key={item.id}>Hello</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
