"use client";

import Link from "next/link";
import { getListOfMeadows } from "@/lib/apiCalls";
import { MeadowsType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function SelectMeadow() {
  const { data } = useQuery({
    queryKey: ["meadows"],
    queryFn: getListOfMeadows,
  });

  return (
    <div>
      {data.map((meadow: MeadowsType) => (
        <div key={meadow.id}>
          <Link href={`/${meadow.id}`}>{meadow.name}</Link>
        </div>
      ))}
    </div>
  );
}
