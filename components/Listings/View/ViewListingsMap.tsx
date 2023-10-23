"use client";

import dynamic from "next/dynamic";
import { getMeadowById } from "@/lib/apiCalls";
import { useQuery } from "@tanstack/react-query";

const ListingMap = dynamic(() => import("@/components/Listings/ListingMap"), { ssr: false });

export default function ViewListingsMap({ meadowId }: { meadowId: string }) {
  const { data } = useQuery({
    queryKey: [`$meadow-${meadowId}`],
    queryFn: () => getMeadowById(meadowId),
  });

  const [latitude, longitude] = [data.latitude, data.longitude];

  return <ListingMap latitude={latitude} longitude={longitude} zoom={15} />;
}
