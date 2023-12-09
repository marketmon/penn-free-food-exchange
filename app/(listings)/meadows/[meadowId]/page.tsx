"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useListings } from "@/context/ListingsProvider";
import { getMeadowById } from "@/lib/queryFns";
import { getListingsToShow } from "@/lib/utils";
import Sidebar from "@/components/Listings/Sidebar";
import FullScreenToggle from "@/components/Listings/Map/FullScreenToggle";
import Loading from "@/components/common/Loading";

const Map = dynamic(() => import("@/components/Listings/Map/Map"), {
  ssr: false,
});

type PageProps = {
  params: {
    meadowId: string;
  };
};

export default function Page({ params }: PageProps) {
  const { user } = useUser();

  const meadowId = params.meadowId;

  const { data, isLoading, error } = useQuery({
    queryKey: [`meadow-${meadowId}`],
    queryFn: () => getMeadowById(meadowId),
    staleTime: 0,
    retry: false,
  });

  const { dashboardFor, setMeadowId } = useListings();

  const listingsToShow = getListingsToShow(
    isLoading,
    error,
    dashboardFor,
    data?.listings,
    user?.id
  );

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

  if (isLoading || error) {
    return (
      <div className="h-full flex justify-center items-center">
        {isLoading ? <Loading /> : error!.message}
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
