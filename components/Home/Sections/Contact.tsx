import { RefObject } from "react";
import ButtonAnchor from "@/components/common/Button/ButtonAnchor";
import Image from "@/components/common/Image";

type ContactProps = {
  sectionRef: RefObject<HTMLDivElement>;
};

export default function Contact({ sectionRef }: ContactProps) {
  return (
    <div
      className="h-full flex flex-col justify-center items-center snap-always snap-center"
      ref={sectionRef}
    >
      <div className="w-[130px] h-[95px] mb-1">
        <Image src="/head.png" priority={true} />
      </div>
      <h2 className="text-3xl font-bold mb-4">Have questions?</h2>
      <ButtonAnchor
        variant="home"
        btnText="Contact us"
        href="mailto: etmar@wharton.upenn.edu"
        btnStyles="w-[210px]"
      />
    </div>
  );
}
