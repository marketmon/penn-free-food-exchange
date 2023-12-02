import Image from "next/image";
import { MutableRefObject } from "react";
import ButtonAnchor from "@/components/common/Button/ButtonAnchor";

type ContactProps = {
  sectionRef: MutableRefObject<any>;
};

export default function Contact({ sectionRef }: ContactProps) {
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
      <ButtonAnchor variant="home" btnText="Contact us" btnStyles="w-[210px]" />
    </div>
  );
}
