"use client";

import { getCurrentUser } from "@/lib/apiCalls";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Listings/Map/Map"), { ssr: false });

export default function ListingsMapCreate() {
  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const [latitude, longitude] = [data.meadow.latitude, data.meadow.longitude];

  return <Map latitude={latitude} longitude={longitude} />;
}
