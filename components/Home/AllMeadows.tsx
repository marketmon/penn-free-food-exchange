"use client";

import { useQuery } from "@tanstack/react-query";
import { getListOfMeadows } from "@/lib/queryFns";
import { Meadow } from "@/lib/types";
import ButtonNavigation from "@/components/common/Button/ButtonNavigation";

export default function AllMeadows() {
  const { data } = useQuery({
    queryKey: ["meadows"],
    queryFn: () => getListOfMeadows(),
    staleTime: Infinity,
  });

  return (
    <div className="h-full flex flex-col justify-center items-center snap-always snap-center">
      <h2 className="text-4xl text-center font-bold italic tracking-widest [text-shadow:_0_2px_0_rgb(0_0_0_/_30%)] my-4">
        Penn Free Food Exchange
      </h2>
      <div className="space-y-2 flex flex-col">
        {data.map((meadow: Meadow) => (
          <ButtonNavigation
            key={meadow.id}
            href={`/meadows/${meadow.id}`}
            variant="home"
            btnText={meadow.name}
            btnStyles="w-[210px]"
          />
        ))}
      </div>
    </div>
  );
}
