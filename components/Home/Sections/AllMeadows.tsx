import Image from "next/image";
import { MutableRefObject } from "react";
import { Meadow } from "@/lib/types";
import ButtonNavigation from "@/components/common/Button/ButtonNavigation";

type AllMeadowsProps = {
  data: Meadow[];
  sectionRef: MutableRefObject<any>;
};

export default function AllMeadows({ data, sectionRef }: AllMeadowsProps) {
  return (
    <div
      className="h-full flex flex-col justify-center items-center snap-always snap-center"
      ref={sectionRef}
    >
      <Image
        src="/head.png"
        width={130}
        height={95}
        priority
        alt="Picture of bison head"
        className="mb-1"
      />
      <Image
        src="/logo_without_head.png"
        width={200}
        height={56}
        priority
        alt="Picture of the author"
      />
      <h2 className="text-2xl font-bold italic tracking-widest [text-shadow:_0_2px_0_rgb(0_0_0_/_30%)] my-4">
        BUILD, GATHER, RETURN
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
