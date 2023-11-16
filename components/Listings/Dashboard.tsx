"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useListings } from "@/context/ListingsProvider";
import { Listing } from "@/lib/types";
import { getMeadowById } from "@/lib/queryFns";
import Sidebar from "@/components/Listings/Sidebar";

const Map = dynamic(() => import("@/components/Listings/Map"), { ssr: false });

type DashboardProps = {
  queryKey: string;
  meadowId: string;
};

export default function Dashboard({ queryKey, meadowId }: DashboardProps) {
  const { user } = useUser();

  const { data, isPending } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getMeadowById(meadowId),
  });

  const { dashboardFor, setMeadowId } = useListings();

  const listingsToShow =
    dashboardFor === "view"
      ? data.listings
      : dashboardFor === "manage"
      ? data.listings.filter(
          (listing: Listing) => listing.creatorId === user?.id
        )
      : null;

  useEffect(() => {
    setMeadowId(meadowId);
  }, [setMeadowId, meadowId]);

  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col h-full lg:flex-row">
      <div className="h-1/2 lg:w-2/3 lg:h-full">
        <Map lat={data.lat} lng={data.lng} listingsToShow={listingsToShow} />
      </div>
      <div className="h-1/2 lg:w-1/3 lg:h-full pt-2">
        <Sidebar
          meadowUsers={data.userIds}
          userId={user?.id}
          listingsToShow={listingsToShow}
        />
      </div>
    </div>
  );
}
