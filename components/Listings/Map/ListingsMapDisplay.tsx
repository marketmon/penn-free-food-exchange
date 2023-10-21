"use client";

import { getMeadowById } from "@/lib/apiCalls";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Listings/Map/Map"), { ssr: false });

export default function ListingsMapDisplay({ meadowId }: { meadowId: string }) {
  const { data } = useQuery({
    queryKey: [`$meadow-${meadowId}`],
    queryFn: () => getMeadowById(meadowId),
  });

  const [latitude, longitude] = [data.latitude, data.longitude];

  return <Map latitude={latitude} longitude={longitude} />;
}
