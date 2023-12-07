"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useListings } from "@/context/ListingsProvider";
import { Listing } from "@/lib/types";
import { getMeadowById } from "@/lib/queryFns";
import Sidebar from "@/components/Listings/Sidebar";
import Loading from "@/components/common/Loading";
import FullScreenToggle from "@/components/Listings/Map/FullScreenToggle";

const Map = dynamic(() => import("@/components/Listings/Map/Map"), {
  ssr: false,
});

export default function Page({ params }: { params: { meadowId: string } }) {
  const meadowId = params.meadowId;

  const { user } = useUser();

  const { data, isLoading, error } = useQuery({
    queryKey: [`meadow-${meadowId}`],
    queryFn: () => getMeadowById(meadowId),
    staleTime: 0,
    retry: false,
  });

  const { dashboardFor, setMeadowId } = useListings();

  const listingsToShow =
    !isLoading &&
    !error &&
    (dashboardFor === "view"
      ? data.listings
      : dashboardFor === "manage"
      ? data.listings.filter(
          (listing: Listing) => listing.creatorId === user?.id
        )
      : null);

  const [showFullScreen, setShowFullScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setMeadowId(meadowId);
  }, [setMeadowId, meadowId]);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth <= 1024);
    }
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-full flex justify-center items-center">
        {error.message}
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full laptop:flex-row overflow-hidden">
      <div
        className={`laptop:h-full ${
          showFullScreen ? "h-full laptop:w-full" : "h-1/2 laptop:w-2/3"
        }`}
      >
        <Map
          lat={data.lat}
          lng={data.lng}
          listingsToShow={listingsToShow}
          showFullScreen={showFullScreen}
          isSmallScreen={isSmallScreen}
        />
      </div>
      <FullScreenToggle
        isSmallScreen={isSmallScreen}
        showFullScreen={showFullScreen}
        setShowFullScreen={setShowFullScreen}
      />
      <div
        className={`laptop:h-full ${
          showFullScreen ? "h-0 laptop:w-0 pt-0" : "h-1/2 laptop:w-1/3 pt-2"
        }`}
      >
        <Sidebar
          meadowUsers={data.userIds}
          userId={user?.id}
          listingsToShow={listingsToShow}
        />
      </div>
    </div>
  );
}
