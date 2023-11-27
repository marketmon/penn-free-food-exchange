import Image from "next/image";
import { MutableRefObject } from "react";
import ButtonHome from "@/components/common/Button/ButtonHome";

type SectionFourProps = {
  sectionRef: MutableRefObject<any>;
};

export default function SectionFour({ sectionRef }: SectionFourProps) {
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
      <h2 className="text-3xl font-bold mb-4">Have questions?</h2>
      <a href="mailto: etmar@wharton.upenn.edu">
        <ButtonHome text="Contact us" />
      </a>
    </div>
  );
}
