"use client";

import { getMeadowById } from "@/lib/queryFns";
import { useQuery } from "@tanstack/react-query";
import CreateListingSidebar from "@/components/Listings/Create/CreateListingSidebar";
import CreateListingMap from "@/components/Listings/Create/CreateListingMap";
import ViewListingsSidebar from "@/components/Listings/View/ViewListingsSidebar";
import ViewListingsMap from "@/components/Listings/View/ViewListingsMap";

export default function Dashboard({
  queryKey,
  meadowId,
  dashboardFor,
}: {
  queryKey: string;
  meadowId: string;
  dashboardFor: string;
}) {
  const isCreate = dashboardFor === "create";

  const { data, isPending } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getMeadowById(meadowId),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex h-full">
      <div className="w-2/3">
        {isCreate ? (
          <CreateListingMap meadowId={meadowId} data={data} />
        ) : (
          <ViewListingsMap meadowId={meadowId} data={data} />
        )}
      </div>
      <div className="w-1/3">
        {isCreate ? (
          <CreateListingSidebar meadowId={meadowId} />
        ) : (
          <ViewListingsSidebar
            meadowId={meadowId}
            data={data}
          />
        )}
      </div>
    </div>
  );
}
