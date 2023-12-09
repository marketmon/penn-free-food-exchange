import { RefObject } from "react";
import { Meadow } from "@/lib/types";
import ButtonNavigation from "@/components/common/Button/ButtonNavigation";
import Image from "@/components/common/Image";

type AllMeadowsProps = {
  data: Meadow[];
  sectionRef: RefObject<HTMLDivElement>;
};

export default function AllMeadows({ data, sectionRef }: AllMeadowsProps) {
  return (
    <div
      className="h-full flex flex-col justify-center items-center snap-always snap-center"
      ref={sectionRef}
    >
      <div className="w-[130px] h-[95px] mb-1">
        <Image src="/head.png" priority={true} />
      </div>
      <div className="w-[200px] h-[56px] mb-1">
        <Image src="/logo_without_head.png" priority={true} />
      </div>

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
